# Turnstile Contact Form Protection Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Require a valid Cloudflare Turnstile token before a contact enquiry can be emailed or forwarded.

**Architecture:** A client widget produces a single-use token and adds it to the existing JSON form request. The API route validates that token exclusively with Cloudflare Siteverify before recipient routing or Resend delivery; test keys protect localhost development, while production uses separately configured real keys.

**Tech Stack:** Next.js 16, React 19, TypeScript, Cloudflare Turnstile, Resend.

## Global Constraints

- The Turnstile secret must remain server-only.
- Reject missing, invalid, expired, or already-used tokens before Resend is called.
- Keep the existing honeypot and form validation.
- Use Cloudflare's documented always-pass test keys only in local development.
- Do not add a browser API request other than the existing form submission and Turnstile's official script.

---

### Task 1: Add Turnstile configuration

**Files:**
- Modify: `.env.example`
- Modify: `.env.local`

**Interfaces:**
- Consumes: public `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, private `TURNSTILE_SECRET_KEY`, and `TURNSTILE_ENABLED`.
- Produces: a local test-key configuration and production placeholders.

- [ ] **Step 1: Configure local official test keys**

```dotenv
NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA
TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
TURNSTILE_ENABLED=true
```

- [ ] **Step 2: Document production configuration**

```dotenv
NEXT_PUBLIC_TURNSTILE_SITE_KEY=replace_with_cloudflare_site_key
TURNSTILE_SECRET_KEY=replace_with_cloudflare_secret_key
TURNSTILE_ENABLED=true
```

### Task 2: Render and manage the form widget

**Files:**
- Create: `components/turnstile-widget.tsx`
- Modify: `components/contact-form.tsx:1-120,140-330`

**Interfaces:**
- Consumes: the public site key.
- Produces: a fresh `turnstileToken` for each form attempt and user-facing verification errors.

- [ ] **Step 1: Load Cloudflare's official script once and explicitly render the widget**

```tsx
window.turnstile.render(container, {
  sitekey,
  action: "contact",
  callback: onVerify,
  "expired-callback": () => onVerify(null),
  "error-callback": () => onVerify(null),
});
```

- [ ] **Step 2: Include the token in the existing API payload**

```ts
body: JSON.stringify({ ...formData, honeypot, turnstileToken })
```

- [ ] **Step 3: Reset the widget after every submission attempt**

```ts
setTurnstileToken(null);
setTurnstileResetKey((key) => key + 1);
```

### Task 3: Enforce Siteverify before delivery

**Files:**
- Modify: `app/api/contact/route.ts:1-180`

**Interfaces:**
- Consumes: `turnstileToken`, `TURNSTILE_SECRET_KEY`, and the request IP headers.
- Produces: a 403 response for invalid verification and Resend delivery only for verified requests.

- [ ] **Step 1: Call Siteverify from the server**

```ts
await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
  method: "POST",
  body: new URLSearchParams({ secret, response: token, remoteip }),
  signal: AbortSignal.timeout(5_000),
});
```

- [ ] **Step 2: Stop unverified messages before recipient selection**

```ts
if (!verification.success) {
  return NextResponse.json({ error: "Verification failed. Please try again." }, { status: 403 });
}
```

### Task 4: Verify

**Files:**
- Test: `npm run lint`
- Test: `npm run build`
- Test: `curl -X POST http://localhost:3000/api/contact ...`

**Interfaces:**
- Consumes: a request without a token and a locally generated test token.
- Produces: rejection for a missing token and successful delivery only after test verification.

- [ ] **Step 1: Verify missing-token rejection**

Run: a valid contact POST without `turnstileToken`.
Expected: HTTP 403.

- [ ] **Step 2: Run lint and the production build**

Run: `npm run lint && npm run build`
Expected: exit code 0.

- [ ] **Step 3: Commit**

```bash
git add app/api/contact/route.ts components/contact-form.tsx components/turnstile-widget.tsx .env.example docs/superpowers/plans/2026-07-18-turnstile-contact-form-protection.md
git commit -m "feat: protect contact form with Turnstile"
```
