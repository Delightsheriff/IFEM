import { createClient } from "@sanity/client";

const apply = process.argv.includes("--apply");
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, or SANITY_API_TOKEN.");
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: "2024-12-16", useCdn: false });
const guides = await client.fetch(`*[_type == "guides"] | order(_createdAt asc) {
  _id, _createdAt, _updatedAt, title, slug, excerpt, readTime, category, content,
  seoTitle, seoDescription, coverImage, ogImage
}`);

const documents = guides.map((guide) => ({
  _id: `newsArticle-${guide._id}`,
  _type: "newsArticle",
  _createdAt: guide._createdAt,
  _updatedAt: guide._updatedAt,
  title: guide.title,
  slug: guide.slug,
  excerpt: guide.excerpt,
  readTime: guide.readTime,
  category: guide.category,
  content: guide.content,
  ...(guide.coverImage ? { coverImage: guide.coverImage } : {}),
  ...(guide.seoTitle ? { seoTitle: guide.seoTitle } : {}),
  ...(guide.seoDescription ? { seoDescription: guide.seoDescription } : {}),
  ...(guide.ogImage ? { ogImage: guide.ogImage } : {}),
}));

console.log(`${apply ? "Migrating" : "Dry run:"} ${documents.length} guide document(s).`);
for (const document of documents) console.log(`${document._id}: ${document.slug?.current ?? "missing slug"}`);

if (!apply) {
  console.log("Review this list, then rerun with --apply to create newsArticle documents.");
  process.exit(0);
}

const transaction = documents.reduce(
  (tx, document) => tx.createIfNotExists(document),
  client.transaction(),
);
const result = await transaction.commit();
console.log(`Created ${result.results.length} newsArticle document(s).`);
