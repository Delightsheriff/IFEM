import type { PortableTextBlock, PortableTextSpan } from "@portabletext/types";

/**
 * Flattens a Sanity PortableText array into a single plain-text string.
 *
 * Used for Schema.org JSON-LD where Google's FAQPage `acceptedAnswer.text`
 * field is required to be plain text — passing the raw block array
 * silently breaks the rich result.
 *
 * Inline marks and decorators are kept as text only. Images, code blocks,
 * and other non-text blocks are skipped.
 */
export function portableTextToPlain(
  value: PortableTextBlock[] | string | null | undefined,
): string {
  if (typeof value === "string") return value;
  if (!Array.isArray(value)) return "";

  return value
    .map((block) => {
      if (block._type !== "block" || !Array.isArray(block.children)) return "";
      return block.children
        .map((child) =>
          (child as PortableTextSpan)._type === "span" &&
          typeof (child as PortableTextSpan).text === "string"
            ? (child as PortableTextSpan).text
            : "",
        )
        .join("");
    })
    .filter(Boolean)
    .join("\n\n")
    .trim();
}
