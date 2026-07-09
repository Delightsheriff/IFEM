"use client";

import { type FAQ } from "@/interface/sanity";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { PortableText } from "@portabletext/react";
import { customPortableTextComponents } from "./portable-text-components";

interface FAQItemProps {
  item: FAQ;
}

export function FAQItem({ item }: FAQItemProps) {
  // Radix Accordion requires a stable, non-undefined string `value` per item.
  // Use the Sanity `_id` when available, and gracefully fall back to the question text.
  const accordionValue = item._id ?? item.question;

  return (
    <AccordionItem value={accordionValue}>
      <AccordionTrigger className="font-sans text-base md:text-lg font-semibold text-[#111111] hover:text-[#1a5c34] transition-colors data-[state=open]:text-[#1a5c34] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a5c34] focus-visible:ring-offset-2 rounded-lg text-left">
        {item.question}
      </AccordionTrigger>
      <AccordionContent className="text-sm md:text-base leading-relaxed text-[#5a5a5a] pb-6">
        <PortableText
          value={item.answer}
          components={customPortableTextComponents}
        />
      </AccordionContent>
    </AccordionItem>
  );
}
