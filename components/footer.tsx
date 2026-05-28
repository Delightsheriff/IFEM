import { footerLinks, ICON_MAP } from "@/lib/links";
import { Share2, MapPin, Phone, Mail, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CookiePreferencesButton } from "@/components/cookie-preferences-button";
import { Branch, SocialLink } from "@/interface/sanity";

interface FooterProps {
  socialLinks: SocialLink[];
  branches?: Branch[];
}

export function Footer({ socialLinks, branches = [] }: FooterProps) {
  // Separate HQ from other branches
  const hqBranch = branches.find((b) => b.type === "hq");
  const otherBranches = branches.filter((b) => b.type !== "hq");

  return (
    <footer className="bg-charcoal text-white">
      <div className="h-px bg-gradient-to-r from-transparent via-forest to-transparent" />

      <div className="mx-auto max-w-7xl px-4 pt-16 pb-10 md:px-6 lg:pt-20 lg:pb-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">

          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/logo.png"
                alt="IFEM Education"
                width={200}
                height={67}
                priority
                className="object-contain h-16 w-auto"
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

          {/* Navigation Links */}
          <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { title: "Company", links: footerLinks.company },
              { title: "Resources", links: footerLinks.resources },
              { title: "Contact", links: footerLinks.contact },
            ].map((column) => (
              <div key={column.title}>
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
          </div>

          {/* Office Locations */}
          <div className="lg:col-span-4">
            <h4 className="font-sans text-[10px] font-semibold uppercase tracking-widest text-white/35 mb-5">
              Our Offices
            </h4>
            
            <div className="space-y-6">
              {/* HQ Branch */}
              {hqBranch && (
                <div className="p-4 bg-white/5 border border-white/10 hover:border-forest/30 transition-colors">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 bg-forest flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm mb-0.5">
                        {hqBranch.name}
                      </p>
                      <span className="inline-block px-2 py-0.5 bg-terracotta/20 text-terracotta text-[10px] uppercase tracking-wider font-semibold">
                        Head Office
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm text-white/55 pl-11">
                    {hqBranch.address && (
                      <p>{hqBranch.address}, {hqBranch.city}, {hqBranch.country}</p>
                    )}
                    {hqBranch.email && (
                      <p className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-white/40" />
                        <a href={`mailto:${hqBranch.email}`} className="hover:text-white transition-colors">
                          {hqBranch.email}
                        </a>
                      </p>
                    )}
                    {hqBranch.phones && hqBranch.phones.length > 0 && (
                      <p className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-white/40" />
                        <a href={`tel:${hqBranch.phones[0].number}`} className="hover:text-white transition-colors">
                          {hqBranch.phones[0].number}
                        </a>
                      </p>
                    )}
                    {hqBranch.hours && (
                      <p className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-white/40" />
                        <span>{hqBranch.hours}</span>
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Other Branches */}
              {otherBranches.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                  {otherBranches.slice(0, 2).map((branch) => (
                    <div
                      key={branch._id}
                      className="p-3 bg-white/5 border border-white/10 hover:border-forest/30 transition-colors"
                    >
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-white text-sm mb-1">
                            {branch.name}
                          </p>
                          <p className="text-xs text-white/50">
                            {branch.address && `${branch.address}, `}
                            {branch.city}, {branch.country}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* View all locations link */}
              {branches.length > 0 && (
                <Link
                  href="/contact#locations"
                  className="inline-flex items-center gap-2 text-forest text-sm font-medium hover:text-forest/80 transition-colors"
                >
                  View all {branches.length} locations
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              )}
            </div>
          </div>
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
