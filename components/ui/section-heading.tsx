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
        <h2 className="font-serif font-bold text-charcoal leading-[1.05]"
          style={{ fontSize: "var(--text-h2)" }}
        >
          {heading}
        </h2>
      </StaggerChild>
      {subtitle && (
        <StaggerChild>
          <p
            className={`text-gray leading-relaxed mt-4 ${
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
