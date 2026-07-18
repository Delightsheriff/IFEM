# About Co-Founder and Layout Consistency Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the About Page chairman with a complete, safe-to-render co-founder profile and align broad page sections to the site-wide content width.

**Architecture:** The About document schema, GROQ projection, TypeScript data model, and About UI use the same `coFounder` field shape. A single profile renderer displays the founder first and co-founder immediately below it, but only when the co-founder has every required display value. Broad feature sections use `max-w-7xl`; deliberately narrow long-form reading columns remain unchanged.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Sanity Studio, Tailwind CSS 4.

## Global Constraints

- Remove the `chairman` field from the About Studio schema and all website code.
- The co-founder requires name, job title, biography, image, and image alternative text; the featured quote is optional.
- Never show a partial co-founder profile on the public site.
- Preserve the one-hour production cache and no-cache local Sanity policy.
- Use `max-w-7xl` for broad page-section content; retain narrow article, FAQ, and legal reading columns.

---

### Task 1: Add the co-founder content model

**Files:**
- Modify: `schemaTypes/about.ts:95-202`
- Modify: `interface/sanity.ts:131-159`
- Modify: `sanity/sanity.ts:422-446`

**Interfaces:**
- Produces: `About.coFounder` with `name`, `title`, `bio`, `quote`, and `image.url`/`image.alt`.
- Consumes: Sanity's nested `coFounder` object on the singleton About document.

- [ ] **Step 1: Replace the chairman schema object**

```ts
defineField({
  name: "coFounder",
  title: "Co-Founder Information",
  type: "object",
  fields: [/* the required founder-equivalent fields */],
})
```

- [ ] **Step 2: Require every public co-founder field in Sanity**

```ts
validation: (Rule) => Rule.required()
```

Apply this to the co-founder name, title, biography, image, and image alternative text. The featured quote is optional.

- [ ] **Step 3: Project and type the new field**

```groq
coFounder { name, title, bio, quote, image { "url": asset->url, "alt": alt } }
```

- [ ] **Step 4: Verify stale chairman references are absent**

Run: `rg -n -i 'chairman' app components interface sanity schemaTypes`
Expected: no output.

### Task 2: Render complete founder and co-founder profiles

**Files:**
- Modify: `components/about/FounderSection.tsx:6-91`
- Modify: `app/about/page.tsx:51-52`
- Modify: `components/about/TeamSection.tsx:1-70`

**Interfaces:**
- Consumes: `founder` and `coFounder` values from `About`.
- Produces: the founder first and co-founder below, each with an image, name, title, quote, and biography.

- [ ] **Step 1: Write the profile completeness predicate**

```ts
function hasCompleteProfile(profile: Leader | null | undefined): profile is CompleteLeader {
  return Boolean(profile?.name && profile.title && profile.bio?.length && profile.image?.url && profile.image.alt);
}
```

- [ ] **Step 2: Reuse one profile renderer for both leaders**

```tsx
<LeadershipProfile profile={founder} label="Founder" />
<LeadershipProfile profile={coFounder} label="Co-Founder" imageOnRight />
```

- [ ] **Step 3: Remove chairman rendering from TeamSection**

```tsx
export function TeamSection({ teamMembers }: TeamSectionProps) {
  if (teamMembers.length === 0) return null;
}
```

- [ ] **Step 4: Verify the no-partial-profile behavior in code**

Run: `rg -n 'hasCompleteProfile|coFounder|chairman' components/about app/about interface/sanity.ts sanity/sanity.ts schemaTypes/about.ts`
Expected: `coFounder` and the predicate are present; `chairman` is absent.

### Task 3: Normalize broad content width

**Files:**
- Modify: `components/branches-section.tsx:22`

**Interfaces:**
- Consumes: the site-wide broad-section convention, `max-w-7xl`.
- Produces: a Contact page branch section aligned with Home and About broad section content.

- [ ] **Step 1: Replace the inconsistent broad width**

```tsx
<div className="mx-auto max-w-7xl">
```

- [ ] **Step 2: Preserve reading-column widths**

Do not alter the `max-w-2xl`/`3xl` constraints in FAQ, guide article, or privacy prose; they are content-specific measures, not page-shell widths.

### Task 4: Verify

**Files:**
- Test: `npm run lint`
- Test: `npm run build`

**Interfaces:**
- Consumes: the modified schema and public About page.
- Produces: a type-safe production build.

- [ ] **Step 1: Run the lint command**

Run: `npm run lint`
Expected: exit code 0.

- [ ] **Step 2: Run the production build**

Run: `npm run build`
Expected: exit code 0.

- [ ] **Step 3: Commit**

```bash
git add app/about/page.tsx components/about/FounderSection.tsx components/about/TeamSection.tsx components/branches-section.tsx interface/sanity.ts sanity/sanity.ts schemaTypes/about.ts docs/superpowers/plans/2026-07-18-about-cofounder-and-layout-consistency.md
git commit -m "feat: add complete co-founder profile to about page"
```
