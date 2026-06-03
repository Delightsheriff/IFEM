"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Guide } from "@/interface/sanity";
import { GUIDE_CATEGORIES, getGuideCategoryLabel } from "@/lib/guide-categories";

interface GuidesExplorerProps {
  guides: Guide[];
}

export function GuidesExplorer({ guides }: GuidesExplorerProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const counts = useMemo(() => {
    const acc: Record<string, number> = {};
    for (const g of guides) acc[g.category] = (acc[g.category] ?? 0) + 1;
    return acc;
  }, [guides]);

  const filtered = useMemo(
    () => (activeCategory ? guides.filter((g) => g.category === activeCategory) : guides),
    [guides, activeCategory],
  );

  return (
    <div>
      {/* Category tabs */}
      <div
        className="mb-10 flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filter guides by category"
      >
        {GUIDE_CATEGORIES.map((category) => {
          const isActive = activeCategory === category.value;
          const count = category.value === null ? guides.length : counts[category.value] ?? 0;
          return (
            <button
              key={category.value ?? "all"}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveCategory(category.value)}
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

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((guide) => (
            <Link
              key={guide._id}
              href={`/guides/${guide.slug.current}`}
              className="group flex flex-col p-6 md:p-7 bg-white border border-sage/20 hover:border-forest/30 hover:shadow-md transition-all duration-200 focus:outline-none focus-ring"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <span className="inline-block px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-forest bg-forest/8 border border-forest/15">
                  {getGuideCategoryLabel(guide.category)}
                </span>
                <span className="text-xs text-gray whitespace-nowrap shrink-0">
                  {guide.readTime} min read
                </span>
              </div>
              <h2 className="font-serif text-xl md:text-2xl font-bold text-charcoal mb-2 group-hover:text-forest transition-colors line-clamp-2">
                {guide.title}
              </h2>
              <p className="text-gray text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                {guide.excerpt}
              </p>
              <span className="inline-flex items-center gap-2 text-forest text-sm font-semibold group-hover:gap-3 transition-all">
                Read Guide
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-sm border border-sage/20 bg-sage/5 p-10 text-center">
          <p className="font-serif text-xl font-semibold text-charcoal mb-2">
            No guides in this category yet
          </p>
          <p className="text-gray text-sm mb-4">
            We&apos;re still writing guides for this topic. In the meantime, browse all
            guides or get in touch with a counsellor.
          </p>
          <button
            type="button"
            onClick={() => setActiveCategory(null)}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-forest hover:bg-forest-deep transition-colors focus-ring"
          >
            View all guides
          </button>
        </div>
      )}
    </div>
  );
}
