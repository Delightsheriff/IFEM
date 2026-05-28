import { footerLinks, ICON_MAP } from "@/lib/links";
import { MapPin, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CookiePreferencesButton } from "@/components/cookie-preferences-button";
import { Branch } from "@/interface/sanity";

interface SocialLink {
  _id: string;
  platform: string;
  url: string;
}

export function Footer({
  socialLinks,
  branches = [],
}: {
  socialLinks: SocialLink[];
  branches?: Branch[];
}) {
  return (
    <footer className="bg-charcoal text-white">
      <div className="h-px bg-gradient-to-r from-transparent via-forest to-transparent" />

      <div className="mx-auto max-w-7xl px-4 pt-16 pb-10 md:px-6 lg:pt-20 lg:pb-12">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">

          {/* Brand Column */}
          <div className="md:col-span-2 lg:col-span-4">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/logo.png"
                alt="IFEM Education"
                width={539}
                height={348}
                priority
                className="object-contain h-14 w-auto"
              />
            </Link>
            <p className="text-sm leading-relaxed text-white/55 max-w-xs mb-8">
              IFEM Education is a Nigerian education consultancy dedicated to
              guiding students to world-class UK universities. Our services are
              provided free of charge to every student we serve.
            </p>

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
                      className="flex h-9 w-9 items-center justify-center border border-white/10 text-white/40 transition-all hover:border-forest hover:text-white hover:bg-forest/20"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {[
            { title: "Company", links: footerLinks.company },
            { title: "Resources", links: footerLinks.resources },
            { title: "Contact", links: footerLinks.contact },
          ].map((column) => (
            <div key={column.title} className="lg:col-span-2">
              <h4 className="font-sans text-[10px] font-semibold uppercase tracking-widest text-white/35 mb-5">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/55 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Offices Column */}
          {branches.length > 0 && (
            <div className="lg:col-span-2">
              <h4 className="font-sans text-[10px] font-semibold uppercase tracking-widest text-white/35 mb-5">
                Offices
              </h4>
              <ul className="space-y-5">
                {branches.map((branch) => (
                  <li key={branch._id}>
                    <Link
                      href="/contact#branches"
                      className="group"
                    >
                      <p className="text-sm text-white/70 font-semibold group-hover:text-white transition-colors leading-snug mb-0.5 flex items-center gap-2">
                        {branch.name}
                        {branch.type === "hq" && (
                          <span className="text-[9px] uppercase tracking-widest text-terracotta/60 font-semibold">
                            HQ
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-white/35 leading-relaxed group-hover:text-white/50 transition-colors">
                        <MapPin className="inline w-3 h-3 mr-1 -mt-px opacity-60" />
                        {branch.address
                          ? `${branch.address}, ${branch.city}`
                          : `${branch.city}, ${branch.country}`}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-14 border-t border-white/10 pt-8">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <p className="text-xs text-white/35">
              &copy; {new Date().getFullYear()} IFEM Education. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <CookiePreferencesButton />
              <p className="text-xs text-white/35">
                Designed and built by{" "}
                <a
                  href="https://www.delightsheriff.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/55 transition-colors hover:text-white"
                >
                  Delight Amadi-Sheriff
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
