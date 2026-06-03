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

interface HeaderProps {
  hqContact?: HQContact | null;
}

export function Header({ hqContact }: HeaderProps) {
  const contactEmail = hqContact?.email || "contact@ifemeducation.com";
  const primaryPhone = hqContact?.phones?.[0] ?? null;
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const pathname = usePathname();
  const scrolled = useScroll(10);
  const menuPanelRef = React.useRef<HTMLDivElement | null>(null);
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);

  // The panel stays mounted; we keep it hidden until the user opens it
  // the first time so the slide-in transition has a frame to animate
  // from. After that, CSS handles open/close via the `data-open` attr.
  React.useEffect(() => {
    if (open) setMounted(true);
  }, [open]);

  // Body scroll lock + restore focus to trigger on close.
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      // Restore focus to the toggle when closing.
      triggerRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape to close + simple focus trap inside the mobile menu.
  React.useEffect(() => {
    if (!open) return;

    const panel = menuPanelRef.current;
    if (!panel) return;

    const focusableSelector =
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

    // Move focus to the first interactive element when the menu opens.
    const focusables = panel.querySelectorAll<HTMLElement>(focusableSelector);
    focusables[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;

      const current = panel.querySelectorAll<HTMLElement>(focusableSelector);
      if (current.length === 0) return;
      const first = current[0];
      const last = current[current.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="w-full">
      {/* Contact bar — outside sticky so it scrolls away without shifting the sticky nav */}
      <div className="hidden lg:block bg-forest text-white text-xs">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-2 flex items-center justify-between">
          <p className="font-medium tracking-wide text-white/85">
            100% Free Admission & Visa Processing — No Hidden Charges
          </p>
          <div className="flex items-center gap-6">
            {primaryPhone ? (
              <a
                href={`tel:${primaryPhone.number.replace(/\s/g, "")}`}
                className="flex items-center gap-1.5 text-white/85 transition-colors hover:text-white hover:underline underline-offset-4 focus-ring-light rounded-sm"
              >
                <Phone aria-hidden="true" className="w-3 h-3" />
                <span>{primaryPhone.label}: {primaryPhone.number}</span>
              </a>
            ) : (
              <a
                href="tel:+2348000000000"
                className="flex items-center gap-1.5 text-white/85 transition-colors hover:text-white hover:underline underline-offset-4 focus-ring-light rounded-sm"
              >
                <Phone aria-hidden="true" className="w-3 h-3" />
                <span>Call Us Today</span>
              </a>
            )}
            <Link
              href="/contact"
              className="text-white/85 transition-colors hover:text-white hover:underline underline-offset-4 focus-ring-light rounded-sm"
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
            "bg-cream/95 supports-backdrop-filter:bg-cream/80 backdrop-blur-xl border-b border-sage/20 shadow-[0_12px_35px_rgba(45,45,45,0.06)]":
              scrolled && !open,
            "bg-[#f7f3ea]/95 border-b border-sage/20": !scrolled || open,
          },
        )}
      >
        <nav
          className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:px-6 lg:px-8"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center focus-ring rounded-sm" aria-label="IFEM Education — Home">
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
          <div className="hidden items-center gap-0.5 lg:flex" role="navigation" aria-label="Primary">
            {headerLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "relative text-sm font-semibold tracking-wide px-4 hover:bg-transparent transition-colors",
                    isActive
                      ? "text-forest-deep"
                      : "text-charcoal/80 hover:text-forest-deep",
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span aria-hidden="true" className="absolute bottom-1.5 left-4 right-4 h-px bg-forest" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden items-center lg:flex">
            <Button asChild variant="primary" size="md">
              <Link href="/contact">Book a Free Consultation</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            ref={triggerRef}
            size="icon"
            variant="ghost"
            onClick={() => setOpen(!open)}
            className="text-charcoal hover:bg-sage/20 lg:hidden flex items-center justify-center"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu-panel"
          >
            <MenuToggleIcon open={open} className="size-5" duration={300} />
          </Button>
        </nav>

        {/* Mobile Menu */}
        {mounted && (
        <div
          ref={menuPanelRef}
          id="mobile-menu-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Primary navigation"
          data-open={open ? "true" : "false"}
          className={cn(
            "fixed right-0 bottom-0 left-0 top-16 z-50 flex flex-col overflow-hidden bg-cream lg:hidden",
            "transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none",
            "data-[open=true]:opacity-100 data-[open=true]:translate-y-0 data-[open=true]:pointer-events-auto",
            "data-[open=false]:opacity-0 data-[open=false]:-translate-y-2 data-[open=false]:pointer-events-none",
          )}
        >
          <div className="flex h-full w-full flex-col justify-between p-6">
            <nav aria-label="Primary" className="grid gap-1 pt-4">
              {headerLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "tap-target flex items-center justify-between py-3 border-b border-sage/20 font-medium text-lg transition-colors focus-ring rounded-sm",
                      isActive ? "text-forest-deep" : "text-charcoal hover:text-forest-deep",
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-forest" />
                    )}
                  </Link>
                );
              })}
            </nav>
            <div className="flex flex-col gap-3 pb-8">
              {/* Mobile contact info */}
              <div className="border-t border-sage/20 pt-4 mb-1 flex flex-col gap-2">
                <a
                  href={`mailto:${contactEmail}`}
                  className="tap-target flex items-center gap-2 text-sm text-gray hover:text-forest-deep transition-colors focus-ring rounded-sm"
                >
                  <span className="text-forest-deep text-xs">Email</span>
                  <span className="font-medium">{contactEmail}</span>
                </a>
                {primaryPhone && (
                  <a
                    href={`tel:${primaryPhone.number.replace(/\s/g, "")}`}
                    className="tap-target flex items-center gap-2 text-sm text-gray hover:text-forest-deep transition-colors focus-ring rounded-sm"
                  >
                    <span className="text-forest-deep text-xs">{primaryPhone.label}</span>
                    <span className="font-medium">{primaryPhone.number}</span>
                  </a>
                )}
              </div>
              <p className="text-xs text-gray text-center uppercase tracking-widest">
                100% Free Service — No Hidden Charges
              </p>
              <Button asChild variant="primary" size="lg" className="w-full">
                <Link href="/contact" onClick={() => setOpen(false)}>
                  Book a Free Consultation
                </Link>
              </Button>
            </div>
          </div>
        </div>
        )}
      </header>
      </div>
    </div>
  );
}
