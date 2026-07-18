import type { Branch, BranchPhone } from "@/interface/sanity";

export function normalizePhoneNumber(number: string): string {
  return number.replace(/\D/g, "");
}

export function getBranchPhoneNumbers(branches: Branch[]): BranchPhone[] {
  const seen = new Set<string>();
  const phones: BranchPhone[] = [];

  for (const branch of branches) {
    const entries = [
      ...(branch.phones ?? []),
      ...(branch.phone ? [{ label: `${branch.name} main line`, number: branch.phone }] : []),
    ];

    for (const entry of entries) {
      const normalizedNumber = normalizePhoneNumber(entry.number);
      if (!normalizedNumber || seen.has(normalizedNumber)) continue;

      seen.add(normalizedNumber);
      phones.push(entry);
    }
  }

  return phones;
}
