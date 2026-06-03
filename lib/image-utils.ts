import type { SuccessStory } from "@/interface/sanity";

/**
 * Resolves a usable image URL for a success story, falling back to a
 * neutral placeholder when Sanity hasn't been configured or the asset
 * reference is missing. Centralised so callers stop repeating the
 * `story.studentImage?.url ?? story.studentImage?.asset?.url` chain.
 */
export function getStoryImageUrl(story: SuccessStory, fallback = "/placeholder.svg"): string {
  return story.studentImage?.url || story.studentImage?.asset?.url || fallback;
}
