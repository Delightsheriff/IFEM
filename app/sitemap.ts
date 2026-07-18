import { MetadataRoute } from "next";
import { getEvents, getNewsArticles } from "@/sanity/sanity";
import { SITE_URL } from "@/lib/site";

// Hardcoded launch date used as the lastModified for purely static
// marketing routes. Using `new Date()` here made every static route look
// freshly updated on every crawl and wasted crawl budget.
const STATIC_LAST_MODIFIED = new Date("2026-06-01");

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: SITE_URL,                       lastModified: STATIC_LAST_MODIFIED, changeFrequency: "weekly",  priority: 1.0  },
  { url: `${SITE_URL}/contact`,          lastModified: STATIC_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.95 },
  { url: `${SITE_URL}/institutions`,     lastModified: STATIC_LAST_MODIFIED, changeFrequency: "weekly",  priority: 0.9  },
  { url: `${SITE_URL}/success-stories`,  lastModified: STATIC_LAST_MODIFIED, changeFrequency: "weekly",  priority: 0.9  },
  { url: `${SITE_URL}/news-and-events`,  lastModified: STATIC_LAST_MODIFIED, changeFrequency: "weekly",  priority: 0.85 },
  { url: `${SITE_URL}/faq`,              lastModified: STATIC_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.8  },
  { url: `${SITE_URL}/about`,            lastModified: STATIC_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.75 },
  { url: `${SITE_URL}/privacy`,          lastModified: STATIC_LAST_MODIFIED, changeFrequency: "yearly",  priority: 0.2  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let contentRoutes: MetadataRoute.Sitemap = [];
  try {
    const [articles, events] = await Promise.all([getNewsArticles(), getEvents()]);
    contentRoutes = [
      ...articles.map((article) => ({
        url: `${SITE_URL}/news-and-events/articles/${article.slug.current}`,
        lastModified: new Date(article._updatedAt ?? article._createdAt ?? STATIC_LAST_MODIFIED),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
      ...events.map((event) => ({
        url: `${SITE_URL}/news-and-events/events/${event.slug.current}`,
        lastModified: new Date(event._updatedAt ?? event._createdAt ?? STATIC_LAST_MODIFIED),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
    ];
  } catch {
    // Fallback silently — sitemap still works for static routes
  }

  return [...STATIC_ROUTES, ...contentRoutes];
}
