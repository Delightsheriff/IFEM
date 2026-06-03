"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { CONSENT_KEY, UPDATE_EVENT } from "@/components/cookie-consent";

// Lazy-load after paint — keeps them out of the critical JS bundle
const Analytics = dynamic(
  () => import("@vercel/analytics/next").then((m) => m.Analytics),
  { ssr: false }
);
const SpeedInsights = dynamic(
  () => import("@vercel/speed-insights/next").then((m) => m.SpeedInsights),
  { ssr: false }
);

function isConsented() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(CONSENT_KEY) === "accepted";
}

export function AnalyticsWrapper() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    const sync = () => setConsented(isConsented());
    const id = window.setTimeout(sync, 0);

    window.addEventListener(UPDATE_EVENT, sync);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener(UPDATE_EVENT, sync);
    };
  }, []);

  return (
    <>
      <Analytics beforeSend={(event) => (isConsented() ? event : null)} />
      {consented && <SpeedInsights />}
    </>
  );
}
