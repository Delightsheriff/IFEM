"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { SuccessStory } from "@/interface/sanity";
import StorySpotlight from "./story-spotlight";

interface JourneyScrollProps {
  stories: SuccessStory[];
}

function getImageUrl(story: SuccessStory): string {
  return (
    story.studentImage?.url ||
    story.studentImage?.asset?.url ||
    "/placeholder.svg?height=800&width=600"
  );
}

export default function JourneyScroll({ stories }: JourneyScrollProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedStory, setSelectedStory] = useState<SuccessStory | null>(null);

  if (stories.length === 0) return null;

  // Update scroll progress & active card index
  const handleScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;
    setProgress(maxScroll > 0 ? scrollLeft / maxScroll : 0);
    const cardWidth = el.scrollWidth / stories.length;
    setActiveIndex(Math.round(scrollLeft / cardWidth));
  }, [stories.length]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Mouse-wheel → horizontal scroll
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      const rect = el.getBoundingClientRect();
      if (rect.top > window.innerHeight || rect.bottom < 0) return;
      const canScrollH =
        (e.deltaY > 0 && el.scrollLeft < el.scrollWidth - el.clientWidth) ||
        (e.deltaY < 0 && el.scrollLeft > 0);
      if (canScrollH) {
        e.preventDefault();
        el.scrollLeft += e.deltaY * 1.5;
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const scrollTo = (idx: number) => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / stories.length;
    el.scrollTo({ left: idx * cardWidth, behavior: "smooth" });
  };

  const prev = () => scrollTo(Math.max(0, activeIndex - 1));
  const next = () => scrollTo(Math.min(stories.length - 1, activeIndex + 1));

  return (
    <>
      <style>{`
        .journey-track {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .journey-track::-webkit-scrollbar { display: none; }
        .card-image {
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .journey-card:hover .card-image {
          transform: scale(1.04);
        }
      `}</style>

      <section className="relative py-20 md:py-28 bg-cream overflow-hidden">
        {/* ── Section Header ──────────────────────────────────── */}
        <div className="px-4 md:px-8 mb-12">
          <div className="max-w-7xl mx-auto flex items-end justify-between gap-6">
            <div>
              {/* Eyebrow — terracotta, matching About / Mission sections */}
              <p className="text-terracotta text-xs uppercase tracking-widest font-semibold mb-4">
                Student Journeys
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-charcoal leading-[0.95]">
                Stories that <span className="italic text-forest">inspire</span>
              </h2>
            </div>

            {/* Prev / Next arrows */}
            <div className="flex items-center gap-3 shrink-0 pb-1">
              <button
                onClick={prev}
                disabled={activeIndex === 0}
                aria-label="Previous story"
                className="w-11 h-11 rounded-full border border-sage/40 bg-white hover:border-forest hover:bg-forest hover:text-white text-charcoal flex items-center justify-center transition-all duration-200 shadow-sm disabled:opacity-30 disabled:pointer-events-none"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                disabled={activeIndex === stories.length - 1}
                aria-label="Next story"
                className="w-11 h-11 rounded-full border border-sage/40 bg-white hover:border-forest hover:bg-forest hover:text-white text-charcoal flex items-center justify-center transition-all duration-200 shadow-sm disabled:opacity-30 disabled:pointer-events-none"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Progress Bar ──────────────────────────────────── */}
        <div className="px-4 md:px-8 mb-8">
          <div className="max-w-7xl mx-auto">
            <div className="h-px bg-sage/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-forest rounded-full transition-all duration-150"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="font-sans text-xs text-gray">
                {activeIndex + 1} of {stories.length}
              </span>
              <span className="font-sans text-xs text-gray">
                Drag or scroll to explore
              </span>
            </div>
          </div>
        </div>

        {/* ── Horizontal Scroll Track ────────────────────────── */}
        <div
          ref={trackRef}
          className="journey-track flex gap-4 overflow-x-auto px-4 md:px-8 pb-4"
          style={{ scrollSnapType: "x mandatory", cursor: "grab" }}
          onMouseDown={(e) => {
            const el = trackRef.current;
            if (!el) return;
            const startX = e.pageX - el.offsetLeft;
            const startScroll = el.scrollLeft;
            el.style.cursor = "grabbing";
            const onMove = (mv: MouseEvent) => {
              el.scrollLeft = startScroll - (mv.pageX - el.offsetLeft - startX);
            };
            const onUp = () => {
              el.style.cursor = "grab";
              window.removeEventListener("mousemove", onMove);
              window.removeEventListener("mouseup", onUp);
            };
            window.addEventListener("mousemove", onMove);
            window.addEventListener("mouseup", onUp);
          }}
        >
          {stories.map((story, idx) => (
            <article
              key={story._id}
              className="journey-card relative flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer bg-white border border-sage/30 hover:border-forest/30 hover:shadow-lg transition-all duration-300 group"
              style={{
                width: "min(360px, 78vw)",
                scrollSnapAlign: "start",
              }}
              onClick={() => setSelectedStory(story)}
              aria-label={`Read ${story.studentName}'s story`}
            >
              {/* Photo */}
              <div
                className="relative overflow-hidden"
                style={{ height: "280px" }}
              >
                <Image
                  src={getImageUrl(story)}
                  alt={story.studentName}
                  fill
                  className="card-image object-cover object-top"
                  sizes="(max-width: 768px) 78vw, 360px"
                  priority={idx < 3}
                />
                {/* Subtle scrim for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />

                {/* Number badge — top-left */}
                <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm">
                  <span className="font-serif font-bold text-charcoal text-xs">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Featured badge — top-right */}
                {story.featured && (
                  <div className="absolute top-3 right-3 bg-terracotta/90 text-white text-[10px] font-sans font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                    Featured
                  </div>
                )}
              </div>

              {/* Card body — cream background, matching site card style */}
              <div className="p-6 bg-white">
                {/* Pull quote — border-l-4 border-forest style, matching About founder blockquote */}
                <blockquote className="font-serif text-base italic text-charcoal leading-relaxed mb-5 border-l-4 border-forest pl-4 line-clamp-3">
                  &ldquo;{story.comment}&rdquo;
                </blockquote>

                {/* Divider */}
                <div className="h-px bg-sage/30 mb-4" />

                {/* Name + destination + CTA */}
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-sans font-semibold text-charcoal text-sm leading-tight">
                      {story.studentName}
                    </p>
                    <p className="font-sans text-gray text-xs mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-forest shrink-0" />
                      <span className="truncate">
                        {story.schoolDestination}
                      </span>
                    </p>
                  </div>

                  {/* View CTA */}
                  <div className="shrink-0 w-8 h-8 rounded-full bg-cream border border-sage/40 flex items-center justify-center group-hover:bg-forest group-hover:border-forest transition-all duration-300">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-charcoal group-hover:text-white transition-colors"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </article>
          ))}

          {/* End-of-track spacer */}
          <div className="flex-shrink-0 w-4 md:w-8" aria-hidden="true" />
        </div>

        {/* ── Dot Indicators ──────────────────────────────────── */}
        <div className="flex justify-center gap-2 mt-8 px-4">
          {stories.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollTo(idx)}
              aria-label={`Go to story ${idx + 1}`}
              className={`rounded-full transition-all duration-300 ${
                idx === activeIndex
                  ? "w-6 h-2 bg-forest"
                  : "w-2 h-2 bg-sage/40 hover:bg-sage"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Spotlight modal */}
      {selectedStory && (
        <StorySpotlight
          story={selectedStory}
          onClose={() => setSelectedStory(null)}
        />
      )}
    </>
  );
}
