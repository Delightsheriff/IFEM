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
          quality={95}
          className={`object-cover object-center transition-opacity duration-1000 ease-out ${index === activeIndex ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,32,17,0.96)_0%,rgba(13,51,32,0.87)_37%,rgba(13,51,32,0.48)_61%,rgba(13,51,32,0.12)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(5,24,13,0.28)_0%,transparent_48%)]" />
    </div>
  );
}
