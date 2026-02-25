"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { SuccessStory } from "@/interface/sanity";
import StorySpotlight from "./story-spotlight";

interface JourneyScrollProps {
  /** Pass only the stories you want shown here — e.g. featured or a slice */
  stories: SuccessStory[];
}

const MAX_SHOWN = 8;

function getImageUrl(story: SuccessStory): string {
  return (
    story.studentImage?.url ||
    story.studentImage?.asset?.url ||
    "/placeholder.svg?height=900&width=600"
  );
}

export default function JourneyScroll({ stories }: JourneyScrollProps) {
  // Cap at MAX_SHOWN so the scroll doesn't feel endless
  const display = stories.slice(0, MAX_SHOWN);

  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedStory, setSelectedStory] = useState<SuccessStory | null>(null);

  if (display.length === 0) return null;

  const handleScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;
    setProgress(maxScroll > 0 ? scrollLeft / maxScroll : 0);
    const cardWidth = el.scrollWidth / display.length;
    setActiveIndex(
      Math.min(display.length - 1, Math.round(scrollLeft / cardWidth)),
    );
  }, [display.length]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Mousewheel → horizontal scroll
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
    const cardWidth = el.scrollWidth / display.length;
    el.scrollTo({ left: idx * cardWidth, behavior: "smooth" });
  };

  const prev = () => scrollTo(Math.max(0, activeIndex - 1));
  const next = () => scrollTo(Math.min(display.length - 1, activeIndex + 1));

  return (
    <>
      <style>{`
        .journey-track {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .journey-track::-webkit-scrollbar { display: none; }

        .jcard-img {
          transition: transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .jcard:hover .jcard-img { transform: scale(1.05); }

        /* Gentle reveal on the read-more arrow */
        .jcard-arrow {
          transition: background 0.25s, transform 0.25s;
        }
        .jcard:hover .jcard-arrow {
          background: var(--color-forest, #006b38);
          transform: translateX(2px);
        }
        .jcard:hover .jcard-arrow svg { color: #fff; }
      `}</style>

      <section className="py-20 md:py-28 bg-cream overflow-hidden">
        {/* ── Header ──────────────────────────────────────── */}
        <div className="px-4 md:px-8 mb-10">
          <div className="max-w-7xl mx-auto flex items-end justify-between gap-6">
            <div>
              <p className="text-terracotta text-xs uppercase tracking-widest font-semibold mb-4">
                Student Journeys
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-charcoal leading-tight">
                Stories that{" "}
                <em className="not-italic text-forest">changed lives</em>
              </h2>
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-2 shrink-0 pb-1">
              <button
                onClick={prev}
                disabled={activeIndex === 0}
                aria-label="Previous story"
                className="w-10 h-10 rounded-full border border-sage/40 bg-white hover:border-forest hover:bg-forest hover:text-white text-charcoal flex items-center justify-center transition-all shadow-sm disabled:opacity-25 disabled:pointer-events-none"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                disabled={activeIndex === display.length - 1}
                aria-label="Next story"
                className="w-10 h-10 rounded-full border border-sage/40 bg-white hover:border-forest hover:bg-forest hover:text-white text-charcoal flex items-center justify-center transition-all shadow-sm disabled:opacity-25 disabled:pointer-events-none"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Progress bar ───────────────────────────────── */}
        <div className="px-4 md:px-8 mb-8">
          <div className="max-w-7xl mx-auto">
            <div className="h-px bg-sage/30 overflow-hidden rounded-full">
              <div
                className="h-full bg-forest rounded-full transition-all duration-150"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* ── Scroll track ───────────────────────────────── */}
        <div
          ref={trackRef}
          className="journey-track flex gap-5 overflow-x-auto px-4 md:px-8 pb-6"
          style={{ scrollSnapType: "x mandatory", cursor: "grab" }}
          onMouseDown={(e) => {
            const el = trackRef.current;
            if (!el) return;
            const startX = e.pageX - el.offsetLeft;
            const scrollStart = el.scrollLeft;
            el.style.cursor = "grabbing";
            const onMove = (mv: MouseEvent) => {
              el.scrollLeft = scrollStart - (mv.pageX - el.offsetLeft - startX);
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
          {display.map((story) => (
            <article
              key={story._id}
              className="jcard flex-shrink-0 rounded-2xl overflow-hidden bg-white border border-sage/20 hover:border-forest/30 hover:shadow-xl transition-all duration-300 cursor-pointer group"
              style={{
                width: "min(320px, 80vw)",
                scrollSnapAlign: "start",
              }}
              onClick={() => setSelectedStory(story)}
              aria-label={`Read ${story.studentName}'s story`}
            >
              {/* ── Photo — dominant, takes up most of the card ── */}
              <div
                className="relative overflow-hidden"
                style={{ height: "340px" }}
              >
                <Image
                  src={getImageUrl(story)}
                  alt={story.studentName}
                  fill
                  className="jcard-img object-cover object-top"
                  sizes="(max-width: 768px) 80vw, 320px"
                />

                {/* Very light scrim only at bottom edge for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                {/* Featured ribbon */}
                {story.featured && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-terracotta text-white font-sans font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-bl-xl">
                      Featured
                    </div>
                  </div>
                )}

                {/* Destination tag overlaid at bottom of photo */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5">
                  <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-charcoal text-xs font-sans font-medium px-2.5 py-1.5 rounded-full shadow-sm max-w-full truncate">
                    <MapPin className="w-3 h-3 text-forest shrink-0" />
                    <span className="truncate">{story.schoolDestination}</span>
                  </div>
                </div>
              </div>

              {/* ── Card body ───────────────────────────────── */}
              <div className="p-5">
                {/* Name */}
                <p className="font-sans font-semibold text-charcoal text-sm mb-3">
                  {story.studentName}
                </p>

                {/* Quote — border-l style matching site */}
                <blockquote className="font-serif text-sm italic text-gray leading-relaxed border-l-4 border-forest pl-3 line-clamp-3 mb-4">
                  &ldquo;{story.comment}&rdquo;
                </blockquote>

                {/* Read more */}
                <div className="flex justify-end">
                  <div className="jcard-arrow w-8 h-8 rounded-full border border-sage/40 bg-cream flex items-center justify-center">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-charcoal"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </article>
          ))}

          {/* Spacer */}
          <div className="flex-shrink-0 w-4 md:w-8" aria-hidden="true" />
        </div>

        {/* ── Dot indicators ─────────────────────────────── */}
        <div className="flex justify-center gap-2 mt-4 px-4">
          {display.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollTo(idx)}
              aria-label={`Go to story ${idx + 1}`}
              className={`rounded-full transition-all duration-300 ${
                idx === activeIndex
                  ? "w-5 h-2 bg-forest"
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
