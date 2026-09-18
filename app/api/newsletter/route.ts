import { NextResponse } from "next/server";
import { enforceRateLimit, rejectOversizedRequest } from "@/lib/api-guard";
import {
  MAXIMUM_NEWSLETTER_REQUEST_BYTES,
  validateEmail,
  isHoneypot,
  forwardToWebhook,
} from "@/lib/form-submission";

export async function POST(req: Request) {
  if (process.env.NEWSLETTER_ENABLED !== "true") {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const oversizedRequest = await rejectOversizedRequest(
    req,
    MAXIMUM_NEWSLETTER_REQUEST_BYTES,
  );
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

  if (isHoneypot(body.honeypot)) {
    return NextResponse.json({ ok: true });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";

  const emailError = validateEmail(email);
  if (emailError) {
    return NextResponse.json({ error: emailError }, { status: 422 });
  }

  await forwardToWebhook(process.env.NEWSLETTER_WEBHOOK_URL, {
    source: "newsletter",
    email,
  });

  return NextResponse.json({ ok: true });
}