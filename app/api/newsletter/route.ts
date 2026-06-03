import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: { email?: unknown; honeypot?: unknown };
  try {
    body = (await req.json()) as { email?: unknown; honeypot?: unknown };
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (typeof body.honeypot === "string" && body.honeypot.trim()) {
    return NextResponse.json({ ok: true });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";

  if (!email) {
    return NextResponse.json({ error: "Please enter an email address." }, { status: 422 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "That email doesn't look right." }, { status: 422 });
  }

  // TODO: hand off to Mailchimp / Resend audiences. Stable contract first.
  console.info("[newsletter] subscriber", email);

  return NextResponse.json({ ok: true });
}
