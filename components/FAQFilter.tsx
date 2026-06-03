"use client";

import { useMemo } from "react";
import { type FAQ } from "@/interface/sanity";
import { cn } from "@/lib/utils";

interface FAQFilterProps {
  onFilterChange: (category: string | null) => void;
  activeCategory: string | null;
  faqs: FAQ[];
}

const CATEGORIES: ReadonlyArray<{ value: string | null; label: string }> = [
  { value: null, label: "All Questions" },
  { value: "about", label: "About IFEM" },
  { value: "services", label: "Services & Process" },
  { value: "eligibility", label: "Eligibility" },
  { value: "visa", label: "Visa Process" },
  { value: "costs", label: "Costs & Finances" },
  { value: "courses", label: "Courses & Unis" },
];

export function FAQFilter({ onFilterChange, activeCategory, faqs }: FAQFilterProps) {
  const counts = useMemo(() => {
    const acc: Record<string, number> = {};
    for (const f of faqs) acc[f.category] = (acc[f.category] ?? 0) + 1;
    return acc;
  }, [faqs]);

  return (
    <div
      className="flex flex-wrap justify-center gap-2 px-4"
      role="tablist"
      aria-label="Filter questions by category"
    >
      {CATEGORIES.map((category) => {
        const isActive = activeCategory === category.value;
        const count =
          category.value === null ? faqs.length : counts[category.value] ?? 0;

        return (
          <button
            key={category.value ?? "all"}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onFilterChange(category.value)}
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border transition-colors focus:outline-none focus-ring tap-target",
              isActive
                ? "bg-forest text-white border-forest"
                : "bg-white text-charcoal border-sage/30 hover:border-forest/50",
            )}
          >
            <span>{category.label}</span>
            <span
              className={cn(
                "text-[10px] font-semibold rounded-full px-1.5 min-w-[20px] text-center",
                isActive ? "bg-white/15 text-white" : "bg-sage/15 text-charcoal/70",
              )}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
