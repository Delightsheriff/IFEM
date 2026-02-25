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
    "/placeholder.svg?height=800&width=600"
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
        @keyframes spotlight-backdrop {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes spotlight-card-in {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .spotlight-overlay { animation: spotlight-backdrop 0.2s ease forwards; }
        .spotlight-card    { animation: spotlight-card-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
      `}</style>

      {/* Backdrop */}
      <div
        className="spotlight-overlay fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-charcoal/80 backdrop-blur-sm"
        onClick={handleClose}
      >
        {/* ── Card — white, rounded-2xl, matching site's card pattern ── */}
        <div
          className="spotlight-card relative w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-sage/30"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            aria-label="Close"
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-cream hover:bg-sage/20 border border-sage/30 flex items-center justify-center transition-colors text-charcoal"
          >
            <X className="w-4 h-4" />
          </button>

          {/*  Student photo — same ratio as team member cards in About */}
          <div className="relative h-64 overflow-hidden bg-sage/10">
            <Image
              src={imageUrl}
              alt={story.studentName}
              fill
              className="object-cover object-top"
              sizes="(max-width: 640px) 100vw, 448px"
              priority
            />
            {/* Bottom scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent" />

            {/* Featured badge */}
            {story.featured && (
              <div className="absolute bottom-4 left-4">
                <span className="inline-block px-3 py-1 bg-terracotta/90 text-white text-[10px] font-sans font-bold uppercase tracking-wider rounded-full">
                  Featured
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            {/* Name + destination */}
            <div className="mb-6">
              <h3 className="font-serif text-2xl font-bold text-charcoal mb-1">
                {story.studentName}
              </h3>
              <p className="text-forest font-medium text-sm flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                {story.schoolDestination}
              </p>
            </div>

            {/* Blockquote — border-l-4 border-forest matching About's founder quote */}
            <blockquote className="font-serif text-lg italic text-charcoal leading-relaxed border-l-4 border-forest pl-5 mb-6">
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
