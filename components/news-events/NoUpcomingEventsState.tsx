import { Bell } from "lucide-react";

export function NoUpcomingEventsState() {
  return (
    <section aria-labelledby="no-upcoming-events-heading" className="border-t border-[#e2e2de] bg-white px-4 py-14 md:px-10">
      <div className="mx-auto flex max-w-7xl items-start gap-4 rounded-xl border border-[#e2e2de] bg-[#fafaf7] p-6 md:p-8">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e8f3ec]">
          <Bell aria-hidden="true" className="h-5 w-5 text-[#1a5c34]" />
        </div>
        <div>
          <h2 id="no-upcoming-events-heading" className="font-serif text-2xl font-bold text-charcoal">No upcoming events yet</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#5a5a5a]">Our next IFEM event will be announced here. In the meantime, explore our latest study updates or speak with a counsellor.</p>
        </div>
      </div>
    </section>
  );
}
