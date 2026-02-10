import { File } from "lucide-react";
import { defineType } from "sanity";

const guides = defineType({
  name: "guides",
  title: "Guides",
  type: "document",
  icon: File,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
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
      rows: 3,
      description: "A short description of the guide post",
      validation: (Rule) => Rule.required().max(200),
    },
    {
      name: "readTime",
      title: "Read Time",
      type: "number",
      description: "Estimated reading time in minutes, Eg: 5",
      validation: (Rule) => Rule.required().min(1),
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
      validation: (Rule) => Rule.required(),
    },
    {
      name: "content",
      title: "Content",
      type: "array",
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
