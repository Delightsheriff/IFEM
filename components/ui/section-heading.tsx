"use client";

import { Stagger, StaggerChild } from "@/components/ui/animate";

interface SectionHeadingProps {
  label?: string;
  heading: string;
  subtitle?: string;
  align?: "center" | "left";
}

export function SectionHeading({
  label,
  heading,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <Stagger className={`mb-14 ${isCenter ? "text-center" : ""}`}>
      {label && (
        <StaggerChild
          className={`flex items-center gap-3 mb-4 ${isCenter ? "justify-center" : ""}`}
        >
          <span className="block w-8 h-px bg-forest/70" />
          <p className="text-forest font-sans text-xs font-semibold uppercase tracking-widest">
            {label}
          </p>
          {isCenter && <span className="block w-8 h-px bg-forest/70" />}
        </StaggerChild>
      )}
      <StaggerChild>
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-charcoal leading-[1.05]">
          {heading}
        </h2>
      </StaggerChild>
      {subtitle && (
        <StaggerChild>
          <p
            className={`text-gray text-lg leading-relaxed mt-4 ${
              isCenter ? "max-w-2xl mx-auto" : "max-w-xl"
            }`}
          >
            {subtitle}
          </p>
        </StaggerChild>
      )}
    </Stagger>
  );
}
