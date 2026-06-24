# Portfolio Elevation — Step‑by‑Step Plan

Branch: `feat/portfolio-elevation` → PR (no merge until owner approves).

Objective: transform an already‑solid portfolio into one that makes international
recruiters and senior engineers think *"found my frontend developer."* Keep EN/PT
and dark/light. Fix layout/perf bugs. Build, test, commit, push, open PR.

## Phase 0 — Recon & setup ✅
- Read CV, every section, data file, hook and config.
- Create branch, baseline `npm run build`.
- Write `PORTFOLIO_RULES.md`, this plan, and `TASKS.md`.

## Phase 1 — Design tokens & latent bug fixes
- Add missing `--card` / `--card-foreground` tokens (currently `bg-card` is a no‑op
  → cards render with no surface fill). Register them in Tailwind.
- Introduce a proper `--accent` indigo token for both themes for highlights.
- Tighten light‑mode contrast where needed.

## Phase 2 — Content truth (CV sync, bilingual)
- Update hero/intro copy: 5+ years, sharper positioning.
- Add **PropAI OS** as the flagship project (rich modal details, full stack).
- Extend tech‑icon map (Redis, Docker, Turborepo, Better Auth, BullMQ…).

## Phase 3 — Signature "wow" sections (the differentiators)
- **Hero upgrade:** animated aurora/gradient field, availability badge, rotating
  role line, primary CTA + "Download CV", scroll cue. Reduced‑motion safe.
- **Animated stats strip:** count‑up credibility metrics (years, tables,
  endpoints, tests, projects). Bilingual, theme‑aware, IntersectionObserver‑driven.
- **Tech marquee:** infinite, pausable logo river of the real stack.
- **Featured project spotlight:** PropAI OS hero card above the grid.

## Phase 4 — Polish, performance, a11y
- next/image audit, lazy boundaries, no CLS.
- Metadata/SEO: better title/description/OG, JSON‑LD person schema.
- Focus states, aria, contrast pass in all 4 modes (theme × locale).
- Add CV PDF to `/public` for download.

## Phase 5 — Verify & ship
- `npm run build` + `npm run lint` green.
- Manual matrix: {light, dark} × {EN, PT} × {desktop, mobile}.
- Conventional commits, push, open PR with a clear summary. **Do not merge.**

## Working principles
- Small, reviewable commits per task.
- Never regress existing animations/i18n/theming.
- Every new string in both languages; every new color in both themes.
