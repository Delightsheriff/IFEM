export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const MAXIMUM_NAME_LENGTH = 120;
export const MAXIMUM_EMAIL_LENGTH = 254;
export const MAXIMUM_PHONE_LENGTH = 40;
export const MAXIMUM_SUBJECT_LENGTH = 180;
export const MAXIMUM_MESSAGE_LENGTH = 5_000;
export const MAXIMUM_CONTACT_REQUEST_BYTES = 16_000;
export const MAXIMUM_NEWSLETTER_REQUEST_BYTES = 2_000;

export function validateEmail(email: string): string | null {
  if (!email) return "Please enter your email address.";
  if (!EMAIL_RE.test(email)) return "That email doesn't look right.";
  if (email.length > MAXIMUM_EMAIL_LENGTH)
    return "Please use a shorter email address.";
  return null;
}

export function isHoneypot(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

export async function forwardToWebhook(
  url: string | undefined,
  payload: Record<string, string>,
): Promise<void> {
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(5000),
    });
  } catch (error) {
    console.error("[form] webhook forward failed:", error);
  }
}
