import { NextResponse } from "next/server";

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  subject?: unknown;
  message?: unknown;
  honeypot?: unknown;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asString(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

/**
 * If CONTACT_WEBHOOK_URL is set, forward the submission as JSON.
 * Failures are logged but never surfaced to the client — the form
 * never blocks on a flaky downstream.
 */
async function forwardToWebhook(payload: Record<string, string>): Promise<void> {
  const url = process.env.CONTACT_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source: "contact-form", ...payload }),
      // Don't hold the response longer than necessary — webhook is fire-and-forget.
      signal: AbortSignal.timeout(5000),
    });
  } catch (error) {
    console.error("[contact] webhook forward failed:", error);
  }
}

export async function POST(req: Request) {
  let payload: ContactPayload;
  try {
    payload = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot — silently drop bots
  if (asString(payload.honeypot)) {
    return NextResponse.json({ ok: true });
  }

  const name = asString(payload.name);
  const email = asString(payload.email);
  const subject = asString(payload.subject);
  const message = asString(payload.message);
  const phone = asString(payload.phone);

  const errors: Record<string, string> = {};
  if (!name) errors.name = "Please tell us your name.";
  if (!email) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(email)) errors.email = "That email doesn't look right.";
  if (!subject) errors.subject = "Please add a short subject.";
  if (!message) errors.message = "Please share a few details so we can help.";
  else if (message.length < 10) errors.message = "Tell us a little more (10+ characters).";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  const record = { name, email, phone, subject, message };

  // Server log is the source of truth until a transport (Resend, SendGrid,
  // Make webhook, …) is wired via CONTACT_WEBHOOK_URL.
  console.info("[contact] new enquiry", record);
  await forwardToWebhook(record);

  return NextResponse.json({ ok: true });
}
