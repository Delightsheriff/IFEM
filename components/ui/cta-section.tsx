"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Stagger, StaggerChild } from "@/components/ui/animate";
import { Button } from "@/components/ui/button";

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
        <>
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/35 to-transparent"
          />
        </>
      )}

      <Stagger className="relative mx-auto max-w-3xl text-center">
        <StaggerChild className="flex items-center justify-center gap-3 mb-6">
          <span aria-hidden="true" className={`block w-10 h-px ${isForest ? "bg-white/30" : "bg-forest/40"}`} />
          <span aria-hidden="true" className={`block w-2 h-2 rotate-45 ${isForest ? "bg-white/30" : "bg-forest/40"}`} />
          <span aria-hidden="true" className={`block w-10 h-px ${isForest ? "bg-white/30" : "bg-forest/40"}`} />
        </StaggerChild>

        <StaggerChild>
          <h2
            className={`font-serif font-bold mb-6 text-balance leading-tight ${
              isForest ? "text-white" : "text-charcoal"
            }`}
            style={{ fontSize: "var(--text-h2)" }}
          >
            {heading}
          </h2>
        </StaggerChild>

        <StaggerChild>
          <p
            className={`mb-10 leading-relaxed max-w-xl mx-auto ${
              isForest ? "text-white/80" : "text-gray"
            }`}
            style={{ fontSize: "var(--text-lead)" }}
          >
            {description}
          </p>
        </StaggerChild>

        <StaggerChild className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            variant={isForest ? "inverted-primary" : "primary"}
            size="lg"
          >
            <Link href={primaryLink}>
              {primaryLabel}
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
          {secondaryLink && secondaryLabel && (
            <Button
              asChild
              variant={isForest ? "inverted-secondary" : "outline"}
              size="lg"
            >
              <Link href={secondaryLink}>{secondaryLabel}</Link>
            </Button>
          )}
        </StaggerChild>
      </Stagger>
    </section>
  );
}
