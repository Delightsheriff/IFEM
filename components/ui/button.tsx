import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Base: sharp-edge brand look, semantic focus ring, motion + a11y defaults.
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold tracking-wide transition-colors disabled:pointer-events-none disabled:opacity-60 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        primary:
          "bg-forest text-white shadow-[0_18px_45px_rgba(0,107,56,0.2)] hover:bg-forest/90 focus-visible:ring-forest focus-visible:ring-offset-cream",
        secondary:
          "border border-charcoal/20 bg-white/45 text-charcoal backdrop-blur hover:border-forest hover:text-forest focus-visible:ring-forest focus-visible:ring-offset-cream",
        outline:
          "border border-forest text-forest hover:bg-forest hover:text-white focus-visible:ring-forest focus-visible:ring-offset-cream",
        accent:
          "bg-terracotta text-white hover:bg-terracotta/90 focus-visible:ring-terracotta focus-visible:ring-offset-cream",
        ghost:
          "text-charcoal hover:bg-sage/20 focus-visible:ring-forest focus-visible:ring-offset-cream",
        link: "text-forest underline-offset-4 hover:underline focus-visible:ring-forest focus-visible:ring-offset-cream",
        "inverted-primary":
          "bg-white text-forest shadow-[0_18px_45px_rgba(0,0,0,0.15)] hover:bg-cream focus-visible:ring-white focus-visible:ring-offset-forest",
        "inverted-secondary":
          "border border-white/40 text-white hover:border-white hover:bg-white/10 focus-visible:ring-white focus-visible:ring-offset-forest",
      },
      size: {
        sm: "h-9 px-4 text-xs rounded-sm",
        md: "h-11 px-6 text-sm rounded-sm",
        lg: "h-12 px-7 text-sm rounded-sm",
        xl: "h-14 px-8 text-base rounded-sm",
        icon: "h-11 w-11 rounded-sm",
        "icon-sm": "h-9 w-9 rounded-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

type ButtonElementProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

interface ButtonProps
  extends ButtonElementProps,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  loadingText?: string;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  loadingText,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  const isDisabled = disabled || loading;

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      data-loading={loading || undefined}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && <Loader2 className="animate-spin" aria-hidden="true" />}
      <span className={cn("inline-flex items-center gap-2", loading && "opacity-90")}>
        {loading && loadingText ? loadingText : children}
      </span>
    </Comp>
  );
}

export { Button, buttonVariants };
export type { ButtonProps };
