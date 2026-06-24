# Tasks — Portfolio Elevation

Checklist tracking the work on `feat/portfolio-elevation`. Each task is a small,
self‑contained commit. Keep EN/PT + dark/light intact for every one.

## Setup
- [x] T0.1 Read CV + full codebase recon
- [x] T0.2 Create branch + baseline build
- [x] T0.3 Write rules, plan, tasks docs

## Phase 1 — Tokens & bug fixes
- [x] T1.1 Add `--card` / `--card-foreground` tokens (both themes) + Tailwind colors
- [x] T1.2 Add `--accent` indigo token (both themes) for highlights/metrics
- [x] T1.3 Verify cards now have a real surface in light + dark

## Phase 2 — Content truth (CV sync)
- [x] T2.1 Hero copy: 5+ yrs, sharper positioning (EN+PT)
- [x] T2.2 Intro paragraphs refreshed to match CV (EN+PT)
- [x] T2.3 Add PropAI OS flagship project + rich details (EN+PT)
- [x] T2.4 Extend tech‑icon map for new stack items (shared lib/tech-icons)

## Phase 3 — Signature sections
- [x] T3.1 Hero visual upgrade: aurora bg + availability badge + role rotator + CV download + scroll cue
- [x] T3.2 Animated stats strip (count‑up, bilingual, theme‑aware)
- [x] T3.3 Tech marquee (infinite, pausable, reduced‑motion safe)
- [x] T3.4 Featured PropAI OS spotlight card above grid (with architecture diagram)

## Phase 4 — Polish / perf / a11y
- [x] T4.1 Metadata + OG + JSON‑LD person schema (metadataBase warning fixed)
- [x] T4.2 CV PDF into /public + wired to download button
- [x] T4.3 a11y + contrast pass (theme × locale), no CLS, no x‑scroll

## Phase 5 — Ship
- [x] T5.1 `npm run build` + `npm run lint` green
- [x] T5.2 Dev smoke test: page serves 200, all new sections render SSR
- [ ] T5.3 Commit, push, open PR (no merge) ← in progress
