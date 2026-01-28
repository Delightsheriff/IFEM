import { Share2 } from "lucide-react";
import { defineField, defineType } from "sanity";

const socialLinks = defineType({
  name: "socialLinks",
  title: "Social Media Links",
  type: "document",
  icon: Share2,
  fields: [
    defineField({
      name: "platform",
      title: "Platform",
      type: "string",
      options: {
        list: [
          { title: "Facebook", value: "facebook" },
          { title: "Instagram", value: "instagram" },
          { title: "Twitter/X", value: "twitter" },
          { title: "TikTok", value: "tiktok" },
          { title: "YouTube", value: "youtube" },
          { title: "LinkedIn", value: "linkedin" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      title: "Full URL",
      type: "url",
      description: "Paste the full link (e.g., https://facebook.com/ifem)",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "platform",
      subtitle: "url",
    },
    prepare({ title, subtitle }: { title: string; subtitle: string }) {
      return {
        title: title
          ? title.charAt(0).toUpperCase() + title.slice(1)
          : "New Link",
        subtitle: subtitle || "No link added yet",
      };
    },
  },
});

export default socialLinks;
