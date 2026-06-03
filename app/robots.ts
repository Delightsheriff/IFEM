import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/studio/",      // Sanity studio — not for indexing
          "/api/",         // API routes
          "/_next/",       // Next.js internals
        ],
      },
      {
        // Block Sanity studio from all crawlers explicitly
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/studio/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
