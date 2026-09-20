/**
 * Single source of truth for the brand's core identifiers.
 *
 * Anything that varies by environment (dev vs prod) belongs in env vars;
 * these are the values that are stable across every deploy.
 */

export const SITE_URL = "https://www.ifemeducation.com";
export const SITE_NAME = "IFEM Education";

/**
 * Fallback contact email used when Sanity has no branch email available.
 * Public pages normally select an email from the branch records instead.
 */
export const CONTACT_EMAIL =
  process.env.CONTACT_FALLBACK_EMAIL ?? "contact@ifemeducation.com";
