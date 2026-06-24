# Portfolio Engineering & Design Rules

Standards that every change to this portfolio must follow. The goal: when an
international recruiter or a senior engineer lands here, they immediately think
**"this is the frontend developer I want to hire."**

---

## 1. Non‑negotiables (never break these)

1. **Bilingual everywhere (EN + PT).** No user‑facing string may be hardcoded in
   a component. All copy lives in `messages/en.json` + `messages/pt.json` (UI chrome)
   or as `{ en, pt }` objects in `constants/*` (content). Both locales must always
   be in sync — same keys, same meaning.
2. **Dark + Light must both look intentional.** Every color comes from a CSS
   variable token in `app/globals.css` (`:root` and `.dark`). Never hardcode a hex
   that only works in one theme. Test every new surface in both themes.
3. **Respect `prefers-reduced-motion`.** Every animation must have a reduced‑motion
   path (via `useLenis().prefersReducedMotion` or the `html.reduce-motion` CSS hooks).
4. **No layout shift (CLS).** Reserve space for async/animated content. Images use
   `next/image` with explicit sizing. Sections that animate in must not collapse.
5. **Accessible.** Semantic landmarks, `aria-*` on interactive elements, visible
   focus states, alt text, and color contrast ≥ WCAG AA in both themes.

## 2. Design language

- **Tone:** confident, minimal, "quiet luxury." Generous whitespace, restrained
  palette (monochrome base + a single indigo accent), motion that feels engineered
  rather than decorative.
- **Type scale:** section titles `text-4xl md:text-5xl font-bold`; body uses
  `text-muted-foreground`. Keep the existing rhythm.
- **Accent:** use the `--accent` / `--spot-accent` indigo token for highlights,
  metrics, and focus moments. Never introduce a new brand color without adding a
  token for both themes.
- **Motion budget:** entrance reveals ≤ 0.8s, easing `power3.out` (GSAP) or
  `[0.22, 1, 0.36, 1]` (Framer). Looping ambient motion must be subtle and pausable.

## 3. Code standards

- **TypeScript strict.** No `any` in new code. Localized content is typed as
  `{ en: string; pt: string }`.
- **Client components** only when they need interactivity/hooks; keep them lean.
  Heavy/below‑the‑fold sections stay behind `next/dynamic` like in `app/page.tsx`.
- **GSAP** through `useGSAP` with a `scope` and a cleanup that reverts/kills.
  Load ScrollTrigger lazily via `lib/gsap-scroll-trigger.ts`.
- **Tokens, not magic values.** New colors → `globals.css` + `tailwind.config.js`.
- **Formatting:** Prettier + ESLint must pass (`npm run lint`). Single quotes, the
  repo's existing conventions.
- **Next.js:** this repo tracks a fast‑moving Next version — consult
  `node_modules/next/dist/docs/` before using unfamiliar APIs (see `AGENTS.md`).

## 4. Content truth (keep in sync with the CV)

- Title: **Full Stack Engineer — Multi‑Tenant SaaS & AI‑Powered Platforms.**
- **5+ years** of experience (not 4+).
- Flagship project: **PropAI OS** — multi‑tenant real‑estate OS for US brokerages
  (PostgreSQL RLS, pgvector semantic search, BullMQ AI pipeline, Better Auth,
  Turborepo). Numbers: 16 RLS tables · 37 REST endpoints · 45 integration tests.
- Stack signals: Next.js, React, TypeScript, Node.js, Fastify, PostgreSQL,
  Drizzle/Prisma, Redis, Stripe, Docker, Vercel AI SDK.
- Open to global relocation & remote.

## 5. Definition of done (every PR)

- [ ] `npm run build` passes with no new errors/warnings.
- [ ] `npm run lint` clean.
- [ ] Verified in **light + dark** and **EN + PT**.
- [ ] Checked desktop + mobile breakpoints; no horizontal scroll, no CLS.
- [ ] Reduced‑motion path verified.
- [ ] Commits are small, conventional (`feat:`, `fix:`, `perf:`, `copy:`…).
