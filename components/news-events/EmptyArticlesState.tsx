import { Newspaper } from "lucide-react";

export function EmptyArticlesState() {
  return (
    <section aria-labelledby="no-articles-heading" className="bg-[#fafaf7] px-4 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-7xl rounded-xl border border-[#e2e2de] bg-white p-8 md:p-10">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e8f3ec]">
            <Newspaper aria-hidden="true" className="h-5 w-5 text-[#1a5c34]" />
          </div>
          <div>
            <h2 id="no-articles-heading" className="font-serif text-2xl font-bold text-charcoal">New updates are on the way</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#5a5a5a]">We&apos;re preparing practical UK study advice and IFEM news. Check back soon for the latest guidance.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
