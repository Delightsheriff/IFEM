"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { MapPin, X } from "lucide-react";
import { SuccessStory } from "@/interface/sanity";

interface StorySpotlightProps {
  story: SuccessStory;
  onClose: () => void;
}

function getImageUrl(story: SuccessStory): string {
  return (
    story.studentImage?.url ||
    story.studentImage?.asset?.url ||
    "/placeholder.svg?height=900&width=600"
  );
}

export default function StorySpotlight({
  story,
  onClose,
}: StorySpotlightProps) {
  const imageUrl = getImageUrl(story);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [handleClose]);

  return (
    <>
      <style>{`
        @keyframes sl-backdrop {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes sl-card-in {
          from { opacity: 0; transform: translateY(24px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
        .sl-overlay { animation: sl-backdrop 0.18s ease forwards; }
        .sl-card    { animation: sl-card-in  0.28s cubic-bezier(0.34,1.4,0.64,1) forwards; }
      `}</style>

      {/* Backdrop */}
      <div
        className="sl-overlay fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-charcoal/75 backdrop-blur-sm"
        onClick={handleClose}
      >
        {/* ── Card ────────────────────────────────────────────── */}
        <div
          className="sl-card relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-sage/20 flex flex-col md:flex-row"
          style={{ maxHeight: "90vh" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── Left: Full image panel ───────────────────────── */}
          <div className="relative md:w-5/12 flex-shrink-0 h-64 md:h-auto overflow-hidden bg-sage/10">
            <Image
              src={imageUrl}
              alt={story.studentName}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 400px"
              priority
            />
            {/* Subtle dark wash only at bottom on mobile / right on desktop */}
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/20 via-transparent to-transparent" />
          </div>

          {/* ── Right: Content panel ─────────────────────────── */}
          <div
            className="flex-1 flex flex-col p-6 md:p-8 overflow-y-auto"
            style={{ maxHeight: "90vh" }}
          >
            {/* Close button */}
            <div className="flex justify-end mb-6">
              <button
                onClick={handleClose}
                aria-label="Close"
                className="w-9 h-9 rounded-full bg-cream hover:bg-sage/20 border border-sage/30 flex items-center justify-center transition-colors text-charcoal shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Name + destination */}
            <div className="mb-6">
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-charcoal mb-2 leading-tight">
                {story.studentName}
              </h3>
              <p className="text-forest font-medium text-sm flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                {story.schoolDestination}
              </p>
            </div>

            {/* Quote */}
            <blockquote className="font-serif text-base md:text-lg italic text-charcoal leading-relaxed border-l-4 border-forest pl-5 mb-8 flex-1">
              &ldquo;{story.comment}&rdquo;
            </blockquote>

            {/* Divider */}
            <div className="h-px bg-sage/30 mb-5" />

            {/* CTA */}
            <a
              href="/contact"
              className="inline-flex items-center justify-center w-full px-6 py-3 bg-forest text-white font-semibold rounded-lg hover:bg-forest/90 transition-colors text-sm"
            >
              Start My Journey
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
