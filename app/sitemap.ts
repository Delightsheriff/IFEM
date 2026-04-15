import { MetadataRoute } from "next";
import { getGuides } from "@/sanity/sanity";

const SITE_URL = "https://www.ifemeducation.com";

// Static routes with their change frequency and priority
const STATIC_ROUTES: MetadataRoute.Sitemap = [
  {
    url: SITE_URL,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1.0,
  },
  {
    url: `${SITE_URL}/about`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    url: `${SITE_URL}/contact`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    url: `${SITE_URL}/success-stories`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.85,
  },
  {
    url: `${SITE_URL}/institutions`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${SITE_URL}/guides`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    url: `${SITE_URL}/faq`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.75,
  },
  {
    url: `${SITE_URL}/privacy`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.3,
  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Dynamically add guide pages from Sanity
  let guideRoutes: MetadataRoute.Sitemap = [];
  try {
    const guides = await getGuides();
    guideRoutes = guides.map((guide) => ({
      url: `${SITE_URL}/guides/${guide.slug.current}`,
      lastModified: new Date(guide._createdAt ?? new Date()),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch {
    // Fallback silently — sitemap still works for static routes
  }

  return [...STATIC_ROUTES, ...guideRoutes];
}
