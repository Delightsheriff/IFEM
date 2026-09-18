const ALLOWED_HOSTS = [
  "google.com",
  "maps.google.com",
  "www.google.com",
  "openstreetmap.org",
  "www.openstreetmap.org",
  "mapbox.com",
  "www.mapbox.com",
];

/**
 * Rebuild a single `<iframe>` tag with only an allowlisted `src` URL.
 * Drops every other attribute (event-handlers, `allow`, etc.) so stored
 * XSS from a compromised CMS payload cannot execute in the browser.
 */
export function sanitizeMapEmbed(rawHtml: string): string | null {
  const srcMatch = rawHtml.match(/\bsrc\s*=\s*(?:"([^"]*)"|'([^']*)')/i);
  if (!srcMatch) return null;

  const src = srcMatch[1] ?? srcMatch[2];
  if (!src) return null;

  try {
    const url = new URL(src);
    if (url.protocol !== "https:") return null;

    const host = url.hostname.replace(/^www\./, "");
    if (!ALLOWED_HOSTS.some((h) => host === h || host.endsWith(`.${h}`))) {
      return null;
    }
  } catch {
    return null;
  }

  return `<iframe src="${src}" title="Branch map" width="100%" height="100%" style="border:0" loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade"></iframe>`;
}
