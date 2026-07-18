import { afterEach, describe, expect, it, vi } from "vitest";
import { selectContactRecipient } from "@/lib/contact-email-routing";
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
  it("rotates branch recipients every 30 seconds", () => {
    vi.stubEnv("CONTACT_EMAIL_ROTATION_ENABLED", "true");
    expect(selectContactRecipient(branches, 0)).toBe("one@example.com");
    expect(selectContactRecipient(branches, 30_000)).toBe("two@example.com");
  });

  it("prefers a temporary recipient override", () => {
    vi.stubEnv("CONTACT_RECIPIENT_OVERRIDE", "override@example.com");
    expect(selectContactRecipient(branches, 0)).toBe("override@example.com");
  });
});
