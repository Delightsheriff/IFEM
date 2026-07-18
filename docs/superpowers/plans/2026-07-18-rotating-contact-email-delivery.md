# Rotating Contact Email Delivery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver each valid contact-form enquiry through Resend to a rotating branch recipient, with a safe single-recipient override for testing.

**Architecture:** The route fetches the configured branch emails server-side, selects a recipient from a time-based rotation, and sends an HTML/plain-text email through Resend. `CONTACT_RECIPIENT_OVERRIDE` wins over branch routing, while `CONTACT_EMAIL_ROTATION_ENABLED=false` keeps testing confined to the override address.

**Tech Stack:** Next.js 16 Route Handlers, TypeScript, Sanity, Resend Node SDK.

## Global Constraints

- Never expose Resend credentials or recipient addresses to browser code.
- Use `CONTACT_FROM_EMAIL` as the verified sender and the student email as `replyTo`.
- Route production contacts among the branch emails returned by Sanity.
- Keep `CONTACT_EMAIL_ROTATION_ENABLED=false` and `CONTACT_RECIPIENT_OVERRIDE=delightsherif@gmail.com` in local configuration until testing is complete.
- Return an error when Resend is not configured or delivery fails; do not claim the enquiry was sent.

---

### Task 1: Add the email transport dependency and settings template

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `.env.example`

**Interfaces:**
- Consumes: `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_EMAIL_ROTATION_ENABLED`, and `CONTACT_RECIPIENT_OVERRIDE`.
- Produces: server-only configuration for Resend and recipient routing.

- [ ] **Step 1: Install the SDK**

Run: `npm install resend`
Expected: `resend` appears in `dependencies` and the lockfile updates.

- [ ] **Step 2: Add the configuration template**

```dotenv
RESEND_API_KEY=re_replace_with_your_key
CONTACT_FROM_EMAIL=IFEM Education <enquiries@updates.ifemeducation.com>
CONTACT_EMAIL_ROTATION_ENABLED=false
CONTACT_RECIPIENT_OVERRIDE=delightsherif@gmail.com
```

### Task 2: Select a branch recipient safely

**Files:**
- Create: `lib/contact-email-routing.ts`
- Test: `npx tsc --noEmit`

**Interfaces:**
- Consumes: branch emails plus `CONTACT_EMAIL_ROTATION_ENABLED` and `CONTACT_RECIPIENT_OVERRIDE`.
- Produces: `selectContactRecipient(branches, now): string | null`.

- [ ] **Step 1: Prioritize the test override**

```ts
if (process.env.CONTACT_RECIPIENT_OVERRIDE?.trim()) {
  return process.env.CONTACT_RECIPIENT_OVERRIDE.trim();
}
```

- [ ] **Step 2: Rotate across branch emails when enabled**

```ts
const index = Math.floor(now / 30_000) % recipients.length;
return recipients[index];
```

- [ ] **Step 3: Verify type safety**

Run: `npx tsc --noEmit`
Expected: exit code 0.

### Task 3: Deliver contact messages through Resend

**Files:**
- Modify: `app/api/contact/route.ts:1-79`

**Interfaces:**
- Consumes: a valid form payload and server-only route configuration.
- Produces: a Resend email addressed to the selected recipient with `replyTo` set to the applicant email.

- [ ] **Step 1: Fetch branch emails only after validation**

```ts
const branches = await getBranches();
const recipient = selectContactRecipient(branches, Date.now());
```

- [ ] **Step 2: Send a safe enquiry email**

```ts
const resend = new Resend(process.env.RESEND_API_KEY);
const { error } = await resend.emails.send({ from, to: recipient, replyTo: email, subject, text, html });
if (error) throw new Error(error.message);
```

- [ ] **Step 3: Preserve webhook forwarding after successful email delivery**

Run: `rg -n 'forwardToWebhook\(record\)' app/api/contact/route.ts`
Expected: one match after the Resend send path.

### Task 4: Verify

**Files:**
- Test: `npm run lint`
- Test: `npm run build`

**Interfaces:**
- Consumes: the route, the Resend SDK, and the branch query.
- Produces: a type-safe production build.

- [ ] **Step 1: Run lint**

Run: `npm run lint`
Expected: exit code 0.

- [ ] **Step 2: Run the production build**

Run: `npm run build`
Expected: exit code 0.

- [ ] **Step 3: Commit**

```bash
git add app/api/contact/route.ts lib/contact-email-routing.ts package.json package-lock.json .env.example docs/superpowers/plans/2026-07-18-rotating-contact-email-delivery.md
git commit -m "feat: route contact enquiries through branch email rotation"
```
