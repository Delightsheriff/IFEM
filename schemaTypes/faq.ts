import { TableOfContents } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  icon: TableOfContents,
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "About IFEM", value: "about" },
          { title: "Services & Process", value: "services" },
          { title: "Eligibility & Requirements", value: "eligibility" },
          { title: "Visa Process", value: "visa" },
          { title: "Costs & Finances", value: "costs" },
          { title: "Courses & Universities", value: "courses" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured Question",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "question",
      subtitle: "category",
      featured: "featured",
    },
    prepare({ title, subtitle, featured }) {
      return {
        title: `${featured ? "⭐ " : ""}${title}`,
        subtitle: subtitle ? subtitle.toUpperCase() : "No Category",
      };
    },
  },
});
