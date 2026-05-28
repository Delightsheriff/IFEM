import { GraduationCap } from "lucide-react";
import { defineField, defineType } from "sanity";

export const ukUniversity = defineType({
  name: "ukUniversity",
  title: "Partner Universities",
  type: "document",
  icon: GraduationCap,
  fields: [
    defineField({
      name: "name",
      title: "University Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: false },
      description: "University logo — preferably SVG or PNG with transparent background.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "country",
      title: "Country",
      type: "string",
      options: {
        list: [
          { title: "United Kingdom", value: "UK" },
          { title: "Canada", value: "Canada" },
          { title: "Other", value: "Other" },
        ],
        layout: "radio",
      },
      initialValue: "UK",
    }),
    defineField({
      name: "website",
      title: "University Website",
      type: "url",
    }),
    defineField({
      name: "featured",
      title: "Feature on Home Page",
      type: "boolean",
      description: "Show this university in the Partner Universities section on the home page.",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "name", media: "logo" },
  },
});
