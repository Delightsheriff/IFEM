import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const JOURNEY_STEPS = [
  {
    num: "01",
    title: "Free Consultation",
    desc: "Talk to an expert counsellor about your goals — no cost, no commitment.",
  },
  {
    num: "02",
    title: "University Matching",
    desc: "We identify the right UK programmes and institutions for your profile.",
  },
  {
    num: "03",
    title: "Application & Visa",
    desc: "From admissions to visa applications, we meticulously vet every document and form on your behalf.",
  },
  {
    num: "04",
    title: "Departure Ready",
    desc: "From biometrics to flight booking — fully prepared for UK life.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-white px-6 py-24 md:py-32 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div data-reveal="fade-up">
            <p className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a5c34]">
              <span className="h-px w-6 bg-[#1a5c34]" />
              How It Works
            </p>
            <h2
              className="font-sans font-extrabold leading-[1.08] tracking-tight text-[#111111]"
              style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}
            >
              From First Call to
              <br />
              <span className="text-[#1a5c34]">UK Arrival</span>
            </h2>
          </div>
          <p
            className="max-w-xs text-[0.95rem] leading-[1.7] text-[#7a7a7a] lg:text-right"
            data-reveal="fade-in"
            style={{ "--reveal-delay": "0.15s" } as React.CSSProperties}
          >
            A clear, guided process that removes the stress from studying abroad.
          </p>
        </div>

        <div className="relative grid gap-px bg-[#e2e2de] sm:grid-cols-2 lg:grid-cols-4">
          {JOURNEY_STEPS.map((step, i) => (
            <div
              key={step.num}
              className="group relative flex flex-col gap-6 bg-white p-8 transition-colors duration-200 hover:bg-[#fafaf7]"
              data-reveal="fade-up"
              style={{ "--reveal-delay": `${i * 0.08}s` } as React.CSSProperties}
            >
              <div className="flex items-center justify-between">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0d3320] font-sans text-[11px] font-bold text-white">
                  {step.num}
                </span>
                <span
                  aria-hidden="true"
                  className="font-sans text-[3.5rem] font-extrabold leading-none tracking-tighter text-[#f3f3ef] transition-colors duration-200 group-hover:text-[#e8f3ec]"
                >
                  {step.num}
                </span>
              </div>
              <div>
                <h3 className="mb-2 font-sans text-[15px] font-semibold leading-snug text-[#111111]">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#7a7a7a]">{step.desc}</p>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-[#1a5c34] transition-transform duration-300 group-hover:scale-x-100" />
            </div>
          ))}
        </div>

        <div
          className="mt-10"
          data-reveal="fade-up"
          style={{ "--reveal-delay": "0.35s" } as React.CSSProperties}
        >
          <Button asChild variant="primary" size="lg">
            <Link href="/contact">
              Start Your Journey Today
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
