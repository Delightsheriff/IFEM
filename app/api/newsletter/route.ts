import { NextResponse } from "next/server";
import { enforceRateLimit, rejectOversizedRequest } from "@/lib/api-guard";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAXIMUM_REQUEST_BYTES = 2_000;

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
  if (process.env.NEWSLETTER_ENABLED !== "true") {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const oversizedRequest = rejectOversizedRequest(req, MAXIMUM_REQUEST_BYTES);
  if (oversizedRequest) return oversizedRequest;

  const limitedRequest = enforceRateLimit({
    request: req,
    route: "newsletter",
    limit: 3,
    windowMs: 10 * 60 * 1000,
  });
  if (limitedRequest) return limitedRequest;

  let body: { email?: unknown; honeypot?: unknown };
  try {
    body = (await req.json()) as { email?: unknown; honeypot?: unknown };
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  if (typeof body.honeypot === "string" && body.honeypot.trim()) {
    return NextResponse.json({ ok: true });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";

  if (!email) {
    return NextResponse.json(
      { error: "Please enter an email address." },
      { status: 422 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "That email doesn't look right." },
      { status: 422 },
    );
  }

  await forwardToWebhook(email);

  return NextResponse.json({ ok: true });
}
