import * as React from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Base: glass material — frosted translucency, specular top edge, layered
  // depth shadows instead of flat borders (better-ui/surfaces), semantic
  // focus ring, tactile press scale (always 0.96) + a11y defaults.
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold tracking-wide transition-[background-color,border-color,box-shadow,color,scale] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.96] disabled:active:scale-100 disabled:pointer-events-none disabled:opacity-60 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        primary:
          "bg-forest text-white glass-sheen shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(0,0,0,0.12),0_1px_2px_rgba(13,51,32,0.2),0_10px_22px_rgba(26,92,52,0.3)] hover:bg-forest-mid hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.28),inset_0_-1px_0_rgba(0,0,0,0.12),0_2px_4px_rgba(13,51,32,0.22),0_14px_30px_rgba(26,92,52,0.36)] focus-visible:ring-forest focus-visible:ring-offset-cream",
        secondary:
          "border border-charcoal/10 bg-white/55 text-charcoal backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(0,0,0,0.04),0_1px_2px_rgba(13,51,32,0.06)] hover:border-forest/30 hover:bg-white/80 hover:text-forest hover:shadow-[inset_0_1px_0_rgba(255,255,255,1),inset_0_-1px_0_rgba(0,0,0,0.04),0_2px_6px_rgba(13,51,32,0.08)] focus-visible:ring-forest focus-visible:ring-offset-cream",
        outline:
          "border border-forest/35 bg-forest/5 text-forest backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_1px_2px_rgba(26,92,52,0.06)] hover:border-forest hover:bg-forest hover:text-white hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_8px_18px_rgba(26,92,52,0.28)] focus-visible:ring-forest focus-visible:ring-offset-cream",
        accent:
          "bg-terracotta text-white glass-sheen shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-1px_0_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.15),0_8px_20px_rgba(168,130,79,0.3)] hover:bg-terracotta/90 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.24),inset_0_-1px_0_rgba(0,0,0,0.12),0_2px_4px_rgba(0,0,0,0.16),0_12px_26px_rgba(168,130,79,0.38)] focus-visible:ring-terracotta focus-visible:ring-offset-cream",
        ghost:
          "text-charcoal hover:bg-sage/20 focus-visible:ring-forest focus-visible:ring-offset-cream",
        link: "text-forest underline-offset-4 hover:underline focus-visible:ring-forest focus-visible:ring-offset-cream",
        "inverted-primary":
          "bg-white/90 text-forest backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,1),inset_0_-1px_0_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.2),0_18px_45px_rgba(0,0,0,0.28)] hover:bg-white hover:shadow-[inset_0_1px_0_rgba(255,255,255,1),inset_0_-1px_0_rgba(0,0,0,0.06),0_2px_4px_rgba(0,0,0,0.22),0_22px_55px_rgba(0,0,0,0.34)] focus-visible:ring-white focus-visible:ring-offset-forest",
        "inverted-secondary":
          "border border-white/30 bg-white/10 text-white backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.28),inset_0_-1px_0_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.12)] hover:border-white/50 hover:bg-white/20 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-1px_0_rgba(0,0,0,0.1),0_4px_12px_rgba(0,0,0,0.2)] focus-visible:ring-white focus-visible:ring-offset-forest",
      },
      size: {
        sm: "h-9 px-4 text-xs rounded-md",
        md: "h-11 px-6 text-sm rounded-md",
        lg: "h-12 px-7 text-sm rounded-md",
        xl: "h-14 px-8 text-base rounded-md",
        icon: "h-11 w-11 rounded-md",
        "icon-sm": "h-9 w-9 rounded-md",
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

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    className,
    variant,
    size,
    asChild = false,
    loading = false,
    loadingText,
    disabled,
    children,
    ...props
  },
  ref,
) {
  const isDisabled = disabled || loading;

  // When asChild is true, Slot requires exactly one child element — so
  // we hand the consumer's element through untouched. Loading state is
  // a button-only affordance and isn't applied to anchor children.
  if (asChild) {
    return (
      <Slot.Root
        ref={ref as React.Ref<HTMLElement>}
        data-slot="button"
        data-variant={variant}
        data-size={size}
        className={cn(buttonVariants({ variant, size }), className)}
        {...(props as React.HTMLAttributes<HTMLElement>)}
      >
        {children}
      </Slot.Root>
    );
  }

  return (
    <button
      ref={ref}
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
      {loading && loadingText ? loadingText : children}
    </button>
  );
});

export { Button, buttonVariants };
export type { ButtonProps };
