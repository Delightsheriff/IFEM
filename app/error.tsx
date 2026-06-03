"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight, RotateCw, Home, HelpCircle, BookOpen, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const RECOVERY_LINKS = [
  { href: "/faq", label: "Check the FAQ", icon: HelpCircle },
  { href: "/guides", label: "Browse guides", icon: BookOpen },
  { href: "/contact", label: "Talk to us", icon: Mail },
];

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-2xl text-center">
          <div className="mb-6">
            <span
              aria-hidden="true"
              className="font-serif text-[10rem] font-bold leading-none tracking-tight text-terracotta/15 md:text-[14rem]"
            >
              500
            </span>
          </div>

          <h1 className="mb-4 font-serif text-2xl font-semibold text-charcoal md:text-3xl">
            Something Went Wrong
          </h1>
          <p className="mx-auto mb-10 max-w-md text-base leading-relaxed text-gray">
            We hit an unexpected error. Try again, or take one of the routes
            below — we&apos;re here either way.
          </p>

          <div className="mb-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button variant="primary" size="lg" onClick={reset}>
              <RotateCw aria-hidden="true" />
              Try Again
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/">
                <Home aria-hidden="true" />
                Back to Home
              </Link>
            </Button>
          </div>

          <div className="grid gap-3 text-left sm:grid-cols-3">
            {RECOVERY_LINKS.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-center justify-between border border-sage/25 bg-white p-4 text-sm font-semibold text-charcoal transition-colors hover:border-forest/40 hover:bg-cream/50 focus-ring rounded-sm"
              >
                <span className="flex items-center gap-2">
                  <Icon aria-hidden="true" className="h-4 w-4 text-forest-deep" />
                  {label}
                </span>
                <ArrowRight aria-hidden="true" className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>

          {error?.digest && (
            <p className="mt-12 text-[10px] uppercase tracking-widest text-gray/60">
              Error Ref: {error.digest}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
