import { footerLinks, ICON_MAP } from "@/lib/links";
import { MapPin, Phone, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CookiePreferencesButton } from "@/components/cookie-preferences-button";
import { Badge } from "@/components/ui/badge";
import { Branch } from "@/interface/sanity";
import { getBranchPhoneNumbers } from "@/lib/branch-phones";
import { RotatingWhatsAppLink } from "@/components/rotating-whatsapp-link";

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
  const branchPhones = getBranchPhoneNumbers(branches);

  return (
    <footer className="bg-[#111714] text-white" aria-label="Site footer">
      {/* Forest accent rule */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#1a5c34] to-transparent opacity-50" />

      {/* Free consultation nudge bar */}
      <div className="border-b border-white/5 bg-[#1a5c34]/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 sm:flex-row md:px-6 lg:px-8">
          <p className="text-center text-sm text-white/70 sm:text-left">
            <span className="font-semibold text-white">100% Free Admission &amp; Visa Processing.</span>{" "}
            No hidden charges, no agency fees — ever.
          </p>
          <RotatingWhatsAppLink phones={branchPhones} />
        </div>
      </div>

      {/* Main footer body */}
      <div className="mx-auto max-w-7xl px-4 pt-14 pb-10 md:px-6 lg:pt-18 lg:pb-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">

          {/* Brand column */}
          <div className="md:col-span-2 lg:col-span-4 space-y-6">
            <Link href="/" aria-label="IFEM Education — Home" className="inline-block">
              <Image
                src="/logo.png"
                alt="IFEM Education"
                width={74}
                height={48}
                className="h-12 w-[74px] object-contain"
              />
            </Link>
            <p className="text-[13px] leading-relaxed text-white/45 max-w-[280px]">
              A Nigerian-based education consultancy guiding students to world-class UK universities. 
              All services are provided free of charge.
            </p>

            {/* Social icons */}
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-2.5">
                {socialLinks.map((social) => {
                  const Icon = ICON_MAP[social.platform] || Share2;
                  return (
                    <a
                      key={social._id || social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`IFEM Education on ${social.platform}`}
                      className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-white/40 transition-all duration-200 hover:border-[#1a5c34] hover:text-[#1a5c34]"
                    >
                      <Icon aria-hidden="true" className="h-3.5 w-3.5" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Link columns */}
          {[
            { title: "Company", links: footerLinks.company },
            { title: "Resources", links: footerLinks.resources },
            { title: "Contact", links: footerLinks.contact },
          ].map((column) => (
            <div key={column.title} className="lg:col-span-2">
              <h4 className="mb-5 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-white/30">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-white/45 hover:text-white transition-colors duration-200 ink-underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Offices column */}
          {branches.length > 0 && (
            <div className="lg:col-span-2">
              <h4 className="mb-5 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-white/30">
                Offices
              </h4>
              <ul className="space-y-5">
                {branches.map((branch) => (
                  <li key={branch._id} className="group space-y-2">
                    <Link href="/contact#branches" className="block space-y-2">
                      <p className="text-[13px] text-white/65 font-semibold group-hover:text-white transition-colors duration-200 leading-snug flex items-center gap-2">
                        {branch.name}
                        {branch.type === "hq" && (
                          <Badge variant="hq" size="sm">HQ</Badge>
                        )}
                      </p>
                      <p className="text-[11px] text-white/28 leading-relaxed group-hover:text-white/45 transition-colors duration-200 flex items-start gap-1">
                        <MapPin aria-hidden="true" className="w-3 h-3 mt-0.5 shrink-0 opacity-50" />
                        {branch.address
                          ? `${branch.address}, ${branch.city}`
                          : `${branch.city}, ${branch.country}`}
                      </p>
                    </Link>
                    {branch.phone && (
                      <a
                        href={`tel:${branch.phone.replace(/\s/g, "")}`}
                        className="text-[11px] text-white/28 group-hover:text-white/45 transition-colors duration-200 flex items-center gap-1"
                        aria-label={`Call ${branch.name}`}
                      >
                        <Phone aria-hidden="true" className="w-3 h-3 shrink-0 opacity-50" />
                        {branch.phone}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-7 border-t border-white/[0.07]">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-[11px] text-white/25 tracking-wide">
              &copy; {new Date().getFullYear()} IFEM Education. All rights reserved.
            </p>
            <div className="flex items-center gap-6 flex-wrap">
              <CookiePreferencesButton />
              <p className="text-[11px] text-white/25">
                Designed &amp; built by{" "}
                <a
                  href="https://www.delightsheriff.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-white transition-colors duration-200"
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
