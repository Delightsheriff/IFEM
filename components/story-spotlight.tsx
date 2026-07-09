"use client";

import { useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { MapPin, X, ArrowRight, Quote } from "lucide-react";
import { SuccessStory } from "@/interface/sanity";
import { getStoryImageUrl } from "@/lib/image-utils";
import Link from "next/link";

interface StorySpotlightProps {
  story: SuccessStory;
  onClose: () => void;
}

export default function StorySpotlight({ story, onClose }: StorySpotlightProps) {
  const imageUrl = getStoryImageUrl(story);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const handleClose = useCallback(() => onClose(), [onClose]);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    const focusableSelector =
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
        return;
      }
      if (e.key !== "Tab") return;
      const panel = cardRef.current;
      if (!panel) return;
      const focusables = panel.querySelectorAll<HTMLElement>(focusableSelector);
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
      previouslyFocused?.focus?.();
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
          from { opacity: 0; transform: translateY(24px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
        .sl-overlay { animation: sl-backdrop 0.2s ease forwards; }
        .sl-card    { animation: sl-card-in  0.26s cubic-bezier(0.22,1,0.36,1) forwards; }
        @media (prefers-reduced-motion: reduce) {
          .sl-overlay, .sl-card { animation: none; }
        }
      `}</style>

      {/* Backdrop */}
      <div
        className="sl-overlay fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center sm:p-6"
        onClick={handleClose}
        role="presentation"
      >
        {/* Modal card */}
        <div
          ref={cardRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="story-spotlight-title"
          className="sl-card relative flex w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-[0_32px_80px_rgba(0,0,0,0.25)] sm:max-w-lg sm:rounded-2xl"
          style={{ maxHeight: "92vh" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── Photo header ── */}
          <div className="relative h-72 w-full shrink-0 overflow-hidden bg-[#e8f3ec] sm:h-80">
            <Image
              src={imageUrl}
              alt={story.studentName}
              fill
              className="object-cover object-top"
              sizes="(max-width: 640px) 100vw, 512px"
              priority
            />
            {/* Dark gradient so text is readable over photo */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d3320]/80 via-[#0d3320]/20 to-transparent" />

            {/* Close button — top right */}
            <button
              ref={closeBtnRef}
              onClick={handleClose}
              aria-label="Close success story"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/30 focus-ring"
            >
              <X aria-hidden="true" className="h-4 w-4" />
            </button>

            {/* Name + destination over photo */}
            <div className="absolute bottom-0 left-0 right-0 px-6 pb-6">
              <h3
                id="story-spotlight-title"
                className="mb-1 font-sans text-2xl font-extrabold leading-tight tracking-tight text-white"
              >
                {story.studentName}
              </h3>
              {story.schoolDestination && (
                <p className="flex items-center gap-1.5 text-xs font-semibold text-white/75">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-[#6fa572]" aria-hidden="true" />
                  {story.schoolDestination}
                </p>
              )}
            </div>
          </div>

          {/* ── Content ── */}
          <div className="flex flex-1 flex-col overflow-y-auto px-6 py-7">
            {/* Quote */}
            <Quote
              className="mb-3 h-7 w-7 text-[#1a5c34]/20"
              aria-hidden="true"
            />
            <blockquote className="mb-8 border-l-[3px] border-[#1a5c34] pl-5 font-sans text-[1.05rem] italic leading-[1.75] text-[#3d3d3d]">
              &ldquo;{story.comment}&rdquo;
            </blockquote>

            {/* Divider */}
            <div className="mb-6 h-px bg-[#e2e2de]" />

            {/* CTA */}
            <Link
              href="/contact"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1a5c34] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#154a2a] focus-ring"
            >
              Start My Journey
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>

            {/* Mobile drag handle hint */}
            <p className="mt-4 text-center text-[11px] text-[#aaaaaa] sm:hidden">
              Tap outside to close
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
