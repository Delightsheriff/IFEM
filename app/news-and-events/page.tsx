import type { Metadata } from "next";
import { getEvents, getNewsArticles } from "@/sanity/sanity";
import { splitEvents, isCompleteSpotlight } from "@/lib/event-status";
import { CTASection } from "@/components/ui/cta-section";
import { NewsEventsHero } from "@/components/news-events/NewsEventsHero";
import { UpcomingEvents } from "@/components/news-events/UpcomingEvents";
import { EventSpotlightCards } from "@/components/news-events/EventSpotlightCards";
import { ArticleGrid } from "@/components/news-events/ArticleGrid";
import { EmptyNewsEventsState } from "@/components/news-events/EmptyNewsEventsState";
import { NoUpcomingEventsState } from "@/components/news-events/NoUpcomingEventsState";
import { EmptyArticlesState } from "@/components/news-events/EmptyArticlesState";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "News & Events | IFEM Education",
  description: "UK study news, practical admissions advice, IFEM events and university connections for Nigerian students.",
  alternates: { canonical: "/news-and-events" },
  openGraph: { title: "News & Events | IFEM Education", description: "UK study news, practical admissions advice and IFEM events.", url: "/news-and-events", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "IFEM Education News and Events" }] },
  twitter: { card: "summary_large_image", title: "News & Events | IFEM Education", description: "UK study news, practical admissions advice and IFEM events.", images: ["/opengraph-image"] },
};

export default async function NewsAndEventsPage() {
  const [articles, events] = await Promise.all([getNewsArticles(), getEvents()]);
  const { upcoming, past } = splitEvents(events, new Date());
  const spotlights = past.filter(isCompleteSpotlight);
  const hasContent = articles.length > 0 || upcoming.length > 0 || spotlights.length > 0;

  return <div className="w-full">
    <NewsEventsHero />
    {hasContent ? <>
      <UpcomingEvents events={upcoming} />
      {upcoming.length === 0 && spotlights.length === 0 ? <NoUpcomingEventsState /> : null}
      <EventSpotlightCards events={spotlights} isPrimary={upcoming.length === 0} />
      {articles.length > 0 ? <ArticleGrid articles={articles} /> : <EmptyArticlesState />}
    </> : <section className="border-t border-[#e2e2de] bg-white px-4 md:px-10"><EmptyNewsEventsState /></section>}
    <CTASection variant="forest" heading="Ready to plan your UK journey?" description="Speak with an IFEM counsellor for personal guidance on your course, university and application." primaryLink="/contact" primaryLabel="Talk to a Counsellor" />
  </div>;
}
