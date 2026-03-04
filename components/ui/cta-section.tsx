import { ArrowRight } from "lucide-react";
import Link from "next/link";

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
          ? "py-20 md:py-28 px-4 bg-forest text-white"
          : "py-20 md:py-28 px-4 bg-linear-to-br from-terracotta/10 to-sage/10"
      }
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2
          className={`font-serif text-4xl md:text-5xl font-bold mb-6 text-balance ${
            isForest ? "text-white" : "text-charcoal"
          }`}
        >
          {heading}
        </h2>
        <p
          className={`text-lg mb-10 leading-relaxed ${
            isForest ? "text-white/90" : "text-gray"
          }`}
        >
          {description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={primaryLink}
            className={`inline-flex items-center justify-center gap-2 px-8 py-3 font-semibold rounded-lg transition-colors ${
              isForest
                ? "bg-white text-forest hover:bg-cream"
                : "bg-forest text-white hover:bg-forest/90"
            }`}
          >
            {primaryLabel}
            <ArrowRight className="w-4 h-4" />
          </Link>
          {secondaryLink && secondaryLabel ? (
            <Link
              href={secondaryLink}
              className={`inline-flex items-center justify-center px-8 py-3 border-2 font-semibold rounded-lg transition-colors ${
                isForest
                  ? "border-white text-white hover:bg-white/10"
                  : "border-forest text-forest hover:bg-forest/5"
              }`}
            >
              {secondaryLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
