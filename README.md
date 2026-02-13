# Austin Humphrey Professional Resume Portfolio

Production React portfolio + Cloudflare Worker API + Cloudflare Pages deployment for `austinhumphrey.com`.

## Stack
- Frontend: React + TypeScript + Vite
- API: Cloudflare Worker (Hono)
- Testing: Playwright
- PDF generation: ReportLab + Poppler render checks
- Image generation: OpenAI Image API via bundled skill CLI

## Project Layout
- `src/content/resume.ts`: single source-of-truth resume and brand content model
- `src/`: portfolio React app
- `worker/`: Worker API (`/api/profile`, `/api/assets`, `/api/contact`, `/api/health`)
- `scripts/generate_pdfs.py`: builds Premium and ATS resume PDFs from exported content model
- `scripts/generate_images.sh`: creates hero, OG card, and poster assets
- `tests/smoke.spec.ts`: UI/API smoke checks

## Key Commands
- `npm run dev`: start frontend locally
- `npm run dev:api`: run Worker API locally
- `npm run build`: build frontend
- `npm run pdf:build`: export content and generate both PDFs
- `npm run image:generate`: generate image assets (requires `OPENAI_API_KEY`)
- `npm run test:smoke`: run Playwright smoke tests
- `npm run cf:pages:create`: create Pages project
- `npm run cf:pages:deploy`: deploy frontend to Pages
- `npm run cf:worker:deploy`: deploy Worker API
- `npm run cf:domain:attach`: attach custom domain `austinhumphrey.com`
- `npm run deploy:all`: build + pdf + pages deploy + worker deploy + domain attach

## Local Development

```bash
# Install dependencies
npm install

# Start frontend dev server
npm run dev

# Start Worker API locally (separate terminal)
npm run dev:api

# Run smoke tests
npx playwright install chromium
npm run test:smoke
```

## PDF Generation

```bash
# Install Python dependency
pip install reportlab

# Export content model and generate PDFs
npm run pdf:build
```

## Image Generation

```bash
# Requires OPENAI_API_KEY environment variable
export OPENAI_API_KEY=sk-...
npm run image:generate
```

## Deploy to Cloudflare

```bash
# One-time: create Cloudflare Pages project
npm run cf:pages:create

# Deploy everything
npm run deploy:all

# Or deploy individually:
npm run cf:pages:deploy    # frontend
npm run cf:worker:deploy   # API worker
npm run cf:domain:attach   # custom domain
```

## Domain
- Primary domain: `https://austinhumphrey.com`
- Pages fallback: `https://austin-humphrey-professional-resume-portfolio.pages.dev`

## Notes
- `public/assets/origin/newspaper-and-soil.jpg` currently uses the available origin asset fallback until a higher-resolution newspaper+soil source file is uploaded.
- Contact persistence is optional via KV binding (`PORTFOLIO_CONTACTS`). If no binding is configured, `/api/contact` still validates payloads and returns success IDs.
