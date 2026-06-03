import type { Metadata } from "next";
import { Fraunces, Work_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import UnmountStudio from "@/components/Unmount";
import { SocialLink, Branch } from "@/interface/sanity";
import { getSocialLinks, getHQContact, getBranches } from "@/sanity/sanity";
import { AnalyticsWrapper } from "@/components/analytics-wrapper";
import { CookieConsent } from "@/components/cookie-consent";
import { Toaster } from "@/components/ui/toaster";
import { SITE_URL, SITE_NAME, CONTACT_EMAIL } from "@/lib/site";

const workSans = Work_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-serif", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Study in the UK — Free Admission & Visa Processing`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Nigeria's leading UK education consultancy. 99.6% visa success rate, 40+ partner universities, and completely free admission & visa processing. Trusted by 1,800+ Nigerian students since 2022.",
  keywords: [
    // Primary intent — highest volume
    "study in UK from Nigeria",
    "UK university admission Nigeria",
    "UK student visa Nigeria",
    // Brand
    "IFEM Education",
    "IFEM education consultancy",
    // Service-specific
    "free UK university admission",
    "UK visa consultancy Nigeria",
    "Nigerian education consultant UK",
    "UK study abroad consultancy Nigeria",
    // University/level
    "UK universities for Nigerian students",
    "best UK universities Nigeria",
    "postgraduate UK Nigeria",
    "undergraduate UK Nigeria",
    // City-level (Enugu HQ)
    "education consultant Enugu",
    "study abroad Nigeria",
    // Long-tail
    "how to apply for UK student visa from Nigeria",
    "UK university application process Nigeria",
    "education consultancy free service Nigeria",
    "99.6 visa success rate UK",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Study in the UK — Free Service for Nigerian Students`,
    description:
      "Nigeria's most trusted UK education consultancy. 99.6% visa success rate, 40+ partner universities, free admission processing. 1,800+ students placed.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "IFEM Education — Nigeria's Gateway to UK Universities",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ifem_education",
    title: `${SITE_NAME} | Study in the UK — Free Admission & Visa`,
    description:
      "Nigeria's leading UK education consultancy. 99.6% visa success rate, free admission processing, 40+ partner universities.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: "education",
  classification: "Education Consultancy",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [socialLinks, hqContact, branches] = await Promise.all([
    getSocialLinks() as Promise<SocialLink[]>,
    getHQContact(),
    getBranches() as Promise<Branch[]>,
  ]);

  const organizationSchema = {
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
      email: CONTACT_EMAIL,
      availableLanguage: "English",
    },
    sameAs: [
      "https://www.facebook.com/ifemeducation/",
      "https://www.instagram.com/ifem_education/",
    ],
    // Aggregate rating intentionally lives on /success-stories where it's
    // backed by real Review entries — Google's structured-data validator
    // flags Organization-level aggregateRating that isn't tied to reviews.
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: "Nigeria's leading UK education consultancy",
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/guides?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <html lang="en">
        <head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
          <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        </head>
        <body
          className={`${workSans.variable} ${fraunces.variable} antialiased flex min-h-screen w-full flex-col bg-cream`}
        >
          <a href="#main" className="skip-link">
            Skip to main content
          </a>
          <UnmountStudio>
            <Header hqContact={hqContact} />
          </UnmountStudio>
          <main id="main" className="flex-1">{children}</main>
          <UnmountStudio>
            <Footer socialLinks={socialLinks} branches={branches} />
          </UnmountStudio>
          <Toaster />
          <CookieConsent />
          <AnalyticsWrapper />
        </body>
      </html>
    </>
  );
}
