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
      <AccordionTrigger className="font-serif text-lg md:text-xl font-medium text-charcoal hover:text-forest transition-colors data-[state=open]:text-forest focus:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 rounded-lg">
        {item.question}
      </AccordionTrigger>
      <AccordionContent className="text-base md:text-lg leading-relaxed text-gray pb-6">
        <PortableText
          value={item.answer}
          components={customPortableTextComponents}
        />
      </AccordionContent>
    </AccordionItem>
  );
}
