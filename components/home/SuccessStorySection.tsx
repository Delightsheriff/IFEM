import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Quote, Star } from "lucide-react";
import CountUp from "@/components/animations/CountUp";
import type { SuccessStory } from "@/interface/sanity";

interface SuccessStorySectionProps {
  spotlightStory: SuccessStory | null;
  stats: {
    studentsPlaced: number;
    successRate: number;
  };
}

export function SuccessStorySection({ spotlightStory, stats }: SuccessStorySectionProps) {
  return (
    <section className="bg-[#f3f3ef] px-6 py-24 md:py-32 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-12">

          {spotlightStory ? (
            <div
              className="group relative min-h-[26rem] overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] lg:min-h-[32rem]"
              data-reveal="fade-up"
            >
              <Image
                src={spotlightStory.studentImage?.url ?? "/section-graduate.jpg"}
                alt={spotlightStory.studentImage?.alt ?? spotlightStory.studentName}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-[50%_20%] transition-transform duration-[6s] group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(13,51,32,0.92) 0%, rgba(13,51,32,0.4) 55%, transparent 100%)" }}
              />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <Quote aria-hidden="true" className="mb-3 h-7 w-7 rotate-180 text-white/20" />
                <blockquote className="mb-5 font-sans text-lg font-medium italic leading-[1.65] text-white md:text-[1.15rem]">
                  {spotlightStory.comment}
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-0.5 rounded-full bg-[#a8824f]" />
                  <div>
                    <p className="text-sm font-semibold text-white">{spotlightStory.studentName}</p>
                    <p className="text-xs text-white/50">{spotlightStory.schoolDestination}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="flex min-h-[26rem] items-center justify-center rounded-2xl border border-[#e2e2de] bg-white"
              data-reveal="fade-up"
            >
              <p className="text-sm text-[#686868]">Stories coming soon</p>
            </div>
          )}

          <div
            className="flex flex-col justify-center gap-8"
            data-reveal="fade-up"
            style={{ "--reveal-delay": "0.12s" } as React.CSSProperties}
          >
            <div>
              <p className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a5c34]">
                <span className="h-px w-6 bg-[#1a5c34]" />
                Success Stories
              </p>
              <h2
                className="mb-5 font-sans font-extrabold leading-[1.08] tracking-tight text-[#111111]"
                style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}
              >
                Real Students.
                <br />
                Real Results.
              </h2>
              <p className="mb-4 text-[1rem] leading-[1.75] text-[#5a5a5a]">
                From Enugu to Edinburgh, Lagos to London — over 1,800 African students
                have trusted IFEM to get them into their dream UK university.
              </p>
              <p className="text-[1rem] leading-[1.75] text-[#686868]">
                Our 99.6% visa success rate represents real families whose futures
                changed because they chose to trust us.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-[#e2e2de] pt-6">
              {[
                { num: stats.studentsPlaced, suffix: "+", label: "Students placed" },
                { num: stats.successRate,    suffix: "%", label: "Visa success rate" },
              ].map(({ num, suffix, label }) => (
                <div key={label}>
                  <p className="font-sans text-3xl font-extrabold leading-none text-[#1a5c34]">
                    <CountUp to={num} duration={2} />{suffix}
                  </p>
                  <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-widest text-[#686868]">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#a8824f] text-[#a8824f]" aria-hidden="true" />
                ))}
              </div>
              <span className="text-sm font-medium text-[#686868]">Highly rated by students</span>
            </div>

            <Link
              href="/success-stories"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#1a5c34] hover:text-[#154a2a] transition-colors"
            >
              Read all student stories
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
