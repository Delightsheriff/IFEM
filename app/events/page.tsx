import type { Metadata } from "next";
import { getEvents } from "@/sanity/sanity";
import { splitEvents, isCompleteSpotlight } from "@/lib/event-status";
import { ContentPageHero } from "@/components/news-events/ContentPageHero";
import { UpcomingEvents } from "@/components/news-events/UpcomingEvents";
import { EventSpotlightCards } from "@/components/news-events/EventSpotlightCards";
import { PastEventsList } from "@/components/news-events/PastEventsList";
import { NoUpcomingEventsState } from "@/components/news-events/NoUpcomingEventsState";
import { EmptyNewsEventsState } from "@/components/news-events/EmptyNewsEventsState";
import { PageBreadcrumbs } from "@/components/ui/page-breadcrumbs";

export const revalidate = 60;
export const metadata: Metadata = {
  title: "Events | IFEM Education",
  description:
    "Upcoming IFEM study sessions, fairs and document-review clinics, plus past event spotlights.",
  alternates: { canonical: "/events" },
};

export default async function EventsPage() {
  const events = await getEvents();
  const { upcoming, past } = splitEvents(events, new Date());
  const spotlights = past.filter(isCompleteSpotlight);
  const hasContent = upcoming.length > 0 || past.length > 0;
  return (
    <div className="w-full">
      <PageBreadcrumbs items={[{ label: "Events", href: "/events" }]} />
      <ContentPageHero
        eyebrow="IFEM events"
        title="Meet your next"
        emphasis="good decision."
        description="Sessions, fairs and practical review clinics that make your UK study plans clearer."
      />
      {hasContent ? (
        <>
          <UpcomingEvents events={upcoming} />
          {upcoming.length === 0 ? <NoUpcomingEventsState /> : null}
          {spotlights.length > 0 ? (
            <EventSpotlightCards events={spotlights} />
          ) : null}
          <PastEventsList events={past} />
        </>
      ) : (
        <EmptyNewsEventsState />
      )}
    </div>
  );
}
