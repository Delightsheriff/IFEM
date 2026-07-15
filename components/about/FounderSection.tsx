import type { PortableTextBlock } from "@portabletext/types";
import { customPortableTextComponents } from "@/components/portable-text-components";
import { PortableText } from "next-sanity";
import Image from "next/image";

interface Founder {
  name: string;
  title: string;
  bio?: PortableTextBlock[];
  quote?: string;
  image?: {
    asset?: { _ref: string; url?: string };
    url?: string;
    alt?: string;
  };
}

interface FounderSectionProps {
  founder: Founder | null;
}

export function FounderSection({ founder }: FounderSectionProps) {
  if (!founder) return null;

  return (
    <section className="bg-white px-6 py-24 md:py-32 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 md:grid-cols-2 md:items-center">

          <div
            className="relative order-2 h-[480px] overflow-hidden rounded-2xl border border-[#e2e2de] shadow-[0_20px_60px_rgba(0,0,0,0.1)] md:order-1 md:h-[560px]"
            data-reveal="fade-up"
          >
            {founder.image?.url ? (
              <Image
                src={founder.image.url}
                alt={founder.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={88}
                className="object-cover object-top"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#e8f3ec]">
                <p className="text-[11px] uppercase tracking-widest text-[#7a7a7a]">Founder photo</p>
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 h-1 bg-[#1a5c34]" />
          </div>

          <div
            className="order-1 md:order-2"
            data-reveal="fade-up"
            style={{ "--reveal-delay": "0.12s" } as React.CSSProperties}
          >
            <p className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a5c34]">
              <span className="h-px w-6 bg-[#1a5c34]" />
              Leadership
            </p>
            <h2
              className="mb-1 font-sans font-extrabold leading-[1.08] tracking-tight text-[#111111]"
              style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}
            >
              {founder.name}
            </h2>
            <p className="mb-8 text-[13px] font-semibold uppercase tracking-wide text-[#1a5c34]">
              {founder.title}
            </p>

            {founder.quote && (
              <figure className="mb-8">
                <blockquote className="border-l-[3px] border-[#c9a465] bg-[#fafaf7] py-6 pl-6 pr-4 font-sans text-[1.1rem] italic leading-[1.6] text-[#3d3d3d]">
                  <p>&ldquo;{founder.quote}&rdquo;</p>
                </blockquote>
              </figure>
            )}

            {founder.bio && (
              <div className="space-y-3.5 text-[14px] leading-relaxed text-[#5a5a5a]">
                <PortableText value={founder.bio} components={customPortableTextComponents} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
