import { File } from "lucide-react";
import { defineType } from "sanity";

const guides = defineType({
  name: "guides",
  title: "Guides",
  type: "document",
  icon: File,
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
      description: "Aim for 50–70 characters for best SERP display.",
      validation: (Rule) => Rule.required().min(10).max(80),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      group: "content",
      rows: 3,
      description: "A short description of the guide post (used in cards + meta description fallback).",
      validation: (Rule) => Rule.required().min(40).max(200),
    },
    {
      name: "readTime",
      title: "Read Time",
      type: "number",
      group: "content",
      description: "Estimated reading time in minutes, Eg: 5",
      validation: (Rule) => Rule.required().min(1).max(120),
    },
    {
      name: "category",
      options: {
        list: [
          { title: "Academic", value: "academic" },
          { title: "Visa Process", value: "visa-process" },
          { title: "Financial", value: "financial" },
          { title: "Preparation", value: "preparation" },
        ],
      },
      title: "Category",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    },
    // ── SEO group ─────────────────────────────────────────────
    {
      name: "seoTitle",
      title: "SEO Title (override)",
      type: "string",
      group: "seo",
      description:
        "Optional. Overrides the article title in the <title> tag and Open Graph. Leave blank to use the title above.",
      validation: (Rule) => Rule.max(70),
    },
    {
      name: "seoDescription",
      title: "Meta description (override)",
      type: "text",
      rows: 3,
      group: "seo",
      description:
        "Optional. Overrides the meta description shown in search results. Leave blank to use the excerpt above. 120–160 chars recommended.",
      validation: (Rule) => Rule.max(180),
    },
    {
      name: "ogImage",
      title: "Open Graph image",
      type: "image",
      group: "seo",
      options: { hotspot: true },
      description: "Optional. Used on social shares. Recommended 1200×630px.",
      fields: [
        { name: "alt", type: "string", title: "Alternative text" },
      ],
    },
    {
      name: "content",
      title: "Content",
      type: "array",
      group: "content",
      validation: (Rule) => Rule.required().min(1),
      of: [
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
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                  },
                ],
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
            },
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
          ],
        },
      ],
    },
  ],
});

export default guides;
