import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-cream">
      {/* Main content */}
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-lg text-center">
          {/* Error code with elegant styling */}
          <div className="mb-6">
            <span className="font-serif text-[10rem] font-bold leading-none tracking-tight text-forest/10 md:text-[14rem]">
              404
            </span>
          </div>

          {/* Divider */}
          <div className="mx-auto mb-8 flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-sage" />
            <div className="h-2 w-2 rotate-45 border border-forest" />
            <div className="h-px w-12 bg-sage" />
          </div>

          {/* Text content */}
          <h1 className="mb-4 font-serif text-2xl font-semibold text-charcoal md:text-3xl">
            Page Not Found
          </h1>
          <p className="mx-auto mb-10 max-w-sm text-base leading-relaxed text-gray">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>

          {/* Actions */}
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-forest px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-forest/90"
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
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              Back to Home
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-sage/50 bg-white px-6 py-3 text-sm font-medium text-charcoal transition-colors hover:border-forest hover:text-forest"
            >
              Contact Support
            </Link>
          </div>

          {/* Quick links */}
          <div className="mt-16 border-t border-sage/30 pt-8">
            <p className="mb-4 text-xs font-medium uppercase tracking-wider text-gray">
              Quick Links
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {[
                { href: "/about", label: "About" },
                { href: "/guides", label: "Guides" },
                { href: "/success-stories", label: "Success Stories" },
                { href: "/faq", label: "FAQ" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-charcoal underline-offset-4 transition-colors hover:text-forest hover:underline"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
