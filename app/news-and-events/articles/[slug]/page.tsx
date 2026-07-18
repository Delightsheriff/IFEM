import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GraduationCap } from "lucide-react";
import PageContentWrapper from "@/components/ui/page-content-wrapper";
import { ShareGuide } from "@/components/share-guide";
import { NewsArticleContent } from "@/components/news-events/NewsArticleContent";
import { NewsBackNav } from "@/components/news-events/NewsBackNav";
import { getNewsArticleBySlug, getNewsArticles } from "@/sanity/sanity";
import { getContentCategoryLabel } from "@/lib/content-categories";
import { formatDate } from "@/lib/utils";
import { SITE_URL } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsArticleBySlug(slug);
  if (!article) return {};
  const title = article.seoTitle ?? article.title;
  const description = article.seoDescription ?? article.excerpt;
  const image = article.ogImage?.url ?? article.coverImage?.url ?? "/opengraph-image";
  return { title, description, alternates: { canonical: `/news-and-events/articles/${slug}` }, openGraph: { title: `${title} | IFEM Education`, description, url: `/news-and-events/articles/${slug}`, type: "article", images: [{ url: image, alt: article.ogImage?.alt ?? article.coverImage?.alt ?? title }], publishedTime: article._createdAt, modifiedTime: article._updatedAt ?? article._createdAt }, twitter: { card: "summary_large_image", title: `${title} | IFEM Education`, description, images: [image] } };
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [article, allArticles] = await Promise.all([getNewsArticleBySlug(slug), getNewsArticles()]);
  if (!article) notFound();
  const related = allArticles.filter((candidate) => candidate._id !== article._id && candidate.category === article.category).slice(0, 3);
  const canonicalUrl = `${SITE_URL}/news-and-events/articles/${slug}`;
  const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: article.title, description: article.excerpt, datePublished: article._createdAt, dateModified: article._updatedAt ?? article._createdAt, author: { "@type": "Organization", name: "IFEM Education", url: SITE_URL }, publisher: { "@type": "Organization", name: "IFEM Education", url: SITE_URL }, mainEntityOfPage: canonicalUrl, articleSection: article.category, timeRequired: `PT${article.readTime ?? 5}M`, inLanguage: "en-GB" };

  return <div className="w-full"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} /><PageContentWrapper><NewsBackNav /><section className="pb-8 md:pb-12"><div className="mx-auto max-w-3xl"><div className="mb-6 flex flex-wrap items-center gap-3"><span className="rounded-full border border-[#1a5c34]/15 bg-[#e8f3ec] px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#1a5c34]">{getContentCategoryLabel(article.category)}</span><span className="text-xs text-gray">{article.readTime ?? 5} min read</span><span className="hidden text-xs text-gray/40 sm:inline">—</span><time className="text-xs text-gray" dateTime={article._createdAt}>{formatDate(article._createdAt)}</time></div><h1 className="font-serif text-3xl font-bold leading-tight text-charcoal md:text-4xl lg:text-5xl">{article.title}</h1><p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray">{article.excerpt}</p><div className="mt-6 flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e8f3ec]"><GraduationCap aria-hidden="true" className="h-4 w-4 text-forest" /></div><div><p className="text-sm font-semibold text-charcoal">IFEM Education editorial team</p><p className="text-[11px] uppercase tracking-widest text-gray">UK admissions counsellors</p></div></div><div className="mt-6 border-t border-[#e2e2de] pt-6"><ShareGuide title={article.title} url={canonicalUrl} /></div></div></section><NewsArticleContent article={article} />{related.length > 0 ? <section className="border-t border-[#e2e2de] pb-16 pt-12 md:pb-20 md:pt-16"><div className="mx-auto max-w-5xl"><p className="mb-3 text-xs font-semibold uppercase tracking-widest text-forest">Read next</p><h2 className="mb-8 font-serif text-3xl font-bold text-charcoal">More {getContentCategoryLabel(article.category).toLowerCase()}</h2><div className="grid gap-4 md:grid-cols-3">{related.map((item) => <a key={item._id} href={`/news-and-events/articles/${item.slug.current}`} className="rounded-xl border border-[#e2e2de] bg-white p-5 transition-colors hover:border-[#1a5c34]/30 focus-ring"><p className="text-[10px] font-semibold uppercase tracking-widest text-forest">{getContentCategoryLabel(item.category)}</p><h3 className="mt-3 font-serif text-lg font-bold text-charcoal">{item.title}</h3><p className="mt-2 line-clamp-3 text-xs leading-relaxed text-gray">{item.excerpt}</p></a>)}</div></div></section> : null}</PageContentWrapper></div>;
}
