"use client";
import React from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
import { MenuToggleIcon } from "./ui/menu-toggle-icon";
import Image from "next/image";
import { headerLinks } from "@/lib/links";
import { Phone } from "lucide-react";
import { HQContact } from "@/interface/sanity";

interface HeaderProps {
  hqContact?: HQContact | null;
}

export function Header({ hqContact }: HeaderProps) {
  const contactEmail = hqContact?.email || "contact@ifemeducation.com";
  const primaryPhone = hqContact?.phones?.[0] ?? null;
  const [open, setOpen] = React.useState(false);
  const scrolled = useScroll(10);

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="sticky top-0 z-50 w-full">
      {/* Top contact bar */}
      {!open && !scrolled && (
        <div className="hidden lg:block bg-forest text-white/90 text-xs">
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-2 flex items-center justify-between">
            <p className="font-medium tracking-wide">
              100% Free Admission & Visa Processing — No Hidden Charges
            </p>
            <div className="flex items-center gap-6">
              {primaryPhone ? (
                <a
                  href={`tel:${primaryPhone.number.replace(/\s/g, "")}`}
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <Phone className="w-3 h-3" />
                  <span>{primaryPhone.label}: {primaryPhone.number}</span>
                </a>
              ) : (
                <a
                  href="tel:+2348000000000"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <Phone className="w-3 h-3" />
                  <span>Call Us Today</span>
                </a>
              )}
              <Link
                href="/contact"
                className="hover:text-white transition-colors"
              >
                {contactEmail}
              </Link>
            </div>
          </div>
        </div>
      )}

      <header
        className={cn(
          "w-full transition-all duration-300 ease-out",
          {
            "bg-cream/95 supports-backdrop-filter:bg-cream/80 backdrop-blur-lg border-b border-sage/20 shadow-sm":
              scrolled && !open,
            "bg-cream border-b border-sage/20": !scrolled || open,
          },
        )}
      >
        <nav
          className={cn(
            "mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 transition-all duration-300 ease-out md:px-6 lg:px-8",
            {
              "h-14": scrolled && !open,
            },
          )}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/test.png"
              alt="IFEM Education"
              width={120}
              height={40}
              className="object-contain w-auto h-10 transition-all duration-300"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-0.5 lg:flex">
            {headerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "text-charcoal/80 hover:text-forest hover:bg-transparent text-sm font-medium tracking-wide px-4",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden items-center lg:flex">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-forest text-white text-sm font-semibold tracking-wide hover:bg-forest/90 transition-colors rounded-sm"
            >
              Apply Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setOpen(!open)}
            className="text-charcoal hover:bg-sage/20 lg:hidden flex items-center justify-center"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <MenuToggleIcon open={open} className="size-5" duration={300} />
          </Button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={cn(
            "fixed top-16 right-0 bottom-0 left-0 z-50 flex flex-col overflow-hidden bg-cream lg:hidden",
            open ? "block" : "hidden",
            {
              "top-14": scrolled,
            },
          )}
        >
          <div
            data-slot={open ? "open" : "closed"}
            className={cn(
              "data-[slot=open]:animate-in data-[slot=open]:fade-in-0 data-[slot=open]:slide-in-from-top-2 ease-out duration-200",
              "flex h-full w-full flex-col justify-between p-6",
            )}
          >
            <div className="grid gap-1 pt-4">
              {headerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center py-3 border-b border-sage/20 text-charcoal hover:text-forest font-medium text-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-3 pb-8">
              {/* Mobile contact info */}
              <div className="border-t border-sage/20 pt-4 mb-1 flex flex-col gap-2">
                <a
                  href={`mailto:${contactEmail}`}
                  className="flex items-center gap-2 text-sm text-gray hover:text-forest transition-colors"
                >
                  <span className="text-forest/60 text-xs">Email</span>
                  <span className="font-medium">{contactEmail}</span>
                </a>
                {primaryPhone && (
                  <a
                    href={`tel:${primaryPhone.number.replace(/\s/g, "")}`}
                    className="flex items-center gap-2 text-sm text-gray hover:text-forest transition-colors"
                  >
                    <span className="text-forest/60 text-xs">{primaryPhone.label}</span>
                    <span className="font-medium">{primaryPhone.number}</span>
                  </a>
                )}
              </div>
              <p className="text-xs text-gray text-center uppercase tracking-widest">
                100% Free Service — No Hidden Charges
              </p>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="w-full inline-flex items-center justify-center py-3.5 bg-forest text-white font-semibold tracking-wide hover:bg-forest/90 transition-colors rounded-sm"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
