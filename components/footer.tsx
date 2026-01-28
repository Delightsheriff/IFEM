import { footerLinks, ICON_MAP } from "@/lib/links";
import { Share2 } from "lucide-react";
import Link from "next/link";

interface SocialLink {
  _id: string;
  platform: string;
  url: string;
}

export function Footer({
  socialLinks = [
    {
      _id: "1",
      platform: "facebook",
      url: "https://facebook.com/ifemtravels",
    },
    {
      _id: "2",
      platform: "instagram",
      url: "https://instagram.com/ifemtravels",
    },
    {
      _id: "3",
      platform: "twitter",
      url: "https://x.com/ifemtravels",
    },
    {
      _id: "4",
      platform: "linkedin",
      url: "https://linkedin.com/company/ifemtravels",
    },
  ],
}: {
  socialLinks: SocialLink[];
}) {
  return (
    <footer className="bg-charcoal text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {/* Brand & Dynamic Socials Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <h3 className="font-serif text-2xl font-bold tracking-tight">
                IFEM
              </h3>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/80">
              IFEM Education.Ltd - Your trusted partner in international
              education. We bridge the gap between home and abroad.
            </p>

            {/* Rendered Social Links from Sanity */}
            <div className="mt-6 flex items-center gap-4">
              {socialLinks.map((social) => {
                // Look up the icon based on the platform string from Sanity
                const Icon = ICON_MAP[social.platform] || Share2;

                return (
                  <a
                    key={social._id || social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.platform}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column Logic Helper */}
          {[
            { title: "Company", links: footerLinks.company },
            { title: "Resources", links: footerLinks.resources },
            { title: "Contact", links: footerLinks.contact },
          ].map((column) => (
            <div key={column.title}>
              <h4 className="font-sans text-sm font-semibold uppercase tracking-wider text-white/60">
                {column.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/80 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        {/* Bottom Bar */}
        <div className="mt-12 border-t border-white/20 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            {/* Copyright & Agency Info */}
            <p className="text-sm text-white/60">
              &copy; {new Date().getFullYear()} IFEM Education & Travels. All
              rights reserved.
            </p>

            {/* Developer Credit */}
            <p className="text-sm text-white/60">
              Built with ❤️ by{" "}
              <a
                href="https://www.delightsheriff.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white transition-colors hover:text-blue-400 font-medium"
              >
                Delight Amadi-Sheriff
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
