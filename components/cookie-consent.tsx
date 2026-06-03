"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const CONSENT_KEY = "ifem-cookie-consent";
export type ConsentValue = "accepted" | "declined";

/** Dispatch this event anywhere to re-open the banner (e.g. footer button) */
export const OPEN_EVENT = "ifem:open-cookie-consent";
/** Dispatched after the user makes a choice — analytics wrapper listens to this */
export const UPDATE_EVENT = "ifem:consent-updated";

export function getConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(CONSENT_KEY);
  return v === "accepted" || v === "declined" ? v : null;
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const hideTimer = useRef<number | null>(null);

  useEffect(() => {
    const id = window.setTimeout(() => {
      if (!getConsent()) {
        setMounted(true);
        // Next frame so the transition has a "from" state to animate from.
        requestAnimationFrame(() => setVisible(true));
      }
    }, 0);

    const open = () => {
      setMounted(true);
      requestAnimationFrame(() => setVisible(true));
    };
    window.addEventListener(OPEN_EVENT, open);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener(OPEN_EVENT, open);
    };
  }, []);

  const decide = (choice: ConsentValue) => {
    localStorage.setItem(CONSENT_KEY, choice);
    window.dispatchEvent(new Event(UPDATE_EVENT));
    setVisible(false);
    // Unmount after the slide-out finishes (300ms transition + buffer).
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => setMounted(false), 350);
  };

  if (!mounted) return null;

  return (
    <div
      data-visible={visible ? "true" : "false"}
      role="region"
      aria-label="Cookie consent"
      className={cn(
        "fixed bottom-0 left-0 right-0 z-[200] bg-cream border-t border-sage/30 shadow-[0_-4px_24px_rgba(0,0,0,0.06)]",
        "transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none",
        "data-[visible=true]:translate-y-0 data-[visible=true]:opacity-100",
        "data-[visible=false]:translate-y-full data-[visible=false]:opacity-0",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-charcoal mb-1">
            Analytics &amp; Site Performance
          </p>
          <p className="text-xs text-gray leading-relaxed max-w-2xl">
            We use anonymous, cookieless analytics to understand how visitors use this
            site. No personal data is collected or stored, and nothing is shared with
            third parties for advertising.{" "}
            <Link
              href="/privacy#cookies"
              className="text-forest-deep underline-offset-2 hover:underline focus-ring rounded-sm"
            >
              Read our Privacy Policy
            </Link>
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => decide("declined")}
            className="tap-target text-xs font-semibold text-charcoal/70 hover:text-charcoal transition-colors px-4 py-2.5 border border-sage/40 hover:border-charcoal/25 rounded-sm focus-ring"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => decide("accepted")}
            className="tap-target text-xs font-semibold bg-forest text-white px-5 py-2.5 hover:bg-forest/90 transition-colors rounded-sm focus-ring"
          >
            Accept Analytics
          </button>
        </div>
      </div>
    </div>
  );
}
