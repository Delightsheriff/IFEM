const ESCAPE_RE = /[<>&\u2028\u2029]/g;
const ESCAPE_MAP: Record<string, string> = {
  "<": "\\u003c",
  ">": "\\u003e",
  "&": "\\u0026",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029",
};

/**
 * JSON-serialise a value and escape characters that could break out of
 * a `<script type="application/ld+json">` context when inserted via
 * `dangerouslySetInnerHTML`. Google also rejects unescaped `>` in
 * structured-data snippets.
 */
export function jsonLdSerialize(value: unknown): string {
  return JSON.stringify(value).replace(ESCAPE_RE, (c) => ESCAPE_MAP[c]!);
}
