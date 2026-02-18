import { describe, expect, it, vi } from 'vitest';
import { handleProxyRequest, type Env } from '../src/index';

function createEnv(overrides: Partial<Env> = {}): Env {
  const stubFetch = vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 }));
  return {
    PROXY_TOKEN: 'secret',
    ALLOWED_UPSTREAMS: 'api.blazesportsintel.com,statsapi.mlb.com',
    ALLOWED_ORIGINS: 'https://austinhumphrey.com,https://www.austinhumphrey.com',
    REQUEST_TIMEOUT_MS: '20',
    RATE_LIMITER: {
      idFromName: vi.fn().mockReturnValue({ toString: () => 'id' }),
      get: vi.fn().mockReturnValue({ fetch: stubFetch })
    } as unknown as DurableObjectNamespace,
    ...overrides
  };
}

function proxyRequest(url: string, headers: HeadersInit = {}): Request {
  return new Request(url, {
    headers: {
      Origin: 'https://austinhumphrey.com',
      Authorization: 'Bearer secret',
      ...headers
    }
  });
}

describe('proxy handler', () => {
  it('blocks upstream hosts not on allowlist', async () => {
    const env = createEnv();
    const response = await handleProxyRequest(
      proxyRequest('https://worker.test/proxy?target=https://evil.example.com/path'),
      env
    );

    expect(response.status).toBe(403);
    await expect(response.json()).resolves.toEqual({ error: 'upstream_not_allowed' });
  });

  it('fails when auth header is missing', async () => {
    const env = createEnv();
    const response = await handleProxyRequest(
      new Request('https://worker.test/proxy?target=https://api.blazesportsintel.com/feed', {
        headers: { Origin: 'https://austinhumphrey.com' }
      }),
      env
    );

    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toEqual({ error: 'invalid_proxy_token' });
  });

  it('fails with 500 when PROXY_TOKEN is not configured', async () => {
    const env = createEnv({ PROXY_TOKEN: '' });
    const response = await handleProxyRequest(
      new Request('https://worker.test/proxy?target=https://api.blazesportsintel.com/feed', {
        headers: {
          Origin: 'https://austinhumphrey.com',
          Authorization: 'Bearer attacker-token'
        }
      }),
      env
    );

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({ error: 'proxy_token_not_configured' });
  });

  it('fails with 500 when PROXY_TOKEN is whitespace-only', async () => {
    const env = createEnv({ PROXY_TOKEN: '   ' });
    const response = await handleProxyRequest(
      new Request('https://worker.test/proxy?target=https://api.blazesportsintel.com/feed', {
        headers: {
          Origin: 'https://austinhumphrey.com',
          Authorization: 'Bearer attacker-token'
        }
      }),
      env
    );

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({ error: 'proxy_token_not_configured' });
  });

  it('fails with 500 when PROXY_TOKEN is undefined', async () => {
    const env = createEnv({ PROXY_TOKEN: undefined as unknown as string });
    const response = await handleProxyRequest(
      new Request('https://worker.test/proxy?target=https://api.blazesportsintel.com/feed', {
        headers: {
          Origin: 'https://austinhumphrey.com',
          Authorization: 'Bearer attacker-token'
        }
      }),
      env
    );

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({ error: 'proxy_token_not_configured' });
  });

  it('returns timeout response when upstream exceeds timeout', async () => {
    const env = createEnv();
    const delayedFetch = vi.fn(async (_url: string, init?: RequestInit) => {
      await new Promise<void>((resolve, reject) => {
        const timer = setTimeout(resolve, 50);
        init?.signal?.addEventListener('abort', () => {
          clearTimeout(timer);
          reject(new Error('aborted'));
        });
      });
      return new Response('should not return');
    });

    const response = await handleProxyRequest(
      proxyRequest('https://worker.test/proxy?target=https://api.blazesportsintel.com/feed'),
      env,
      delayedFetch as typeof fetch
    );

    expect(response.status).toBe(504);
    await expect(response.json()).resolves.toEqual({ error: 'upstream_timeout' });
  });

  it('passes successful proxied responses with filtered headers', async () => {
    const env = createEnv();
    const upstreamFetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ data: 'ok' }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          Connection: 'keep-alive',
          'Set-Cookie': 'token=123'
        }
      })
    );

    const response = await handleProxyRequest(
      proxyRequest('https://worker.test/proxy?target=https://statsapi.mlb.com/feed', {
        'X-Untrusted': 'drop-me',
        Accept: 'application/json'
      }),
      env,
      upstreamFetch as typeof fetch
    );

    expect(response.status).toBe(200);
    expect(response.headers.get('Content-Type')).toBe('application/json');
    expect(response.headers.get('Set-Cookie')).toBeNull();
    expect(response.headers.get('Connection')).toBeNull();
    expect(response.headers.get('Access-Control-Allow-Origin')).toBe('https://austinhumphrey.com');
    await expect(response.json()).resolves.toEqual({ data: 'ok' });

    const forwardedHeaders = upstreamFetch.mock.calls[0][1]?.headers as Headers;
    expect(forwardedHeaders.get('X-Untrusted')).toBeNull();
    expect(forwardedHeaders.get('Accept')).toBe('application/json');
  });

  it('returns 429 when rate limiter denies request', async () => {
    const env = createEnv({
      RATE_LIMITER: {
        idFromName: vi.fn().mockReturnValue({ toString: () => 'id' }),
        get: vi.fn().mockReturnValue({
          fetch: vi.fn().mockResolvedValue(new Response(JSON.stringify({ error: 'rate_limit_exceeded' }), {
            status: 429,
            headers: { 'Retry-After': '30' }
          }))
        })
      } as unknown as DurableObjectNamespace
    });

    const response = await handleProxyRequest(
      proxyRequest('https://worker.test/proxy?target=https://statsapi.mlb.com/feed'),
      env
    );

    expect(response.status).toBe(429);
    expect(response.headers.get('Retry-After')).toBe('30');
    await expect(response.json()).resolves.toEqual({ error: 'rate_limit_exceeded' });
  });

  it('handles requests without an Origin header for non-browser clients', async () => {
    const env = createEnv();
    const mockFetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), { status: 200 })
    );

    const request = new Request(
      'https://worker.test/proxy?target=https://api.blazesportsintel.com/feed',
      {
        headers: {
          Authorization: 'Bearer secret'
        }
      }
    );

    const response = await handleProxyRequest(request, env, mockFetch as typeof fetch);

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ ok: true });
  });

  it('handles CORS preflight OPTIONS requests', async () => {
    const env = createEnv();
    const request = new Request('https://worker.test/proxy', {
      method: 'OPTIONS',
      headers: {
        Origin: 'https://austinhumphrey.com',
        'Access-Control-Request-Method': 'GET',
        'Access-Control-Request-Headers': 'Authorization,Content-Type'
      }
    });

    const response = await handleProxyRequest(request, env);

    expect(response.status).toBe(204);
    expect(response.headers.get('Access-Control-Allow-Origin')).toBe('https://austinhumphrey.com');
    expect(response.headers.get('Access-Control-Allow-Methods')).toBeTruthy();
    expect(response.headers.get('Access-Control-Allow-Headers')).toBeTruthy();
  });

  it('forwards HEAD requests without coercing to GET', async () => {
    const env = createEnv();
    const mockFetch = vi.fn().mockResolvedValue(
      new Response(null, {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': '42'
        }
      })
    );

    const response = await handleProxyRequest(
      new Request('https://worker.test/proxy?target=https://api.blazesportsintel.com/feed', {
        method: 'HEAD',
        headers: {
          Origin: 'https://austinhumphrey.com',
          Authorization: 'Bearer secret'
        }
      }),
      env,
      mockFetch as typeof fetch
    );

    expect(response.status).toBe(200);
    expect(response.headers.get('Content-Type')).toBe('application/json');
    expect(response.headers.get('Content-Length')).toBe('42');

    // Verify that HEAD method was actually used, not GET
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.blazesportsintel.com/feed',
      expect.objectContaining({
        method: 'HEAD'
      })
    );
  });

  it('rejects unsupported HTTP methods', async () => {
    const env = createEnv();
    const response = await handleProxyRequest(
      new Request('https://worker.test/proxy?target=https://api.blazesportsintel.com/feed', {
        method: 'POST',
        headers: {
          Origin: 'https://austinhumphrey.com',
          Authorization: 'Bearer secret'
        }
      }),
      env
    );

    expect(response.status).toBe(405);
    await expect(response.json()).resolves.toEqual({ error: 'method_not_allowed' });
  });

  it('returns 400 when target parameter is missing', async () => {
    const env = createEnv();
    const request = new Request('https://worker.test/proxy', {
      method: 'GET',
      headers: {
        Origin: 'https://austinhumphrey.com',
        Authorization: 'Bearer secret'
      }
    });

    const response = await handleProxyRequest(request, env);

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({ error: 'missing_target' });
  });

  it('follows redirects to allowlisted hosts', async () => {
    const env = createEnv();
    const mockFetch = vi.fn()
      .mockResolvedValueOnce(
        new Response(null, {
          status: 302,
          headers: {
            Location: 'https://statsapi.mlb.com/actual-feed'
          }
        })
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ data: 'redirected' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        })
      );

    const response = await handleProxyRequest(
      proxyRequest('https://worker.test/proxy?target=https://api.blazesportsintel.com/feed'),
      env,
      mockFetch as typeof fetch
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ data: 'redirected' });
    expect(mockFetch).toHaveBeenCalledTimes(2);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.blazesportsintel.com/feed',
      expect.objectContaining({ redirect: 'manual' })
    );
    expect(mockFetch).toHaveBeenCalledWith(
      'https://statsapi.mlb.com/actual-feed',
      expect.objectContaining({ redirect: 'manual' })
    );
  });

  it('blocks redirects to non-allowlisted hosts', async () => {
    const env = createEnv();
    const mockFetch = vi.fn().mockResolvedValueOnce(
      new Response(null, {
        status: 302,
        headers: {
          Location: 'https://evil.example.com/malicious'
        }
      })
    );

    const response = await handleProxyRequest(
      proxyRequest('https://worker.test/proxy?target=https://api.blazesportsintel.com/feed'),
      env,
      mockFetch as typeof fetch
    );

    expect(response.status).toBe(403);
    await expect(response.json()).resolves.toEqual({ error: 'redirect_not_allowed' });
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('blocks redirects exceeding maximum redirect limit', async () => {
    const env = createEnv();
    const mockFetch = vi.fn().mockResolvedValue(
      new Response(null, {
        status: 302,
        headers: {
          Location: 'https://api.blazesportsintel.com/redirect-loop'
        }
      })
    );

    const response = await handleProxyRequest(
      proxyRequest('https://worker.test/proxy?target=https://api.blazesportsintel.com/feed'),
      env,
      mockFetch as typeof fetch
    );

    expect(response.status).toBe(502);
    await expect(response.json()).resolves.toEqual({ error: 'too_many_redirects' });
    expect(mockFetch).toHaveBeenCalledTimes(6); // Initial + 5 redirects
  });

  it('handles relative redirects correctly', async () => {
    const env = createEnv();
    const mockFetch = vi.fn()
      .mockResolvedValueOnce(
        new Response(null, {
          status: 301,
          headers: {
            Location: '/redirected-path'
          }
        })
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ data: 'relative-redirect' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        })
      );

    const response = await handleProxyRequest(
      proxyRequest('https://worker.test/proxy?target=https://statsapi.mlb.com/original'),
      env,
      mockFetch as typeof fetch
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ data: 'relative-redirect' });
    expect(mockFetch).toHaveBeenCalledWith(
      'https://statsapi.mlb.com/redirected-path',
      expect.objectContaining({ redirect: 'manual' })
    );
  });

  it('blocks protocol-relative redirects to non-allowlisted hosts', async () => {
    const env = createEnv();
    const mockFetch = vi.fn().mockResolvedValueOnce(
      new Response(null, {
        status: 302,
        headers: {
          Location: '//evil.example.com/malicious'
        }
      })
    );

    const response = await handleProxyRequest(
      proxyRequest('https://worker.test/proxy?target=https://api.blazesportsintel.com/feed'),
      env,
      mockFetch as typeof fetch
    );

    expect(response.status).toBe(403);
    await expect(response.json()).resolves.toEqual({ error: 'redirect_not_allowed' });
  });

  it('returns error for redirect without Location header', async () => {
    const env = createEnv();
    const mockFetch = vi.fn().mockResolvedValueOnce(
      new Response(null, {
        status: 302,
        headers: {}
      })
    );

    const response = await handleProxyRequest(
      proxyRequest('https://worker.test/proxy?target=https://api.blazesportsintel.com/feed'),
      env,
      mockFetch as typeof fetch
    );

    expect(response.status).toBe(502);
    await expect(response.json()).resolves.toEqual({ error: 'invalid_redirect' });
  });
});
