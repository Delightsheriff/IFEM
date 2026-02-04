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
  return (
    <AccordionItem value={item._id}>
      <AccordionTrigger className="font-serif text-lg md:text-xl font-medium text-charcoal hover:text-forest transition-colors data-[state=open]:text-forest">
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
