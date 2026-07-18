"use client";

import { useEffect, useState } from "react";
import type { BranchPhone } from "@/interface/sanity";

const ROTATION_INTERVAL_MS = 30_000;

function getPhoneIndex(phoneCount: number): number {
  return Math.floor(Date.now() / ROTATION_INTERVAL_MS) % phoneCount;
}

export function useRotatingBranchPhone(
  phones: readonly BranchPhone[],
): BranchPhone | null {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (phones.length === 0) return;

    const updatePhone = () => setIndex(getPhoneIndex(phones.length));
    const initialUpdate = window.setTimeout(updatePhone, 0);
    const interval = window.setInterval(updatePhone, ROTATION_INTERVAL_MS);

    return () => {
      window.clearTimeout(initialUpdate);
      window.clearInterval(interval);
    };
  }, [phones]);

  return phones[index % phones.length] ?? null;
}
