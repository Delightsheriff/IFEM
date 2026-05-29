"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
import { MenuToggleIcon } from "./ui/menu-toggle-icon";
import Image from "next/image";
import { headerLinks } from "@/lib/links";
import { Phone } from "lucide-react";
import { HQContact } from "@/interface/sanity";
import { AnimatePresence, motion } from "framer-motion";

interface HeaderProps {
  hqContact?: HQContact | null;
}

export function Header({ hqContact }: HeaderProps) {
  const contactEmail = hqContact?.email || "contact@ifemeducation.com";
  const primaryPhone = hqContact?.phones?.[0] ?? null;
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
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
    <div className="w-full">
      {/* Contact bar — outside sticky so it scrolls away without shifting the sticky nav */}
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

      {/* Sticky nav — fixed h-16, never resizes, so page content never shifts */}
      <div className="sticky top-0 z-50 w-full">
      <header
        className={cn(
          "w-full transition-colors duration-300 ease-out",
          {
            "bg-cream/95 supports-backdrop-filter:bg-cream/80 backdrop-blur-lg border-b border-sage/20 shadow-sm":
              scrolled && !open,
            "bg-cream border-b border-sage/20": !scrolled || open,
          },
        )}
      >
        <nav
          className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:px-6 lg:px-8"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/test.png"
              alt="IFEM Education"
              width={539}
              height={348}
              className="object-contain w-auto h-10 transition-all duration-300"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-0.5 lg:flex">
            {headerLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "relative text-sm font-medium tracking-wide px-4 hover:bg-transparent transition-colors",
                    isActive
                      ? "text-forest"
                      : "text-charcoal/80 hover:text-forest",
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-1.5 left-4 right-4 h-px bg-forest" />
                  )}
                </Link>
              );
            })}
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
        <AnimatePresence>
        {open && (
        <motion.div
          key="mobile-menu"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed right-0 bottom-0 left-0 top-16 z-50 flex flex-col overflow-hidden bg-cream lg:hidden"
        >
          <div className="flex h-full w-full flex-col justify-between p-6">
            <div className="grid gap-1 pt-4">
              {headerLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center justify-between py-3 border-b border-sage/20 font-medium text-lg transition-colors",
                      isActive ? "text-forest" : "text-charcoal hover:text-forest",
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-forest" />
                    )}
                  </Link>
                );
              })}
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
        </motion.div>
        )}
        </AnimatePresence>
      </header>
      </div>
    </div>
  );
}
