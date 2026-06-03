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

  // TODO: forward to email provider (Resend, SendGrid, or Sanity webhook).
  // Keeping the endpoint stable so the client UX is wired correctly today
  // and a transport can be swapped in without touching the form.
  console.info("[contact] new enquiry", { name, email, phone, subject });

  return NextResponse.json({ ok: true });
}
