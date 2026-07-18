import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { NewsArticleCard } from "@/interface/sanity";
import { getContentCategoryLabel } from "@/lib/content-categories";
import { formatDate } from "@/lib/utils";

interface ArticleGridProps {
  articles: NewsArticleCard[];
}

export function ArticleGrid({ articles }: ArticleGridProps) {
  if (articles.length === 0) return null;
  const featured = articles.find((article) => article.featured) ?? articles[0];
  const rest = articles.filter((article) => article._id !== featured._id);

  return (
    <section
      aria-labelledby="latest-news-heading"
      className="bg-[#fafaf7] px-4 py-16 md:px-10 md:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a5c34]">
              <span className="h-px w-6 bg-[#1a5c34]" /> From IFEM
            </p>
            <h2
              id="latest-news-heading"
              className="font-serif text-3xl font-bold text-charcoal md:text-4xl"
            >
              Latest news &amp; advice
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-[#7a7a7a]">
            Clear updates to help you make informed decisions about studying in
            the UK.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <ArticleCard article={featured} featured />
          {rest.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ArticleCard({
  article,
  featured = false,
}: {
  article: NewsArticleCard;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/news-and-events/articles/${article.slug.current}`}
      className={`group flex min-h-[260px] flex-col overflow-hidden rounded-xl border border-[#e2e2de] bg-white transition-all duration-200 hover:border-[#1a5c34]/30 hover:shadow-md focus-ring ${featured ? "md:row-span-2" : ""}`}
    >
      {article.coverImage?.url && (
        <div
          className={`relative overflow-hidden bg-[#e8f3ec] ${featured ? "h-56" : "h-40"}`}
        >
          <Image
            src={article.coverImage.url}
            alt={article.coverImage.alt ?? ""}
            fill
            sizes={
              featured
                ? "(min-width: 768px) 50vw, 100vw"
                : "(min-width: 768px) 50vw, 100vw"
            }
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="rounded-full border border-[#1a5c34]/15 bg-[#e8f3ec] px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#1a5c34]">
            {getContentCategoryLabel(article.category)}
          </span>
          <span className="whitespace-nowrap text-xs text-gray">
            {article.readTime ?? 5} min read
          </span>
        </div>
        <h3
          className={`font-serif font-bold leading-tight text-charcoal transition-colors group-hover:text-forest ${featured ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"}`}
        >
          {article.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-gray line-clamp-3">
          {article.excerpt}
        </p>
        <div className="mt-5 flex items-center justify-between gap-3 text-xs text-gray">
          <time dateTime={article._createdAt}>
            {formatDate(article._createdAt)}
          </time>
          <span className="inline-flex items-center gap-2 font-semibold text-forest transition-all group-hover:gap-3">
            Read article <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
