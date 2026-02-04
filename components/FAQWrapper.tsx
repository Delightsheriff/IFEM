"use client";

import { useState } from "react";
import { type FAQ } from "@/interface/sanity";
import { EmptyState } from "./empty-state";
import { Search } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import { FAQFilter } from "./FAQFilter";
import { FAQItem } from "./FAQItemComponent";

export default function FAQWrapper({ faqs }: { faqs: FAQ[] }) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Filter the FAQs based on the selected tab
  const filteredFAQ = activeCategory
    ? faqs.filter((item) => item.category === activeCategory)
    : faqs;

  const handleViewAllQuestions = () => {
    setActiveCategory(null);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* 1. Filter Tabs */}
      <FAQFilter
        faqs={faqs}
        onFilterChange={setActiveCategory}
        activeCategory={activeCategory}
      />

      {/* 2. FAQ Content List */}
      <section className="px-4 py-8">
        <div className="mx-auto max-w-3xl">
          {filteredFAQ.length > 0 ? (
            <Accordion type="single" collapsible className="space-y-2">
              {filteredFAQ.map((item) => (
                <FAQItem key={item._id} item={item} />
              ))}
            </Accordion>
          ) : (
            <EmptyState
              icon={<Search className="w-6 h-6" />}
              title="No Questions Found"
              description={`We couldn't find any questions in the "${activeCategory}" category. Please try another category or contact our team for help.`}
              ctaText="View All Questions"
              onCta={handleViewAllQuestions}
              className="min-h-100"
            />
          )}
        </div>
      </section>
    </div>
  );
}
