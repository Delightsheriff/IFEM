# Sanity Local Cache Policy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Sanity content changes appear on every local development request while retaining one-hour production caching.

**Architecture:** Keep statically analyzable route `revalidate` exports unchanged, because Next.js validates those at build time. Centralize the runtime-only policy in `sanity/sanity.ts`, where every query already provides an explicit `next.revalidate` option.

**Tech Stack:** Next.js 16 App Router, TypeScript, `@sanity/client`.

## Global Constraints

- Production Sanity queries must continue to revalidate every 3600 seconds.
- Local development Sanity queries must use `revalidate: 0`.
- Do not import a dynamic value into a route segment configuration export.

---

### Task 1: Runtime Sanity revalidation policy

**Files:**
- Modify: `sanity/sanity.ts:16-18,93-497`
- Test: `npm run build`

**Interfaces:**
- Consumes: `process.env.NODE_ENV` provided by Next.js.
- Produces: `SANITY_REVALIDATE`, a `0 | 3600` value passed to each Sanity client's `next.revalidate` option.

- [ ] **Step 1: Confirm the present failure pattern**

Run: `rg -n 'revalidate: 3600' sanity/sanity.ts`
Expected: Every Sanity query is explicitly cached for 3600 seconds.

- [ ] **Step 2: Implement the minimal runtime policy**

```ts
const SANITY_REVALIDATE = process.env.NODE_ENV === "development" ? 0 : 3600;
```

Replace every query option with:

```ts
{ next: { revalidate: SANITY_REVALIDATE } }
```

- [ ] **Step 3: Verify the change is complete**

Run: `rg -n 'revalidate: 3600|revalidate: SANITY_REVALIDATE' sanity/sanity.ts`
Expected: No hard-coded query revalidation values remain; each query uses `SANITY_REVALIDATE`.

- [ ] **Step 4: Verify the production build**

Run: `npm run build`
Expected: Exit code 0, proving no invalid dynamic route-segment export was introduced.

- [ ] **Step 5: Commit**

```bash
git add sanity/sanity.ts docs/superpowers/plans/2026-07-18-sanity-local-cache-policy.md
git commit -m "fix: disable Sanity cache in local development"
```
