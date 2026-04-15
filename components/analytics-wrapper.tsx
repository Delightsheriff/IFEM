"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CONSENT_KEY, UPDATE_EVENT } from "@/components/cookie-consent";

function isConsented() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(CONSENT_KEY) === "accepted";
}

export function AnalyticsWrapper() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    setConsented(isConsented());

    const handle = () => setConsented(isConsented());
    window.addEventListener(UPDATE_EVENT, handle);
    return () => window.removeEventListener(UPDATE_EVENT, handle);
  }, []);

  return (
    <>
      <Analytics beforeSend={(event) => (isConsented() ? event : null)} />
      {consented && <SpeedInsights />}
    </>
  );
}
