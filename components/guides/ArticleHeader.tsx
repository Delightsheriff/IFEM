import { ShareGuide } from "@/components/share-guide";
import { formatDate } from "@/lib/utils";
import { getGuideCategoryLabel } from "@/lib/guide-categories";
import { GraduationCap } from "lucide-react";
import { SITE_URL } from "@/lib/site";
import type { Guide } from "@/interface/sanity";

interface ArticleHeaderProps {
  guide: Guide;
  slug: string;
}

export function ArticleHeader({ guide, slug }: ArticleHeaderProps) {
  return (
    <section className="pb-8 md:pb-12">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="inline-block rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#1a5c34] bg-[#e8f3ec] border border-[#1a5c34]/15">
            {getGuideCategoryLabel(guide.category)}
          </span>
          <span className="text-xs text-gray">{guide.readTime} min read</span>
          <span className="hidden sm:inline text-xs text-gray/40">—</span>
          <span className="text-xs text-gray">{formatDate(guide._createdAt)}</span>
        </div>
        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal leading-tight">
          {guide.title}
        </h1>
        {guide.excerpt && (
          <p className="mt-4 text-lg text-gray leading-relaxed max-w-2xl">
            {guide.excerpt}
          </p>
        )}
        <div className="mt-6 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e8f3ec] shrink-0">
            <GraduationCap className="h-4 w-4 text-forest" aria-hidden="true" />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-charcoal">
              IFEM Education editorial team
            </p>
            <p className="text-[11px] uppercase tracking-widest text-gray">
              UK admissions counsellors
            </p>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-[#e2e2de]">
          <ShareGuide title={guide.title} url={`${SITE_URL}/guides/${slug}`} />
        </div>
      </div>
    </section>
  );
}
