import Link from "next/link";

export function HeroSection() {
  return (
    <div className="border-b border-[#e2e2de] bg-[#fafaf7]">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-10 md:py-16">
        <div className="max-w-2xl" data-reveal="fade-up">
          <p className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a5c34]">
            <span className="h-px w-6 bg-[#1a5c34]" />
            Support
          </p>
          <h1
            className="mb-4 font-sans font-extrabold leading-[1.04] tracking-[-0.025em] text-[#111111]"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
          >
            <span className="hero-blur-1 block">Frequently Asked</span>
            <span className="hero-blur-2 block text-[#1a5c34]">Questions</span>
          </h1>
          <p className="text-[1rem] leading-[1.75] text-[#686868]">
            Find answers to common questions about IFEM, our services, and
            your education journey. Can&apos;t find what you&apos;re looking
            for?{" "}
            <Link
              href="/contact"
              className="font-semibold text-[#1a5c34] underline-offset-2 hover:underline transition-colors"
            >
              Contact us directly.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
