import { getGuideCategoryLabel } from "@/lib/guide-categories";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Guide } from "@/interface/sanity";

interface RelatedGuidesProps {
  guides: Guide[];
  category: string;
}

export function RelatedGuides({ guides, category }: RelatedGuidesProps) {
  if (guides.length === 0) return null;

  return (
    <section className="pb-16 md:pb-20 border-t border-[#e2e2de] pt-12 md:pt-16">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center gap-3 mb-6">
          <span className="block w-8 h-px bg-forest" aria-hidden="true" />
          <p className="text-forest font-sans text-xs font-semibold uppercase tracking-widest">
            Read Next
          </p>
        </div>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-charcoal mb-8 leading-tight">
          More {getGuideCategoryLabel(category)} guides
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {guides.map((related) => (
            <Link
              key={related._id}
              href={`/guides/${related.slug.current}`}
              className="group flex flex-col rounded-xl p-5 bg-white border border-[#e2e2de] hover:border-[#1a5c34]/30 hover:shadow-md transition-all duration-200 focus:outline-none focus-ring"
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-block rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-[#1a5c34] bg-[#e8f3ec] border border-[#1a5c34]/15">
                  {getGuideCategoryLabel(related.category)}
                </span>
                <span className="text-[11px] text-gray whitespace-nowrap">
                  {related.readTime} min
                </span>
              </div>
              <h3 className="font-serif text-base md:text-lg font-bold text-charcoal mb-2 group-hover:text-forest transition-colors line-clamp-2">
                {related.title}
              </h3>
              <p className="text-gray text-xs leading-relaxed line-clamp-3 mb-3 flex-1">
                {related.excerpt}
              </p>
              <span className="inline-flex items-center gap-1 text-forest text-xs font-semibold group-hover:gap-2 transition-all">
                Read
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
