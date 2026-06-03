/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Flattens a Sanity PortableText array into a single plain-text string.
 *
 * Used for Schema.org JSON-LD where Google's FAQPage `acceptedAnswer.text`
 * field is required to be plain text (or stringified HTML) — passing the raw
 * block array silently breaks the rich result.
 *
 * Inline marks and decorators are kept as text only. Images, code blocks,
 * and other non-text blocks are skipped.
 */
export function portableTextToPlain(value: any): string {
  if (!Array.isArray(value)) return typeof value === "string" ? value : "";

  return value
    .map((block) => {
      if (!block || typeof block !== "object") return "";
      // Only flatten standard text blocks; skip images, code, etc.
      if (block._type !== "block" || !Array.isArray(block.children)) return "";
      return block.children
        .map((child: any) => (typeof child?.text === "string" ? child.text : ""))
        .join("");
    })
    .filter(Boolean)
    .join("\n\n")
    .trim();
}
