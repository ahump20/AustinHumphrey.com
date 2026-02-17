interface UpstreamRule {
  origin: string;
  allowedMethods: string[];
}

interface Env {
  PROXY_ALLOWLIST: string;
  PROXY_TIMEOUT_MS?: string;
}

const PROXY_ROUTE_PREFIX = "/api/proxy/";
const JSON_HEADERS = { "content-type": "application/json; charset=utf-8" };

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/health") {
      if (request.method !== "GET") {
        return methodNotAllowed(["GET"]);
      }

      return new Response(JSON.stringify({ ok: true }), { status: 200, headers: JSON_HEADERS });
    }

    if (!url.pathname.startsWith(PROXY_ROUTE_PREFIX)) {
      return jsonError(404, "Route not found");
    }

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "access-control-allow-origin": "*",
          "access-control-allow-methods": "GET,POST,OPTIONS",
          "access-control-allow-headers": "content-type,authorization"
        }
      });
    }

    if (request.method !== "GET" && request.method !== "POST") {
      return methodNotAllowed(["GET", "POST", "OPTIONS"]);
    }

    const allowlist = parseAllowlist(env.PROXY_ALLOWLIST);
    if (!allowlist.ok) {
      return jsonError(500, allowlist.error);
    }

    const proxied = resolveProxyTarget(url, allowlist.value);
    if (!proxied.ok) {
      return jsonError(400, proxied.error);
    }

    if (!proxied.value.rule.allowedMethods.includes(request.method)) {
      return jsonError(
        405,
        `Method ${request.method} is not allowed for upstream '${proxied.value.service}'.`
      );
    }

    const upstreamBase = new URL(proxied.value.rule.origin);
    const basePath = upstreamBase.pathname.replace(/\/+$/, "");
    const proxyPath = proxied.value.path.startsWith("/")
      ? proxied.value.path
      : "/" + proxied.value.path;
    upstreamBase.pathname = basePath + proxyPath;
    const upstreamUrl = new URL(upstreamBase.toString());
    upstreamUrl.search = url.search;

    const upstreamRequest = new Request(upstreamUrl.toString(), {
      method: request.method,
      headers: sanitizeHeaders(request.headers),
      body: request.method === "POST" ? request.body : undefined,
      redirect: "follow"
    });

    const timeoutMs = Number.isFinite(Number(env.PROXY_TIMEOUT_MS)) ? Number(env.PROXY_TIMEOUT_MS) : 12000;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const upstreamResponse = await fetch(upstreamRequest, { signal: controller.signal });
      const responseHeaders = new Headers(upstreamResponse.headers);
      responseHeaders.set("access-control-allow-origin", "*");
      responseHeaders.delete("set-cookie");

      return new Response(upstreamResponse.body, {
        status: upstreamResponse.status,
        statusText: upstreamResponse.statusText,
        headers: responseHeaders
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown upstream error";
      return jsonError(502, `Upstream request failed: ${message}`);
    } finally {
      clearTimeout(timeout);
    }
  }
};

function parseAllowlist(raw: string | undefined):
  | { ok: true; value: Record<string, UpstreamRule> }
  | { ok: false; error: string } {
  if (!raw) {
    return { ok: false, error: "Missing PROXY_ALLOWLIST environment variable." };
  }

  try {
    const parsed = JSON.parse(raw) as Record<string, UpstreamRule>;

    for (const [service, rule] of Object.entries(parsed)) {
      if (!rule.origin || !Array.isArray(rule.allowedMethods)) {
        return { ok: false, error: `Invalid allowlist entry for '${service}'.` };
      }

      try {
        new URL(rule.origin);
      } catch {
        return { ok: false, error: `Invalid origin URL for '${service}'.` };
      }

      rule.allowedMethods = rule.allowedMethods.map((method) => method.toUpperCase());
    }

    return { ok: true, value: parsed };
  } catch {
    return { ok: false, error: "PROXY_ALLOWLIST must be valid JSON." };
  }
}

function resolveProxyTarget(
  url: URL,
  allowlist: Record<string, UpstreamRule>
):
  | { ok: true; value: { service: string; path: string; rule: UpstreamRule } }
  | { ok: false; error: string } {
  const relativePath = url.pathname.slice(PROXY_ROUTE_PREFIX.length);
  const [service, ...remainingParts] = relativePath.split("/");

  if (!service) {
    return { ok: false, error: "Missing upstream service identifier in route." };
  }

  const rule = allowlist[service];
  if (!rule) {
    return { ok: false, error: `Service '${service}' is not allowlisted.` };
  }

  const normalizedPath = `/${remainingParts.join("/")}`.replace(/\/+/g, "/");
  if (normalizedPath.includes("..")) {
    return { ok: false, error: "Path traversal is not allowed." };
  }

  return { ok: true, value: { service, path: normalizedPath, rule } };
}

function sanitizeHeaders(source: Headers): Headers {
  const headers = new Headers();
  const blockedHeaders = new Set(["host", "cf-connecting-ip", "x-forwarded-for", "content-length"]);

  for (const [key, value] of source.entries()) {
    if (!blockedHeaders.has(key.toLowerCase())) {
      headers.set(key, value);
    }
  }

  return headers;
}

function methodNotAllowed(allowedMethods: string[]): Response {
  return new Response(JSON.stringify({ error: "Method not allowed" }), {
    status: 405,
    headers: { ...JSON_HEADERS, allow: allowedMethods.join(",") }
  });
}

function jsonError(status: number, error: string): Response {
  return new Response(JSON.stringify({ error }), {
    status,
    headers: JSON_HEADERS
  });
}
