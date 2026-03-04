import type { Metadata } from "next";
import { Fraunces, Work_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import UnmountStudio from "@/components/Unmount";
import { SocialLink } from "@/interface/sanity";
import { getSocialLinks } from "@/sanity/sanity";
import { SpeedInsights } from "@vercel/speed-insights/next";

const workSans = Work_Sans({ subsets: ["latin"], variable: "--font-sans" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-serif" });

const SITE_URL = "https://www.ifemeducation.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "IFEM Education | Your Gateway to UK Education",
    template: "%s | IFEM Education",
  },
  description:
    "IFEM Education — Your trusted partner for UK education. Expert counselling, free admission processing, and 99.6% visa success rate. Study at 40+ UK universities.",
  keywords: [
    "UK education",
    "study in UK",
    "UK university admission",
    "UK visa counselling",
    "international students UK",
    "UK universities",
    "IFEM Education",
    "education consultant",
    "student visa UK",
    "UK college admission",
  ],
  authors: [{ name: "IFEM Education" }],
  creator: "IFEM Education",
  publisher: "IFEM Education",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE_URL,
    siteName: "IFEM Education",
    title: "IFEM Education | Your Gateway to UK Education",
    description:
      "Expert counselling, free admission processing, and 99.6% visa success rate. Study at 40+ UK universities.",
  },
  twitter: {
    card: "summary_large_image",
    title: "IFEM Education | Your Gateway to UK Education",
    description:
      "Expert counselling, free admission processing, and 99.6% visa success rate. Study at 40+ UK universities.",
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
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const socialLinks: SocialLink[] = await getSocialLinks();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "IFEM Education",
    url: SITE_URL,
    description:
      "Expert education consultancy helping students gain admission to 40+ UK universities with a 99.6% visa success rate.",
    foundingDate: "2019",
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
    serviceType: [
      "Education Consulting",
      "University Admission Processing",
      "UK Visa Counselling",
      "Career Counselling",
    ],
  };

  return (
    <>
      <html lang="en">
        <head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
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
        </body>
      </html>
    </>
  );
}
