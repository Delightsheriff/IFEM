import Image from "next/image";
import { ExternalLink, Play } from "lucide-react";
import type { Event } from "@/interface/sanity";
import { isCompleteSpotlight } from "@/lib/event-status";

export function EventSpotlight({ event }: { event: Event }) {
  if (!isCompleteSpotlight(event) || !event.spotlight) return null;

  return <section aria-labelledby="event-spotlight-heading" className="border-t border-[#e2e2de] py-12 md:py-16">
    <div className="mx-auto max-w-5xl">
      <p className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a5c34]"><span className="h-px w-6 bg-[#1a5c34]" /> Event spotlight</p>
      <h2 id="event-spotlight-heading" className="font-serif text-3xl font-bold text-charcoal">{event.spotlight.heading}</h2>
      <p className="mt-3 max-w-2xl leading-relaxed text-[#5a5a5a]">{event.spotlight.summary}</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {event.spotlight.media.map((item, index) => item.type === "image" ? <figure key={`${item.url}-${index}`} className="overflow-hidden rounded-xl border border-[#e2e2de] bg-white"><div className="relative aspect-[4/3]"><Image src={item.url!} alt={item.alt!} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" /></div>{item.caption ? <figcaption className="p-4 text-sm text-gray">{item.caption}</figcaption> : null}</figure> : <a key={`${item.url}-${index}`} href={item.url} target="_blank" rel="noopener noreferrer" className="group overflow-hidden rounded-xl border border-[#e2e2de] bg-white focus-ring"><div className="relative aspect-[4/3]"><Image src={item.poster!.url!} alt={item.poster!.alt!} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-300 group-hover:scale-[1.02]" /><span className="absolute inset-0 grid place-items-center bg-[#0d3320]/25"><span className="grid h-12 w-12 place-items-center rounded-full bg-white text-[#1a5c34] shadow-lg"><Play aria-hidden="true" className="ml-0.5 h-5 w-5 fill-current" /></span></span></div><span className="flex items-center justify-between gap-3 p-4 text-sm font-semibold text-charcoal"><span>{item.title}</span><ExternalLink aria-hidden="true" className="h-4 w-4 text-[#1a5c34]" /></span>{item.caption ? <span className="block px-4 pb-4 text-sm text-gray">{item.caption}</span> : null}</a>)}
      </div>
    </div>
  </section>;
}
