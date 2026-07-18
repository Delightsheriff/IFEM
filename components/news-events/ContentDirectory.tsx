import Link from "next/link";
import { ArrowRight, CalendarDays, Newspaper } from "lucide-react";

export function ContentDirectory() {
  return (
    <section aria-label="Choose news or events" className="border-t border-[#e2e2de] bg-white px-4 py-8 md:px-10">
      <div className="mx-auto grid max-w-7xl gap-3 md:grid-cols-2">
        <Link href="/events" className="group flex items-center gap-4 rounded-xl border border-[#e2e2de] bg-[#fafaf7] p-5 transition-all hover:border-[#1a5c34]/35 hover:bg-[#e8f3ec] focus-ring">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#1a5c34] text-white"><CalendarDays aria-hidden="true" className="h-5 w-5" /></span>
          <span className="flex-1"><span className="block font-serif text-xl font-bold text-charcoal">Events</span><span className="mt-1 block text-sm text-gray">Find a session, fair or document-review clinic.</span></span>
          <ArrowRight aria-hidden="true" className="h-4 w-4 text-forest transition-transform group-hover:translate-x-1" />
        </Link>
        <Link href="/news" className="group flex items-center gap-4 rounded-xl border border-[#e2e2de] bg-[#fafaf7] p-5 transition-all hover:border-[#1a5c34]/35 hover:bg-[#e8f3ec] focus-ring">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-[#1a5c34] ring-1 ring-[#1a5c34]/15"><Newspaper aria-hidden="true" className="h-5 w-5" /></span>
          <span className="flex-1"><span className="block font-serif text-xl font-bold text-charcoal">News &amp; advice</span><span className="mt-1 block text-sm text-gray">Read clear updates for your UK study plans.</span></span>
          <ArrowRight aria-hidden="true" className="h-4 w-4 text-forest transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
