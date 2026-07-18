import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarDays, Check, ChevronRight } from "lucide-react";
import Link from "next/link";
import type { HomeHeroSlide } from "@/interface/sanity";
import { HeroBackgroundCarousel } from "./HeroBackgroundCarousel";

const FALLBACK_SLIDES: HomeHeroSlide[] = [
  { url: "/hero-student.jpg" },
  { url: "/section-students.jpg" },
  { url: "/section-graduate.jpg" },
];

export function HeroSection({ slides = [] }: { slides?: HomeHeroSlide[] }) {
  const heroSlides = slides.length > 0 ? slides : FALLBACK_SLIDES;
  return (
    <section className="relative min-h-[76svh] overflow-hidden bg-[#0d3320] lg:min-h-[92vh]">
      <HeroBackgroundCarousel
        slides={heroSlides}
        sizes="100vw"
        className="absolute inset-0"
      />

      <div className="relative z-10 flex min-h-[76svh] max-w-4xl flex-col justify-center px-6 py-20 md:px-12 lg:min-h-[92vh] lg:px-16 lg:py-24 xl:px-20">
        <h1
          className="mb-6 font-sans font-extrabold leading-[1.02] tracking-[-0.03em] text-white"
          style={{ fontSize: "clamp(2.2rem, 5.5vw, 4.75rem)" }}
        >
          <span
            data-reveal="fade-up"
            style={{ "--reveal-delay": "0.05s" } as React.CSSProperties}
            className="block"
          >
            Helping African Students
          </span>
          <span
            data-reveal="fade-up"
            style={{ "--reveal-delay": "0.12s" } as React.CSSProperties}
            className="block"
          >
            Secure Admission Into
          </span>
          <span
            data-reveal="fade-up"
            style={{ "--reveal-delay": "0.19s" } as React.CSSProperties}
            className="block"
          >
            <span className="text-[#bde9c7]">UK Universities.</span>
          </span>
        </h1>

        <p
          className="mb-10 max-w-[30rem] text-[1.05rem] leading-[1.75] text-white/82"
          data-reveal="fade-up"
          style={{ "--reveal-delay": "0.28s" } as React.CSSProperties}
        >
          Expert counselling, seamless applications, and UK visa support — all
          provided{" "}
          <strong className="font-semibold text-white">
            completely free of charge.
          </strong>{" "}
          Trusted by over 1,800 students across Africa.
        </p>

        <div
          className="mb-12 flex flex-wrap items-center gap-3"
          data-reveal="fade-up"
          style={{ "--reveal-delay": "0.36s" } as React.CSSProperties}
        >
          <Button
            asChild
            variant="primary"
            size="lg"
            className="shadow-[0_4px_18px_rgba(26,92,52,0.28)] hover:shadow-[0_6px_24px_rgba(26,92,52,0.38)]"
          >
            <Link href="/contact">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              Book a Free Consultation
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="lg"
            className="border border-white/25 bg-white/8 text-white hover:border-white/50 hover:bg-white/16 hover:text-white"
          >
            <Link href="/success-stories">
              Read Student Stories
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <div
          className="flex flex-wrap gap-y-2 gap-x-6 text-[12px] font-medium text-white/75"
          data-reveal="fade-in"
          style={{ "--reveal-delay": "0.4s" } as React.CSSProperties}
        >
          {[
            "No fees to students, ever",
            "47+ UK university partners",
            "Est. 2022 in Enugu, Nigeria",
          ].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <Check
                className="h-3.5 w-3.5 text-[#bde9c7]"
                aria-hidden="true"
              />
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
