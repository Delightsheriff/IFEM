import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getBranches } from "@/sanity/sanity";
import { selectContactRecipient } from "@/lib/contact-email-routing";

export const runtime = "nodejs";

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

function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };
    return entities[character];
  });
}

function buildContactEmail(record: Record<string, string>): { text: string; html: string } {
  const phone = record.phone || "Not provided";
  const text = [
    "New IFEM Education contact enquiry",
    "",
    `Name: ${record.name}`,
    `Email: ${record.email}`,
    `Phone: ${phone}`,
    `Subject: ${record.subject}`,
    "",
    "Message:",
    record.message,
  ].join("\n");

  const field = (label: string, value: string) =>
    `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>`;

  return {
    text,
    html: `<h1>New IFEM Education contact enquiry</h1>${field("Name", record.name)}${field("Email", record.email)}${field("Phone", phone)}${field("Subject", record.subject)}<h2>Message</h2><p>${escapeHtml(record.message).replace(/\n/g, "<br />")}</p>`,
  };
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

  const resendApiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!resendApiKey || !from) {
    console.error("[contact] Resend is not configured.");
    return NextResponse.json(
      { error: "Message delivery is not configured yet." },
      { status: 503 },
    );
  }

  const recipient = selectContactRecipient(await getBranches());
  if (!recipient) {
    console.error("[contact] No contact recipient is configured.");
    return NextResponse.json(
      { error: "Message delivery is not configured yet." },
      { status: 503 },
    );
  }

  const { text, html } = buildContactEmail(record);
  const resend = new Resend(resendApiKey);
  const { error } = await resend.emails.send({
    from,
    to: [recipient],
    replyTo: email,
    subject: `New enquiry: ${subject}`,
    text,
    html,
  });

  if (error) {
    console.error("[contact] Resend delivery failed:", error);
    return NextResponse.json(
      { error: "We could not send your message. Please try again shortly." },
      { status: 502 },
    );
  }

  await forwardToWebhook(record);

  return NextResponse.json({ ok: true });
}
