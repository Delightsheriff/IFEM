import { defineField } from "sanity";

export const branch = defineField({
  name: "branch",
  title: "Company Branches",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Branch Name",
      type: "string",
      description: "e.g., Lagos Headquarters or London Office",
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
    }),
    defineField({
      name: "country",
      title: "Country",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Contact Email",
      type: "string",
    }),
    defineField({
      name: "hours",
      title: "Operating Hours",
      type: "text",
      rows: 2,
      description: "e.g., Mon-Fri: 9am - 5pm",
    }),
    defineField({
      name: "mapEmbed",
      title: "Map Embed Code (Iframe)",
      type: "text",
      rows: 3,
      description: "Paste the <iframe> code from Google Maps here",
    }),
    defineField({
      name: "directionsUrl",
      title: "Directions Link (URL)",
      type: "url",
      description: 'The direct "Share" link from Google Maps',
    }),
  ],
});
