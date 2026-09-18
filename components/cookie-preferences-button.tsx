"use client";

import { Cookie } from "lucide-react";
import { OPEN_EVENT } from "@/components/cookie-consent";

export function CookiePreferencesButton() {
  const open = () => window.dispatchEvent(new Event(OPEN_EVENT));

  return (
    <button
      type="button"
      onClick={open}
      className="-my-1 flex h-9 items-center gap-1.5 rounded-md border border-white/15 bg-white/10 px-3 text-xs font-medium text-white/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-1px_0_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.12)] backdrop-blur-xl transition-[background-color,border-color,box-shadow,color,scale] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.96] hover:border-[#1a5c34]/70 hover:bg-white/20 hover:text-[#1a5c34] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.34),inset_0_-1px_0_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.24)] focus-ring-light"
    >
      <Cookie aria-hidden="true" className="h-3.5 w-3.5" />
      Cookie Preferences
    </button>
  );
}