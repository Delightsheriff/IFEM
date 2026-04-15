"use client";

import { OPEN_EVENT } from "@/components/cookie-consent";

export function CookiePreferencesButton() {
  const open = () => window.dispatchEvent(new Event(OPEN_EVENT));

  return (
    <button
      type="button"
      onClick={open}
      className="text-xs text-white/35 transition-colors hover:text-white"
    >
      Cookie Preferences
    </button>
  );
}
