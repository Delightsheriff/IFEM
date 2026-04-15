import { footerLinks, ICON_MAP } from "@/lib/links";
import { Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface SocialLink {
  _id: string;
  platform: string;
  url: string;
}

export function Footer({ socialLinks }: { socialLinks: SocialLink[] }) {
  return (
    <footer className="bg-charcoal text-white">
      {/* Top border accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-forest to-transparent" />

      <div className="mx-auto max-w-7xl px-4 pt-16 pb-10 md:px-6 lg:pt-20 lg:pb-12">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/test.png"
                alt="IFEM Education"
                width={130}
                height={44}
                className="object-contain w-auto h-10 brightness-0 invert"
              />
            </Link>
            <p className="text-sm leading-relaxed text-white/60 max-w-xs mb-8">
              IFEM Education and Travels is a Nigerian education consultancy
              dedicated to guiding students to world-class UK universities.
              Our services are provided free of charge to every student we
              serve.
            </p>

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => {
                  const Icon = ICON_MAP[social.platform] || Share2;
                  return (
                    <a
                      key={social._id || social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.platform}
                      className="flex h-9 w-9 items-center justify-center rounded-sm border border-white/10 text-white/50 transition-all hover:border-forest hover:text-white hover:bg-forest/20"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Link Columns */}
          {[
            { title: "Company", links: footerLinks.company },
            { title: "Resources", links: footerLinks.resources },
            { title: "Contact", links: footerLinks.contact },
          ].map((column) => (
            <div key={column.title} className="lg:col-span-2">
              <h4 className="font-sans text-xs font-semibold uppercase tracking-widest text-white/40 mb-5">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-white"
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
        <div className="mt-14 border-t border-white/10 pt-8">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <p className="text-xs text-white/40">
              &copy; {new Date().getFullYear()} IFEM Education and Travels.
              All rights reserved. RC No. pending.
            </p>
            <p className="text-xs text-white/40">
              Designed and built by{" "}
              <a
                href="https://www.delightsheriff.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 transition-colors hover:text-white"
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
