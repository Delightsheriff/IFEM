import { PortableText } from "next-sanity";
import type { NewsArticle } from "@/interface/sanity";
import { customPortableTextComponents } from "@/components/portable-text-components";

export function NewsArticleContent({ article }: { article: NewsArticle }) {
  return <section className="pb-16 md:pb-20"><div className="mx-auto max-w-3xl"><PortableText value={article.content} components={customPortableTextComponents} /></div></section>;
}
