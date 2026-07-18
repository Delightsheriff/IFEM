"use client";

import React from "react";
import Image from "next/image";
import type { HomeHeroSlide } from "@/interface/sanity";

const ROTATION_MS = 6500;

export function HeroBackgroundCarousel({
  slides,
  className,
  sizes,
}: {
  slides: HomeHeroSlide[];
  className: string;
  sizes: string;
}) {
  const [{ activeIndex, previousIndex }, setSlideState] = React.useState({
    activeIndex: 0,
    previousIndex: null as number | null,
  });
  const hasMultipleSlides = slides.length > 1;

  React.useEffect(() => {
    if (
      !hasMultipleSlides ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const interval = window.setInterval(() => {
      setSlideState(({ activeIndex: currentIndex }) => {
        return {
          activeIndex: (currentIndex + 1) % slides.length,
          previousIndex: currentIndex,
        };
      });
    }, ROTATION_MS);
    return () => window.clearInterval(interval);
  }, [hasMultipleSlides, slides.length]);

  return (
    <div className={`isolate ${className}`} aria-hidden="true">
      {slides.map((slide, index) => {
        const isActive = index === activeIndex;
        const isPrevious = index === previousIndex;

        return (
          <Image
            key={slide.url}
            src={slide.url}
            alt=""
            fill
            priority={index === 0}
            sizes={sizes}
            quality={95}
            className={`object-cover object-center will-change-transform transition-[transform,opacity] duration-[1250ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isActive
                ? "z-10 translate-y-0 scale-100 opacity-100"
                : isPrevious
                  ? "z-0 translate-y-[8%] scale-[1.04] opacity-0"
                  : "z-0 -translate-y-full scale-105 opacity-0"
            }`}
          />
        );
      })}
      <div className="absolute inset-0 z-20 bg-[linear-gradient(90deg,rgba(6,32,17,0.92)_0%,rgba(13,51,32,0.78)_37%,rgba(13,51,32,0.4)_61%,rgba(13,51,32,0.08)_100%)]" />
      <div className="absolute inset-0 z-30 bg-[linear-gradient(0deg,rgba(5,24,13,0.28)_0%,transparent_48%)]" />
    </div>
  );
}
