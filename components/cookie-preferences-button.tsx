"use client";

import { OPEN_EVENT } from "@/components/cookie-consent";

export function CookiePreferencesButton() {
  const open = () => window.dispatchEvent(new Event(OPEN_EVENT));

  return (
    <button
      type="button"
      onClick={open}
      className="text-xs text-white/55 transition-colors hover:text-white hover:underline underline-offset-4 focus-ring-light rounded-sm"
    >
      Cookie Preferences
    </button>
  );
}
