import { Suspense } from "react";
import ContactForm from "@/components/contact-form";
import { Clock, ShieldCheck, MapPin } from "lucide-react";

export function HeroFormSection() {
  return (
    <section className="border-b border-[#e2e2de] bg-[#fafaf7]">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-10 md:py-24">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">

          <div data-reveal="fade-up">
            <p className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a5c34]">
              <span className="h-px w-6 bg-[#1a5c34]" />
              Get In Touch
            </p>
            <h1
              className="mb-5 font-sans font-extrabold leading-[1.04] tracking-[-0.025em] text-[#111111]"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
            >
              <span className="hero-blur-1 block">Let&apos;s Start</span>
              <span className="hero-blur-2 block text-[#1a5c34]">Your Journey</span>
            </h1>
            <p className="mb-8 max-w-lg text-[1rem] leading-[1.75] text-[#5a5a5a] md:text-[1.05rem]">
              Have questions about our programmes? Our team of expert counsellors is here to
              help you find the perfect UK university — at no cost to you.
            </p>

            <ul className="space-y-4 text-sm">
              {[
                {
                  icon: Clock,
                  strong: "One-business-day response.",
                  rest: "Every enquiry is read by a counsellor, not a bot.",
                },
                {
                  icon: ShieldCheck,
                  strong: "Free and confidential.",
                  rest: "We never charge students for admission or visa processing.",
                },
                {
                  icon: MapPin,
                  isLink: true,
                },
              ].map((item, i) =>
                item.isLink ? (
                  <li key={i} className="flex items-start gap-3">
                    <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-[#1a5c34]" aria-hidden="true" />
                    <span className="text-[#5a5a5a]">
                      Prefer to visit?{" "}
                      <a
                        href="#branches"
                        className="font-semibold text-[#1a5c34] underline underline-offset-2 hover:text-[#154a2a]"
                      >
                        See full directions &amp; opening hours
                      </a>
                      .
                    </span>
                  </li>
                ) : (
                  <li key={i} className="flex items-start gap-3">
                    <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-[#1a5c34]" aria-hidden="true" />
                    <span className="text-[#5a5a5a]">
                      <strong className="font-semibold text-[#111111]">{item.strong}</strong>{" "}
                      {item.rest}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>

          <div
            data-reveal="fade-up"
            style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}
          >
            <Suspense fallback={<div className="min-h-[640px]" />}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
