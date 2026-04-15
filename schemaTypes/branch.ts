import { MapPin } from "lucide-react";
import { defineField, defineType } from "sanity";

export const branch = defineType({
  name: "branch",
  title: "Company Branches",
  type: "document",
  icon: MapPin,
  fields: [
    defineField({
      name: "name",
      title: "Branch Name",
      type: "string",
      description: "e.g., Enugu Head Office or Lagos Branch",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      title: "Branch Type",
      type: "string",
      options: {
        list: [
          { title: "Head Office", value: "hq" },
          { title: "Branch Office", value: "branch" },
        ],
        layout: "radio",
      },
      initialValue: "branch",
    }),
    defineField({
      name: "address",
      title: "Street Address",
      type: "string",
    }),
    defineField({
      name: "city",
      title: "City",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "country",
      title: "Country",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    // ── Multiple phone numbers ──────────────────────────────────
    defineField({
      name: "phones",
      title: "Phone Numbers",
      description:
        "Add all contact numbers for this branch. Label each (e.g., WhatsApp, Main Line, Director).",
      type: "array",
      of: [
        {
          type: "object",
          name: "phoneEntry",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              description: "e.g., WhatsApp, Main Line, Director",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "number",
              title: "Phone Number",
              type: "string",
              description: "Include country code. e.g., +2348012345678",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "number" },
          },
        },
      ],
    }),
    // Legacy single phone — hidden once phones array is used
    defineField({
      name: "phone",
      title: "Primary Phone (Legacy)",
      type: "string",
      description: "Superseded by Phone Numbers above. Kept for existing data.",
    }),
    // ───────────────────────────────────────────────────────────
    defineField({
      name: "email",
      title: "Contact Email",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "hours",
      title: "Operating Hours",
      type: "text",
      rows: 2,
      description: "e.g., Mon–Fri: 9am–5pm, Sat: 10am–2pm",
    }),
    defineField({
      name: "mapEmbed",
      title: "Map Embed Code (iframe)",
      type: "text",
      rows: 3,
      description: "Paste the <iframe> embed code from Google Maps.",
    }),
    defineField({
      name: "directionsUrl",
      title: "Directions Link (URL)",
      type: "url",
      description: 'The direct "Share" link from Google Maps.',
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "city", type: "type" },
    prepare({ title, subtitle, type }) {
      return {
        title: type === "hq" ? `HQ — ${title}` : title,
        subtitle,
      };
    },
  },
});
