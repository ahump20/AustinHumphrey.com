# Test Coverage Analysis

## Current State

The entire test suite is `tests/smoke.spec.ts` (55 lines) containing 6 Playwright E2E
tests. There is no unit or integration testing framework installed (no Vitest, Jest, etc.).

### Existing Tests

**UI Smoke Tests (5 tests):**

| Test                   | Assertion                                                  |
| ---------------------- | ---------------------------------------------------------- |
| Home page loads        | Title matches `/Austin Humphrey/i`, body contains the name |
| Resume page loads      | `body` is visible                                          |
| Work page loads        | `body` is visible                                          |
| Contact page loads     | `body` is visible                                          |
| Navigation links work  | Nav has >0 links; each internal link navigates             |

**API Smoke Tests (1 test):**

| Test             | Assertion                                                         |
| ---------------- | ----------------------------------------------------------------- |
| Health endpoint  | `/api/health` returns `{"status":"ok"}` (skipped if API is down)  |

### Key Gaps

- **No unit tests** for any module
- **No integration tests** for the Cloudflare Worker API
- **No data validation tests** for the resume content model
- **No component-level tests** for React pages
- **No CI/CD pipeline** running tests automatically

---

## Recommendations

### P0: Add Vitest

The project uses Vite, so Vitest is zero-config. This is a prerequisite for all
unit and integration tests below.

### P0: Worker API route tests (`worker/index.ts`)

The Worker has 4 routes with real validation logic. The contact form endpoint has
5 distinct error branches plus a success path — all untested.

Untested behavior:
- `POST /api/contact` — missing fields → 400
- `POST /api/contact` — non-string fields → 400
- `POST /api/contact` — invalid JSON body → 400
- `POST /api/contact` — invalid email format → 400
- `POST /api/contact` — successful submission with KV write
- `POST /api/contact` — behavior when KV namespace is unbound
- `GET /api/profile` — response shape and data correctness
- `GET /api/assets` — response shape and asset paths
- CORS — only configured origins are accepted

### P1: Strengthen existing E2E assertions

Three page tests (`/resume`, `/work`, `/contact`) only assert `body` is visible,
which passes on a blank page or error screen.

| Page       | Suggested assertions                                                |
| ---------- | ------------------------------------------------------------------- |
| `/resume`  | Section headings ("Experience", "Education", "Skills"), company names |
| `/work`    | Project names ("Blaze Sports Intel", "BlazeCraft.app"), links       |
| `/contact` | Email addresses, LinkedIn URL, location                             |

### P1: Resume data model tests (`src/content/resume.ts`)

The resume data is the single source of truth for the web UI, PDF generator, and
JSON export. Tests should verify:
- Required fields are present and non-empty
- Each experience entry has non-empty bullets
- Each education entry has required fields
- Emails match a valid format
- URLs are well-formed
- `skills` and `honorsAndLeadership` are non-empty

### P2: 404 / unknown route handling

No catch-all `*` route is defined in `src/main.tsx`. Either add a 404 page or
test that unknown routes don't crash.

### P2: Accessibility tests

Add `@axe-core/playwright` to verify semantic HTML, ARIA roles, and color contrast.

### P3: Cross-browser E2E

`playwright.config.ts` only tests Chromium. Add Firefox and/or WebKit projects.

### P3: Build pipeline tests

`scripts/export_resume.ts` exports resume data for PDF generation. No test verifies
the export produces valid JSON matching the expected schema.
