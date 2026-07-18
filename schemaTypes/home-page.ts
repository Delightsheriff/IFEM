import { Images } from "lucide-react";
import { defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  icon: Images,
  fields: [
    {
      name: "heroSlides",
      title: "Hero background images",
      type: "array",
      description:
        "Drag in multiple photos and reorder them. The home page cross-fades through these images automatically.",
      of: [{ type: "image", options: { hotspot: true } }],
    },
  ],
  preview: {
    select: { media: "heroSlides.0" },
    prepare({ media }) {
      return { title: "Home Page", subtitle: "Hero background images", media };
    },
  },
});
