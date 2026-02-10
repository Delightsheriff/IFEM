import type { Metadata } from "next";
import { Fraunces, Work_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import UnmountStudio from "@/components/Unmount";
import { SocialLink } from "@/interface/sanity";
import { getSocialLinks } from "@/sanity/sanity";

const workSans = Work_Sans({ subsets: ["latin"], variable: "--font-sans" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "Ifem Education.Ltd",
  description:
    "IFEM Education.Ltd - Your trusted partner in international education. We bridge the gap between home and abroad.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const socialLinks: SocialLink[] = await getSocialLinks();

  return (
    <html lang="en">
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
      </body>
    </html>
  );
}
