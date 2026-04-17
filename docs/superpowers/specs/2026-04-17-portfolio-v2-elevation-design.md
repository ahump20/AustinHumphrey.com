# AustinHumphrey.com — V2 Elevation Design Spec

**Date:** 2026-04-17
**Branch:** `feat/v2-broadsheet-sports-editorial`
**Status:** Approved — proceeding to implementation plan

---

## Context

V1 ("book-jacket editorial") shipped on 2026-04-17 and immediately flagged by Austin as:

- Broken primary button (burnt-orange text on burnt-orange background — invisible)
- Mislabeled ("Founder & Builder") — Austin explicitly not positioning as founder
- Literary affect in copy, not his real voice
- Insufficient graphic design complexity and brand boldness
- Not reading as a professional portfolio

The v1 voice was my projection ("Builder of sports intelligence. Writer of systems. Reader of games. Raised on Memphis clay…") — not Austin's real voice. Austin pointed me at his actual writing archive:
`github.com/ahump20/Austin-Writing---Communication-Style-Archive`

The archive revealed a codified voice system (10 characteristics, rhythm engine, vocabulary, anti-patterns) that V1 violated extensively.

## The Brand / Experience Firewall (Non-Negotiable)

Every line on the site must respect this boundary. Visitor must walk away with:

| Entity | Framing |
|---|---|
| **Austin Humphrey** | A builder/writer/strategist with real professional experience and formal credentials. Pursuing opportunities. |
| **Blaze Sports Intel** | A passion project he built and maintains solo. Demonstrates his skills. NOT a formally founded company. NOT a startup he runs. |
| **Professional Experience** | Spectrum Reach (Ad Account Executive, 2022–2025) + Northwestern Mutual (Financial Representative, 2020–2022, Top 10% nationally — "Power of 10" Award) |
| **AI Practice** | Two years hands-on with Claude, Gemini, ChatGPT. Formal postgrad at UT Austin McCombs in progress. |
| **Education** | B.A. UT Austin (2020), M.S. Full Sail Entertainment Business — Sports Management (Feb 2026), UT Austin McCombs AI/ML Postgrad (in progress) |

**Banned above the fold:** "Founder", "CEO", "Founded Blaze Sports Intel", "Running BSI", "operator" (too founder-adjacent).

**Required above the fold:** BSI explicitly labeled "passion project" once in the lede. Clear separation between Austin's career roles (Builder / Writer / Strategist) and the passion project that demonstrates them.

## Positioning (approved)

**Hero:**

```
AUSTIN HUMPHREY

Builder. Writer. Strategist.
Sports intelligence · Entertainment business · Applied AI

Four years of professional experience across advertising strategy and
financial advising. Two years hands-on with Claude, Gemini, and ChatGPT.
One sports intelligence platform — Blaze Sports Intel — built and
maintained solo as a passion project. Grounded in Boerne, Texas.
```

**Portrait colophon (replaces v1 Role/Program/Formed):**

| BASED | EXPERIENCE | PASSION PROJECT | AI PRACTICE |
|---|---|---|---|
| Boerne, Texas | Spectrum Reach · Northwestern Mutual | Blaze Sports Intel | Claude · Gemini · ChatGPT |

## Aesthetic Direction — Broadsheet Sports Editorial

**Archetype:** Asymmetric sports-weekend magazine with newspaper-masthead bones. Graphic-dense, photo-rich, declarative.

### Typography

| Role | Family | Notes |
|---|---|---|
| Display / Reading | **Fraunces** (variable, opsz 9–144, wght 300–800, SOFT + WONK axes) | Retained from v1; used more aggressively with larger scale, tighter tracking, bolder hierarchy |
| Metadata / Small Caps / Tabular / Data | **JetBrains Mono** | Kickers, datelines, stats, stamps, timeline labels, stat tables |

Two-typeface-max rule held. JetBrains Mono with `tabular-nums` handles all stat/timeline display; no third font added. Rationale: editorial rigor demands restraint, and Fraunces + Mono is a signature pairing that differentiates AustinHumphrey.com from BSI's product voice.

### Color

Dual-ground carries forward (paper + ink) but with burnt-orange as a **structural force**, not a restrained accent.

**Tokens (editorial.css):**
- `--paper` `#ECE3D2` — ivory for long-reading passages only
- `--ink-ground` `#0B0908` — warm black for proof plates, photo essays, index sections
- `--accent-burnt` `#BF5700` — primary — color-blocks, stamps, thick horizontal rules, stat numerals, section-head backgrounds
- `--accent-ember` `#E86A2D` — secondary — hover states, subtle highlights
- `--accent-emerald` `#1F4D46` — tertiary — used sparingly to differentiate from BSI's pure-burnt brand; reserved for "Current Status" badges or similar signal indicators
- `--accent-bone` `#F5F0EB` — type on ink
- `--ink-mute` `#6B5F52` — secondary text on paper
- `--bone-mute` `#B8AFA4` — secondary text on ink

### Graphic Devices (the "graphic design complexity" Austin asked for)

1. **Masthead top rule** — Thick burnt-orange rule with tick marks, edition stamp ("VOL. I · 2026"), dateline
2. **Orange color-block section heads** — Full-width burnt-orange band containing section numeral (Roman) + title in Fraunces white + mono subhead — replaces v1's thin chapter rules
3. **Big stat call-outs** — Fraunces display numeral (e.g., "2 YEARS", "3 DISCIPLINES") with mono kicker beneath, set in pairs/trios
4. **Stamps** — Rectangular burnt-orange stamps with mono uppercase text ("STATUS · BUILDING" / "PASSION PROJECT" / "ACTIVE")
5. **Full-bleed photo plates** — Athletic Arc, origin, portrait treatments — edge-to-edge with bottom caption strip in mono
6. **Pull quotes with LARGE decorative quote marks** — Burnt-orange "❝" glyph sized ~6rem as graphic anchor
7. **Numbered work index** — Bold sequential numerals (01–10) paired with work titles, tabular layout
8. **Experience timeline** — Horizontal rule with year ticks, each role as a labeled node
9. **Three-axis discipline cards** — Three graphic cards (Sports Intelligence / Entertainment Business / Applied AI), each with its own orange bar, brief description, proof links
10. **Polaroid photo treatment** — Used sparingly on personal photos (athletic arc, origin), contrasted with full-bleed magazine plates

### Density

Higher than v1. Editorial magazines are dense, not sparse. Visitor should see multiple signal elements per viewport — stamp, numeral, pull quote, photo — not empty white space. Premium comes from precision, not from restraint alone.

## Section Architecture (10 sections)

| # | Section | Ground | Purpose |
|---|---|---|---|
| 1 | **Hero — Masthead** | Paper | Name, three-role subhead, positioning lede, portrait, firewalled colophon |
| 2 | **The Three Axes** | Ink | Three discipline cards — Sports Intelligence, Entertainment Business, Applied AI. Each with proof links. |
| 3 | **Professional Experience** | Ink | Spectrum Reach + Northwestern Mutual timeline, with specific accomplishments ("Top 10% — Power of 10 Award"). Listed FIRST to firewall against BSI. |
| 4 | **Passion Project: Blaze Sports Intel** | Ink (photo plate) | Explicitly labeled passion project. What it is, what was built, links out. No founder language. |
| 5 | **Applied AI Practice** | Ink | Two years hands-on, tools named, patterns deployed, postgrad noted |
| 6 | **Published Writing + Speaking** | Paper | Editorial samples, speaking reel, link to writing archive |
| 7 | **Athletic Background** | Ink (photo plate) | Brief, grounded — Boerne-Champion three varsity sports, ESPN moment, coaching lineage |
| 8 | **Origin** | Paper | Memphis birth, Texas soil ritual, 127-year tradition, Longhorn legacy, Blaze the dog — concise, from verified archive material |
| 9 | **Education** | Paper | UT Austin BA (2020), Full Sail M.S. (Feb 2026), UT Austin McCombs AI/ML (in progress) |
| 10 | **Correspondence** | Ink | Contact — letter format, all channels (email, LinkedIn, X, GitHub) |

## Copy Voice Rules (from voice archive)

Every string rewritten against these rules:

1. **First sentence does work.** No warm-up, no throat-clearing.
2. **Declarative.** Claim first, evidence in service. One hedge max.
3. **Concrete over abstract.** Numbers, places, names, mechanisms.
4. **First analogy is always sports.**
5. **Anchor → Expand → Drive rhythm.** Short → long → medium.
6. **Compressed syntax.** Semicolons, em-dashes, colons pack density.
7. **Vision over grievance.** Show the work, don't complain about the absence.
8. **Dual posture.** Critical and affectionate simultaneously.
9. **Physical objects as anchors.** Name the thing that holds the feeling.
10. **Endings widen the lens forward.** No backward-looking summaries.

**Banned vocabulary:** synergy, paradigm shift, game-changer, disruptive, innovative (unless defined), passion (as substitute for specifics), impactful, stakeholder alignment, best-in-class, revolutionary, cutting-edge, next-level, world-class.

**Preferred transitions:** the former, the latter, in actuality, in effect, despite this, therefore, regardless.

## Engineering Plan (high level)

1. **Emergency fixes in the same push as v2:**
   - `.btn-editorial` + `.btn-editorial-solid` excluded from global `a:not(...)` color override that made text invisible
   - "Founder & Builder" string removed from all portrait colophons, meta tags, and noscript fallback

2. **New components:**
   - `Masthead.tsx` — replaces v1 Navigation (editorial top rule + dateline + chapter tabs)
   - `HeroMasthead.tsx` — replaces v1 Hero (bold typography hero with firewalled positioning + stat call-outs + colophon)
   - `DisciplineAxes.tsx` — three-card block for Sports Intel / Entertainment Business / Applied AI
   - `ProfessionalExperience.tsx` — timeline with Spectrum Reach + NW Mutual (new component, replaces v1 Experience)
   - `PassionProjectBSI.tsx` — rebuilt BSI Showcase with firewall language and photo plate
   - `AppliedAI.tsx` — AI practice section (new)
   - `SectionStamp.tsx` — reusable orange stamp component
   - `StatCallout.tsx` — big Fraunces numeral + mono kicker component
   - `PullQuote.tsx` — pull quote with large decorative quote mark
   - `SectionBar.tsx` — full-width burnt-orange color-block section header

3. **Retained + lightly adapted:**
   - `Proof.tsx` — published writing
   - `AthleticArc.tsx` — photo plates
   - `About.tsx` — origin story
   - `Education.tsx`
   - `Contact.tsx` — relabeled as Correspondence
   - `Footer.tsx`

4. **Typography + token updates:**
   - Extend `editorial.css` with graphic-device utilities (stamps, section-bars, stat-callouts, pull-quote, polaroid)
   - Update `tailwind.config.js` with new color-block utilities
   - Fix global `a:not(...)` color selector to include `.btn-editorial` + `.btn-editorial-solid` exclusions (v1 button bug)

5. **Verification:**
   - Playwright headless screenshots at 1440/900 desktop, 390/844 mobile
   - Confirm (a) no 404s, (b) no console errors, (c) CTA text visible, (d) no "Founder" string anywhere, (e) "passion project" phrase present in above-fold copy
   - Deploy to Cloudflare Pages preview first, screenshot live URL, then promote to main only after visual verification

6. **No mock data, no fabrication, no manufactured freshness** — per CLAUDE.md doctrine

## Scope Exclusions (Explicit YAGNI)

- Full rebuild of `AIChatWidget` — keep lazy-loaded, style adapted
- New data-fetching — no backend changes
- Analytics refactor — keep PostHog event names
- Complete responsive overhaul beyond 1440 + 390 — tablet (768) handled via existing grid breakpoints
- Dark/light mode toggle — single paper+ink rhythm is intentional

## Acceptance Criteria

- [ ] No "Founder" / "CEO" / "founded" / "running" language anywhere on the site
- [ ] "Passion project" phrase appears above the fold in the lede
- [ ] "Turn to the Index" / other editorial CTAs render with visible text (not invisible orange-on-orange)
- [ ] Professional Experience section listed BEFORE BSI section
- [ ] Three-axis discipline cards visible in above-fold-or-immediately-below flow
- [ ] Every copy string audited against voice archive — zero banned vocabulary, declarative cadence
- [ ] Fraunces display + JetBrains Mono self-hosted, no CDN deps (two-typeface rule)
- [ ] Live at `austinhumphrey.com` with deploy verified via headless screenshot

## Changelog from V1

| Kept | Changed | Removed |
|---|---|---|
| Paper + ink dual ground | Burnt orange used aggressively as structural force (not decoration) | Literary voice / "Reader of games" flourish |
| Fraunces + Mono typography | Bolder hierarchy, larger display, tighter tracking | "Founder & Builder" label |
| SectionHeader component | Rebuilt with full-width orange color-block bars | Invisible orange-on-orange buttons |
| Chapter rhythm | Denser graphic devices (stamps, stat callouts, pull quotes) | Three-typeface minimalism (added Inter) |
| Vanity-metric strip | Three discipline cards explicit | "Volume I · 2026 Edition" masthead conceit |
| Anti-fabrication doctrine | Professional experience surfaced FIRST | BSI as primary identity |
