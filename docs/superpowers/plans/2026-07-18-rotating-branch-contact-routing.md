# Rotating Branch Contact Routing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rotate the header telephone number and footer WhatsApp CTA through all configured branch phone numbers without adding network requests.

**Architecture:** A server-safe utility flattens and de-duplicates branch phone numbers, including legacy branch numbers. A small client hook selects the current entry from a time bucket and schedules one 30-second interval; Header and a focused WhatsApp CTA client component consume the same hook from props already fetched by the root layout.

**Tech Stack:** Next.js 16, React 19, TypeScript, Sanity, Tailwind CSS.

## Global Constraints

- Include every non-empty `phones[].number` and legacy `phone` from every branch exactly once.
- Do not fetch branch contacts from the browser or create API routes.
- The phone text and `tel:` target must rotate together.
- The WhatsApp target must remove non-digits from the selected number.
- Rotate every 30 seconds, with one timer per mounted contact component.

---

### Task 1: Create the reusable branch-phone pool

**Files:**
- Create: `lib/branch-phones.ts`
- Test: `npx tsc --noEmit`

**Interfaces:**
- Consumes: `Branch[]`.
- Produces: `getBranchPhoneNumbers(branches: Branch[]): BranchPhone[]`.

- [ ] **Step 1: Flatten and normalize branch numbers**

```ts
export function getBranchPhoneNumbers(branches: Branch[]): BranchPhone[] {
  const seen = new Set<string>();
  return branches.flatMap((branch) => [...(branch.phones ?? []), ...(branch.phone ? [{ label: "Main line", number: branch.phone }] : [])])
    .filter(({ number }) => number.trim() && !seen.has(normalizePhoneNumber(number)) && Boolean(seen.add(normalizePhoneNumber(number))));
}
```

- [ ] **Step 2: Verify type safety**

Run: `npx tsc --noEmit`
Expected: exit code 0.

### Task 2: Add deterministic client rotation

**Files:**
- Create: `hooks/use-rotating-branch-phone.ts`
- Test: `npx tsc --noEmit`

**Interfaces:**
- Consumes: `BranchPhone[]` and optional interval milliseconds.
- Produces: `useRotatingBranchPhone(phones)` returning the current `BranchPhone | null`.

- [ ] **Step 1: Calculate the active time bucket**

```ts
const getIndex = (length: number) => Math.floor(Date.now() / 30_000) % length;
```

- [ ] **Step 2: Update on one fixed interval**

```ts
useEffect(() => {
  if (phones.length === 0) return;
  const update = () => setIndex(getIndex(phones.length));
  update();
  const interval = window.setInterval(update, 30_000);
  return () => window.clearInterval(interval);
}, [phones]);
```

### Task 3: Wire the header and WhatsApp CTA

**Files:**
- Create: `components/rotating-whatsapp-link.tsx`
- Modify: `app/layout.tsx:122-228`
- Modify: `components/header.tsx:12-22,76-84,220-228`
- Modify: `components/footer.tsx:1-45`

**Interfaces:**
- Consumes: the root layout's existing `branches` result.
- Produces: a rotating header call link and WhatsApp CTA.

- [ ] **Step 1: Pass all branches into Header**

```tsx
<Header hqContact={hqContact} branches={branches} />
```

- [ ] **Step 2: Use the shared phone pool in Header**

```tsx
const phonePool = getBranchPhoneNumbers(branches);
const rotatingPhone = useRotatingBranchPhone(phonePool);
```

- [ ] **Step 3: Render the footer WhatsApp CTA with the shared pool**

```tsx
<RotatingWhatsAppLink phones={getBranchPhoneNumbers(branches)} />
```

- [ ] **Step 4: Verify no hard-coded WhatsApp contact remains**

Run: `rg -n '2349167472006|whatsappNumber' components app lib`
Expected: no output.

### Task 4: Verify

**Files:**
- Test: `npm run lint`
- Test: `npm run build`

**Interfaces:**
- Consumes: branch contacts returned by Sanity.
- Produces: a production-safe static build.

- [ ] **Step 1: Run lint**

Run: `npm run lint`
Expected: exit code 0.

- [ ] **Step 2: Run production build**

Run: `npm run build`
Expected: exit code 0.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx components/header.tsx components/footer.tsx components/rotating-whatsapp-link.tsx hooks/use-rotating-branch-phone.ts lib/branch-phones.ts docs/superpowers/plans/2026-07-18-rotating-branch-contact-routing.md
git commit -m "feat: rotate branch contact CTAs"
```
