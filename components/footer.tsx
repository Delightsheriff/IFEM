import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const footerLinks = {
  company: [
    { label: "About", href: "/about" },
    { label: "Success Stories", href: "/success-stories" },
    { label: "Partner Institutions", href: "/institutions" },
  ],
  resources: [
    { label: "Guides", href: "/guides" },
    { label: "FAQ", href: "/faq" },
  ],
  contact: [
    { label: "Contact Us", href: "/contact" },
    { label: "Office Locations", href: "/contact#locations" },
    { label: "Meet Our Team", href: "/contact#team" },
  ],
};

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com", icon: Facebook },
  { label: "Instagram", href: "https://instagram.com", icon: Instagram },
  { label: "Twitter", href: "https://twitter.com", icon: Twitter },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
];

export function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <h3 className="font-serif text-2xl font-bold tracking-tight">
                IFEM
              </h3>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/80">
              Education & Travels — Your trusted partner in international
              education. We bridge the gap between home and abroad, providing
              world-class opportunities for ambitious professionals.
            </p>
            {/* Social Links */}
            <div className="mt-6 flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-sans text-sm font-semibold uppercase tracking-wider text-white/60">
              Company
            </h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
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

          {/* Resources Links */}
          <div>
            <h4 className="font-sans text-sm font-semibold uppercase tracking-wider text-white/60">
              Resources
            </h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.resources.map((link) => (
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

          {/* Contact Links */}
          <div>
            <h4 className="font-sans text-sm font-semibold uppercase tracking-wider text-white/60">
              Contact
            </h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.contact.map((link) => (
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
        </div>

        {/* Divider */}
        <div className="mt-12 border-t border-white/20 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-white/60">
              &copy; {new Date().getFullYear()} IFEM Education & Travels. All
              rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="text-sm text-white/60 transition-colors hover:text-white"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-white/60 transition-colors hover:text-white"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
