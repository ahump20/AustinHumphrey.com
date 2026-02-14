export interface Env {
  PROXY_TOKEN: string;
  ALLOWED_UPSTREAMS: string;
  ALLOWED_ORIGINS: string;
  REQUEST_TIMEOUT_MS?: string;
  RATE_LIMIT_MAX?: string;
  RATE_LIMIT_WINDOW_SECONDS?: string;
  RATE_LIMITER: DurableObjectNamespace;
}

const HOP_BY_HOP_HEADERS = new Set([
  'connection',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailer',
  'transfer-encoding',
  'upgrade'
]);

const REQUEST_HEADER_ALLOWLIST = new Set([
  'accept',
  'accept-language',
  'content-type',
  'if-none-match',
  'if-modified-since',
  'user-agent'
]);

const RESPONSE_HEADER_ALLOWLIST = new Set([
  'content-type',
  'content-length',
  'cache-control',
  'etag',
  'last-modified',
  'expires'
]);

function parseCsv(value: string): Set<string> {
  return new Set(
    value
      .split(',')
      .map((entry) => entry.trim().toLowerCase())
      .filter(Boolean)
  );
}

function buildCorsHeaders(origin: string | null, allowedOrigins: Set<string>): Headers {
  const headers = new Headers({ Vary: 'Origin' });
  if (origin && allowedOrigins.has(origin.toLowerCase())) {
    headers.set('Access-Control-Allow-Origin', origin);
    headers.set('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Authorization,Content-Type');
    headers.set('Access-Control-Max-Age', '86400');
  }
  return headers;
}

function jsonResponse(status: number, payload: unknown, corsHeaders: Headers): Response {
  const headers = new Headers(corsHeaders);
  headers.set('Content-Type', 'application/json; charset=utf-8');
  return new Response(JSON.stringify(payload), { status, headers });
}

async function checkRateLimit(request: Request, env: Env, corsHeaders: Headers): Promise<Response | null> {
  const ip = request.headers.get('CF-Connecting-IP') ?? 'unknown';
  const url = new URL(request.url);
  const origin = request.headers.get('Origin') ?? 'none';
  const key = `${ip}:${origin}:${url.pathname}`;

  const id = env.RATE_LIMITER.idFromName(key);
  const stub = env.RATE_LIMITER.get(id);
  const response = await stub.fetch('https://ratelimit.internal/check', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      max: Number(env.RATE_LIMIT_MAX ?? 60),
      windowSeconds: Number(env.RATE_LIMIT_WINDOW_SECONDS ?? 60)
    })
  });

  if (response.status !== 429) {
    return null;
  }

  const retryAfter = response.headers.get('Retry-After') ?? '60';
  const blocked = jsonResponse(429, { error: 'rate_limit_exceeded' }, corsHeaders);
  blocked.headers.set('Retry-After', retryAfter);
  return blocked;
}

function filterRequestHeaders(requestHeaders: Headers): Headers {
  const filtered = new Headers();
  requestHeaders.forEach((value, name) => {
    const lower = name.toLowerCase();
    if (REQUEST_HEADER_ALLOWLIST.has(lower) && !HOP_BY_HOP_HEADERS.has(lower)) {
      filtered.set(name, value);
    }
  });
  return filtered;
}

function filterResponseHeaders(responseHeaders: Headers): Headers {
  const filtered = new Headers();
  responseHeaders.forEach((value, name) => {
    const lower = name.toLowerCase();
    if (RESPONSE_HEADER_ALLOWLIST.has(lower) && !HOP_BY_HOP_HEADERS.has(lower)) {
      filtered.set(name, value);
    }
  });
  return filtered;
}

function isAllowedUpstream(upstream: URL, allowedUpstreams: Set<string>): boolean {
  // Enforce HTTPS protocol
  if (upstream.protocol !== 'https:') {
    return false;
  }

  // Disallow embedded credentials in the upstream URL (username:password@hostname)
  if (upstream.username || upstream.password) {
    return false;
  }

  // Only allow explicitly whitelisted hostnames
  const hostname = upstream.hostname.toLowerCase();
  return allowedUpstreams.has(hostname);
}

export async function handleProxyRequest(request: Request, env: Env, fetchImpl: typeof fetch = fetch): Promise<Response> {
  const allowedOrigins = parseCsv(env.ALLOWED_ORIGINS);
  const origin = request.headers.get('Origin');
  const corsHeaders = buildCorsHeaders(origin, allowedOrigins);

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (origin && !allowedOrigins.has(origin.toLowerCase())) {
    return jsonResponse(403, { error: 'origin_not_allowed' }, corsHeaders);
  }

  if (request.headers.get('Authorization') !== `Bearer ${env.PROXY_TOKEN}`) {
    return jsonResponse(401, { error: 'invalid_proxy_token' }, corsHeaders);
  }

  const rateLimitResponse = await checkRateLimit(request, env, corsHeaders);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  const requestUrl = new URL(request.url);
  const target = requestUrl.searchParams.get('target');
  if (!target) {
    return jsonResponse(400, { error: 'missing_target' }, corsHeaders);
  }

  let upstream: URL;
  try {
    upstream = new URL(target);
  } catch {
    return jsonResponse(400, { error: 'invalid_target' }, corsHeaders);
  }

  if (!isAllowedUpstream(upstream, parseCsv(env.ALLOWED_UPSTREAMS))) {
    return jsonResponse(403, { error: 'upstream_not_allowed' }, corsHeaders);
  }

  const controller = new AbortController();
  const timeoutMs = Number(env.REQUEST_TIMEOUT_MS ?? 8000);
  const timeout = setTimeout(() => controller.abort('upstream_timeout'), timeoutMs);

  try {
    const upstreamResponse = await fetchImpl(upstream.toString(), {
      method: 'GET',
      headers: filterRequestHeaders(request.headers),
      signal: controller.signal
    });
    const passthroughHeaders = filterResponseHeaders(upstreamResponse.headers);
    corsHeaders.forEach((value, name) => {
      passthroughHeaders.set(name, value);
    });

    return new Response(upstreamResponse.body, {
      status: upstreamResponse.status,
      headers: passthroughHeaders
    });
  } catch (error) {
    if (controller.signal.aborted) {
      return jsonResponse(504, { error: 'upstream_timeout' }, corsHeaders);
    }
    return jsonResponse(502, { error: 'upstream_fetch_failed' }, corsHeaders);
  } finally {
    clearTimeout(timeout);
  }
}

export class RateLimiter implements DurableObject {
  constructor(private readonly state: DurableObjectState) {}

  async fetch(request: Request): Promise<Response> {
    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: 'invalid_json' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { max, windowSeconds } = (body ?? {}) as {
      max?: unknown;
      windowSeconds?: unknown;
    };

    const maxNum = Number(max);
    const windowSecondsNum = Number(windowSeconds);

    if (
      !Number.isFinite(maxNum) ||
      !Number.isFinite(windowSecondsNum) ||
      maxNum <= 0 ||
      windowSecondsNum <= 0
    ) {
      return new Response(JSON.stringify({ error: 'invalid_rate_limit_config' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const now = Date.now();
    const bucket = Math.floor(now / (windowSecondsNum * 1000));
    const key = `bucket:${bucket}`;

    const count = ((await this.state.storage.get<number>(key)) ?? 0) + 1;
    await this.state.storage.put(key, count);

    if (count > maxNum) {
      return new Response(JSON.stringify({ error: 'rate_limit_exceeded' }), {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': `${windowSecondsNum}`
        }
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    return handleProxyRequest(request, env);
  }
};
