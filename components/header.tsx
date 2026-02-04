"use client";
import React from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
import { MenuToggleIcon } from "./ui/menu-toggle-icon";
import Image from "next/image";
import { headerLinks } from "@/lib/links";

export function Header() {
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
    <header
      className={cn(
        "sticky top-0 z-50 mx-auto w-full transition-all duration-300 ease-out",
        {
          "bg-cream/95 supports-backdrop-filter:bg-cream/80 backdrop-blur-lg shadow-sm":
            scrolled && !open,
          "bg-cream": !scrolled || open,
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
        {/* Logo - Adjusted height to fit container and maintain alignment */}
        <Link href="/" className="flex items-center">
          <Image
            src="/test.png"
            alt="IFEM Logo"
            width={120}
            height={40}
            className="object-contain w-auto h-16 transition-all duration-300"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {headerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "text-charcoal hover:text-forest hover:bg-sage/20 font-medium",
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ variant: "default" }),
              "bg-forest hover:bg-forest/90 text-white font-medium",
            )}
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
            "flex h-full w-full flex-col justify-between p-4",
          )}
        >
          <div className="grid gap-1">
            {headerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "justify-start text-lg text-charcoal hover:text-forest hover:bg-sage/20 font-medium h-12",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-3 pb-8">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "w-full bg-forest hover:bg-forest/90 text-white font-medium",
              )}
            >
              Apply Now
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
