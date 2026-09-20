import type { Branch, BranchPhone } from "@/interface/sanity";

export interface BranchContact {
  email: string;
  phone: BranchPhone;
}

export function getBranchContacts(branches: Branch[]): BranchContact[] {
  return branches.flatMap((branch) => {
    const email = branch.email?.trim().toLowerCase();
    const phone = branch.phones?.[0] ?? (branch.phone
      ? { label: `${branch.name} main line`, number: branch.phone }
      : null);

    return email && phone ? [{ email, phone }] : [];
  });
}

export function getBranchContactIndex(
  contactCount: number,
  now: number = Date.now(),
  intervalMs: number = 30_000,
): number {
  if (contactCount === 0) return -1;
  return Math.floor(now / intervalMs) % contactCount;
}

export function getRandomBranchContactIndex(
  contactCount: number,
  random: () => number = Math.random,
  currentIndex: number = -1,
): number {
  if (contactCount === 0) return -1;
  if (contactCount === 1) return 0;

  const candidate = Math.floor(random() * contactCount);
  return candidate === currentIndex ? (candidate + 1) % contactCount : candidate;
}
