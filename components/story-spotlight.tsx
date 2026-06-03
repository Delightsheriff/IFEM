"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { MapPin, X, ArrowRight } from "lucide-react";
import { SuccessStory } from "@/interface/sanity";
import Link from "next/link";

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

export default function StorySpotlight({ story, onClose }: StorySpotlightProps) {
  const imageUrl = getImageUrl(story);

  const handleClose = useCallback(() => onClose(), [onClose]);

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
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .sl-overlay { animation: sl-backdrop 0.18s ease forwards; }
        .sl-card    { animation: sl-card-in  0.24s ease forwards; }
        @media (prefers-reduced-motion: reduce) {
          .sl-overlay, .sl-card { animation: none; }
        }
      `}</style>

      {/* Backdrop */}
      <div
        className="sl-overlay fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 bg-charcoal/80 backdrop-blur-sm"
        onClick={handleClose}
      >
        {/* Card — flat, matches the design system */}
        <div
          className="sl-card relative w-full max-w-2xl bg-white border border-sage/20 shadow-2xl overflow-hidden flex flex-col md:flex-row"
          style={{ maxHeight: "90vh" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Left: image panel */}
          <div className="relative md:w-5/12 flex-shrink-0 h-64 md:h-auto overflow-hidden bg-sage/10">
            <Image
              src={imageUrl}
              alt={story.studentName}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 400px"
              priority
            />
            {/* Subtle wash */}
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-charcoal/30 via-transparent to-transparent" />
            {/* Forest accent */}
            <div className="absolute top-0 left-0 bottom-0 w-1 bg-forest" />
          </div>

          {/* Right: content panel */}
          <div
            className="flex-1 flex flex-col p-7 md:p-8 overflow-y-auto"
            style={{ maxHeight: "90vh" }}
          >
            {/* Close */}
            <div className="flex justify-end mb-5">
              <button
                onClick={handleClose}
                aria-label="Close"
                className="w-8 h-8 border border-sage/30 bg-cream hover:bg-sage/20 flex items-center justify-center transition-colors text-charcoal"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Name + destination */}
            <div className="mb-5">
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-charcoal mb-1.5 leading-tight">
                {story.studentName}
              </h3>
              <p className="text-forest font-semibold text-xs uppercase tracking-wide flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                {story.schoolDestination}
              </p>
            </div>

            {/* Quote */}
            <blockquote className="font-serif text-base md:text-lg italic text-charcoal leading-relaxed border-l-4 border-forest pl-5 mb-6 flex-1">
              &ldquo;{story.comment}&rdquo;
            </blockquote>

            <div className="h-px bg-sage/20 mb-5" />

            {/* CTA */}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-forest text-white font-semibold text-sm tracking-wide rounded-sm hover:bg-forest/90 transition-colors"
            >
              Start My Journey
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
