/**
 * Single source of truth for the brand's core identifiers.
 *
 * Anything that varies by environment (dev vs prod) belongs in env vars;
 * these are the values that are stable across every deploy.
 */

export const SITE_URL = "https://www.ifemeducation.com";
export const SITE_NAME = "IFEM Education";

/**
 * Fallback contact email used in static JSON-LD and as a header
 * placeholder when the Sanity HQ branch hasn't loaded yet. The
 * canonical email lives on the HQ branch document and is rendered
 * via `getHQContact()` in the header + footer.
 */
export const CONTACT_EMAIL = "contact@ifemeducation.com";
