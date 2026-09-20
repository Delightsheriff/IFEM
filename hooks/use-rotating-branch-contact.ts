"use client";

import { useEffect, useState } from "react";
import type { Branch } from "@/interface/sanity";
import {
  getBranchContacts,
  getRandomBranchContactIndex,
  type BranchContact,
} from "@/lib/branch-contacts";

const ROTATION_INTERVAL_MS = 30_000;

export function useRotatingBranchContact(
  branches: Branch[],
): BranchContact | null {
  const contacts = getBranchContacts(branches);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (contacts.length === 0) return;

    const updateContact = () =>
      setIndex((currentIndex) =>
        getRandomBranchContactIndex(contacts.length, Math.random, currentIndex),
      );
    const initialUpdate = window.setTimeout(updateContact, 0);
    const interval = window.setInterval(updateContact, ROTATION_INTERVAL_MS);

    return () => {
      window.clearTimeout(initialUpdate);
      window.clearInterval(interval);
    };
  }, [contacts.length]);

  return contacts[index % contacts.length] ?? null;
}
