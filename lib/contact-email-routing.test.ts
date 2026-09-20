import { afterEach, describe, expect, it, vi } from "vitest";
import {
  selectContactRecipient,
  selectDisplayEmail,
} from "@/lib/contact-email-routing";
import type { Branch } from "@/interface/sanity";

const branches: Branch[] = [
  {
    _id: "one",
    name: "One",
    type: "branch",
    address: "",
    city: "",
    country: "",
    email: "one@example.com",
  },
  {
    _id: "two",
    name: "Two",
    type: "branch",
    address: "",
    city: "",
    country: "",
    email: "two@example.com",
  },
];

afterEach(() => vi.unstubAllEnvs());

describe("selectContactRecipient", () => {
  it("selects a branch recipient independently for each submission", () => {
    vi.stubEnv("CONTACT_EMAIL_ROTATION_ENABLED", "true");
    expect(selectContactRecipient(branches, () => 0)).toBe("one@example.com");
    expect(selectContactRecipient(branches, () => 1)).toBe("two@example.com");
  });

  it("prefers a temporary recipient override", () => {
    vi.stubEnv("CONTACT_RECIPIENT_OVERRIDE", "override@example.com");
    expect(selectContactRecipient(branches, () => 0)).toBe("override@example.com");
  });

  it("selects one branch email for public contact displays", () => {
    expect(selectDisplayEmail(branches, () => 1)).toBe("two@example.com");
  });
});
