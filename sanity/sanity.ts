import { Guide, SuccessStory } from "@/interface/sanity";
import client from "./sanity.client";
import { createImageUrlBuilder, SanityImageSource } from "@sanity/image-url";

const builder = client ? createImageUrlBuilder(client) : null;

/**
 * Generates a URL builder for Sanity images with fallback to placeholder.
 *
 * This function creates an image URL builder that handles various edge cases
 * and error scenarios by returning a placeholder image when the source is
 * invalid, unavailable, or when the Sanity client is not properly configured.
 *
 * @param source - The Sanity image source object, string, or reference
 * @returns An object with a `url()` method that returns either a Sanity image URL or a placeholder SVG
 *
 * @example
 * ```typescript
 * const imageBuilder = urlFor(sanityImageAsset);
 * const imageUrl = imageBuilder.url();
 * ```
 *
 * @remarks
 * - Returns placeholder SVG for null/undefined sources
 * - Returns placeholder SVG for string sources or placeholder references
 * - Returns placeholder SVG when Sanity builder is unavailable
 * - Catches and handles any errors during image URL generation
 */
export function urlFor(source: SanityImageSource) {
  // Handle null or undefined sources
  if (!source) {
    return {
      url: () => "/placeholder.svg?height=600&width=800",
    };
  }

  // Handle placeholder strings or invalid references
  if (
    typeof source === "string" ||
    ("asset" in source && source.asset && source.asset._ref === "placeholder")
  ) {
    return {
      url: () => "/placeholder.svg?height=600&width=800",
    };
  }

  // If no Sanity client, return placeholder
  if (!builder) {
    return {
      url: () => "/placeholder.svg?height=600&width=800",
    };
  }

  // Return proper Sanity image URL
  try {
    return builder.image(source);
  } catch (error) {
    console.log("Error building image URL, using placeholder:", error);
    return {
      url: () => "/placeholder.svg?height=600&width=800",
    };
  }
}

/**
 * Fetches all FAQs from Sanity
 */
export async function getFAQ() {
  if (!client) return [];

  try {
    // Included 'featured' in the fetch so you can filter on the frontend if needed
    return await client.fetch(
      `*[_type == "faq"]{
        question, 
        answer, 
        category, 
        featured
      }`,
    );
  } catch (error) {
    console.error("Error fetching FAQ from Sanity", error);
    return [];
  }
}
/**
 * Fetches only the FAQs marked as featured
 */
export async function getFeaturedFAQ() {
  if (!client) return [];

  try {
    return await client.fetch(
      `*[_type == "faq" && featured == true]{
        question, 
        answer, 
        category
      }`,
    );
  } catch (error) {
    console.error("Error fetching featured FAQs from Sanity", error);
    return [];
  }
}

/**
 * Fetched Social Links from Sanity
 */
export async function getSocialLinks() {
  if (!client) return [];

  try {
    return await client.fetch(
      `*[_type == "socialLinks"]{
        platform, 
        url
      }`,
    );
  } catch (error) {
    console.error("Error fetching social links from Sanity", error);
    return [];
  }
}

/**
 * Fetches all Success Stories with Alt text for Accessibility
 */
export async function getSuccessStories(): Promise<SuccessStory[]> {
  if (!client) return [];

  try {
    return await client.fetch(
      `*[_type == "successStories"] | order(_createdAt desc) {
        _id,
        studentName,
        schoolDestination,
        comment,
        studentImage {
          "url": asset->url,
          "alt": alt, // Fetches the alt text from the image field
          hotspot
        }
      }`,
      {},
      { next: { revalidate: 3600 } },
    );
  } catch (error) {
    console.error("Error fetching Success Stories from Sanity:", error);
    return [];
  }
}

/**
 * Fetches all guides from Sanity
 */
export async function getGuides(): Promise<Guide[]> {
  if (!client) return [];

  try {
    return await client.fetch(
      `*[_type == "guides"] | order(_createdAt desc) {
        _id,
        title,
        slug,
        excerpt,
        readTime,
        category,
        content
      }`,
      {},
      { next: { revalidate: 3600 } },
    );
  } catch (error) {
    console.error("Error fetching guides from Sanity:", error);
    return [];
  }
}
