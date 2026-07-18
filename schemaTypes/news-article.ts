import { Newspaper } from "lucide-react";
import { defineType } from "sanity";
import type { Rule } from "@sanity/types";

const articleCategories = [
  { title: "Academic", value: "academic" },
  { title: "Visa Process", value: "visa-process" },
  { title: "Financial", value: "financial" },
  { title: "Preparation", value: "preparation" },
  { title: "IFEM News", value: "ifem-news" },
  { title: "University Updates", value: "university-updates" },
];

const portableContent = [
  {
    type: "block",
    styles: [
      { title: "Normal", value: "normal" },
      { title: "H2", value: "h2" },
      { title: "H3", value: "h3" },
      { title: "H4", value: "h4" },
      { title: "Quote", value: "blockquote" },
    ],
    marks: {
      decorators: [
        { title: "Strong", value: "strong" },
        { title: "Emphasis", value: "em" },
        { title: "Code", value: "code" },
      ],
      annotations: [
        {
          name: "link",
          type: "object",
          title: "Link",
          fields: [{ name: "href", type: "url", title: "URL" }],
        },
      ],
    },
  },
  {
    type: "image",
    options: { hotspot: true },
    fields: [
      {
        name: "alt",
        type: "string",
        title: "Alternative text",
        validation: (Rule: Rule) => Rule.required(),
      },
      { name: "caption", type: "string", title: "Caption" },
    ],
  },
];

const newsArticle = defineType({
  name: "newsArticle",
  title: "News Article",
  type: "document",
  icon: Newspaper,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required().min(10).max(80),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      group: "content",
      validation: (Rule) => Rule.required().min(40).max(200),
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      group: "content",
      options: { list: articleCategories },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "readTime",
      title: "Read time (minutes)",
      type: "number",
      group: "content",
      description: "Optional. The site estimates a read time when this is blank.",
      validation: (Rule) => Rule.min(1).max(120),
    },
    {
      name: "coverImage",
      title: "Cover image",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    { name: "featured", title: "Feature on News & Events", type: "boolean", group: "content", initialValue: false },
    {
      name: "content",
      title: "Content",
      type: "array",
      group: "content",
      of: portableContent,
      validation: (Rule) => Rule.required().min(1),
    },
    { name: "seoTitle", title: "SEO title (override)", type: "string", group: "seo", validation: (Rule) => Rule.max(70) },
    { name: "seoDescription", title: "Meta description (override)", type: "text", rows: 3, group: "seo", validation: (Rule) => Rule.max(180) },
    {
      name: "ogImage",
      title: "Open Graph image",
      type: "image",
      group: "seo",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alternative text" }],
    },
  ],
});

export { portableContent };
export default newsArticle;
