import { Button } from "@/components/ui/button";
import { UniversityCard } from "@/components/ui/university-card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { UKUniversity } from "@/interface/sanity";

interface PartnerUniversitiesProps {
  universities: UKUniversity[];
  partnerCount: number;
}

export function PartnerUniversities({ universities, partnerCount }: PartnerUniversitiesProps) {
  const marqueeList = [...universities, ...universities];

  return (
    <section className="bg-white px-6 py-24 md:py-28 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div data-reveal="fade-up">
            <p className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a5c34]">
              <span className="h-px w-6 bg-[#1a5c34]" />
              Our Network
            </p>
            <h2
              className="font-sans font-extrabold leading-[1.08] tracking-tight text-[#111111]"
              style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}
            >
              {partnerCount}+ Partner{" "}
              <span className="text-[#1a5c34]">Universities</span>
            </h2>
          </div>
          <p
            className="max-w-xs text-[0.95rem] leading-[1.7] text-[#7a7a7a] lg:text-right"
            data-reveal="fade-in"
            style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}
          >
            Direct partnerships mean faster offers and better outcomes.
          </p>
        </div>

        <div
          className="relative overflow-hidden rounded-xl border border-[#e2e2de] bg-[#fafaf7] py-6"
          data-reveal="fade-up"
          style={{ "--reveal-delay": "0.2s" } as React.CSSProperties}
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#fafaf7] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#fafaf7] to-transparent" />
          <div className="animate-marquee gap-4 px-4" style={{ display: "flex" }}>
            {marqueeList.map((uni, i) => (
              <div key={`${uni._id}-${i}`} className="shrink-0 transition-all duration-200">
                <UniversityCard university={uni} />
              </div>
            ))}
          </div>
        </div>

        <div
          className="mt-8 text-center"
          data-reveal="fade-up"
          style={{ "--reveal-delay": "0.3s" } as React.CSSProperties}
        >
          <Button asChild variant="outline" size="lg">
            <Link href="/institutions">
              View All Partner Institutions
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
