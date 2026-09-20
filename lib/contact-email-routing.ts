import type { Branch } from "@/interface/sanity";
import { randomInt } from "node:crypto";
import { CONTACT_EMAIL } from "@/lib/site";

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
  nextRandomInt: (max: number) => number = randomInt,
): string | null {
  const override = process.env.CONTACT_RECIPIENT_OVERRIDE?.trim();
  if (override) return override;

  if (process.env.CONTACT_EMAIL_ROTATION_ENABLED !== "true") return null;

  const recipients = uniqueBranchEmails(branches);
  if (recipients.length === 0) return null;

  const index = nextRandomInt(recipients.length);
  return recipients[index] ?? null;
}

export function selectDisplayEmail(
  branches: Branch[],
  nextRandomInt: (max: number) => number = randomInt,
): string {
  const recipients = uniqueBranchEmails(branches);
  if (recipients.length === 0) {
    return CONTACT_EMAIL;
  }

  return recipients[nextRandomInt(recipients.length)] ?? recipients[0] ?? "";
}
