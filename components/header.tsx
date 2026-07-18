"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
import { MenuToggleIcon } from "./ui/menu-toggle-icon";
import Image from "next/image";
import { headerLinks } from "@/lib/links";
import { CalendarDays, ChevronDown, Mail, Newspaper, Phone } from "lucide-react";
import type { Branch, HQContact } from "@/interface/sanity";
import { CONTACT_EMAIL } from "@/lib/site";
import { getBranchPhoneNumbers } from "@/lib/branch-phones";
import { useRotatingBranchPhone } from "@/hooks/use-rotating-branch-phone";

interface HeaderProps {
  hqContact?: HQContact | null;
  branches?: Branch[];
}

export function Header({ hqContact, branches = [] }: HeaderProps) {
  const contactEmail = hqContact?.email || CONTACT_EMAIL;
  const branchPhones = React.useMemo(() => getBranchPhoneNumbers(branches), [branches]);
  const rotatingPhone = useRotatingBranchPhone(branchPhones);
  const fallbackPhone = hqContact?.phones?.[0] ?? (hqContact?.phone ? { label: "HQ main line", number: hqContact.phone } : null);
  const primaryPhone = rotatingPhone ?? fallbackPhone;
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [contentMenuOpen, setContentMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const scrolled = useScroll(10);
  const menuPanelRef = React.useRef<HTMLDivElement | null>(null);
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);

  React.useEffect(() => {
    if (open) setMounted(true);
  }, [open]);

  React.useEffect(() => {
    setContentMenuOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      triggerRef.current?.focus();
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    const panel = menuPanelRef.current;
    if (!panel) return;
    const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusables = panel.querySelectorAll<HTMLElement>(focusableSelector);
    focusables[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); setOpen(false); return; }
      if (e.key !== "Tab") return;
      const current = panel.querySelectorAll<HTMLElement>(focusableSelector);
      if (current.length === 0) return;
      const first = current[0];
      const last = current[current.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="w-full">
      {/* Top contact strip — clean light */}
      <div className="hidden lg:block text-[11px] tracking-wide border-b border-[#e2e2de] bg-[#fafaf7]">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 h-8 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#1a5c34]" />
            <p className="font-medium tracking-widest uppercase text-[10px] text-[#7a7a7a]">
              100% Free Service &mdash; No Hidden Charges
            </p>
          </div>
          <div className="flex items-center gap-6">
            {primaryPhone && (
              <a
                href={`tel:${primaryPhone.number.replace(/\s/g, "")}`}
                className="flex items-center gap-1.5 text-[#7a7a7a] hover:text-[#1a5c34] transition-colors duration-200"
              >
                <Phone aria-hidden="true" className="w-3 h-3 text-[#1a5c34]" />
                <span>{primaryPhone.number}</span>
              </a>
            )}
            <a
              href={`mailto:${contactEmail}`}
              className="flex items-center gap-1.5 text-[#7a7a7a] hover:text-[#1a5c34] transition-colors duration-200"
            >
              <Mail aria-hidden="true" className="w-3 h-3 text-[#1a5c34]" />
              <span>{contactEmail}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Sticky nav */}
      <div className="sticky top-0 z-50 w-full">
        <header
          className={cn(
            "w-full transition-all duration-300 ease-out",
            scrolled && !open
              ? "bg-white/95 backdrop-blur-xl border-b border-[#e2e2de] shadow-[0_1px_0_rgba(0,0,0,0.06)]"
              : "bg-[#fafaf7] border-b border-[#e2e2de]",
          )}
        >
          <nav
            className="mx-auto flex h-[68px] w-full max-w-7xl items-center justify-between px-4 md:px-6 lg:px-8"
            aria-label="Primary"
          >
            {/* Logo */}
            <Link href="/" className="flex items-center focus-ring rounded-lg shrink-0" aria-label="IFEM Education — Home">
              <Image
                src="/test.png"
                alt="IFEM Education"
                width={539}
                height={348}
                sizes="160px"
                className="object-contain w-auto h-9 transition-opacity duration-300"
                priority
              />
            </Link>

            {/* Desktop nav links */}
            <div className="hidden items-center gap-0 lg:flex" role="navigation" aria-label="Main navigation">
              {headerLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <React.Fragment key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "relative px-4 py-2 text-[13.5px] font-medium tracking-[0.01em] transition-colors duration-200 focus-ring rounded-lg",
                        isActive ? "text-[#1a5c34]" : "text-[#111111]/65 hover:text-[#111111]",
                      )}
                    >
                      {link.label}
                      <span aria-hidden="true" className={cn("absolute bottom-0 left-4 right-4 h-px bg-[#1a5c34] transition-transform duration-300 origin-center", isActive ? "scale-x-100" : "scale-x-0")} />
                    </Link>
                    {link.href === "/about" && <ContentMenu pathname={pathname} open={contentMenuOpen} onOpenChange={setContentMenuOpen} />}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Desktop CTA */}
            <div className="hidden items-center lg:flex">
              <Button asChild variant="primary" size="md" className="text-[13px] tracking-wide">
                <Link href="/contact">Book a Free Consultation</Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <Button
              ref={triggerRef}
              size="icon"
              variant="ghost"
              onClick={() => setOpen(!open)}
              className="text-[#111111] hover:bg-[#e8f3ec] lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu-panel"
            >
              <MenuToggleIcon open={open} className="size-5" duration={280} />
            </Button>
          </nav>

          {/* Mobile drawer */}
          {mounted && (
            <div
              ref={menuPanelRef}
              id="mobile-menu-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Primary navigation"
              data-open={open ? "true" : "false"}
              className={cn(
                "fixed right-0 bottom-0 left-0 top-[68px] z-50 flex flex-col overflow-hidden bg-white lg:hidden",
                "transition-[opacity,transform] duration-250 ease-out motion-reduce:transition-none",
                "data-[open=true]:opacity-100 data-[open=true]:translate-y-0 data-[open=true]:pointer-events-auto",
                "data-[open=false]:opacity-0 data-[open=false]:-translate-y-2 data-[open=false]:pointer-events-none",
              )}
            >
              <div className="flex h-full w-full flex-col overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
                <nav aria-label="Mobile primary navigation" className="space-y-0.5">
                  {headerLinks.map((link, i) => {
                    const isActive = pathname === link.href;
                    return (
                      <React.Fragment key={link.href}>
                        <Link
                          href={link.href}
                          onClick={() => setOpen(false)}
                          aria-current={isActive ? "page" : undefined}
                          style={{ "--reveal-delay": `${i * 0.04}s` } as React.CSSProperties}
                          data-open={open ? "true" : undefined}
                          className={cn("flex items-center justify-between py-4 border-b border-[#e2e2de] text-lg font-medium transition-colors", isActive ? "text-[#1a5c34]" : "text-[#111111]/80 hover:text-[#111111]")}
                        >
                          {link.label}
                          {isActive && <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[#1a5c34]" />}
                        </Link>
                      </React.Fragment>
                    );
                  })}
                </nav>

                <MobileContentLinks pathname={pathname} onNavigate={() => setOpen(false)} />

                <div className="mt-auto pb-5 pt-8 space-y-4 sm:pb-10">
                  {/* Contact details */}
                  <div className="rounded-xl border border-[#e2e2de] bg-white/60 p-4 space-y-2.5">
                    {primaryPhone && (
                      <a
                        href={`tel:${primaryPhone.number.replace(/\s/g, "")}`}
                        className="flex items-center gap-2.5 text-sm text-[#111111]/70 hover:text-[#1a5c34] transition-colors"
                      >
                        <Phone aria-hidden="true" className="w-3.5 h-3.5 text-[#1a5c34] shrink-0" />
                        <span className="font-medium">{primaryPhone.number}</span>
                      </a>
                    )}
                    <a
                      href={`mailto:${contactEmail}`}
                      className="flex items-center gap-2.5 text-sm text-[#111111]/70 hover:text-[#1a5c34] transition-colors"
                    >
                      <Mail aria-hidden="true" className="w-3.5 h-3.5 text-[#1a5c34] shrink-0" />
                      <span className="font-medium">{contactEmail}</span>
                    </a>
                  </div>

                  <p className="text-[10px] text-[#111111]/35 text-center uppercase tracking-widest">
                    100% Free — No Hidden Charges
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

function ContentMenu({ pathname, open, onOpenChange }: { pathname: string; open: boolean; onOpenChange: (open: boolean) => void }) {
  const isActive = pathname.startsWith("/news") || pathname.startsWith("/events");
  return <div className="relative" onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) onOpenChange(false); }}><button type="button" aria-expanded={open} aria-haspopup="menu" onClick={() => onOpenChange(!open)} className={cn("relative inline-flex items-center gap-1 px-4 py-2 text-[13.5px] font-medium tracking-[0.01em] transition-colors focus-ring rounded-lg", isActive ? "text-[#1a5c34]" : "text-[#111111]/65 hover:text-[#111111]")}>News &amp; Events <ChevronDown aria-hidden="true" className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} /><span aria-hidden="true" className={cn("absolute bottom-0 left-4 right-4 h-px bg-[#1a5c34]", isActive ? "scale-x-100" : "scale-x-0")} /></button>{open ? <div role="menu" className="absolute left-0 top-[calc(100%+12px)] z-50 w-72 rounded-xl border border-[#e2e2de] bg-white p-2 shadow-pop"><Link role="menuitem" href="/events" onClick={() => onOpenChange(false)} className="group flex gap-3 rounded-lg p-3 transition-colors hover:bg-[#e8f3ec] focus-ring"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#1a5c34] text-white"><CalendarDays aria-hidden="true" className="h-4 w-4" /></span><span><span className="block text-sm font-semibold text-charcoal">Events</span><span className="mt-0.5 block text-xs leading-relaxed text-gray">Sessions, fairs and review clinics.</span></span></Link><Link role="menuitem" href="/news" onClick={() => onOpenChange(false)} className="group flex gap-3 rounded-lg p-3 transition-colors hover:bg-[#e8f3ec] focus-ring"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#e8f3ec] text-[#1a5c34]"><Newspaper aria-hidden="true" className="h-4 w-4" /></span><span><span className="block text-sm font-semibold text-charcoal">News &amp; Advice</span><span className="mt-0.5 block text-xs leading-relaxed text-gray">Updates worth keeping close.</span></span></Link></div> : null}</div>;
}

function MobileContentLinks({ pathname, onNavigate }: { pathname: string; onNavigate: () => void }) {
  const links = [
    { label: "Events", href: "/events", icon: CalendarDays },
    { label: "News & Advice", href: "/news", icon: Newspaper },
  ];

  return (
    <section className="mt-5 rounded-xl border border-[#e2e2de] bg-[#fafaf7] p-3" aria-label="News and events">
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#1a5c34]">News &amp; Events</p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {links.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onNavigate}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex min-h-20 flex-col justify-between rounded-lg border p-3 text-sm font-semibold transition-colors focus-ring",
                isActive
                  ? "border-[#1a5c34] bg-[#e8f3ec] text-[#1a5c34]"
                  : "border-[#e2e2de] bg-white text-[#111111]/80 hover:border-[#1a5c34]/40 hover:bg-[#e8f3ec] hover:text-[#1a5c34]",
              )}
            >
              <Icon aria-hidden="true" className="h-4 w-4" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
