"use client";

import { MessageCircle } from "lucide-react";
import type { BranchPhone } from "@/interface/sanity";
import { normalizePhoneNumber } from "@/lib/branch-phones";
import { useRotatingBranchPhone } from "@/hooks/use-rotating-branch-phone";

const WHATSAPP_MESSAGE =
  "Hello, I would like to enquire about studying in the UK.";

export function RotatingWhatsAppLink({ phones }: { phones: BranchPhone[] }) {
  const phone = useRotatingBranchPhone(phones);

  if (!phone) return null;

  return (
    <a
      href={`https://wa.me/${normalizePhoneNumber(phone.number)}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex shrink-0 items-center gap-2 rounded-md bg-[#188040] px-4 py-2 text-sm font-semibold text-white glass-sheen shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.15),0_10px_22px_rgba(24,128,64,0.3)] transition-[background-color,box-shadow,scale] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.96] hover:bg-[#146834] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_2px_4px_rgba(0,0,0,0.16),0_14px_28px_rgba(24,128,64,0.38)]"
      aria-label={`Chat on WhatsApp with ${phone.label}`}
    >
      <MessageCircle aria-hidden="true" className="h-4 w-4" />
      Chat on WhatsApp
    </a>
  );
}
