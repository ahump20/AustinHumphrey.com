# CLAUDE.md — austinhumphrey.com

Personal portfolio site for Austin Humphrey. Deployed to Cloudflare Pages at `austinhumphrey.com`.

## Stack

- **React 18** + **TypeScript** + **Vite 5**
- **Tailwind CSS 3** (utility-first, dark-only palette)
- **Framer Motion** (nav animations, hero entrance, chat widget, mobile menu)
- **@heroicons/react** (icons)

No R3F, Three.js, GSAP, Lenis, or react-hot-toast. Bundle: ~297KB JS (95KB gzipped).

## Commands

```bash
npm run dev          # Vite dev server (localhost:5173)
npm run build        # tsc + vite build → dist/
npm run preview      # Serve production build locally
npm run deploy       # Build + wrangler pages deploy dist
```

## Architecture

```
src/
  main.tsx                    # Entry point — StrictMode + App
  App.tsx                     # Root — section layout, scroll routing
  index.css                   # Tailwind layers, dark-only CSS vars, section backgrounds, scroll animations
  components/
    Navigation.tsx            # Transparent → glass-on-scroll nav, IntersectionObserver active tracking
    Hero.tsx                  # Gradient mesh hero + marquee stats ticker + tagline
    BSIShowcase.tsx           # Platform narrative + stats + architecture + capabilities + tech stack
    Projects.tsx              # Featured + supporting project cards with live badges
    Proof.tsx                 # Editorial ledger + speaking reel video player
    About.tsx                 # Origin story — 2-col narrative + sticky sidebar facts + photos
    AthleticArc.tsx           # Photo gallery — staggered desktop grid, horizontal mobile scroll
    Experience.tsx            # Left-border timeline with company-colored dot markers
    Education.tsx             # 3-card grid (Full Sail, McCombs, UT Austin)
    Philosophy.tsx            # Texas covenant blockquote + animated underline close
    Contact.tsx               # Contact cards + form with Turnstile + Resend delivery
    Footer.tsx                # 4-col link grid + Cloudflare badge
    PlatformStatus.tsx        # Live BSI health indicator (polls /api/platform-health)
    AIChatWidget.tsx          # Claude Haiku concierge via SSE, keyword fallback offline
    ErrorBoundary.tsx         # Wraps entire app in App.tsx
  content/
    site.ts                   # All static content — nav items, stats, projects, contact channels
    concierge.ts              # Chat widget greeting, suggested prompts, fallback responses
  hooks/
    usePrefersReducedMotion.ts  # Accessibility — disables motion when reduced motion preferred
    usePlatformHealth.ts        # Singleton health poller via useSyncExternalStore
  utils/
    animations.ts             # Framer Motion variants — stagger, fadeInRight, easing
functions/
  api/
    chat.ts                   # Claude Haiku SSE streaming for concierge widget
    contact.ts                # Contact form delivery via Resend + Turnstile validation
    platform-health.ts        # Same-origin proxy for BSI health endpoint
```

## Design System

### Palette (dark-only, source of truth: `tailwind.config.js`)

| Token | Hex | Usage |
|-------|-----|-------|
| `midnight` | `#0D0D0D` | Primary background (`--color-bg`) |
| `charcoal` | `#1A1A1A` | Secondary background (`--color-bg-secondary`) |
| `bone` | `#F5F0EB` | Primary text (`--color-text`) |
| `warm-gray` | `#A89F95` | Muted text (`--color-text-muted`) |
| `burnt-orange` | `#BF5700` | Primary accent (`--color-accent`) |
| `texas-soil` | `#8B4513` | Secondary accent |
| `ember` | `#FF6B35` | Gradient accent |
| `sand` | `#F4EEE7` | Legacy alias for bone |

No light mode. No `data-theme` attribute. No ThemeToggle.

### Fonts

| Role | Family | Usage |
|------|--------|-------|
| Headings | Oswald (uppercase, 600 weight) | `font-sans` |
| Body | Cormorant Garamond | `font-serif` |
| Section labels / Code | JetBrains Mono | `font-mono` |

### Design Patterns

- **Section labels**: `// The Origin` — JetBrains Mono, 0.65rem, tracking 0.35em, burnt-orange
- **Section titles**: Oswald 600, `clamp(2rem, 4vw, 3rem)`, uppercase
- **Cards**: `rgba(26,26,26,0.6)` bg, `rgba(245,240,235,0.04)` border, hover lifts
- **Timeline**: left 1px gradient line, 9px burnt-orange dots with glow shadow
- **Buttons**: `btn-primary` (filled) + `btn-outline` (border), Oswald 500, 0.75rem
### Animation

- Framer Motion for nav `layoutId`, hero entrance, `AnimatePresence` (mobile menu, chat widget)
- Scroll-triggered `whileInView` stagger reveals on all sections (variants in `animations.ts`)
- Easing: `ease-out-expo` → `cubic-bezier(0.19, 1, 0.22, 1)`
- Hero respects `prefers-reduced-motion` via `usePrefersReducedMotion` hook
- CSS `marquee` animation on hero stats ticker, disabled on reduced-motion

## Deployment

- **Host:** Cloudflare Pages
- **Project:** `austin-humphrey-professional-resume-portfolio`
- **Domain:** `austinhumphrey.com`
- **Deploy:** `npm run deploy` or `npx wrangler pages deploy dist --project-name austin-humphrey-professional-resume-portfolio --branch main`

## Conventions

- Files: kebab-case
- Components: PascalCase
- Functions: camelCase, verb-first
- Constants: SCREAMING_SNAKE
- Commits: `type(scope): description`

## Performance

- Bundle: ~255KB main JS + ~142KB framer-motion chunk + ~10KB lazy chat widget (~130KB total gzipped)
- Zero WebGL — gradient mesh hero, no SecurityError risk
- Scroll animations: Framer Motion `whileInView` with `once: true` (fires once per section)
- Self-hosted fonts with `font-display: swap` and hero font preloads

## Gotchas

- Repo lives on iCloud Drive — git operations can hang. Use `--no-verify` if hooks stall. Remove stale `.git/index.lock` if git hangs.
- `tsconfig.json` has `noUnusedLocals` and `noUnusedParameters` — clean up imports.
- `ErrorBoundary.tsx` wraps the entire app in `App.tsx`.
