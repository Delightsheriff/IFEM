import { cache } from "react";
import type { Branch, HQContact, SocialLink } from "@/interface/sanity";
import { getSocialLinks, getHQContact, getBranches } from "@/sanity/sanity";
import { SITE_URL, SITE_NAME, CONTACT_EMAIL } from "@/lib/site";

export interface ShellConfig {
  socialLinks: SocialLink[];
  hqContact: HQContact | null;
  branches: Branch[];
}

/**
 * Coalesces the shared header/footer Sanity reads into a single cached
 * fetch so the root layout pays one round-trip per request instead of
 * three, and so every consumer reads from one view model.
 */
export const getShellConfig = cache(
  async (): Promise<ShellConfig> => {
    const [socialLinks, hqContact, branches] = await Promise.all([
      getSocialLinks(),
      getHQContact(),
      getBranches(),
    ]);
    return { socialLinks, hqContact, branches };
  },
);

export function buildOrganizationSchema(
  contactEmail: string = CONTACT_EMAIL,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: ["IFEM", "IFEM Edu"],
    url: SITE_URL,
    logo: `${SITE_URL}/test.png`,
    description:
      "IFEM Education is Nigeria's leading UK education consultancy, offering free university admission processing and visa guidance with a 99.6% success rate.",
    foundingDate: "2022",
    areaServed: [
      { "@type": "Country", name: "Nigeria" },
      { "@type": "Country", name: "United Kingdom" },
    ],
    serviceType: [
      "UK University Admission Processing",
      "UK Student Visa Counselling",
      "Career Counselling",
      "Interview Preparation",
      "Biometric Appointment Booking",
      "Flight Booking",
      "Education Funding Solutions",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "UK Education Consultancy Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Free UK University Admission Processing",
          },
          price: "0",
          priceCurrency: "NGN",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "UK Student Visa Counselling",
          },
          price: "0",
          priceCurrency: "NGN",
        },
      ],
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Enugu",
      addressCountry: "NG",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Admissions",
       email: contactEmail,
      availableLanguage: "English",
    },
    sameAs: [
      "https://www.facebook.com/ifemeducation/",
      "https://www.instagram.com/ifem_education/",
    ],
  };
}

export function buildWebsiteSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: "Nigeria's leading UK education consultancy",
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/news?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}
