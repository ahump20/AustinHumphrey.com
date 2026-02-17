# AustinHumphrey.com backend proxy (Cloudflare Workers)

This repository now includes a Cloudflare Workers ES module entrypoint at `worker/index.ts` with explicit route handling for a backend proxy.

## Routes

- `GET /api/health`
  - Returns `{ "ok": true }`.
  - Any method other than `GET` returns `405`.

- `GET|POST /api/proxy/:service/*`
  - Proxies requests only to upstream services declared in `PROXY_ALLOWLIST`.
  - `:service` must exist in allowlist JSON.
  - Method must be allowed globally (`GET`/`POST`) and per-service (`allowedMethods` in allowlist).
  - Rejects path traversal (`..`) and non-allowlisted services.
  - Sanitizes forwarded headers and strips `set-cookie` from upstream response.

## Configuration

`wrangler.toml` uses `[vars]` and environment-specific sections for non-sensitive configuration values.

- Global defaults in `[vars]`
- Dev overrides in `[env.dev.vars]`
- Production overrides in `[env.production.vars]`

No credentials are hardcoded in source. If secrets are needed later (API keys, tokens), set them with Wrangler secrets (for example `wrangler secret put API_KEY`) instead of adding them to code or `wrangler.toml`.

## Local, dev, and production execution paths

The same Worker code (`worker/index.ts`) is used in all environments.

### Local development

```bash
npx wrangler dev
```

### Local development with dev environment variables

```bash
npx wrangler dev --env dev
```

### Deploy to Cloudflare (production environment)

```bash
npx wrangler deploy --env production
```

### Deploy default environment

```bash
npx wrangler deploy
```

Because routing and environment differences are handled by Wrangler config, no code changes are required between local development and Cloudflare deployment.
