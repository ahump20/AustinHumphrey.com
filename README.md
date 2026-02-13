# AustinHumphrey.com Proxy Worker Hardening

This repository contains a Cloudflare Worker proxy handler hardened for controlled upstream access.

## Security controls implemented

- **Upstream allowlist:** `target` URLs must use HTTPS and hostnames listed in `ALLOWED_UPSTREAMS`.
- **Authentication gate:** requires `Authorization: Bearer <PROXY_TOKEN>`.
- **Controlled CORS:** requests are accepted only from origins in `ALLOWED_ORIGINS`.
- **Header policy:** explicit request/response pass-through allowlists and hop-by-hop header stripping.
- **Timeout + abort:** upstream calls are aborted after `REQUEST_TIMEOUT_MS` (default 8s) with a `504` response.
- **Rate limiting:** Durable Object-backed per-IP/origin/path limiter with clear `429` + `Retry-After` response.

## Cloudflare-native rate limit strategy

This code uses a Durable Object (`RateLimiter`) for request counting and throttling. For production edge protection, pair this with Cloudflare WAF Rate Limiting rules at zone level so abusive traffic is blocked before Worker execution.

## Local verification

Install dependencies and run tests:

```bash
npm install
npm test
npm run typecheck
```

Run request-level checks against `wrangler dev`:

```bash
wrangler dev
./scripts/verify-proxy.sh http://127.0.0.1:8787/proxy
```

## Environment

Set these values in Cloudflare Worker vars/secrets:

- `PROXY_TOKEN` (secret)
- `ALLOWED_UPSTREAMS` (comma-separated hostnames)
- `ALLOWED_ORIGINS` (comma-separated allowed web origins)
- `REQUEST_TIMEOUT_MS`
- `RATE_LIMIT_MAX`
- `RATE_LIMIT_WINDOW_SECONDS`
