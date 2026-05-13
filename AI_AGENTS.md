# AI_AGENTS.md — CivicTools (Frontend)

## Project Overview
CivicTools is a **tool-first web platform** focused on simple, high-utility public data tools.

Current tool:
- Permit Cost + Process Tool

Planned tools:
- Property Tax Estimator
- Others in same pattern

This is **NOT a content/blog site**. Every page should be **tool-driven and actionable**.

---

## Tech Stack
- React (Vite)
- JSX only (NO TypeScript)
- Material UI (MUI)
- No Tailwind
- No backend (for now)
- Data source: local JSON

---

## Core Principles

### 1. Tool > Content
- UI must prioritize input → output
- No long paragraphs above the tool
- User should get result in <5 seconds

---

### 2. Speed + Simplicity
- Minimal components
- No unnecessary state
- No over-engineering
- Prefer readable code over abstraction

---

### 3. JSON-Driven
All data comes from JSON:
- Cities
- Permit types
- Fee structures
- Steps
- Timeline

Structure must allow easy expansion:
- Add new city without code change
- Add new project type without UI rewrite

---

### 4. SEO via Pages (not blogs)
- Each page = specific intent
- Example routes:
  - /permit-cost-san-jose-deck
  - /permit-cost-fresno-adu

Pages should:
- Load correct JSON
- Pre-fill form
- Show results immediately if possible

---

### 5. Reusable Components
Build once, reuse everywhere:

Required components:
- Navbar
- PermitForm
- ResultsCard
- BreakdownList
- StepsList
- TimelineBox
- Disclaimer
- ToolsPreviewSection

---

### 6. Clean UX
- No clutter
- Clear hierarchy
- Mobile-first
- Large readable numbers for results
- Fast interaction

---

### 7. Future Expansion
Design must support:
- Multiple tools under same UI
- “All Tools” navigation
- Shared layout

DO NOT hardcode “permit-only” assumptions.

---

## Data Shape (Example)

```json
{
  "SanJose": {
    "deck": {
      "base_fee": 200,
      "rate": 0.01,
      "steps": ["Submit plans", "Review", "Pay fees", "Inspection"],
      "timeline": "10-20 days"
    }
  }
}

## Versioning

This project follows the two-level versioning convention canonical
to the portfolio (see `sites/portfolio/AI_AGENTS.md` for the full
statement):

- **`vN`** — major capability tier (SemVer-MAJOR semantics).
- **`vN.X`** — phase letter within a tier (A, B, C, …) for
  internal slicing.
- **`vN.X.Y`** — numeric sub-phase for follow-up work that lands
  after `vN.X` shipped.

Track current phase + completed work in `docs/prd.md`.

## Building info

This project's `Makefile` forwards every target to `../Makefile`
(the sites/ workspace) which delegates per-stack work to the central
builder at `~/work/projects/builder/`. Common: `make deps`, `make dev`,
`make build`. Don't duplicate build logic per-site.

## Deployment info

Cloudflare Pages. Push to `main` triggers an auto-build via the
`wrangler.jsonc` config; build output is `dist/`. Custom domain
configured via the CF Pages dashboard.

