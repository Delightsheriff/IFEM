"use client";

import { ArrowRight, CheckCircle2, Mail } from "lucide-react";
import { useState } from "react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="mt-8 flex flex-col gap-3 sm:flex-row"
      onSubmit={(event) => {
        event.preventDefault();
        if (!email.trim()) return;
        setSubmitted(true);
      }}
    >
      <label className="sr-only" htmlFor="newsletter-email">
        Email address
      </label>
      <div className="relative flex-1">
        <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-forest/55" />
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
          className="h-13 w-full border border-sage/25 bg-white pl-11 pr-4 text-sm font-medium text-charcoal outline-none transition-colors placeholder:text-gray/60 focus:border-forest focus:ring-4 focus:ring-forest/10"
        />
      </div>
      <button
        type="submit"
        className="inline-flex h-13 items-center justify-center gap-2 bg-forest px-6 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-forest/90 focus:outline-none focus:ring-4 focus:ring-forest/20"
      >
        Subscribe
        {submitted ? <CheckCircle2 className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
      </button>
      <p className="sr-only" aria-live="polite">
        {submitted ? "Thank you for subscribing to the newsletter." : ""}
      </p>
    </form>
  );
}
