import { BarChart3 } from "lucide-react";
import { defineField, defineType } from "sanity";

export const siteStats = defineType({
  name: "siteStats",
  title: "Site Statistics",
  type: "document",
  icon: BarChart3,
  fields: [
    defineField({
      name: "studentsPlaced",
      title: "Students Placed",
      description: "Total number of students placed in universities",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "partnerUniversities",
      title: "Partner Universities",
      description: "Number of partner UK universities",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "yearsInService",
      title: "Years in Service",
      description: "Number of years IFEM has been operating",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "visaSuccessRate",
      title: "Visa Success Rate (%)",
      description: "Visa approval success rate as a percentage (e.g. 99.6)",
      type: "number",
      validation: (Rule) => Rule.required().min(0).max(100),
    }),
  ],
  preview: {
    select: {
      studentsPlaced: "studentsPlaced",
      visaSuccessRate: "visaSuccessRate",
    },
    prepare({ studentsPlaced, visaSuccessRate }) {
      return {
        title: "Site Statistics",
        subtitle: `${studentsPlaced}+ students · ${visaSuccessRate}% visa success`,
      };
    },
  },
});
