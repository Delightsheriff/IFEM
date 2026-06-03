"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useId, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterSignup() {
  const formId = useId();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  if (submitted) {
    return (
      <div className="flex items-start gap-4 border border-white/15 bg-white/[0.06] p-6" role="status">
        <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-sage" />
        <div>
          <p className="font-semibold text-white">You&apos;re subscribed.</p>
          <p className="mt-1 text-sm leading-relaxed text-white/70">
            Watch your inbox for practical UK admission and visa updates. No spam — unsubscribe any time.
          </p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = email.trim();
    if (!trimmed) {
      setError("Please enter your email address.");
      return;
    }
    if (!EMAIL_RE.test(trimmed)) {
      setError("That email doesn't look right.");
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, honeypot }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        const msg = data.error ?? "Something went wrong. Please try again.";
        setError(msg);
        toast.error(msg);
        return;
      }

      toast.success("You're subscribed. Watch your inbox.");
      setSubmitted(true);
    } catch {
      setError("Network error. Please try again.");
      toast.error("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputErrorId = error ? `${formId}-error` : undefined;

  return (
    <form className="flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit} noValidate>
      {/* Honeypot */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor={`${formId}-website`}>Website</label>
        <input
          id={`${formId}-website`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <label className="sr-only" htmlFor={`${formId}-email`}>
        Email address
      </label>
      <div className="flex-1">
        <input
          id={`${formId}-email`}
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError(null);
          }}
          aria-invalid={error ? true : undefined}
          aria-describedby={inputErrorId}
          placeholder="Your email address"
          className={cn(
            "h-12 w-full border bg-white/[0.08] px-4 text-sm font-medium text-white outline-none transition-colors placeholder:text-white/40 focus-ring-light",
            error ? "border-terracotta/70" : "border-white/20 focus:border-sage/60",
          )}
        />
        {error && (
          <p id={inputErrorId} className="mt-1.5 text-xs text-terracotta/90">
            {error}
          </p>
        )}
      </div>
      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={submitting}
        loadingText="Subscribing..."
        className="shrink-0"
      >
        Subscribe
        <ArrowRight aria-hidden="true" />
      </Button>
    </form>
  );
}
