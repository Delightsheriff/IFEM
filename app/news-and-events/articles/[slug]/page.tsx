import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";
import { notFound } from "next/navigation";
import PageContentWrapper from "@/components/ui/page-content-wrapper";
import { NewsArticleContent } from "@/components/news-events/NewsArticleContent";
import { PageBreadcrumbs } from "@/components/ui/page-breadcrumbs";
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

  return <div className="w-full"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} /><PageBreadcrumbs items={[{ label: "News", href: "/news" }, { label: article.title, href: `/news-and-events/articles/${slug}` }]} /><PageContentWrapper><article><header className="mx-auto max-w-5xl pb-12 md:pb-16"><div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_180px] lg:items-end"><div><p className="mb-5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a5c34]">{getContentCategoryLabel(article.category)}</p><h1 className="max-w-4xl font-serif text-4xl font-bold leading-[1.05] tracking-[-0.025em] text-charcoal md:text-6xl">{article.title}</h1><p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#5a5a5a]">{article.excerpt}</p></div><dl className="border-l border-[#1a5c34]/25 pl-5 text-sm"><div><dt className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#7a7a7a]">Published</dt><dd className="mt-1 font-semibold text-charcoal"><time dateTime={article._createdAt}>{formatDate(article._createdAt)}</time></dd></div><div className="mt-5"><dt className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#7a7a7a]">Reading time</dt><dd className="mt-1 flex items-center gap-1.5 font-semibold text-charcoal"><Clock3 aria-hidden="true" className="h-3.5 w-3.5 text-forest" />{article.readTime ?? 5} minutes</dd></div></dl></div></header><section className="mx-auto max-w-3xl border-y border-[#e2e2de] py-7"><p className="font-serif text-xl leading-relaxed text-[#1a5c34] md:text-2xl">A considered note for students and families planning their next move.</p></section><NewsArticleContent article={article} /><section className="mx-auto max-w-3xl border-t border-[#e2e2de] py-10"><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#1a5c34]">Your next step</p><div className="mt-3 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><h2 className="font-serif text-2xl font-bold text-charcoal">Want to talk it through?</h2><p className="mt-2 max-w-xl text-sm leading-relaxed text-gray">An IFEM counsellor can help you turn general guidance into a practical study plan.</p></div><Link href="/contact" className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#1a5c34] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#154a2a] focus-ring">Talk to a counsellor <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link></div></section>{related.length > 0 ? <section className="border-t border-[#e2e2de] py-12 md:py-16"><div className="mx-auto max-w-5xl"><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#1a5c34]">Continue reading</p><div className="mt-6 grid gap-3 md:grid-cols-3">{related.map((item) => <Link key={item._id} href={`/news-and-events/articles/${item.slug.current}`} className="group rounded-xl border border-[#e2e2de] bg-white p-5 transition-colors hover:border-[#1a5c34]/35 focus-ring"><p className="text-[10px] font-bold uppercase tracking-widest text-forest">{getContentCategoryLabel(item.category)}</p><h3 className="mt-3 font-serif text-lg font-bold leading-snug text-charcoal">{item.title}</h3><span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-forest">Read note <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" /></span></Link>)}</div></div></section> : null}</article></PageContentWrapper></div>;
}
