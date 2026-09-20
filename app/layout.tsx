import type { Metadata } from "next";
import Script from "next/script";
import { Fraunces, DM_Sans } from "next/font/google";
import { jsonLdSerialize } from "@/lib/json-ld";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import UnmountStudio from "@/components/Unmount";
import { AnalyticsWrapper } from "@/components/analytics-wrapper";
import { CookieConsent } from "@/components/cookie-consent";
import { Toaster } from "@/components/ui/toaster";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import { buildOrganizationSchema, buildWebsiteSchema, getShellConfig } from "@/lib/site-config";
import { selectDisplayEmail } from "@/lib/contact-email-routing";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  axes: ["opsz"],
});
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  axes: ["SOFT", "WONK"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Study in the UK — Free Admission & Visa Processing`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Nigeria's leading UK education consultancy. 99.6% visa success rate, 47+ partner universities, and completely free admission & visa processing. Trusted by 1,800+ Nigerian students since 2022.",
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
      "Nigeria's most trusted UK education consultancy. 99.6% visa success rate, 47+ partner universities, free admission processing. 1,800+ students placed.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "IFEM Education — Nigeria's Gateway to UK Universities",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ifem_education",
    creator: "@ifem_education",
    title: `${SITE_NAME} | Study in the UK — Free Admission & Visa`,
    description:
      "Nigeria's leading UK education consultancy. 99.6% visa success rate, free admission processing, 47+ partner universities.",
    images: [{ url: "/opengraph-image", alt: "IFEM Education — Nigeria's Gateway to UK Universities" }],
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
  const { socialLinks, hqContact, branches } = await getShellConfig();
  const displayEmail = selectDisplayEmail(branches);

  const organizationSchema = buildOrganizationSchema(displayEmail);

  const websiteSchema = buildWebsiteSchema();

  return (
    <>
      <html lang="en-GB" className="bg-background" data-scroll-behavior="smooth">
        <head>
          <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
          <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        </head>
        <body
          className={`${dmSans.variable} ${fraunces.variable} antialiased flex min-h-screen w-full flex-col bg-background`}
        >
          <a href="#main" className="skip-link">
            Skip to main content
          </a>
          <UnmountStudio>
            <Header hqContact={hqContact} branches={branches} />
          </UnmountStudio>
          <main id="main" className="flex-1">{children}</main>
          <UnmountStudio>
            <Footer socialLinks={socialLinks} branches={branches} />
          </UnmountStudio>
          <Toaster />
          <CookieConsent />
          <AnalyticsWrapper />
          <Script
            id="organization-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: jsonLdSerialize(organizationSchema) }}
            strategy="afterInteractive"
          />
          <Script
            id="website-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: jsonLdSerialize(websiteSchema) }}
            strategy="afterInteractive"
          />
        </body>
      </html>
    </>
  );
}
