import type { Metadata } from "next";
import { getNewsArticles } from "@/sanity/sanity";
import { ArticleGrid } from "@/components/news-events/ArticleGrid";
import { ContentPageHero } from "@/components/news-events/ContentPageHero";
import { EmptyArticlesState } from "@/components/news-events/EmptyArticlesState";

export const metadata: Metadata = { title: "News & Advice | IFEM Education", description: "Practical UK study updates, admissions advice and news from IFEM Education.", alternates: { canonical: "/news" } };

export default async function NewsPage() {
  const articles = await getNewsArticles();
  return <div className="w-full"><ContentPageHero eyebrow="News & advice" title="The notes worth" emphasis="keeping close." description="Practical guidance and clear IFEM updates for every stage of your UK study journey." />{articles.length > 0 ? <ArticleGrid articles={articles} /> : <EmptyArticlesState />}</div>;
}
