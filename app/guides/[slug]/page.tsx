import { notFound, permanentRedirect } from "next/navigation";
import { getNewsArticleBySlug } from "@/sanity/sanity";

export default async function GuideRedirect({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getNewsArticleBySlug(slug);
  if (!article) notFound();
  permanentRedirect(`/news-and-events/articles/${slug}`);
}
