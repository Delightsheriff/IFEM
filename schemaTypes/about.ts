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
      type: "object",
      fields: [
        defineField({
          name: "numberOfStudentsPlaced",
          title: "Number of Students Placed",
          type: "number",
          validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
          name: "numberOfPartnerUkUniversities",
          title: "Number of Partner UK Universities",
          type: "number",
          validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
          name: "yearsOfExperience",
          title: "Years of Experience",
          type: "number",
          validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
          name: "successRate",
          title: "Success Rate (%)",
          type: "number",
          validation: (Rule) => Rule.required().min(0).max(100),
        }),
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
            {
              name: "icon",
              title: "Icon",
              type: "string",
              description:
                "Optional. Pick an icon that matches the mission. If left blank, an icon is assigned automatically by order.",
              options: {
                list: [
                  { title: "Compass (direction / guidance)", value: "compass" },
                  { title: "Target (focus / outcome)", value: "target" },
                  { title: "Hands Helping (support)", value: "heart-handshake" },
                  { title: "Lightbulb (ideas)", value: "lightbulb" },
                  { title: "Shield (trust / protection)", value: "shield-check" },
                  { title: "Sparkles (excellence)", value: "sparkles" },
                ],
                layout: "dropdown",
              },
            },
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
