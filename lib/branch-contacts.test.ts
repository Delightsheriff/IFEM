import { describe, expect, it } from "vitest";
import { getBranchContactIndex, getBranchContacts } from "@/lib/branch-contacts";
import type { Branch } from "@/interface/sanity";

const branches: Branch[] = [
  {
    _id: "enugu",
    name: "Enugu",
    type: "hq",
    address: "",
    city: "Enugu",
    country: "Nigeria",
    email: "ENUGU@EXAMPLE.COM",
    phones: [{ label: "Main line", number: "+234 800 000 0001" }],
  },
  {
    _id: "abuja",
    name: "Abuja",
    type: "branch",
    address: "",
    city: "Abuja",
    country: "Nigeria",
    email: "abuja@example.com",
    phone: "+234 800 000 0002",
  },
];

describe("branch contacts", () => {
  it("keeps each branch email paired with its primary phone", () => {
    expect(getBranchContacts(branches)).toEqual([
      {
        email: "enugu@example.com",
        phone: { label: "Main line", number: "+234 800 000 0001" },
      },
      {
        email: "abuja@example.com",
        phone: { label: "Abuja main line", number: "+234 800 000 0002" },
      },
    ]);
  });

  it("uses the same interval index for the paired contacts", () => {
    expect(getBranchContactIndex(2, 0)).toBe(0);
    expect(getBranchContactIndex(2, 30_000)).toBe(1);
    expect(getBranchContactIndex(0, 30_000)).toBe(-1);
  });
});
