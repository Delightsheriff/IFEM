import { CalendarDays } from "lucide-react";
import { defineType } from "sanity";
import { portableContent } from "./news-article";

const event = defineType({
  name: "event",
  title: "Event",
  type: "document",
  icon: CalendarDays,
  groups: [
    { name: "details", title: "Event details", default: true },
    { name: "spotlight", title: "Event spotlight" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    {
      name: "title",
      title: "Event title",
      type: "string",
      group: "details",
      validation: (Rule) => Rule.required().min(10).max(100),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "details",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "excerpt",
      title: "Short description",
      type: "text",
      rows: 3,
      group: "details",
      validation: (Rule) => Rule.required().min(40).max(220),
    },
    {
      name: "format",
      title: "Event format",
      type: "string",
      group: "details",
      options: {
        list: [
          { title: "Interactive conference", value: "interactive-conference" },
          { title: "University fair", value: "university-fair" },
          { title: "Visa briefing", value: "visa-briefing" },
          { title: "Document review clinic", value: "document-review-clinic" },
          { title: "Webinar", value: "webinar" },
          { title: "Other", value: "other" },
        ],
      },
    },
    {
      name: "startsAt",
      title: "Starts at",
      type: "datetime",
      group: "details",
      options: { timeStep: 15 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "endsAt",
      title: "Ends at",
      type: "datetime",
      group: "details",
      options: { timeStep: 15 },
      description:
        "Past/upcoming is calculated automatically from this end date.",
      validation: (Rule) =>
        Rule.required().custom((endsAt, context) => {
          const startsAt = (
            context.document as { startsAt?: string } | undefined
          )?.startsAt;
          if (
            !endsAt ||
            !startsAt ||
            new Date(endsAt as string) >= new Date(startsAt)
          )
            return true;
          return "The end date must be on or after the start date.";
        }),
    },
    {
      name: "attendanceMode",
      title: "Attendance mode",
      type: "string",
      group: "details",
      options: {
        list: [
          { title: "In person", value: "in-person" },
          { title: "Online", value: "online" },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "location",
      title: "Location or online platform",
      type: "string",
      group: "details",
      validation: (Rule) => Rule.required().max(120),
    },
    {
      name: "googleMapsUrl",
      title: "Google Maps location",
      type: "url",
      group: "details",
      description: "Optional Google Maps share link shown on the event page.",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
    },
    {
      name: "attendance",
      title: "Attendance",
      type: "string",
      group: "details",
      options: {
        list: [
          { title: "Free registration", value: "free-registration" },
          { title: "Ticketed", value: "ticketed" },
          { title: "Invite only", value: "invite-only" },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "availability",
      title: "Availability message",
      type: "string",
      group: "details",
      description: "For example: Limited seats available.",
    },
    {
      name: "host",
      title: "Host",
      type: "object",
      group: "details",
      fields: [
        {
          name: "name",
          title: "Name",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "role",
          title: "Role",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: "partnerUniversities",
      title: "Partner universities attending",
      type: "array",
      group: "details",
      of: [{ type: "reference", to: [{ type: "ukUniversity" }] }],
    },
    {
      name: "highlights",
      title: "What to expect",
      type: "array",
      group: "details",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.max(5),
    },
    {
      name: "whatToBring",
      title: "What to bring",
      type: "array",
      group: "details",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.max(5),
    },
    {
      name: "coverImage",
      title: "Cover image",
      type: "image",
      group: "details",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "registrationUrl",
      title: "Registration URL",
      type: "url",
      group: "details",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
    },
    {
      name: "registrationLabel",
      title: "Registration button label",
      type: "string",
      group: "details",
      description:
        "Optional. Defaults to “Register for event” when a registration URL is set.",
    },
    {
      name: "featured",
      title: "Feature on News & Events",
      type: "boolean",
      group: "details",
      initialValue: false,
    },
    {
      name: "content",
      title: "Event details",
      type: "array",
      group: "details",
      of: portableContent,
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: "spotlight",
      title: "Event spotlight",
      type: "object",
      group: "spotlight",
      fields: [
        {
          name: "heading",
          title: "Heading",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "summary",
          title: "Summary",
          type: "text",
          rows: 3,
          description: "Optional introduction shown above the spotlight media.",
        },
        {
          name: "media",
          title: "Images and videos",
          type: "array",
          of: [
            {
              type: "image",
              options: { hotspot: true },
            },
            {
              type: "object",
              name: "spotlightVideo",
              title: "Video",
              fields: [
                {
                  name: "videoFile",
                  title: "Upload video",
                  type: "file",
                  options: { accept: "video/*" },
                  description:
                    "Uploads a video for playback directly on the event page.",
                },
                {
                  name: "url",
                  title: "External video link",
                  type: "url",
                  description:
                    "Optional public Facebook, YouTube or Vimeo link. It opens on the original platform rather than embedding it.",
                  validation: (Rule) => Rule.uri({ scheme: ["https"] }),
                },
                {
                  name: "poster",
                  title: "Poster image",
                  type: "image",
                  options: { hotspot: true },
                  description:
                    "Optional preview image for an external video link.",
                },
              ],
            },
          ],
          validation: (Rule) => Rule.required().min(1),
        },
      ],
    },
    {
      name: "seoTitle",
      title: "SEO title (override)",
      type: "string",
      group: "seo",
      validation: (Rule) => Rule.max(70),
    },
    {
      name: "seoDescription",
      title: "Meta description (override)",
      type: "text",
      rows: 3,
      group: "seo",
      validation: (Rule) => Rule.max(180),
    },
    {
      name: "ogImage",
      title: "Open Graph image",
      type: "image",
      group: "seo",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alternative text" }],
    },
  ],
});

export default event;
