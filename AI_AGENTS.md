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
