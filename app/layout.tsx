import type { Metadata } from "next";
import { Fraunces, Work_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import UnmountStudio from "@/components/Unmount";
import { SocialLink } from "@/interface/sanity";
import { getSocialLinks } from "@/sanity/sanity";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const workSans = Work_Sans({ subsets: ["latin"], variable: "--font-sans" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-serif" });

export const SITE_URL = "https://www.ifemeducation.com";
const SITE_NAME = "IFEM Education";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Study in the UK — Free Admission & Visa Processing`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Nigeria's leading UK education consultancy. 99.6% visa success rate, 40+ partner universities, and completely free admission & visa processing. Trusted by 1,800+ Nigerian students since 2019.",
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
        url: "/og-image.png",
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
    images: ["/og-image.png"],
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
  const socialLinks: SocialLink[] = await getSocialLinks();

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
    foundingDate: "2019",
    numberOfEmployees: { "@type": "QuantitativeValue", minValue: 10 },
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
      email: "contact@ifemeducation.com",
      availableLanguage: "English",
    },
    sameAs: [
      "https://www.facebook.com/ifemeducationandtravels/",
      "https://www.instagram.com/ifem_education_and_travels/",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "1800",
      bestRating: "5",
    },
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
          <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        </head>
        <body
          className={`${workSans.variable} ${fraunces.variable} antialiased flex min-h-screen w-full flex-col bg-cream`}
        >
          <UnmountStudio>
            <Header />
          </UnmountStudio>
          <main className="flex-1">{children}</main>
          <UnmountStudio>
            <Footer socialLinks={socialLinks} />
          </UnmountStudio>
          <SpeedInsights />
          <Analytics />
        </body>
      </html>
    </>
  );
}
