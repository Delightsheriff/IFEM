import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Images } from "lucide-react";
import type { Event } from "@/interface/sanity";
import { formatDate } from "@/lib/utils";

interface EventSpotlightCardsProps {
  events: Event[];
  isPrimary?: boolean;
}

export function EventSpotlightCards({ events, isPrimary = false }: EventSpotlightCardsProps) {
  if (events.length === 0) return null;
  return (
    <section aria-labelledby="event-spotlights-heading" className={`${isPrimary ? "bg-white" : "border-t border-[#e2e2de] bg-white"} px-4 py-16 md:px-10 md:py-24`}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-9 max-w-2xl">
          <p className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a5c34]"><span className="h-px w-6 bg-[#1a5c34]" /> Recent moments</p>
          <h2 id="event-spotlights-heading" className="font-serif text-3xl font-bold text-charcoal md:text-4xl">Event spotlights</h2>
          <p className="mt-3 text-[#5a5a5a]">A closer look at the conversations, connections and support shared at IFEM events.</p>
          {isPrimary && <p className="mt-4 text-sm font-medium text-[#1a5c34]">Our next event will be announced here.</p>}
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => {
            const mediaCount = event.spotlight?.media.length ?? 0;
            return (
              <Link key={event._id} href={`/news-and-events/events/${event.slug.current}`} className="group overflow-hidden rounded-xl border border-[#e2e2de] bg-white transition-all hover:border-[#1a5c34]/30 hover:shadow-md focus-ring">
                <div className="relative h-52 overflow-hidden bg-[#e8f3ec]">
                  {event.coverImage?.url ? <Image src={event.coverImage.url} alt={event.coverImage.alt ?? ""} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" /> : <Images aria-hidden="true" className="absolute inset-0 m-auto h-8 w-8 text-[#1a5c34]" />}
                </div>
                <div className="p-6">
                  <p className="text-xs text-gray">{formatDate(event.endsAt)}</p>
                  <h3 className="mt-2 font-serif text-2xl font-bold text-charcoal transition-colors group-hover:text-forest">{event.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray">{event.spotlight?.summary}</p>
                  <div className="mt-5 flex items-center justify-between text-sm font-semibold text-forest"><span>{mediaCount} {mediaCount === 1 ? "moment" : "moments"}</span><span className="inline-flex items-center gap-2">View spotlight <ArrowRight aria-hidden="true" className="h-4 w-4" /></span></div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
