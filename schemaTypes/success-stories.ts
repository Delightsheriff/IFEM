import { Folders } from "lucide-react";
import { defineField, defineType } from "sanity";

export const successStories = defineType({
  name: "successStories",
  title: "Success Stories",
  type: "document",
  icon: Folders,
  fields: [
    defineField({
      name: "studentName",
      title: "Name of Person",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "schoolDestination",
      title: "School Destination or Location",
      type: "string",
      description: "e.g., University of Ulster, UK or New York, USA",
    }),
    defineField({
      name: "comment",
      title: "Short Comment",
      type: "text",
      description: "A brief testimonial from the student.",
      rows: 3,
    }),
    defineField({
      name: "mediaType",
      title: "Media Type",
      type: "string",
      options: {
        list: [
          { title: "Photo", value: "image" },
          { title: "Video", value: "video" },
        ],
        layout: "radio",
      },
      initialValue: "image",
    }),
    defineField({
      name: "studentImage",
      title: "Student Photo",
      type: "image",
      options: { hotspot: true },
      hidden: ({ document }) => document?.mediaType !== "image",
    }),
    defineField({
      name: "studentVideo",
      title: "Student Video",
      type: "file",
      options: {
        accept: "video/*",
      },
      hidden: ({ document }) => document?.mediaType !== "video",
    }),
  ],
  preview: {
    select: {
      title: "studentName",
      subtitle: "schoolDestination",
      media: "studentImage",
    },
  },
});
