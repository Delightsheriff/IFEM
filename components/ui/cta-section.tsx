"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Stagger, StaggerChild } from "@/components/ui/animate";

interface CTASectionProps {
  variant?: "forest" | "gradient";
  heading: string;
  description: string;
  primaryLink: string;
  primaryLabel: string;
  secondaryLink?: string;
  secondaryLabel?: string;
}

export function CTASection({
  variant = "forest",
  heading,
  description,
  primaryLink,
  primaryLabel,
  secondaryLink,
  secondaryLabel,
}: CTASectionProps) {
  const isForest = variant === "forest";

  return (
    <section
      className={
        isForest
          ? "py-24 md:py-28 px-4 bg-forest text-white relative overflow-hidden"
          : "py-24 md:py-28 px-4 bg-cream relative overflow-hidden"
      }
    >
      {isForest && (
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      )}

      <Stagger className="relative mx-auto max-w-3xl text-center">
        {/* Decorative rule */}
        <StaggerChild className="flex items-center justify-center gap-3 mb-6">
          <span className={`block w-10 h-px ${isForest ? "bg-white/30" : "bg-forest/40"}`} />
          <span className={`block w-2 h-2 rotate-45 ${isForest ? "bg-white/30" : "bg-forest/40"}`} />
          <span className={`block w-10 h-px ${isForest ? "bg-white/30" : "bg-forest/40"}`} />
        </StaggerChild>

        <StaggerChild>
          <h2
            className={`font-serif text-4xl md:text-5xl font-bold mb-6 text-balance leading-tight ${
              isForest ? "text-white" : "text-charcoal"
            }`}
          >
            {heading}
          </h2>
        </StaggerChild>

        <StaggerChild>
          <p
            className={`text-base md:text-lg mb-10 leading-relaxed max-w-xl mx-auto ${
              isForest ? "text-white/80" : "text-gray"
            }`}
          >
            {description}
          </p>
        </StaggerChild>

        <StaggerChild className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={primaryLink}
            className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 font-semibold text-sm tracking-wide rounded-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isForest
                ? "bg-white text-forest hover:bg-cream focus:ring-white"
                : "bg-forest text-white hover:bg-forest/90 focus:ring-forest"
            }`}
          >
            {primaryLabel}
            <ArrowRight className="w-4 h-4" />
          </Link>
          {secondaryLink && secondaryLabel && (
            <Link
              href={secondaryLink}
              className={`inline-flex items-center justify-center px-8 py-3.5 border font-semibold text-sm tracking-wide rounded-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isForest
                  ? "border-white/40 text-white hover:border-white hover:bg-white/10 focus:ring-white"
                  : "border-forest/30 text-forest hover:border-forest hover:bg-forest/5 focus:ring-forest"
              }`}
            >
              {secondaryLabel}
            </Link>
          )}
        </StaggerChild>
      </Stagger>
    </section>
  );
}
