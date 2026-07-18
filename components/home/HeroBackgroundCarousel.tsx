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
  const [activeIndex, setActiveIndex] = React.useState(0);
  const hasMultipleSlides = slides.length > 1;

  React.useEffect(() => {
    if (
      !hasMultipleSlides ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const interval = window.setInterval(
      () => setActiveIndex((index) => (index + 1) % slides.length),
      ROTATION_MS,
    );
    return () => window.clearInterval(interval);
  }, [hasMultipleSlides, slides.length]);

  return (
    <div className={className} aria-hidden="true">
      {slides.map((slide, index) => (
        <Image
          key={slide.url}
          src={slide.url}
          alt=""
          fill
          priority={index === 0}
          sizes={sizes}
          quality={90}
          className={`object-cover object-center transition-opacity duration-1000 ease-out ${index === activeIndex ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,0,0,0.12)_0%,transparent_62%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#fafaf7_0%,rgba(250,250,247,0.32)_13%,transparent_32%)]" />
    </div>
  );
}
