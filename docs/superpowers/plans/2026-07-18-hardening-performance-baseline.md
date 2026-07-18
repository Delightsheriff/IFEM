# Hardening and Performance Baseline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reduce production risk and request cost while establishing repeatable verification for IFEM Education.

**Architecture:** Keep Sanity detail queries unchanged, introduce lean projections for card/listing views, and use a focused API guard module so contact and future public forms share the same size and rate limits. Add Vitest only for deterministic domain logic; browser interactions remain manually verified.

**Tech Stack:** Next.js 16, React 19, TypeScript, Sanity, Vitest.

## Global Constraints

- Preserve the existing Sanity editorial workflow and current public routes.
- Do not expose environment-variable values in code, tests, logs, or docs.
- Keep each independently deployable task in its own commit.
- Run lint, TypeScript, tests, and a production build before handoff.

---

### Task 1: Patch the immediately fixable framework security release

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`

- [ ] Update only Next.js to `16.2.10`, retaining React 19 and all existing application APIs.
- [ ] Run `npm audit --omit=dev`, `npm run lint`, `npx tsc --noEmit`, and `npm run build`.
- [ ] Commit with `chore: patch Next.js security release`.

### Task 2: Protect public form routes

**Files:**
- Create: `lib/api-guard.ts`
- Modify: `app/api/contact/route.ts`
- Modify: `app/api/newsletter/route.ts`
- Modify: `.env.example`

- [ ] Add a bounded, process-local per-IP limiter and a `Content-Length` guard.
- [ ] Enforce field-length limits before sending email or calling external webhooks.
- [ ] Return generic `429` and `413` responses; do not log submitted email addresses.
- [ ] Make newsletter submissions return `404` unless explicitly enabled for a future provider.
- [ ] Verify with focused unit tests and a production build.
- [ ] Commit with `feat: harden public form endpoints`.

### Task 3: Avoid serializing full Sanity documents into listing pages

**Files:**
- Modify: `sanity/sanity.ts`
- Modify: `interface/sanity.ts`
- Modify: `app/news/page.tsx`
- Modify: `app/events/page.tsx`
- Modify: `app/news-and-events/articles/[slug]/page.tsx`

- [ ] Introduce explicit `NewsArticleCard` and `EventCard` types and matching lean GROQ projections.
- [ ] Keep full projections exclusively for article/event detail pages.
- [ ] Fetch only same-category related article cards on an article detail page.
- [ ] Keep event state current with a short revalidation cadence rather than per-request full-route rendering.
- [ ] Verify list pages, empty states, detail pages, metadata, lint, type checking, and build.
- [ ] Commit with `perf: slim news and event listing queries`.

### Task 4: Establish test, security-header, and documentation baselines

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`
- Create: `lib/event-status.test.ts`
- Create: `lib/contact-email-routing.test.ts`
- Modify: `next.config.ts`
- Modify: `README.md`

- [ ] Add Vitest and tests for event classification and contact-recipient rotation.
- [ ] Add response-hardening headers compatible with Sanity Studio and third-party media.
- [ ] Replace the starter README with IFEM setup, environment, content, verification, and deployment guidance.
- [ ] Commit with `chore: add quality and operations baseline`.
