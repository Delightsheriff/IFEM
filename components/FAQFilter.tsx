"use client";

import { type FAQ } from "@/interface/sanity";
import { cn } from "@/lib/utils";

interface FAQFilterProps {
  onFilterChange: (category: string | null) => void;
  activeCategory: string | null;
  faqs: FAQ[];
}

export function FAQFilter({ onFilterChange, activeCategory }: FAQFilterProps) {
  const categories = [
    { value: null, label: "All Questions" },
    { value: "about", label: "About IFEM" },
    { value: "services", label: "Services & Process" },
    { value: "eligibility", label: "Eligibility" },
    { value: "visa", label: "Visa Process" },
    { value: "costs", label: "Costs & Finances" },
    { value: "courses", label: "Courses & Unis" },
  ];

  return (
    <div className="w-full">
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {categories.map((category) => {
          const isActive = activeCategory === category.value;

          return (
            <button
              key={category.value ?? "all"}
              onClick={() => onFilterChange(category.value)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors border",
                isActive
                  ? "bg-forest text-white border-forest"
                  : "bg-white text-charcoal border-sage/30 hover:border-forest/50",
              )}
            >
              <span>{category.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
