import { Info } from "lucide-react";
import { defineField, defineType } from "sanity";

export const about = defineType({
  name: "about",
  title: "About Us",
  type: "document",
  icon: Info,
  fields: [
    defineField({
      name: "establishedYear",
      title: "Established Year",
      type: "number",
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "text",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "stats",
      title: "Company Stats",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", title: "Label" },
            { name: "value", type: "string", title: "Value" },
          ],
        },
      ],
    }),
    defineField({
      name: "missions",
      title: "Missions",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "description", type: "text", title: "Description" },
          ],
        },
      ],
    }),
    defineField({
      name: "founder",
      title: "Founder Information",
      type: "object",
      fields: [
        { name: "name", type: "string", title: "Name" },
        { name: "title", type: "string", title: "Job Title" },
        defineField({
          name: "bio",
          title: "Biography",
          type: "array",
          validation: (Rule) => Rule.required(),
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
        }),
        { name: "quote", type: "string", title: "Featured Quote" },
        {
          name: "image",
          type: "image",
          title: "Founder Image",
          options: { hotspot: true },
        },
      ],
    }),
    defineField({
      name: "values",
      title: "Core Values",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "number", type: "number", title: "Order Number" },
            { name: "title", type: "string", title: "Title" },
            { name: "description", type: "text", title: "Description" },
          ],
        },
      ],
    }),
  ],
});
