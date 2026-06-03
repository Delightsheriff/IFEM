"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="flex items-start gap-4 border border-white/12 bg-white/6 p-6">
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sage" />
        <div>
          <p className="font-semibold text-white">You&apos;re subscribed.</p>
          <p className="mt-1 text-sm leading-relaxed text-white/55">
            We&apos;ll send you practical UK admission and visa updates. No spam — unsubscribe any time.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      className="flex flex-col gap-3 sm:flex-row"
      onSubmit={(e) => {
        e.preventDefault();
        if (!email.trim()) return;
        setSubmitted(true);
      }}
    >
      <label className="sr-only" htmlFor="newsletter-email">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        className="h-12 flex-1 border border-white/15 bg-white/8 px-4 text-sm font-medium text-white outline-none transition-colors placeholder:text-white/30 focus:border-sage/60 focus:ring-2 focus:ring-sage/10"
      />
      <button
        type="submit"
        className="inline-flex h-12 shrink-0 items-center justify-center gap-2 bg-forest px-6 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-forest/90 focus:outline-none focus:ring-2 focus:ring-forest/30"
      >
        Subscribe
        <ArrowRight className="h-4 w-4" />
      </button>
      <p className="sr-only" aria-live="polite" />
    </form>
  );
}
