import { NewsletterSignup } from "@/components/newsletter-signup";

export function NewsletterSection() {
  return (
    <section className="bg-[#0d3320] px-6 py-20 md:py-24 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-end lg:gap-20">
          <div data-reveal="fade-up">
            <p className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#6fa572]">
              <span className="h-px w-6 bg-[#6fa572]" />
              Stay Informed
            </p>
            <h2
              className="mb-4 font-sans font-extrabold leading-tight tracking-tight text-white"
              style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}
            >
              UK admission updates,
              <br />
              every month.
            </h2>
            <p className="text-[1rem] leading-[1.75] text-white/50">
              Practical visa tips, funding news, and student-life guidance. No spam.
            </p>
          </div>
          <div
            data-reveal="fade-up"
            style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}
          >
            <NewsletterSignup />
          </div>
        </div>
      </div>
    </section>
  );
}
