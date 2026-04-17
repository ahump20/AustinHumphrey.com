# Portfolio V2 — Broadsheet Sports Editorial Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a bolder, graphic-forward professional portfolio that surfaces Austin's real voice (from his writing archive), firewalls his professional experience from BSI (passion project, not a formally-founded company), and fixes the v1 invisible-button + "Founder & Builder" bugs.

**Architecture:** React + Vite + Tailwind + Framer Motion single-page portfolio. Paper/ink dual ground inherited from V1. Burnt orange promoted from accent to structural design force — color-block section heads, thick horizontal rules, stat numerals, stamp backgrounds. New graphic-device primitives (SectionStamp, StatCallout, PullQuote, SectionBar) + rewritten hero + new DisciplineAxes / ProfessionalExperience / AppliedAI sections + firewalled PassionProjectBSI.

**Tech Stack:** React 18 · Vite 5 · TypeScript · Tailwind CSS 3 · Framer Motion · Cloudflare Pages (wrangler) · Playwright (headless verification) · JetBrains Mono + Fraunces (self-hosted woff2)

**Branch:** `feat/v2-broadsheet-sports-editorial` (already created)

---

## File Structure

**New files:**
- `src/components/primitives/SectionStamp.tsx` — reusable burnt-orange stamp (role: graphic badge)
- `src/components/primitives/StatCallout.tsx` — big Fraunces numeral + mono kicker (role: stat display)
- `src/components/primitives/PullQuote.tsx` — pull quote with large burnt-orange quote glyph
- `src/components/primitives/SectionBar.tsx` — full-width orange color-block section header
- `src/components/HeroMasthead.tsx` — replaces v1 Hero
- `src/components/DisciplineAxes.tsx` — three-card discipline block (new section)
- `src/components/ProfessionalExperience.tsx` — new section (Spectrum + NW Mutual timeline)
- `src/components/PassionProjectBSI.tsx` — replaces v1 BSIShowcase with firewall copy
- `src/components/AppliedAI.tsx` — new section (AI practice)

**Modified files:**
- `src/styles/editorial.css` — new graphic-device utilities, fix button link-color exclusion
- `src/index.css` — update `.btn-primary`/`.btn-outline` treatment
- `src/components/Navigation.tsx` — rebuilt as editorial masthead (already paper-ground; tighten)
- `src/components/About.tsx` — adapt origin copy to archive voice
- `src/components/Philosophy.tsx` — adapt covenant copy, fix tagline if wrong
- `src/content/site.ts` — rewrite all strings against voice archive rules, remove "Founder" references
- `src/App.tsx` — reorder sections per spec architecture
- `index.html` — update noscript + meta + schema.org to match firewall copy
- `tailwind.config.js` — verify new tokens expose correctly

**Deleted files:**
- `src/components/BSIShowcase.tsx` (replaced by PassionProjectBSI.tsx)
- `src/components/InfraProof.tsx` (merged into PassionProjectBSI, no vanity infrastructure counts)

**Retained as-is:**
- `src/components/Projects.tsx` → renamed contextually but kept
- `src/components/Proof.tsx`, `AthleticArc.tsx`, `Experience.tsx`, `Skills.tsx`, `Education.tsx`, `Currently.tsx`, `Contact.tsx`, `Footer.tsx`, `AIChatWidget.tsx`, `ErrorBoundary.tsx`, `DevPanel.tsx`, `ScrollToTop.tsx`, `PlatformStatus.tsx` — keep, let new tokens cascade through typography

---

## Verification Strategy

Frontend work, so TDD is replaced by **visual verification per task**:
1. Build compiles without error
2. Playwright headless screenshot at 1440×900 desktop and 390×844 mobile
3. Console error check — zero new errors beyond known localhost CORS
4. Firewall sweep — grep for banned strings before each commit

Preview-server at `http://localhost:4174` already running from v1 session; if stopped, restart with `npm run preview -- --port 4174`.

---

### Task 1: Hotfix — exclude editorial buttons from global link-color override

**Files:**
- Modify: `src/index.css` (around line 286-290)
- Modify: `src/styles/editorial.css` (bottom — add specificity boost)

Root cause: `a:not(.btn-primary):not(.btn-outline):not(.skip-link):...` in index.css was missing `.btn-editorial` and `.btn-editorial-solid`. So the editorial buttons got `color: var(--color-accent)` (burnt orange) applied, which equaled the `--accent-burnt` background on the solid variant → invisible text.

- [ ] **Step 1: Update the exclusion selector in `src/index.css`**

Locate (around line 286):
```css
a:not(.btn-primary):not(.btn-outline):not(.skip-link):not([class*="group"]):not([class*="nav"]):not([class*="card"]):not([class*="text-bone"]) {
    color: var(--color-accent);
```

Replace with:
```css
a:not(.btn-primary):not(.btn-outline):not(.btn-editorial):not(.btn-editorial-solid):not(.skip-link):not([class*="group"]):not([class*="nav"]):not([class*="card"]):not([class*="text-bone"]):not([class*="ed-"]) {
    color: var(--color-accent);
```

Also update the `:hover` selector on the following lines with the same exclusions.

- [ ] **Step 2: Add specificity-safe color lock to `src/styles/editorial.css`**

Append at the bottom:
```css
/* Specificity guard — ensures editorial button text is always legible
   regardless of ancestor selector weight elsewhere in the cascade. */
a.btn-editorial-solid,
a.btn-editorial-solid:hover,
a.btn-editorial-solid:focus {
  color: var(--paper) !important;
}
a.btn-editorial,
a.btn-editorial:hover,
a.btn-editorial:focus {
  color: inherit !important;
}
```

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: `✓ built in ...s` with no CSS errors.

- [ ] **Step 4: Restart preview + visual verify**

Run: `curl -sI http://localhost:4174/ || (npm run preview -- --port 4174 &) && sleep 3`
Then: `node /tmp/shot.mjs` (reuse existing screenshot script)
Expected: `/tmp/austinhumphrey-desktop.png` shows "TURN TO THE INDEX" text visible on the orange button.

- [ ] **Step 5: Commit**

```bash
git add src/index.css src/styles/editorial.css
git commit -m "fix(buttons): exclude editorial buttons from global link-color override

V1 shipped with invisible CTA — .btn-editorial-solid rendered burnt-orange
text on burnt-orange background because the generic a:not(...) rule in
index.css applied var(--color-accent) to it. Add explicit :not()
exclusions and a specificity-guarded !important lock so text always
reads.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 2: Expand editorial.css with V2 graphic-device utilities

**Files:**
- Modify: `src/styles/editorial.css` (append new utility section)

- [ ] **Step 1: Append new utilities at the bottom of `src/styles/editorial.css`**

Append (full block):
```css
/* ══════════════════════════════════════════════════════════════
   V2 GRAPHIC DEVICES — color blocks, stamps, stat callouts,
   pull quotes, polaroid photo treatment, section bars
   ══════════════════════════════════════════════════════════════ */

/* ── Full-width burnt-orange section bar ── */
.section-bar {
  background: var(--accent-burnt);
  color: var(--paper);
  padding: 1.75rem clamp(1.5rem, 5vw, 4rem);
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 2rem;
  border-top: 3px solid var(--ink-strong);
  border-bottom: 3px solid var(--ink-strong);
  position: relative;
}
.section-bar__numeral {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  font-weight: 500;
  opacity: 0.85;
}
.section-bar__title {
  font-family: 'Fraunces', Georgia, serif;
  font-variation-settings: 'opsz' 96, 'SOFT' 30;
  font-weight: 500;
  font-size: clamp(1.5rem, 3.5vw, 2.5rem);
  letter-spacing: -0.01em;
  line-height: 1.05;
}
.section-bar__title em {
  font-style: italic;
  font-variation-settings: 'opsz' 96, 'SOFT' 80, 'WONK' 1;
}
.section-bar__kicker {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  opacity: 0.75;
  white-space: nowrap;
}
@media (max-width: 640px) {
  .section-bar { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
  .section-bar__kicker { white-space: normal; }
}

/* ── Burnt-orange stamp (rotated slightly, badge-like) ── */
.stamp {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 0.9rem;
  background: var(--accent-burnt);
  color: var(--paper);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  font-weight: 600;
  border: 2px solid var(--ink-strong);
  position: relative;
}
.stamp--rotated {
  transform: rotate(-2deg);
}
.stamp--outline {
  background: transparent;
  color: var(--accent-burnt);
  border-color: var(--accent-burnt);
}
.stamp__dot {
  width: 6px;
  height: 6px;
  background: currentColor;
  border-radius: 50%;
  display: inline-block;
}
.ink-ground .stamp--outline { color: var(--accent-ember); border-color: var(--accent-ember); }

/* ── Stat callout (big Fraunces numeral + mono kicker) ── */
.stat-callout {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}
.stat-callout__value {
  font-family: 'Fraunces', Georgia, serif;
  font-variation-settings: 'opsz' 144, 'SOFT' 30, 'WONK' 0;
  font-weight: 500;
  font-size: clamp(3rem, 6vw, 5rem);
  line-height: 0.92;
  letter-spacing: -0.02em;
  color: var(--accent-burnt);
  font-variant-numeric: tabular-nums;
}
.stat-callout__label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  font-weight: 500;
  color: var(--ink-mute);
}
.ink-ground .stat-callout__label { color: var(--bone-mute); }
.stat-callout--ink .stat-callout__value { color: var(--bone); }
.stat-callout--emerald .stat-callout__value { color: var(--accent-emerald); }

/* ── Pull quote with decorative orange quote glyph ── */
.pull-quote-v2 {
  position: relative;
  padding: 2rem 0 2rem 4rem;
  margin: 3rem 0;
}
.pull-quote-v2::before {
  content: '"';
  position: absolute;
  top: -1rem;
  left: 0;
  font-family: 'Fraunces', Georgia, serif;
  font-variation-settings: 'opsz' 144, 'SOFT' 100, 'WONK' 1';
  font-style: italic;
  font-weight: 500;
  font-size: 7rem;
  line-height: 1;
  color: var(--accent-burnt);
  opacity: 0.95;
}
.pull-quote-v2__text {
  font-family: 'Fraunces', Georgia, serif;
  font-variation-settings: 'opsz' 48, 'SOFT' 40;
  font-style: italic;
  font-weight: 400;
  font-size: clamp(1.35rem, 2.8vw, 1.85rem);
  line-height: 1.38;
  letter-spacing: -0.005em;
  max-width: 52ch;
}
.pull-quote-v2__cite {
  display: block;
  margin-top: 1.25rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.68rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  font-style: normal;
  color: var(--ink-mute);
}
.ink-ground .pull-quote-v2__cite { color: var(--bone-mute); }

/* ── Polaroid photo card (personal photo treatment) ── */
.polaroid-v2 {
  background: var(--paper);
  padding: 0.65rem 0.65rem 1.75rem 0.65rem;
  box-shadow:
    0 2px 6px rgba(15, 10, 5, 0.25),
    0 12px 28px -8px rgba(15, 10, 5, 0.35),
    0 1px 0 rgba(255, 255, 255, 0.4) inset;
  position: relative;
  transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1);
}
.polaroid-v2--rotated { transform: rotate(-1.5deg); }
.polaroid-v2 img { width: 100%; height: auto; display: block; }
.polaroid-v2__caption {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink-mute);
  margin-top: 0.75rem;
  text-align: center;
}

/* ── Three-axis card (discipline card for Sports / Ent. Biz / AI) ── */
.axis-card {
  background: var(--ink-ground-elev);
  border: 1px solid var(--ink-ground-margin);
  padding: 2rem 2rem 2.5rem;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: border-color 0.3s ease, transform 0.3s ease;
}
.axis-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: var(--accent-burnt);
}
.axis-card:hover {
  border-color: rgba(232, 106, 45, 0.4);
  transform: translateY(-2px);
}
.axis-card__numeral {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--accent-ember);
  font-weight: 500;
}
.axis-card__title {
  font-family: 'Fraunces', Georgia, serif;
  font-variation-settings: 'opsz' 48, 'SOFT' 30;
  font-weight: 500;
  font-size: 1.75rem;
  line-height: 1.08;
  letter-spacing: -0.01em;
  color: var(--bone);
}
.axis-card__desc {
  font-family: 'Fraunces', Georgia, serif;
  font-variation-settings: 'opsz' 14;
  font-size: 1rem;
  line-height: 1.55;
  color: var(--bone-mute);
}
.axis-card__proof {
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid var(--ink-ground-margin);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--accent-ember);
}

/* ── Timeline rule + nodes (Professional Experience) ── */
.timeline {
  position: relative;
  padding-left: 2rem;
}
.timeline::before {
  content: '';
  position: absolute;
  left: 0.4rem;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--accent-burnt);
  opacity: 0.8;
}
.timeline-node {
  position: relative;
  margin-bottom: 3rem;
}
.timeline-node::before {
  content: '';
  position: absolute;
  left: -1.85rem;
  top: 0.3rem;
  width: 1rem;
  height: 1rem;
  background: var(--accent-burnt);
  border: 2px solid var(--ink-ground);
  border-radius: 0;
  transform: rotate(45deg);
}
.timeline-node__years {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.68rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--accent-ember);
  font-weight: 500;
  margin-bottom: 0.35rem;
}
.timeline-node__role {
  font-family: 'Fraunces', Georgia, serif;
  font-variation-settings: 'opsz' 32, 'SOFT' 30;
  font-size: 1.35rem;
  font-weight: 500;
  line-height: 1.15;
  color: var(--bone);
  margin-bottom: 0.2rem;
}
.timeline-node__employer {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--bone-mute);
  margin-bottom: 0.8rem;
}
.timeline-node__body {
  font-family: 'Fraunces', Georgia, serif;
  font-variation-settings: 'opsz' 14;
  font-size: 1rem;
  line-height: 1.55;
  color: var(--bone-mute);
  max-width: 52ch;
}
.timeline-node__accolade {
  display: inline-block;
  margin-top: 0.75rem;
  padding: 0.3rem 0.65rem;
  background: rgba(191, 87, 0, 0.15);
  border: 1px solid var(--accent-burnt);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent-ember);
  font-weight: 500;
}

/* ── Masthead rule (newspaper-style top bar) ── */
.masthead-rule {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.65rem clamp(1.5rem, 5vw, 4rem);
  border-top: 6px solid var(--accent-burnt);
  border-bottom: 1px solid var(--margin-rule);
  background: var(--paper);
}
.masthead-rule__volume {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--ink-mute);
  font-weight: 500;
}
.masthead-rule__rule {
  flex: 1;
  height: 1px;
  background: var(--margin-rule);
}
.masthead-rule__date {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--ink-mute);
  font-weight: 500;
}
```

- [ ] **Step 2: Build + verify no CSS warnings**

Run: `npm run build 2>&1 | tail -5`
Expected: clean build, no "@import must precede" warning.

- [ ] **Step 3: Commit**

```bash
git add src/styles/editorial.css
git commit -m "feat(tokens): add V2 graphic devices — section bars, stamps, stat callouts, pull quotes, timeline, polaroid, axis cards, masthead rule

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 3: Create primitive components (SectionStamp, StatCallout, PullQuote, SectionBar)

**Files:**
- Create: `src/components/primitives/SectionStamp.tsx`
- Create: `src/components/primitives/StatCallout.tsx`
- Create: `src/components/primitives/PullQuote.tsx`
- Create: `src/components/primitives/SectionBar.tsx`

- [ ] **Step 1: Create `src/components/primitives/SectionStamp.tsx`**

```tsx
import { ReactNode } from 'react';

type Variant = 'solid' | 'outline';

type Props = {
  children: ReactNode;
  variant?: Variant;
  rotated?: boolean;
  withDot?: boolean;
  className?: string;
};

export default function SectionStamp({
  children,
  variant = 'solid',
  rotated = false,
  withDot = false,
  className = '',
}: Props) {
  const cls = [
    'stamp',
    variant === 'outline' ? 'stamp--outline' : '',
    rotated ? 'stamp--rotated' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <span className={cls}>
      {withDot && <span className="stamp__dot" aria-hidden />}
      {children}
    </span>
  );
}
```

- [ ] **Step 2: Create `src/components/primitives/StatCallout.tsx`**

```tsx
type Variant = 'burnt' | 'ink' | 'emerald';

type Props = {
  value: string;
  label: string;
  variant?: Variant;
};

export default function StatCallout({ value, label, variant = 'burnt' }: Props) {
  const extra = variant === 'ink' ? 'stat-callout--ink' : variant === 'emerald' ? 'stat-callout--emerald' : '';
  return (
    <div className={`stat-callout ${extra}`}>
      <span className="stat-callout__value tabular-figs">{value}</span>
      <span className="stat-callout__label">{label}</span>
    </div>
  );
}
```

- [ ] **Step 3: Create `src/components/primitives/PullQuote.tsx`**

```tsx
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  cite?: string;
};

export default function PullQuote({ children, cite }: Props) {
  return (
    <blockquote className="pull-quote-v2">
      <p className="pull-quote-v2__text">{children}</p>
      {cite ? <cite className="pull-quote-v2__cite">{cite}</cite> : null}
    </blockquote>
  );
}
```

- [ ] **Step 4: Create `src/components/primitives/SectionBar.tsx`**

```tsx
import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { EASE_OUT_EXPO } from '../../utils/animations';

type Props = {
  numeral: string;
  title: ReactNode;
  kicker?: string;
};

export default function SectionBar({ numeral, title, kicker }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
      className="section-bar"
    >
      <span className="section-bar__numeral">{numeral}</span>
      <h2 className="section-bar__title">{title}</h2>
      {kicker ? <span className="section-bar__kicker">{kicker}</span> : null}
    </motion.div>
  );
}
```

- [ ] **Step 5: Build + verify**

Run: `npm run build 2>&1 | tail -5`
Expected: build succeeds, 4 new TS modules compiled.

- [ ] **Step 6: Commit**

```bash
git add src/components/primitives/
git commit -m "feat(primitives): add SectionStamp, StatCallout, PullQuote, SectionBar graphic primitives

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 4: Rewrite Hero as HeroMasthead with firewalled positioning

**Files:**
- Create: `src/components/HeroMasthead.tsx`
- Modify: `src/App.tsx` (replace `<Hero />` with `<HeroMasthead />`)
- Modify: `src/content/site.ts` (add `HERO_V2` constants)

- [ ] **Step 1: Add HERO_V2 content to `src/content/site.ts`**

Append after `RESUME_PATH`:
```ts
export const HERO_V2 = {
  dateline: 'Volume One · Portfolio Edition · Boerne, Texas',
  roles: ['Builder', 'Writer', 'Strategist'] as const,
  disciplines: 'Sports intelligence · Entertainment business · Applied AI',
  lede:
    'Four years of professional experience across advertising strategy and financial advising. Two years hands-on with Claude, Gemini, and ChatGPT. One sports intelligence platform — Blaze Sports Intel — built and maintained solo as a passion project.',
  kickerStat: [
    { value: '4', label: 'Years Professional' },
    { value: '2', label: 'Years Applied AI' },
    { value: '3', label: 'Active Disciplines' },
  ] as const,
  colophon: [
    { label: 'Based', value: 'Boerne, Texas' },
    { label: 'Experience', value: 'Spectrum Reach · Northwestern Mutual' },
    { label: 'Passion Project', value: 'Blaze Sports Intel' },
    { label: 'AI Practice', value: 'Claude · Gemini · ChatGPT' },
  ] as const,
};
```

- [ ] **Step 2: Create `src/components/HeroMasthead.tsx`**

```tsx
import { motion } from 'framer-motion';
import { EASE_OUT_EXPO } from '../utils/animations';
import { HERO_V2, RESUME_PATH } from '../content/site';
import SectionStamp from './primitives/SectionStamp';
import StatCallout from './primitives/StatCallout';

export default function HeroMasthead() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="paper-ground relative overflow-hidden"
    >
      {/* Newspaper-masthead top rule */}
      <div className="masthead-rule">
        <span className="masthead-rule__volume">{HERO_V2.dateline}</span>
        <span className="masthead-rule__rule" />
        <span className="masthead-rule__date">Updated 2026</span>
      </div>

      <div className="relative z-10 ed-section ed-container pt-10 md:pt-16">
        <div className="ed-grid-asymmetric items-start">

          {/* ── LEFT — Nameplate, roles, subhead, lede, CTAs ── */}
          <div className="flex flex-col">
            {/* Status stamp row */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05, ease: EASE_OUT_EXPO }}
              className="flex items-center gap-3 mb-8 flex-wrap"
            >
              <SectionStamp variant="solid" withDot>Status · Building</SectionStamp>
              <SectionStamp variant="outline">Open to Opportunities</SectionStamp>
            </motion.div>

            {/* Nameplate */}
            <motion.h1
              id="hero-heading"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.18, ease: EASE_OUT_EXPO }}
              className="ed-display mb-6"
              style={{
                color: 'var(--ink-strong)',
                fontSize: 'clamp(3.75rem, 10.5vw, 8rem)',
                fontWeight: 500,
                lineHeight: 0.95,
                letterSpacing: '-0.02em',
              }}
            >
              <span style={{ display: 'block', whiteSpace: 'nowrap' }}>Austin</span>
              <span
                style={{
                  display: 'block',
                  whiteSpace: 'nowrap',
                  fontStyle: 'italic',
                  fontVariationSettings: '"opsz" 144, "SOFT" 100, "WONK" 1',
                  color: 'var(--accent-burnt)',
                  marginTop: '-0.06em',
                }}
              >
                Humphrey
              </span>
            </motion.h1>

            {/* Three-role line */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: EASE_OUT_EXPO }}
              className="mb-3"
              style={{
                fontFamily: 'Fraunces, Georgia, serif',
                fontVariationSettings: '"opsz" 32, "SOFT" 30',
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: 600,
                color: 'var(--ink-strong)',
                letterSpacing: '-0.01em',
              }}
            >
              {HERO_V2.roles.join(' · ')}
            </motion.p>

            {/* Disciplines */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: EASE_OUT_EXPO }}
              className="ed-kicker mb-8"
              style={{ fontSize: '0.78rem' }}
            >
              {HERO_V2.disciplines}
            </motion.p>

            {/* Lede */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: EASE_OUT_EXPO }}
              className="mb-10"
              style={{
                fontFamily: 'Fraunces, Georgia, serif',
                fontVariationSettings: '"opsz" 18',
                fontSize: '1.1rem',
                lineHeight: 1.55,
                color: 'var(--ink)',
                maxWidth: '56ch',
              }}
            >
              {HERO_V2.lede}
            </motion.p>

            {/* Stat callouts trio */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65, ease: EASE_OUT_EXPO }}
              className="grid grid-cols-3 gap-4 mb-10 pb-8"
              style={{ borderBottom: '1px solid var(--margin-rule)' }}
            >
              {HERO_V2.kickerStat.map((s) => (
                <StatCallout key={s.label} value={s.value} label={s.label} />
              ))}
            </motion.div>

            {/* CTA pair */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8, ease: EASE_OUT_EXPO }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <a
                href="#experience"
                onClick={() => window.posthog?.capture('hero_cta_clicked', { cta: 'experience' })}
                className="btn-editorial-solid ed-focus"
              >
                See the Experience
                <span aria-hidden style={{ marginLeft: 2 }}>→</span>
              </a>
              <a
                href={RESUME_PATH}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => window.posthog?.capture('hero_cta_clicked', { cta: 'resume' })}
                className="btn-editorial ed-focus"
                style={{ color: 'var(--ink)' }}
              >
                Curriculum Vitae
                <span aria-hidden style={{ marginLeft: 2 }}>↗</span>
              </a>
            </motion.div>
          </div>

          {/* ── RIGHT — Portrait + colophon quad ── */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.3, ease: EASE_OUT_EXPO }}
            className="relative"
          >
            <figure className="editorial-figure m-0">
              <div className="portrait-frame" style={{ aspectRatio: '4 / 5' }}>
                <img
                  src="/assets/austin-headshot.webp"
                  alt="Austin Humphrey, portrait"
                  className="ed-portrait-breathe"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
              <figcaption className="mt-4">
                Plate I &nbsp;·&nbsp; Humphrey, Boerne, Texas &nbsp;·&nbsp; 2026
              </figcaption>
            </figure>

            {/* Colophon quad */}
            <div
              className="grid grid-cols-2 gap-6 mt-8 pt-6"
              style={{ borderTop: '1px solid var(--margin-rule)' }}
            >
              {HERO_V2.colophon.map((item) => (
                <div key={item.label}>
                  <p className="dateline mb-1" style={{ fontSize: '0.62rem' }}>{item.label}</p>
                  <p
                    style={{
                      fontFamily: 'Fraunces, Georgia, serif',
                      fontVariationSettings: '"opsz" 18, "SOFT" 20',
                      fontSize: '0.95rem',
                      fontWeight: 500,
                      color: 'var(--ink)',
                      lineHeight: 1.35,
                    }}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Wire HeroMasthead into `src/App.tsx`**

Replace `import Hero from './components/Hero';` with:
```tsx
import HeroMasthead from './components/HeroMasthead';
```

Replace `<Hero />` with `<HeroMasthead />`.

- [ ] **Step 4: Build + visual verify**

Run: `npm run build && node /tmp/shot.mjs`
Read: `/tmp/austinhumphrey-desktop.png` + `/tmp/austinhumphrey-mobile.png`
Expected: Name reads "Austin / Humphrey" with no mid-word wrap. Stamps visible above name. Stat callouts visible. CTAs have legible text.

- [ ] **Step 5: Grep firewall — confirm no "Founder" anywhere**

Run:
```bash
grep -rn -iE "founder|founded|ceo" src/ public/ index.html 2>&1 | grep -v node_modules | grep -v ".woff2"
```
Expected: No matches in Hero or content files.

- [ ] **Step 6: Commit**

```bash
git add src/components/HeroMasthead.tsx src/App.tsx src/content/site.ts
git commit -m "feat(hero): HeroMasthead with firewalled positioning

Replaces v1 Hero. Nameplate + three-role line (Builder/Writer/Strategist) +
disciplines line + lede explicitly labels BSI a 'passion project' to
firewall it from professional experience (Spectrum, NW Mutual). Stat
callouts trio (4 years prof / 2 years AI / 3 disciplines) and two-stamp
status row (Building · Open to Opportunities). Colophon quad below
portrait (Based / Experience / Passion Project / AI Practice).

No 'Founder' or 'CEO' language anywhere.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 5: DisciplineAxes — three-card block (Sports Intel / Ent. Biz / Applied AI)

**Files:**
- Create: `src/components/DisciplineAxes.tsx`
- Modify: `src/App.tsx` (insert after HeroMasthead, before current section-divider)
- Modify: `src/content/site.ts` (add `DISCIPLINE_AXES` constant)

- [ ] **Step 1: Add content to `src/content/site.ts`**

Append:
```ts
export const DISCIPLINE_AXES = [
  {
    numeral: '01',
    title: 'Sports Intelligence',
    desc: 'Solo-built production platform covering MLB, NFL, NCAA football, NBA, and Division I college baseball. Real-time ingestion pipelines, AI-assisted forecasting, mobile-first dashboards, end-to-end on Cloudflare. The work that demonstrates the craft.',
    proofLabel: 'See the platform',
    proofHref: '#bsi',
  },
  {
    numeral: '02',
    title: 'Entertainment Business',
    desc: 'M.S. in Entertainment Business — Sports Management, Full Sail University (Feb 2026, 3.56 GPA). Twelve MBA-adjacent courses covering leadership, marketing, finance, legal, and operations — applied to sports industry strategy.',
    proofLabel: 'See the coursework',
    proofHref: '#education',
  },
  {
    numeral: '03',
    title: 'Applied AI',
    desc: 'Two years hands-on with Claude, Gemini, and ChatGPT. Deployed systems, not demos — sports data ingestion pipelines, editorial workflows, agentic prompting patterns. Formal grounding via UT Austin McCombs AI/ML postgrad (in progress).',
    proofLabel: 'See the AI practice',
    proofHref: '#ai-practice',
  },
] as const;
```

- [ ] **Step 2: Create `src/components/DisciplineAxes.tsx`**

```tsx
import { motion } from 'framer-motion';
import { EASE_OUT_EXPO } from '../utils/animations';
import { DISCIPLINE_AXES } from '../content/site';
import SectionBar from './primitives/SectionBar';

export default function DisciplineAxes() {
  return (
    <section
      id="disciplines"
      aria-labelledby="disciplines-heading"
      className="ink-ground"
    >
      <SectionBar
        numeral="Chapter I"
        title={<>The Three <em>Axes</em></>}
        kicker="Sports Intelligence · Ent. Business · Applied AI"
      />

      <div className="ed-section ed-container">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          id="disciplines-heading"
          className="ed-lede mb-12"
          style={{ color: 'var(--bone)', maxWidth: '62ch' }}
        >
          Three disciplines, one builder. Each axis has live experience, formal
          credentials, and deployed work — the portfolio stacks proof under
          each one, not claims on top of it.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {DISCIPLINE_AXES.map((axis, i) => (
            <motion.div
              key={axis.numeral}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: EASE_OUT_EXPO }}
              className="axis-card"
            >
              <span className="axis-card__numeral">Axis {axis.numeral}</span>
              <h3 className="axis-card__title">{axis.title}</h3>
              <p className="axis-card__desc">{axis.desc}</p>
              <a href={axis.proofHref} className="axis-card__proof ed-link ed-focus">
                {axis.proofLabel} →
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Wire into `src/App.tsx`**

Add import after HeroMasthead:
```tsx
import DisciplineAxes from './components/DisciplineAxes';
```

Insert after `<div className="paper-to-ink-seam" />` and before `<Projects />`:
```tsx
<DisciplineAxes />
<div className="section-divider" />
```

- [ ] **Step 4: Build + verify**

Run: `npm run build && node /tmp/shot.mjs`
Expected: page now has orange section-bar header "Chapter I — The Three Axes" after the hero seam, followed by three dark discipline cards.

- [ ] **Step 5: Commit**

```bash
git add src/components/DisciplineAxes.tsx src/App.tsx src/content/site.ts
git commit -m "feat(sections): DisciplineAxes — three-card block for Sports Intel, Ent. Biz, Applied AI

Establishes the three-pillar framing above the fold (below hero). Each
card has its own numeral, title, description, and proof link.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 6: ProfessionalExperience — Spectrum Reach + Northwestern Mutual timeline

**Files:**
- Create: `src/components/ProfessionalExperience.tsx`
- Modify: `src/App.tsx` (insert after DisciplineAxes)
- Modify: `src/content/site.ts` (add `PROFESSIONAL_EXPERIENCE` constant)

- [ ] **Step 1: Add content to `src/content/site.ts`**

Append:
```ts
export const PROFESSIONAL_EXPERIENCE = [
  {
    years: '2022 – 2025',
    role: 'Advertising Account Executive',
    employer: 'Spectrum Reach · Austin, TX',
    body:
      'Data-informed advertising strategies across linear TV, OTT/CTV, streaming, and digital for local and regional clients. Translated campaign performance into insights that drove renewals and strategic upsells. Three years translating numbers into decisions.',
    accolade: null as string | null,
  },
  {
    years: '2020 – 2022',
    role: 'Financial Representative',
    employer: 'Northwestern Mutual · San Antonio, TX',
    body:
      'Top-5 intern program. Converted to full-time advising role. Comprehensive financial plans through structured modeling, prospecting discipline, and consultative client relationships.',
    accolade: 'Power of 10 · Top 10% Nationally',
  },
] as const;
```

- [ ] **Step 2: Create `src/components/ProfessionalExperience.tsx`**

```tsx
import { motion } from 'framer-motion';
import { EASE_OUT_EXPO } from '../utils/animations';
import { PROFESSIONAL_EXPERIENCE } from '../content/site';
import SectionBar from './primitives/SectionBar';

export default function ProfessionalExperience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="ink-ground"
    >
      <SectionBar
        numeral="Chapter II"
        title={<>Professional <em>Experience</em></>}
        kicker="Real Roles · Real Results"
      />

      <div className="ed-section ed-container">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          id="experience-heading"
          className="ed-lede mb-10"
          style={{ color: 'var(--bone)', maxWidth: '56ch' }}
        >
          Four years of client-facing revenue work. Advertising strategy that
          moved campaign decisions; financial planning that moved household
          outcomes. The discipline translates.
        </motion.p>

        <div className="timeline">
          {PROFESSIONAL_EXPERIENCE.map((node, i) => (
            <motion.article
              key={node.employer}
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.12, ease: EASE_OUT_EXPO }}
              className="timeline-node"
            >
              <p className="timeline-node__years">{node.years}</p>
              <h3 className="timeline-node__role">{node.role}</h3>
              <p className="timeline-node__employer">{node.employer}</p>
              <p className="timeline-node__body">{node.body}</p>
              {node.accolade ? (
                <span className="timeline-node__accolade">{node.accolade}</span>
              ) : null}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Wire into `src/App.tsx`**

Add import:
```tsx
import ProfessionalExperience from './components/ProfessionalExperience';
```

Insert `<ProfessionalExperience />` + `<div className="section-divider" />` after DisciplineAxes.

Also REMOVE the existing `<Experience />` section elsewhere in App.tsx — ProfessionalExperience replaces it (the old Experience.tsx is the generic version). Keep the import for a moment to avoid breaking other refs; we'll retire it in Task 12.

- [ ] **Step 4: Build + verify**

Run: `npm run build`
Expected: clean.

- [ ] **Step 5: Commit**

```bash
git add src/components/ProfessionalExperience.tsx src/App.tsx src/content/site.ts
git commit -m "feat(sections): ProfessionalExperience — Spectrum + NW Mutual timeline

Surfaces real professional experience (not BSI) FIRST so the firewall
is clearly legible. Lists Spectrum Reach (Ad Account Executive,
2022–2025) and Northwestern Mutual (Financial Representative,
2020–2022) with the Power of 10 accolade.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 7: PassionProjectBSI — replace BSIShowcase with firewalled framing

**Files:**
- Create: `src/components/PassionProjectBSI.tsx`
- Modify: `src/App.tsx` (replace `<BSIShowcase />` with `<PassionProjectBSI />`)
- Modify: `src/content/site.ts` (update `BSI_SHOWCASE` copy if needed)

- [ ] **Step 1: Create `src/components/PassionProjectBSI.tsx`**

```tsx
import { motion } from 'framer-motion';
import { EASE_OUT_EXPO } from '../utils/animations';
import SectionBar from './primitives/SectionBar';
import SectionStamp from './primitives/SectionStamp';
import StatCallout from './primitives/StatCallout';

export default function PassionProjectBSI() {
  return (
    <section
      id="bsi"
      aria-labelledby="bsi-heading"
      className="ink-ground"
    >
      <SectionBar
        numeral="Chapter III"
        title={<>Passion Project · <em>Blaze Sports Intel</em></>}
        kicker="Solo Build · 2023 – Present"
      />

      <div className="ed-section ed-container">
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <SectionStamp variant="solid" withDot>Passion Project</SectionStamp>
          <SectionStamp variant="outline">Active Build</SectionStamp>
          <SectionStamp variant="outline">Not a Company</SectionStamp>
        </div>

        <motion.h3
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          id="bsi-heading"
          className="mb-5"
          style={{
            fontFamily: 'Fraunces, Georgia, serif',
            fontVariationSettings: '"opsz" 72, "SOFT" 30',
            fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
            fontWeight: 500,
            lineHeight: 1.05,
            letterSpacing: '-0.015em',
            color: 'var(--bone)',
            maxWidth: '24ch',
          }}
        >
          Sports intelligence for the markets the coverage gap leaves behind.
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT_EXPO }}
          className="ed-body mb-8"
          style={{ color: 'var(--bone-mute)', maxWidth: '62ch' }}
        >
          Blaze Sports Intel is a passion project — a sports intelligence
          platform built and maintained solo on Cloudflare since 2023. Live
          scores, park-adjusted sabermetrics, and original editorial across
          MLB, NFL, NCAA football, NBA, and Division I college baseball. It
          covers the athletes, programs, and markets that mainstream media
          reliably skips. Not a founded company. Not a startup. A working
          demonstration of what the three disciplines above produce when they
          meet real data and real deadlines.
        </motion.p>

        {/* Real numbers, not vanity metrics */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 py-8 mb-8"
          style={{ borderTop: '1px solid var(--ink-ground-margin)', borderBottom: '1px solid var(--ink-ground-margin)' }}
        >
          <StatCallout value="5" label="Leagues Covered" variant="burnt" />
          <StatCallout value="2023" label="Year Started" variant="burnt" />
          <StatCallout value="Solo" label="Team Size" variant="emerald" />
          <StatCallout value="CF" label="Stack · Cloudflare" variant="burnt" />
        </div>

        {/* Outbound */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="https://blazesportsintel.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-editorial-solid ed-focus"
            onClick={() => window.posthog?.capture('bsi_cta_clicked', { cta: 'visit_platform' })}
          >
            Visit the Platform
            <span aria-hidden style={{ marginLeft: 2 }}>↗</span>
          </a>
          <a
            href="https://github.com/Blaze-sports-Intel/bsi"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-editorial ed-focus"
            style={{ color: 'var(--bone)' }}
            onClick={() => window.posthog?.capture('bsi_cta_clicked', { cta: 'github' })}
          >
            Source on GitHub
            <span aria-hidden style={{ marginLeft: 2 }}>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire into `src/App.tsx`**

Replace `import BSIShowcase from './components/BSIShowcase';` with:
```tsx
import PassionProjectBSI from './components/PassionProjectBSI';
```

Replace `<BSIShowcase />` with `<PassionProjectBSI />`.

- [ ] **Step 3: Build + firewall sweep**

```bash
npm run build && grep -rniE "founder|founded|ceo" src/components/PassionProjectBSI.tsx
```
Expected: build clean, grep returns no matches.

- [ ] **Step 4: Commit**

```bash
git add src/components/PassionProjectBSI.tsx src/App.tsx
git commit -m "feat(sections): PassionProjectBSI — firewalled BSI section

Replaces BSIShowcase. Explicit 'Passion Project' / 'Not a Company'
stamps. Copy names BSI as solo-built since 2023, covering markets the
mainstream skips. No 'founder' language anywhere. Real numbers only
(5 leagues, 2023, solo, CF stack) — no vanity metrics.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 8: AppliedAI — new section for AI practice

**Files:**
- Create: `src/components/AppliedAI.tsx`
- Modify: `src/App.tsx` (insert before Proof)

- [ ] **Step 1: Create `src/components/AppliedAI.tsx`**

```tsx
import { motion } from 'framer-motion';
import { EASE_OUT_EXPO } from '../utils/animations';
import SectionBar from './primitives/SectionBar';
import SectionStamp from './primitives/SectionStamp';
import StatCallout from './primitives/StatCallout';

const AI_PATTERNS = [
  { label: 'Agentic Workflows', desc: 'Claude Code sub-agents, skill systems, slash commands, MCP integration.' },
  { label: 'Editorial Pipelines', desc: 'Draft → audit → polish loops for sports analysis.' },
  { label: 'Forecasting Modules', desc: 'LLM-in-the-loop sports projections, sourced from real-time data.' },
  { label: 'Prompt Systems', desc: 'Reusable voice profiles, scoring rubrics, instruction hierarchies.' },
];

export default function AppliedAI() {
  return (
    <section
      id="ai-practice"
      aria-labelledby="ai-heading"
      className="ink-ground"
    >
      <SectionBar
        numeral="Chapter IV"
        title={<>Applied <em>AI Practice</em></>}
        kicker="Two Years Hands-On · Not Demos"
      />

      <div className="ed-section ed-container">
        <div className="flex items-center gap-3 mb-8 flex-wrap">
          <SectionStamp variant="solid" withDot>Claude</SectionStamp>
          <SectionStamp variant="outline">Gemini</SectionStamp>
          <SectionStamp variant="outline">ChatGPT</SectionStamp>
          <SectionStamp variant="outline">McCombs AI/ML (In Progress)</SectionStamp>
        </div>

        <motion.h3
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          id="ai-heading"
          className="mb-5"
          style={{
            fontFamily: 'Fraunces, Georgia, serif',
            fontVariationSettings: '"opsz" 72, "SOFT" 30',
            fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
            fontWeight: 500,
            lineHeight: 1.05,
            letterSpacing: '-0.015em',
            color: 'var(--bone)',
            maxWidth: '22ch',
          }}
        >
          Deployed systems, not demos.
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT_EXPO }}
          className="ed-body mb-10"
          style={{ color: 'var(--bone-mute)', maxWidth: '62ch' }}
        >
          Two years of hands-on work with Claude, Gemini, and ChatGPT — building
          sports data ingestion pipelines, editorial workflows, and agentic
          prompting patterns that actually run in production. Formal grounding
          via UT Austin McCombs AI/ML postgraduate coursework (in progress).
          The work matters more than the stack; the stack matters because it
          ships results.
        </motion.p>

        <div className="grid grid-cols-3 gap-6 mb-12 py-8" style={{ borderTop: '1px solid var(--ink-ground-margin)', borderBottom: '1px solid var(--ink-ground-margin)' }}>
          <StatCallout value="2" label="Years Hands-On" variant="burnt" />
          <StatCallout value="3" label="Primary Stacks" variant="burnt" />
          <StatCallout value="∞" label="Prompt Iterations" variant="emerald" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {AI_PATTERNS.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.05 * i, ease: EASE_OUT_EXPO }}
              className="axis-card"
              style={{ padding: '1.5rem 1.5rem 1.75rem' }}
            >
              <p className="axis-card__numeral">Pattern {String(i + 1).padStart(2, '0')}</p>
              <h4 className="axis-card__title" style={{ fontSize: '1.25rem' }}>{p.label}</h4>
              <p className="axis-card__desc" style={{ fontSize: '0.95rem' }}>{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire into `src/App.tsx`**

Add import:
```tsx
import AppliedAI from './components/AppliedAI';
```

Insert `<AppliedAI />` between PassionProjectBSI and Proof.

- [ ] **Step 3: Build + verify**

Run: `npm run build`
Expected: clean.

- [ ] **Step 4: Commit**

```bash
git add src/components/AppliedAI.tsx src/App.tsx
git commit -m "feat(sections): AppliedAI — two-year AI practice section

Explicit AI skill + experience pillar. Stamps name the three stacks
(Claude, Gemini, ChatGPT) + McCombs postgrad. Four pattern cards
describe actual deployed work — agentic workflows, editorial
pipelines, forecasting modules, prompt systems.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 9: Rebuild Navigation as tighter editorial masthead

**Files:**
- Modify: `src/components/Navigation.tsx`

- [ ] **Step 1: Update NAV_ITEMS in `src/content/site.ts`** (if not already matching new section IDs)

Find `NAV_ITEMS` and set:
```ts
export const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'disciplines', label: 'Axes' },
  { id: 'experience', label: 'Experience' },
  { id: 'bsi', label: 'BSI' },
  { id: 'ai-practice', label: 'AI' },
  { id: 'proof', label: 'Proof' },
  { id: 'origin', label: 'Origin' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
] as const;
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: no TS errors (Navigation already consumes NAV_ITEMS).

- [ ] **Step 3: Visual verify**

Run: `node /tmp/shot.mjs`
Expected: Nav shows new labels — Home / Axes / Experience / BSI / AI / Proof / Origin / Education / Contact.

- [ ] **Step 4: Commit**

```bash
git add src/content/site.ts
git commit -m "feat(nav): update NAV_ITEMS for V2 section architecture"
```

---

### Task 10: Rewrite content/site.ts copy against voice archive

**Files:**
- Modify: `src/content/site.ts` (all strings)

- [ ] **Step 1: Read current file**

Read `src/content/site.ts` to see all existing strings.

- [ ] **Step 2: Replace the flagship project description**

Find:
```ts
description:
  'Live scores, park-adjusted sabermetrics, and original editorial covering sports outside the coastal spotlight. College baseball across every D1 program. Built solo on Cloudflare, end to end.',
```

Replace with voice-archive-aligned copy:
```ts
description:
  'Solo build on Cloudflare since 2023. Live scores, park-adjusted sabermetrics, and original editorial across MLB, NFL, NCAA football, NBA, and Division I college baseball. The platform covers the markets mainstream media reliably skips — a working answer to the coverage gap, not a complaint about it.',
```

- [ ] **Step 3: Update the BSI_SHOWCASE stats to reflect firewalled reality**

Find:
```ts
stats: [
  { value: 'MLB', label: 'Professional Baseball' },
  { value: 'NFL', label: 'Professional Football' },
  { value: 'NBA', label: 'Professional Basketball' },
  { value: 'D1', label: 'College Baseball · Football · Basketball' },
],
```

Keep as-is (no vanity, good).

- [ ] **Step 4: Grep for "Sports Intelligence Architect" or other stale titles and replace**

Run:
```bash
grep -rn "Sports Intelligence Architect\|Six-league\|six-league\|Architect" src/ public/ index.html
```

Expected findings: index.html meta og:title + noscript + schema.org. Replace occurrences of "Sports Intelligence Architect" with "Builder · Writer · Strategist" or remove if stale.

Specific edits:
- In `index.html`, `og:title`: change "Austin Humphrey: Sports Intelligence Architect" → "Austin Humphrey — Builder · Writer · Strategist"
- `twitter:title`: same change
- Schema.org JSON-LD `Person.jobTitle`: change "Sports Intelligence Architect" → "Builder, Writer, Strategist"

- [ ] **Step 5: Build + visual verify**

Run: `npm run build && node /tmp/shot.mjs`
Expected: page renders with refreshed copy.

- [ ] **Step 6: Commit**

```bash
git add src/content/site.ts index.html
git commit -m "copy: rewrite strings against voice archive

Replaces 'Sports Intelligence Architect' title (v1 stale) with the
three-role descriptor. BSI project description rewritten with
declarative cadence from voice archive — 'solo build on Cloudflare',
'vision over grievance' framing.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 11: Reorder App.tsx sections per V2 architecture

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Rewrite main section block**

Target section order (Hero is already first):
```
1. HeroMasthead
2. paper-to-ink-seam
3. DisciplineAxes
4. ProfessionalExperience
5. PassionProjectBSI
6. AppliedAI
7. Proof
8. AthleticArc
9. About (origin)
10. Philosophy (covenant)
11. Education
12. Contact
```

Sections being removed from the flow (they still exist as components but aren't rendered):
- `Projects` (replaced by DisciplineAxes covering same role)
- `InfraProof` (vanity metrics)
- `Experience` (replaced by ProfessionalExperience)
- `Skills` (redundant with axes + AI)
- `Currently` (folded into hero stamps)

Update the `<main>` block in App.tsx to the above order.

- [ ] **Step 2: Remove unused imports**

Delete imports for: `Projects`, `InfraProof`, `Experience`, `Skills`, `Currently` from App.tsx.

- [ ] **Step 3: Build + verify**

Run: `npm run build`
Expected: clean. Visit `node /tmp/shot.mjs` for fullpage screenshot.

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx
git commit -m "feat(arch): reorder sections per V2 spec

Order: HeroMasthead → DisciplineAxes → ProfessionalExperience
→ PassionProjectBSI → AppliedAI → Proof → AthleticArc → About
→ Philosophy → Education → Contact. Removes Projects, InfraProof,
Experience, Skills, Currently from render (still exist as components).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 12: Strip unused components + dead code

**Files:**
- Delete: `src/components/BSIShowcase.tsx`
- Delete: `src/components/InfraProof.tsx`
- Delete: `src/components/Experience.tsx`

(Skills, Currently, Projects remain for potential future use but are not imported — mark with a top-comment if kept)

- [ ] **Step 1: Delete the three superseded components**

Run:
```bash
git rm src/components/BSIShowcase.tsx src/components/InfraProof.tsx src/components/Experience.tsx
```

- [ ] **Step 2: Check for stale imports**

Run:
```bash
grep -rn "BSIShowcase\|InfraProof\|from './components/Experience'" src/
```
Expected: no matches.

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: clean.

- [ ] **Step 4: Commit**

```bash
git commit -m "chore: remove BSIShowcase, InfraProof, Experience (superseded by V2)"
```

---

### Task 13: Firewall + vanity sweep across codebase

**Files:**
- Potentially modify: `index.html`, `src/content/site.ts`, any component with stale "Founder"/"Architect"/vanity

- [ ] **Step 1: Grep for remaining "Founder" references**

```bash
grep -rniE "founder|ceo|founded" src/ public/ index.html 2>&1 | grep -v ".woff2" | grep -v "docs/"
```

Inspect each result. If it's in a rendered context, replace with firewalled language. If it's in a comment, OK to leave.

- [ ] **Step 2: Grep for "Sports Intelligence Architect"**

```bash
grep -rniE "sports intelligence architect|six-league|6-league|662 tests|330\+ D1" src/ public/ index.html
```

Replace every rendered occurrence.

- [ ] **Step 3: Build**

`npm run build`

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "fix(copy): firewall sweep — remove all Founder/Architect/vanity language

Audit pass across src/, public/, index.html. Replaces stale titles
(Sports Intelligence Architect) and vanity metrics (662 tests,
six-league) with firewalled language per V2 spec.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 14: Full-page playwright visual verification (preview)

**Files:** None (verification only)

- [ ] **Step 1: Ensure preview server running**

```bash
cd ~/AustinHumphrey.com && npm run build && (curl -sI http://localhost:4174/ > /dev/null || nohup npm run preview -- --port 4174 > /tmp/preview.log 2>&1 &) && sleep 3
```

- [ ] **Step 2: Run full-page screenshot script**

```bash
node /tmp/shot-full.mjs
```

(The script already exists from V1 session; if missing, recreate with sections: hero, disciplines, experience, bsi, ai-practice, proof, athletic-arc, origin, education, contact.)

- [ ] **Step 3: Read each section screenshot and verify**

For each screenshot, confirm:
- No "Founder" string visible
- No invisible buttons
- Hero shows Builder/Writer/Strategist roles
- BSI section has "Passion Project" stamp
- AI section names Claude/Gemini/ChatGPT
- ProfessionalExperience lists Spectrum + NW Mutual with Power of 10 accolade

- [ ] **Step 4: No commit (verification only)**

---

### Task 15: Deploy to Cloudflare Pages preview + live URL verification

**Files:** None

- [ ] **Step 1: Deploy preview**

```bash
cd ~/AustinHumphrey.com && npx wrangler pages deploy dist --project-name austin-humphrey-professional-resume-portfolio --branch feat-v2-broadsheet
```
Note the deployment URL from output.

- [ ] **Step 2: Screenshot live preview**

Update and run `/tmp/shot-live.mjs` with the new preview URL.

- [ ] **Step 3: Audit live page**

```bash
cat > /tmp/audit-live.mjs <<'EOF'
import { chromium } from '/Users/AustinHumphrey/AustinHumphrey.com/node_modules/playwright-core/index.mjs';
const browser = await chromium.launch();
const url = process.argv[2]; // pass as arg
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const errors = [], failed = [];
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
page.on('response', r => { if (r.status() === 404) failed.push(r.url()); });
await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(2000);
const text = await page.textContent('body');
const bannedStrings = ['Founder', 'founded', 'CEO', 'Sports Intelligence Architect'];
const present = bannedStrings.filter(s => text.includes(s));
console.log('404s:', failed.length ? failed : 'none');
console.log('console errors:', errors.length ? errors : 'none');
console.log('banned strings present:', present.length ? present : 'clean');
await browser.close();
EOF
node /tmp/audit-live.mjs <PREVIEW_URL>
```

Expected:
- 404s: none
- console errors: at most the known CORS warning on `/api/health`
- banned strings: clean

- [ ] **Step 4: Document result (no commit)**

---

### Task 16: Merge to main + production deploy + verify

**Files:** None

- [ ] **Step 1: Push branch**

```bash
cd ~/AustinHumphrey.com && git push -u origin feat/v2-broadsheet-sports-editorial
```

- [ ] **Step 2: Merge to main**

```bash
git checkout main && git pull && git merge --no-ff feat/v2-broadsheet-sports-editorial -m "Merge feat/v2-broadsheet-sports-editorial: bolder professional portfolio with firewalled positioning"
```

- [ ] **Step 3: Push main**

```bash
git push origin main
```

- [ ] **Step 4: Rebuild + deploy production**

```bash
npm run build && npx wrangler pages deploy dist --project-name austin-humphrey-professional-resume-portfolio --branch main
```

- [ ] **Step 5: Verify live custom domain**

```bash
sleep 6 && node /tmp/audit-live.mjs https://austinhumphrey.com/
```

Expected:
- 404s: none
- console errors: (CORS on `/api/health` is acceptable)
- banned strings: clean

Take final screenshots:
```bash
# Adapt /tmp/shot-prod.mjs URL to austinhumphrey.com
node /tmp/shot-prod.mjs
```

Read `/tmp/austinhumphrey-prod-desktop.png` and `/tmp/austinhumphrey-prod-mobile.png`. Confirm new hero, section bars, stamps all visible.

- [ ] **Step 6: Final commit-free verification report**

Summarize what shipped in the final response to Austin with the live URL.

---

## Self-Review

Checked against spec:

| Spec requirement | Task |
|---|---|
| Fix invisible button | Task 1 |
| Remove "Founder & Builder" | Task 4 (Hero rewrite), Task 13 (sweep) |
| Bolder graphic design (section bars, stamps, stat callouts, pull quotes) | Task 2 (utilities), Task 3 (primitives) |
| Firewalled positioning (BSI = passion project) | Task 4 (Hero), Task 7 (BSI section) |
| Professional Experience FIRST | Task 6 (ProfessionalExperience), Task 11 (App order) |
| Three-axis discipline cards | Task 5 (DisciplineAxes) |
| Applied AI section | Task 8 (AppliedAI) |
| Voice-archive copy | Task 10 (copy rewrite) |
| Two-typeface rule held | (implicit — no Inter added) |
| Real numbers, no vanity | Task 7 (BSI stats), Task 8 (AI stats), Task 13 (sweep) |
| Preview deploy + verify | Task 15 |
| Production deploy + verify | Task 16 |

No placeholders found. Type consistency verified — primitives exported default, imported default throughout.

Type/name consistency check:
- `SectionStamp` — used in HeroMasthead (Task 4), PassionProjectBSI (Task 7), AppliedAI (Task 8) ✓
- `SectionBar` — used in DisciplineAxes (Task 5), ProfessionalExperience (Task 6), PassionProjectBSI (Task 7), AppliedAI (Task 8) ✓
- `StatCallout` — used in HeroMasthead (Task 4), PassionProjectBSI (Task 7), AppliedAI (Task 8) ✓
- `HERO_V2`, `DISCIPLINE_AXES`, `PROFESSIONAL_EXPERIENCE` content constants — defined in Task 4/5/6, consumed by matching components ✓

---

## Execution Handoff

**Plan complete and saved to** `docs/superpowers/plans/2026-04-17-portfolio-v2-broadsheet-editorial.md`.

Auto mode is active — proceeding to **Inline Execution via superpowers:executing-plans**. Tasks will be executed in sequence with a screenshot/verification checkpoint at Tasks 4, 7, 8, 11, 14, 15, 16.
