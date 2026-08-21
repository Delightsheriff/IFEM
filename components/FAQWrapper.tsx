"use client";

import { useId, useMemo, useState } from "react";
import { type FAQ } from "@/interface/sanity";
import { EmptyState } from "./empty-state";
import { Search, X } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import { FAQItem } from "./FAQItemComponent";
import { portableTextToPlain } from "@/lib/portable-text-to-plain";

export default function FAQWrapper({ faqs }: { faqs: FAQ[] }) {
  const inputId = useId();
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
      .filter(({ searchable }) => (q ? searchable.includes(q) : true))
      .map(({ faq }) => faq);
  }, [enriched, query]);

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      {/* Search */}
      <div className="mx-auto w-full max-w-2xl px-4">
        <label
          htmlFor={inputId}
          className="block text-[11px] font-semibold uppercase tracking-widest text-[#1a5c34] mb-2"
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
            className="w-full bg-white border border-[#e2e2de] rounded-lg py-3 pl-10 pr-10 text-sm text-[#111111] placeholder:text-[#686868]/50 focus:outline-none focus:border-[#1a5c34] focus-ring"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-[#686868] hover:text-[#111111] focus-ring rounded-lg tap-target"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* FAQ Content List */}
      <section className="pb-8 md:pb-12">
        <div className="mx-auto max-w-3xl">
          {filtered.length > 0 ? (
            <>
              <p
                className="text-xs text-[#686868] font-medium mb-4 px-1"
                aria-live="polite"
                aria-atomic="true"
              >
                <span className="text-[#111111] font-semibold">{filtered.length}</span>{" "}
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
              description={`We couldn't find any questions matching "${query}". Try a different keyword.`}
              ctaText="Clear search"
              onCta={() => setQuery("")}
              className="min-h-100"
            />
          )}
        </div>
      </section>
    </div>
  );
}
