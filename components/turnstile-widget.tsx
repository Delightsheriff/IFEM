"use client";

import { useEffect, useRef, useState } from "react";
import { AlertTriangle } from "lucide-react";

interface TurnstileOptions {
  sitekey: string;
  action: string;
  theme: "light" | "dark" | "auto";
  size: "normal" | "compact" | "flexible";
  callback: (token: string) => void;
  "expired-callback": () => void;
  "error-callback": (errorCode?: string) => void;
}

interface TurnstileApi {
  render: (container: HTMLElement, options: TurnstileOptions) => string;
  remove: (widgetId: string) => void;
  reset: (widgetId: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

interface TurnstileWidgetProps {
  siteKey: string;
  resetKey: number;
  onTokenChange: (token: string | null) => void;
}

const SCRIPT_ID = "cloudflare-turnstile-script";
const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

// Cloudflare error codes worth a friendlier message than "something broke".
// https://developers.cloudflare.com/turnstile/troubleshooting/client-side-errors/error-codes/
function describeError(errorCode?: string): string {
  if (errorCode?.startsWith("1102")) {
    return "Security check isn't set up for this domain yet.";
  }
  if (errorCode === "600010") {
    return "Security check is temporarily unavailable.";
  }
  return "Security check failed to load. Please refresh, or email us directly if this keeps happening.";
}

export function TurnstileWidget({ siteKey, resetKey, onTokenChange }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderWidget = () => {
      if (!window.turnstile || widgetIdRef.current) return;

      widgetIdRef.current = window.turnstile.render(container, {
        sitekey: siteKey,
        action: "contact",
        theme: "light",
        size: "flexible",
        callback: (token) => {
          setError(null);
          onTokenChange(token);
        },
        "expired-callback": () => onTokenChange(null),
        "error-callback": (errorCode) => {
          console.error("[Cloudflare Turnstile] Failed to render:", errorCode);
          setError(describeError(errorCode));
          onTokenChange(null);
        },
      });
    };

    const existingScript = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    const script = existingScript ?? document.createElement("script");

    if (!existingScript) {
      script.id = SCRIPT_ID;
      script.src = SCRIPT_SRC;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    if (window.turnstile) {
      renderWidget();
    } else {
      script.addEventListener("load", renderWidget);
    }

    return () => {
      script.removeEventListener("load", renderWidget);
      if (widgetIdRef.current) {
        window.turnstile?.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [onTokenChange, siteKey]);

  useEffect(() => {
    if (resetKey > 0 && widgetIdRef.current) {
      window.turnstile?.reset(widgetIdRef.current);
    }
  }, [resetKey]);

  return (
    <div>
      <div ref={containerRef} aria-label="Security verification" />
      {error ? (
        <p
          role="alert"
          className="mt-2 flex items-start gap-1.5 text-xs text-terracotta"
        >
          <AlertTriangle aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      ) : null}
    </div>
  );
}
