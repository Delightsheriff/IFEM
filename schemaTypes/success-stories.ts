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
      rows: 4,
    }),
    defineField({
      name: "featured",
      title: "Featured Testimonial",
      type: "boolean",
      description: "Toggle to feature this testimonial prominently",
      initialValue: false,
    }),
    defineField({
      name: "studentImage",
      title: "Student Photo",
      type: "image",
      description: "Upload the high-quality photo for the gallery.",
      options: {
        hotspot: true,
      },
      validation: (Rule) =>
        Rule.required().error(
          "A photo is required for the Success Story gallery.",
        ),
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
