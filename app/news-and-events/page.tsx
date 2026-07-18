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
import { ContentDirectory } from "@/components/news-events/ContentDirectory";
import Link from "next/link";

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
    <ContentDirectory />
    {hasContent ? <>
      <UpcomingEvents events={upcoming.slice(0, 2)} />
      {upcoming.length === 0 && spotlights.length === 0 ? <NoUpcomingEventsState /> : null}
      <EventSpotlightCards events={spotlights.slice(0, 1)} isPrimary={upcoming.length === 0} />
      {upcoming.length > 2 || spotlights.length > 1 ? <section className="bg-white px-4 pb-12 text-center md:px-10"><Link href="/events" className="inline-flex rounded-lg border border-[#1a5c34] px-5 py-2.5 text-sm font-semibold text-[#1a5c34] transition-colors hover:bg-[#1a5c34] hover:text-white focus-ring">View all events</Link></section> : null}
      {articles.length > 0 ? <ArticleGrid articles={articles.slice(0, 2)} /> : <EmptyArticlesState />}
      {articles.length > 2 ? <section className="bg-[#fafaf7] px-4 pb-16 text-center md:px-10"><Link href="/news" className="inline-flex rounded-lg border border-[#1a5c34] px-5 py-2.5 text-sm font-semibold text-[#1a5c34] transition-colors hover:bg-[#1a5c34] hover:text-white focus-ring">View all news &amp; advice</Link></section> : null}
    </> : <section className="border-t border-[#e2e2de] bg-white px-4 md:px-10"><EmptyNewsEventsState /></section>}
    <CTASection variant="forest" heading="Ready to plan your UK journey?" description="Speak with an IFEM counsellor for personal guidance on your course, university and application." primaryLink="/contact" primaryLabel="Talk to a Counsellor" />
  </div>;
}
