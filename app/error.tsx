"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to error tracking service in production
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-lg text-center">
          {/* Error code backdrop */}
          <div className="mb-6">
            <span className="font-serif text-[10rem] font-bold leading-none tracking-tight text-terracotta/10 md:text-[14rem]">
              500
            </span>
          </div>

          {/* Text content */}
          <h1 className="mb-4 font-serif text-2xl font-semibold text-charcoal md:text-3xl">
            Something Went Wrong
          </h1>
          <p className="mx-auto mb-10 max-w-sm text-base leading-relaxed text-gray">
            We encountered an unexpected error. Please try refreshing the page
            or returning home.
          </p>

          {/* Actions */}
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <button
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-forest px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-forest/90"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
              Try Again
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-sage/50 bg-white px-8 py-3 text-sm font-medium text-charcoal transition-colors hover:border-forest hover:text-forest"
            >
              Back to Home
            </Link>
          </div>

          {/* Minimal Error ID */}
          {error?.digest && (
            <p className="mt-12 text-[10px] uppercase tracking-widest text-gray/40">
              Error Ref: {error.digest}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
