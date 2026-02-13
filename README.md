Build AustinHumphrey.com (personal professional portfolio + resume site) as a production-ready static site deployed on Cloudflare Pages, with an optional Cloudflare Worker for simple dynamic endpoints. This repo is for my custom domain AustinHumphrey.com. Create the full project and open a PR with all files.

Hard constraints
- Cloudflare-first. No Vercel. No AWS.
- Prefer Cloudflare Pages static hosting. If you add a Worker, it must be Cloudflare Workers with ES module syntax.
- No placeholders, no lorem ipsum, no fake metrics, no invented employers, no fabricated awards. Use only the facts below.
- One-page resume must be viewable in browser and downloadable as PDF. Also include a JPEG preview.
- Fast and simple: minimal dependencies, no heavy frameworks unless justified. If you use a framework, use Next.js static export only (no SSR), and ensure it works on Cloudflare Pages.
- Accessibility and performance: semantic HTML, good contrast, responsive, lighthouse-friendly.

Brand + UI (must match)
- Visual tone: premium executive, sports-tech, high trust.
- Palette:
  - Burnt orange: #BF5700 (accent only)
  - Charcoal: #1A1A1A
  - Midnight: #0D0D0D
  - Sand/Bone: #F5F2EB or similar warm paper tone
- Typography:
  - Headings: Oswald (uppercase with tracking)
  - Body: Cormorant Garamond
  - Utility/meta: JetBrains Mono
- Subtle film-grain overlay and soft radial glow background (very light, not gimmicky).

Information architecture
Routes
1) / (Home)
   - Hero: name + concise positioning line (sports intelligence + product strategy + AI-assisted analytics)
   - Short executive summary paragraph (2–3 sentences)
   - Primary CTAs: “View Resume” and “Download PDF”
   - Secondary: LinkedIn, BlazeSportsIntel.com
2) /resume
   - Render the resume page in a print-perfect layout (A4 friendly)
   - Buttons: Download PDF, Download JPEG, Download HTML
3) /work
   - “Selected Work” cards (Blaze Sports Intel, BlazeCraft.app) with factual descriptions only
4) /contact
   - Contact block with email + LinkedIn

Resume content (use exactly these facts)
Contact (must match exactly)
- San Antonio, TX
- (210) 273-5538
- Austin@BlazeSportsIntel.com
- humphrey.austin20@gmail.com
- linkedin.com/in/ahump20
- BlazeSportsIntel.com
- Portfolio: AustinHumphrey.com

Tagline
Sports Intelligence | Product Strategy | AI-Assisted Analytics

Experience (3 roles, keep dates exact)
1) Founder & Builder | Blaze Sports Intel (Blaze Intelligence) — San Antonio, TX | 2023 – Present
   Bullets (merge, keep factual, no exaggeration):
   - Built and operate BlazeSportsIntel.com, an AI-assisted sports intelligence platform; shipped real-time MLB and college baseball dashboards and scoreboards sourced from official APIs with a 30-second refresh cadence.
   - Deployed on Cloudflare with a serverless architecture focused on speed, reliability, documentation, and cost discipline (Workers, D1, KV, R2).
   - Develop analytics modules for research and predictive work (win probability and Monte Carlo) and reporting products for scouts, coaches, programs, and media partners.
   - Designed Pro and Enterprise packaging with API access and custom exports for professional users.
   - Created BlazeCraft.app, an RTS-style Agent Forge interface that visualizes system health and operational flow.
   - Lead end-to-end execution across product direction, publishing cadence, documentation, and stakeholder communication under game-day deadlines.

2) Advertising Account Executive | Spectrum Reach — Austin, TX (hybrid / field) | Nov 2022 – Dec 2025
   - Developed data-informed advertising strategies across linear TV, OTT/CTV, streaming, and digital platforms for local and regional brands.
   - Translated campaign performance and audience insights into recommendations that informed renewals, retention, and strategic upsells.
   - Built client-ready decks and proposals while coordinating with creative, production, and analytics teams to maintain on-time delivery.

3) Financial Representative | Northwestern Mutual — Austin, TX | 2020 – 2022
   - Delivered consultative planning through structured discovery, needs analysis, and financial modeling for client decision support.
   - Recognized with Power of 10 and March Madness Competition awards; converted to full-time role based on results.

Education (exact)
- Full Sail University — M.S., Entertainment Business Management (Sports Management) — Feb 2026 | GPA 3.56
- The University of Texas at Austin (McCombs) — Artificial Intelligence and Machine Learning Postgraduate Certificate — Accepted / In progress
- The University of Texas at Austin — B.A., International Relations & Global Studies — Minors: Economics, European Studies | 2014–2020

Honors & Leadership (must include all)
- Power of 10 Award Recipient (Northwestern Mutual)
- March Madness Competition Champion (Northwestern Mutual)
- Alpha Tau Omega leadership: Rush Captain / Rush Chair, Alumni Relations, Intramural Chair
- Managed $100K chapter budget (Alpha Tau Omega)
- Multi-sport athlete background in baseball, football, and track
- References available upon request (only include if space allows; otherwise omit)

Skills / Keywords (include as a compact section; truthful, no overclaim)
- Cloudflare Workers, D1 (SQLite), KV, R2
- TypeScript, Node.js, Python, SQL, Git/GitHub, CI/CD
- Next.js static export (if used)
- REST APIs, data ingestion, caching, data validation
- LLM-assisted and agentic development: Claude.ai, Claude Code, ChatGPT, Gemini, OpenAI Codex
- Product strategy, stakeholder communication, narrative reporting, dashboards/exports

Assets
- Add a /public directory containing:
  - resume PDF (Austin_Humphrey_Resume_Executive_Final.pdf)
  - resume JPEG (Austin_Humphrey_Resume_Executive_Final.jpg)
  - resume HTML (Austin_Humphrey_Resume_Executive_Final.html)
  - headshot image (use the provided headshot file I will add later; for now wire the code to load /public/headshot.jpg and clearly document where to drop it)
Important: do not invent new images; just structure the site to accept them.

Build + deploy
- Provide a Cloudflare Pages-ready build:
  - If plain HTML: no build step required.
  - If Next.js: next build && next export output to /out and include a pages deployment note.
- Include:
  - README.md with setup, local dev, and Cloudflare Pages deploy steps.
  - Basic SEO: title, description, OpenGraph tags.
  - A sitemap.xml and robots.txt.
- Add a simple GitHub Actions workflow that runs lint/build (if applicable) on PRs.

Deliverables in this PR
- Complete repo structure and code for the site
- Polished UI matching the brand direction
- Resume page that is print-friendly and links to the PDF/JPEG/HTML artifacts
- Clear instructions for how I set the custom domain AustinHumphrey.com in Cloudflare Pages

After the PR is created, provide a short checklist for me to review: visual pass, link pass, and deploy steps.
