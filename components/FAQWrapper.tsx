"use client";
import { FAQ } from "@/interface/sanity";
import React from "react";
import { FAQFilter } from "./FAQFilter";

export default function FAQWrapper({ faqs }: { faqs: FAQ[] }) {
  return (
    <>
      <FAQFilter faqs={faqs} onFilterChange={() => {}} activeCategory={null} />
    </>
  );
}
