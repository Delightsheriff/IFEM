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

          {/* Text content */}
          <h1 className="mb-4 font-serif text-2xl font-semibold text-charcoal md:text-3xl">
            Page Not Found
          </h1>
          <p className="mx-auto mb-10 max-w-sm text-base leading-relaxed text-gray">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>

          {/* Actions */}
          <div className="flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-forest px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-forest/90 tracking-wide"
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
          </div>
        </div>
      </main>
    </div>
  );
}
