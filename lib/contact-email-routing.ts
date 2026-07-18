import type { Branch } from "@/interface/sanity";

const ROTATION_INTERVAL_MS = 30_000;

function uniqueBranchEmails(branches: Branch[]): string[] {
  const emails = new Set<string>();

  for (const branch of branches) {
    const email = branch.email?.trim().toLowerCase();
    if (email) emails.add(email);
  }

  return [...emails];
}

export function selectContactRecipient(
  branches: Branch[],
  now: number = Date.now(),
): string | null {
  const override = process.env.CONTACT_RECIPIENT_OVERRIDE?.trim();
  if (override) return override;

  if (process.env.CONTACT_EMAIL_ROTATION_ENABLED !== "true") return null;

  const recipients = uniqueBranchEmails(branches);
  if (recipients.length === 0) return null;

  const index = Math.floor(now / ROTATION_INTERVAL_MS) % recipients.length;
  return recipients[index] ?? null;
}
