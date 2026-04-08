# CLAUDE.md — austinhumphrey.com

Personal portfolio site for Austin Humphrey. Deployed to Cloudflare Pages at `austinhumphrey.com`.

## Stack

- **React 18** + **TypeScript** + **Vite 5**
- **Tailwind CSS 3** (utility-first, dark-only palette)
- **Framer Motion** (scroll-triggered animations, hero entrance, parallax, chat widget, mobile menu)

No R3F, Three.js, GSAP, Lenis. Bundle: ~218KB JS (66KB gzipped).

## Commands

```bash
npm run dev          # Vite dev server (localhost:5173)
npm run build        # tsc + vite build → dist/
npm run preview      # Serve production build locally
npm run deploy       # npx wrangler pages deploy dist --project-name austin-humphrey-professional-resume-portfolio --branch main
```

## Architecture

```
src/
  main.tsx                    # Entry point — StrictMode + App
  App.tsx                     # Root layout: ErrorBoundary → Nav → 13 sections → Footer → widgets
  index.css                   # Tailwind layers, dark-only CSS vars, film grain, component styles
  content/
    site.ts                   # All site content — hero, nav, projects, contact, footer, BSI stats
    concierge.ts              # AI chat widget content — 19 conversation paths, time-aware greeting
  components/
    Navigation.tsx            # Glass-on-scroll nav, section counter, IntersectionObserver, mobile menu with focus trap
    Hero.tsx                  # Photo-backed hero with parallax, Ken Burns zoom, grain overlay, staggered entrance, proof bar
    Projects.tsx              # Featured + supporting project cards with real screenshots and live badges
    Proof.tsx                 # Editorial pieces with reading times, speaking reel with poster, podcast CTA
    BSIShowcase.tsx           # Platform deep-dive — screenshot in browser frame, animated stats, live health, tech stack
    InfraProof.tsx            # "What One Person Built" data wall — 6 animated counters, health ping, dot grid bg
    AthleticArc.tsx           # Photo gallery with hover caption overlays, horizontal mobile scroll with edge fade
    About.tsx                 # Origin narrative — Texas soil story, birth documents, photo cards, blockquote
    Experience.tsx            # Timeline with colored dots, tech tags per role, hover glow
    Skills.tsx                # 5-column competency grid — Languages, Frameworks, Infrastructure, Tools, Domain
    Education.tsx             # 3 cards with focus tags, active badge on AI/ML program, gradient accent lines
    Currently.tsx             # 4 active work items with pulsing dots
    Philosophy.tsx            # Texas covenant with Crockett quote, animated underline, diamond accents
    Contact.tsx               # 5 channel cards with gradient borders + form with validation, character counter, Turnstile
    Footer.tsx                # Link groups, Cloudflare badge, View Source link, tech pills, last updated
    ScrollToTop.tsx           # Scroll-to-top button, appears after 800px scroll
    DevPanel.tsx              # Hidden dev panel (press backtick) showing site architecture stats + load time
    PlatformStatus.tsx        # Live BSI health indicator (polls /api/health)
    AIChatWidget.tsx          # Lazy-loaded FAB with Claude Haiku streaming + 19 local fallback paths
    ErrorBoundary.tsx         # React error boundary with branded fallback
  hooks/
    useAnimatedCounter.ts     # IntersectionObserver-triggered count animation (0 to target, ease-out cubic)
    useKonamiCode.ts          # Konami code listener triggers Easter egg
    useScrollDepth.ts         # PostHog scroll depth tracking (25/50/75/100%)
    usePlatformHealth.ts      # Shared singleton health poller (useSyncExternalStore)
    usePrefersReducedMotion.ts # Accessibility — respects reduced motion preference
  utils/
    animations.ts             # Framer Motion variants (stagger, fadeIn), EASE_OUT_EXPO
    analytics.ts              # PostHog analytics helpers
```

## Design System

### Palette (dark-only)

| Token | Hex | Usage |
|-------|-----|-------|
| `midnight` | `#0D0D0D` | Primary background |
| `charcoal` | `#1A1A1A` | Secondary background |
| `bone` | `#F5F0EB` | Primary text |
| `warm-gray` | `#A89F95` | Muted text |
| `burnt-orange` | `#BF5700` | Primary accent |
| `ember` | `#FF6B35` | Gradient accent |
| `texas-soil` | `#8B4513` | Secondary accent |

### Fonts (self-hosted, preloaded)

| Role | Family | Usage |
|------|--------|-------|
| Headings | Oswald (uppercase, 600) | `font-sans` |
| Body | Cormorant Garamond | `font-serif` (17px/1.65) |
| Labels / Code | JetBrains Mono | `font-mono` |
| Editorial leads | Libre Baskerville | `font-display` |

## Sections (13 total)

Hero, Projects, Proof, BSI Showcase, Infrastructure, Athletic Arc, Origin, Experience, Skills, Education, Currently, Covenant, Contact

## Hidden Features

- Konami code Easter egg (up up down down left right left right B A)
- Dev panel (press backtick key) showing architecture stats + load time
- Scroll-to-top button (appears after 800px)
- Section counter in nav (e.g., "05/13")

## Deployment

- **Host:** Cloudflare Pages
- **Project:** `austin-humphrey-professional-resume-portfolio`
- **Domain:** `austinhumphrey.com`
- **Repo:** `github.com/ahump20/AustinHumphrey.com`

## Lighthouse Scores

- Best Practices: 100
- SEO: 100
- Accessibility: 96+

## Gotchas

- Repo lives on iCloud Drive — git operations can hang. Use `--no-verify` if hooks stall.
- `tsconfig.json` has `noUnusedLocals` and `noUnusedParameters` — clean up imports.
- PostHog type declaration only includes `capture` — use `capture` not `register`.
- Chat greeting computed at module load time (not reactive to time changes during session).
