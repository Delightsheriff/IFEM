# AGENTS.md

Next.js 16 (App Router) + Tailwind v4 + Sanity CMS site for IFEM Education,
a UK education consultancy. React 19, TypeScript strict.

## Commands

- `npm run dev` — dev server
- `npm run build` — production build (prerenders most pages from Sanity)
- `npm run start` — serve the production build
- `npm run lint` — eslint (flat config in `eslint.config.mjs`)
- `npm run typecheck` — `tsc --noEmit`
- `npm test` — vitest (node environment, `**/*.test.ts`, `@/` alias)

Every change must pass `typecheck`, `lint`, `test`, and `build`. Never claim
work is done without running them.

## Environment

Env is validated at import time in `lib/env.ts` and throws when
`NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET` are missing.
Only the two public Sanity vars are hard-required; everything else
(`RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, webhook URLs, Turnstile keys,
feature flags) is read via `process.env` in the code that uses it. See
`.env.example` for the full set. Do not commit `.env.local`.

## Design constraints (per client direction)

- Palette is fixed. Custom colors must come from the existing tokens
  (cream `#fafaf7`, forest `#1a5c34`, forest-mid `#154a2a`, gold `#a8824f`,
  charcoal, white). Do not introduce new colors; use Tailwind's built-in
  scale for neutrals when no token fits.
- Layout uses the `mx-auto max-w-7xl px-4 md:px-6 lg:px-8` container scale;
  hero/spotlight sections may intentionally exceed it.
- Do not change the color palette without explicit approval. Refactor
  structure/representation only.
- Type surfaces: `font-serif` = Fraunces, `font-sans` = DM Sans. Fonts are
  configured once in `app/layout.tsx`.

## Caching / loading

- ISR helpers in `sanity/sanity.ts` share `SANITY_REVALIDATE` (0 dev, 3600
  prod) via `{ next: { revalidate } }`. Page-level `export const revalidate`:
  home/about/institutions/success-stories/faq 3600, events 60; `[slug]`
  pages inherit.
- Data functions return empty/`null` on failure rather than throwing, so an
  unreachable CMS renders fallbacks instead of a hard error.
- Every `loading.tsx` is a skeleton that animates via the shared
  `components/ui/page-transition` template — do not wrap skeletons in extra
  `ViewTransition` components.

## View transitions

Site-wide: `experimental: { viewTransition: true }` in `next.config.ts`,
the `<ViewTransition>` provider in `app/template.tsx`, and directional
link `data-view-transition=${"nav-forward" | "nav-lateral"}` tags in
`components/header.tsx` / `components/footer.tsx`. Keep chrome components
(header/footer) outside the transition scope.

## Forms (Batch A hardening)

- Payload caps, email validation, and honeypot live in `lib/form-submission.ts`;
  the API routes must use them.
- `lib/api-guard.ts` provides `rejectOversizedRequest` (header + real-byte
  enforcement, clones the body) and a shared in-memory `enforceRateLimit`
  (per-IP keyed on `cf-connecting-ip`, prunes the Map).
- Never log secrets. `console.error` for operational failures is fine.
- Studio embed URLs are sanitized through `lib/map-embed.ts`;
  JSON-LD is emitted via `lib/json-ld.ts` `jsonLdSerialize`.

## Content architecture

- Success stories, universities, events, articles, and the site
  "singleton" stats all come from Sanity with typed interfaces in
  `src`-adjacent `interface/sanity.ts` (import via `@/interface/sanity`).
- Articles live at `/news-and-events/articles/[slug]`; events at
  `/news-and-events/events/[slug]`. `getNewsArticles` reads both
  `newsArticle` and legacy `guides` documents.
- Related articles use `getRelatedArticles(slug, category, limit)` from
  Sanity (GROQ `score`/`boost`), not client-side filtering of the full list.
- List queries are capped (`[0...100]`); if a route needs more than the
  cap it should ask for pagination, not widen the query.

## Conventions

- Path alias `@/*` → repo root. Components default-export only when they
  are the page-level unit; named exports are the default style.
- Vitest: node environment, no jsdom. Mock external packages
  (`resend`, `@/sanity/sanity`) with `vi.mock` + `vi.hoisted`, drive time
  with `vi.setSystemTime` / `vi.useFakeTimers`, and reset env in
  `afterEach` with `vi.unstubAllEnvs()`.
- The `/studio` route (Sanity Studio) is in-router; keep it vanilla.