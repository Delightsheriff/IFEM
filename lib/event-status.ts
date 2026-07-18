import type { Event } from "@/interface/sanity";

export const EVENT_FORMAT_LABELS: Record<string, string> = {
  "interactive-conference": "Interactive conference",
  "university-fair": "University fair",
  "visa-briefing": "Visa briefing",
  "document-review-clinic": "Document review clinic",
  webinar: "Webinar",
  other: "Event",
};

export function getEventFormatLabel(format?: string): string {
  return format ? (EVENT_FORMAT_LABELS[format] ?? "Event") : "Event";
}

export function splitEvents(events: Event[], now: Date) {
  const currentTime = now.getTime();
  const validEvents = events.filter((event) => {
    const startsAt = new Date(event.startsAt).getTime();
    const endsAt = new Date(event.endsAt).getTime();
    return (
      Number.isFinite(startsAt) && Number.isFinite(endsAt) && endsAt >= startsAt
    );
  });

  const upcoming = validEvents
    .filter((event) => new Date(event.endsAt).getTime() >= currentTime)
    .toSorted(
      (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
    );
  const past = validEvents
    .filter((event) => new Date(event.endsAt).getTime() < currentTime)
    .toSorted(
      (a, b) => new Date(b.endsAt).getTime() - new Date(a.endsAt).getTime(),
    );

  return { upcoming, past };
}

export function isCompleteSpotlight(event: Event): boolean {
  const spotlight = event.spotlight;
  if (!spotlight?.heading?.trim() || spotlight.media.length === 0) {
    return false;
  }

  return spotlight.media.every((item) => {
    if (item.type === "image")
      return Boolean(item.url?.trim() && item.alt?.trim());
    return Boolean(
      item.title?.trim() &&
      (item.videoUrl?.startsWith("https://") ||
        item.url?.startsWith("https://")),
    );
  });
}

export function isCompleteEventRegistration(event: Event): boolean {
  return Boolean(event.registrationUrl?.startsWith("http"));
}

export function isPastEvent(event: Event, now = new Date()): boolean {
  return new Date(event.endsAt).getTime() < now.getTime();
}
