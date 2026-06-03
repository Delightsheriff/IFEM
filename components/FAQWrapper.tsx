"use client";

import { useId, useMemo, useState } from "react";
import { type FAQ } from "@/interface/sanity";
import { EmptyState } from "./empty-state";
import { Search, X } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import { FAQFilter } from "./FAQFilter";
import { FAQItem } from "./FAQItemComponent";
import { portableTextToPlain } from "@/lib/portable-text-to-plain";

export default function FAQWrapper({ faqs }: { faqs: FAQ[] }) {
  const inputId = useId();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  // Pre-flatten answer text once per question so filtering is cheap.
  const enriched = useMemo(
    () =>
      faqs.map((faq) => ({
        faq,
        searchable: `${faq.question} ${portableTextToPlain(faq.answer)}`.toLowerCase(),
      })),
    [faqs],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return enriched
      .filter(({ faq }) =>
        activeCategory ? faq.category === activeCategory : true,
      )
      .filter(({ searchable }) => (q ? searchable.includes(q) : true))
      .map(({ faq }) => faq);
  }, [enriched, activeCategory, query]);

  const resetAll = () => {
    setActiveCategory(null);
    setQuery("");
  };

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      {/* Search */}
      <div className="mx-auto w-full max-w-2xl px-4">
        <label
          htmlFor={inputId}
          className="block text-[11px] font-semibold uppercase tracking-widest text-forest mb-2"
        >
          Search questions
        </label>
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray/60"
            aria-hidden="true"
          />
          <input
            id={inputId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by keyword (visa, fees, IELTS…)"
            autoComplete="off"
            className="w-full bg-white border border-sage/30 rounded-sm py-3 pl-10 pr-10 text-sm text-charcoal placeholder:text-gray/50 focus:outline-none focus:border-forest focus-ring"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray hover:text-charcoal focus-ring rounded-sm tap-target"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Category Tabs */}
      <FAQFilter
        faqs={faqs}
        onFilterChange={setActiveCategory}
        activeCategory={activeCategory}
      />

      {/* FAQ Content List */}
      <section className="pb-8 md:pb-12">
        <div className="mx-auto max-w-3xl">
          {filtered.length > 0 ? (
            <>
              <p
                className="text-xs text-gray font-medium mb-4 px-1"
                aria-live="polite"
                aria-atomic="true"
              >
                <span className="text-charcoal font-semibold">{filtered.length}</span>{" "}
                {filtered.length === 1 ? "question" : "questions"}
              </p>
              <Accordion type="single" collapsible className="space-y-2">
                {filtered.map((item) => (
                  <FAQItem key={item._id} item={item} />
                ))}
              </Accordion>
            </>
          ) : (
            <EmptyState
              icon={<Search className="w-6 h-6" />}
              title="No questions found"
              description={
                query
                  ? `We couldn't find any questions matching “${query}”${activeCategory ? ` in this category` : ""}. Try a different keyword, or reset to see all questions.`
                  : `We couldn't find any questions in this category yet.`
              }
              ctaText="Reset filters"
              onCta={resetAll}
              className="min-h-100"
            />
          )}
        </div>
      </section>
    </div>
  );
}
