"use client";

import { Toaster as SonnerToaster } from "sonner";

/**
 * Site-wide toast container. Styled to match the sharp-edge brand —
 * cream surface, forest accents, no rounded corners.
 */
export function Toaster() {
  return (
    <SonnerToaster
      position="bottom-right"
      richColors={false}
      closeButton
      duration={5000}
      toastOptions={{
        unstyled: false,
        classNames: {
          toast:
            "!bg-white !text-charcoal !border !border-sage/30 !shadow-[0_24px_70px_rgba(45,45,45,0.1)] !rounded-sm !font-sans",
          title: "!text-sm !font-semibold !text-charcoal",
          description: "!text-xs !text-gray",
          actionButton:
            "!bg-forest !text-white !rounded-sm !text-xs !font-semibold",
          cancelButton:
            "!bg-cream !text-charcoal !rounded-sm !text-xs !font-semibold",
          closeButton:
            "!bg-white !text-charcoal/60 !border !border-sage/30 hover:!bg-cream",
          success: "!border-forest/40",
          error: "!border-terracotta/50",
          info: "!border-sage/40",
          warning: "!border-terracotta/40",
        },
      }}
    />
  );
}
