import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Optional forward to NEWSLETTER_WEBHOOK_URL. Fire-and-forget; failures
 * log server-side and never surface to the subscriber.
 */
async function forwardToWebhook(email: string): Promise<void> {
  const url = process.env.NEWSLETTER_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source: "newsletter", email }),
      signal: AbortSignal.timeout(5000),
    });
  } catch (error) {
    console.error("[newsletter] webhook forward failed:", error);
  }
}

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

  console.info("[newsletter] subscriber", email);
  await forwardToWebhook(email);

  return NextResponse.json({ ok: true });
}
