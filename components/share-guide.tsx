"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";

interface ShareGuideProps {
  title: string;
  url: string;
}

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.121 1.531 5.847L0 24l6.335-1.502C8.03 23.45 9.977 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.859 0-3.633-.5-5.165-1.373l-.37-.22-3.76.892.937-3.654-.242-.374A9.929 9.929 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
  </svg>
);

export function ShareGuide({ title, url }: ShareGuideProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const whatsappHref = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: select and copy
    }
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-[10px] uppercase tracking-widest text-[#686868]/60 font-semibold mr-1">
        Share
      </span>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on WhatsApp"
        className="inline-flex items-center gap-1.5 rounded-lg border border-[#25d366]/20 bg-[#25d366]/10 px-3 py-1.5 text-xs font-semibold text-[#25d366] transition-colors hover:bg-[#25d366] hover:text-white focus-ring"
      >
        <WhatsAppIcon />
        WhatsApp
      </a>

      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy link"
        className="inline-flex items-center gap-1.5 rounded-lg border border-[#e2e2de] bg-[#fafaf7] px-3 py-1.5 text-xs font-semibold text-[#111111]/70 transition-colors hover:border-[#1a5c34] hover:bg-[#1a5c34] hover:text-white focus-ring"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5" />
            Copied
          </>
        ) : (
          <>
            <Link2 className="w-3.5 h-3.5" />
            Copy Link
          </>
        )}
      </button>
    </div>
  );
}
