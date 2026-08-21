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
      className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#188040] px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#146834]"
      aria-label={`Chat on WhatsApp with ${phone.label}`}
    >
      <MessageCircle aria-hidden="true" className="h-4 w-4" />
      Chat on WhatsApp
    </a>
  );
}
