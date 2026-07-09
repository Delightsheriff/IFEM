"use client";

import { useId, useMemo, useState } from "react";
import Image from "next/image";
import { MapPin, ArrowRight, Filter, Quote } from "lucide-react";
import { SuccessStory } from "@/interface/sanity";
import { getStoryImageUrl } from "@/lib/image-utils";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { Button } from "@/components/ui/button";
import StorySpotlight from "./story-spotlight";

interface StudentJourneyProps {
  stories: SuccessStory[];
}

const ALL = "__all__";

export default function StudentJourney({ stories }: StudentJourneyProps) {
  const selectId = useId();
  const [selectedStory, setSelectedStory] = useState<SuccessStory | null>(null);
  const [destination, setDestination] = useState<string>(ALL);

  // Unique destination list. Only built when stories change.
  const destinations = useMemo(() => {
    const set = new Set<string>();
    for (const s of stories) {
      if (s.schoolDestination) set.add(s.schoolDestination);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [stories]);

  const filtered = useMemo(
    () =>
      destination === ALL
        ? stories
        : stories.filter((s) => s.schoolDestination === destination),
    [stories, destination],
  );

  if (stories.length === 0) return null;

  const featured = filtered[0];
  const others = filtered.slice(1, 7);
  const isFiltered = destination !== ALL;

  return (
    <>
      <section className="bg-[#fafaf7] py-24 md:py-32">
        <div className="px-4 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">

            <div className="text-center mb-12" data-reveal="fade-up">
              <p className="mb-4 flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a5c34]">
                <span className="h-px w-6 bg-[#1a5c34]" />
                Student Journeys
                <span className="h-px w-6 bg-[#1a5c34]" />
              </p>
              <h2
                className="font-sans font-extrabold tracking-tight text-[#111111] leading-[1.06]"
                style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}
              >
                1,800{" "}
                <span className="text-[#1a5c34]">Lives Changed</span>
              </h2>
              <p className="mt-4 mx-auto max-w-2xl text-base leading-relaxed text-[#7a7a7a]">
                Real stories from students who transformed their lives through
                UK education. Every journey is unique — but they all start with
                one step.
              </p>
            </div>

            {/* Destination filter */}
            {destinations.length > 1 && (
              <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <label
                  htmlFor={selectId}
                  className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-forest"
                >
                  <Filter className="w-3.5 h-3.5" aria-hidden="true" />
                  Filter by destination
                </label>
                <div className="flex items-center gap-3">
                  <select
                    id={selectId}
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="rounded-lg border border-[#e2e2de] bg-white px-3 py-2 text-sm text-[#111111] focus:border-[#1a5c34] focus:outline-none min-w-[14rem]"
                  >
                    <option value={ALL}>All destinations ({stories.length})</option>
                    {destinations.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                  {isFiltered && (
                    <button
                      type="button"
                      onClick={() => setDestination(ALL)}
                      className="text-xs font-semibold text-forest hover:text-forest-deep focus-ring rounded-sm tap-target"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Empty after filter */}
            {filtered.length === 0 && (
              <div className="mb-8 rounded-xl border border-[#e2e2de] bg-white p-10 text-center">
                <p className="mb-2 font-sans text-xl font-bold text-[#111111]">
                  No stories from {destination} yet
                </p>
                <p className="mb-4 text-sm text-[#7a7a7a]">
                  Try a different destination, or reach out — we&apos;ve placed
                  students across 40+ UK institutions.
                </p>
                <button
                  type="button"
                  onClick={() => setDestination(ALL)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-forest hover:bg-forest-deep transition-colors focus-ring"
                >
                  Show all stories
                </button>
              </div>
            )}

            {/* Featured story */}
            {featured && (
              <button
                type="button"
                className="group mb-8 block w-full overflow-hidden rounded-2xl border border-[#e2e2de] bg-white text-left shadow-[0_2px_12px_rgba(0,0,0,0.05)] transition-all duration-200 hover:border-[#1a5c34]/20 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] focus-ring"
                onClick={() => setSelectedStory(featured)}
              >
                <div className="grid md:grid-cols-2">
                  {/* Image panel */}
                  <div className="relative h-72 overflow-hidden bg-[#e8f3ec] md:h-96">
                    <Image
                      src={getStoryImageUrl(featured)}
                      alt={featured.studentName}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d3320]/50 to-transparent md:bg-gradient-to-r" />
                    <div className="absolute inset-y-0 left-0 w-1 bg-[#1a5c34]" />
                    {/* Destination badge */}
                    <div className="absolute bottom-4 left-6 flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 shadow-sm">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-[#1a5c34]" />
                      <span className="text-xs font-semibold tracking-wide text-[#111111]">
                        {featured.schoolDestination}
                      </span>
                    </div>
                  </div>

                  {/* Content panel */}
                  <div className="flex flex-col justify-center bg-white p-8 md:p-12">
                    <Quote className="mb-4 h-8 w-8 text-[#1a5c34]/15" aria-hidden="true" />
                    <blockquote className="mb-8 border-l-4 border-[#1a5c34] pl-6 font-sans text-xl italic leading-relaxed text-[#3d3d3d] md:text-2xl">
                      &ldquo;{featured.comment}&rdquo;
                    </blockquote>

                    <div className="mt-auto flex items-center justify-between border-t border-[#e2e2de] pt-6">
                      <div>
                        <p className="text-sm font-semibold text-[#111111]">{featured.studentName}</p>
                        <p className="mt-0.5 text-xs uppercase tracking-wide text-[#7a7a7a]">IFEM Student</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-[#1a5c34] transition-all group-hover:gap-3">
                        Read full story
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            )}

            {/* Other stories grid */}
            {others.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {others.map((story) => (
                  <button
                    key={story._id}
                    type="button"
                    className="group w-full rounded-xl border border-[#e2e2de] bg-white p-6 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1a5c34]/20 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] focus-ring"
                    onClick={() => setSelectedStory(story)}
                  >
                      {/* Student header */}
                      <div className="mb-5 flex items-start gap-4">
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-[#e8f3ec]">
                          <Image
                            src={getStoryImageUrl(story)}
                            alt={story.studentName}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                        <div className="min-w-0 flex-1 pt-0.5">
                          <p className="truncate text-sm font-semibold leading-snug text-[#111111]">
                            {story.studentName}
                          </p>
                          <div className="mt-0.5 flex items-center gap-1.5 text-xs text-[#7a7a7a]">
                            <MapPin className="h-3 w-3 shrink-0 text-[#1a5c34]" />
                            <span className="truncate">{story.schoolDestination}</span>
                          </div>
                        </div>
                      </div>

                      {/* Quote */}
                      <blockquote className="mb-5 line-clamp-3 border-l-2 border-[#1a5c34]/30 pl-3 text-sm italic leading-relaxed text-[#7a7a7a]">
                        &ldquo;{story.comment}&rdquo;
                      </blockquote>

                      {/* Read more */}
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#1a5c34] transition-all group-hover:gap-3">
                        Read full story
                        <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                  </button>
                ))}
              </div>
            )}

            {stories.length > 7 && (
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  View All Success Stories
                  <ArrowRight aria-hidden="true" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {selectedStory && (
        <StorySpotlight
          story={selectedStory}
          onClose={() => setSelectedStory(null)}
        />
      )}
    </>
  );
}
