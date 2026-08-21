"use client";

import { Stagger, StaggerChild } from "@/components/ui/animate";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";

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
        <StaggerChild className="mb-4">
          <SectionEyebrow align={isCenter ? "center" : "left"} tone="forest">
            {label}
          </SectionEyebrow>
        </StaggerChild>
      )}
      <StaggerChild>
        <h2 className="font-sans font-extrabold tracking-tight text-[#111111] leading-[1.06]"
          style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}
        >
          {heading}
        </h2>
      </StaggerChild>
      {subtitle && (
        <StaggerChild>
          <p
            className={`text-[#686868] leading-relaxed mt-4 ${
              isCenter ? "max-w-2xl mx-auto" : "max-w-xl"
            }`}
            style={{ fontSize: "var(--text-lead)" }}
          >
            {subtitle}
          </p>
        </StaggerChild>
      )}
    </Stagger>
  );
}
