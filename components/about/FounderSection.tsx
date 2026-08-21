import type { PortableTextBlock } from "@portabletext/types";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { customPortableTextComponents } from "@/components/portable-text-components";

interface Leader {
  name: string;
  title: string;
  bio?: PortableTextBlock[];
  quote?: string;
  image?: {
    url?: string;
    alt?: string;
  };
}

interface FounderSectionProps {
  founder: Leader | null;
  coFounder: Leader | null;
}

function hasCompleteProfile(profile: Leader | null): profile is Leader {
  return Boolean(
    profile?.name.trim() &&
    profile.title.trim() &&
    profile.bio?.length &&
    profile.image?.url &&
    profile.image.alt?.trim(),
  );
}

function LeadershipProfile({
  profile,
  label,
  imageOnRight = false,
}: {
  profile: Leader;
  label: "Founder" | "Co-Founder";
  imageOnRight?: boolean;
}) {
  return (
    <div className="grid gap-16 md:grid-cols-2 md:items-center">
      <div
        className={`relative h-[480px] overflow-hidden rounded-2xl border border-[#e2e2de] shadow-[0_20px_60px_rgba(0,0,0,0.1)] md:h-[560px] ${imageOnRight ? "md:order-2" : "md:order-1"}`}
        data-reveal="fade-up"
      >
        {profile.image?.url ? (
          <Image
            src={profile.image.url}
            alt={profile.image.alt ?? `${profile.name} portrait`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={88}
            className="object-cover object-top"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[#e8f3ec] text-[11px] font-semibold uppercase tracking-widest text-[#686868]">
            {label} photo
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-[#1a5c34]" />
      </div>

      <div
        className={imageOnRight ? "md:order-1" : "md:order-2"}
        data-reveal="fade-up"
        style={{ "--reveal-delay": "0.12s" } as React.CSSProperties}
      >
        <p className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a5c34]">
          <span className="h-px w-6 bg-[#1a5c34]" />
          {label}
        </p>
        <h2
          className="mb-1 font-sans font-extrabold leading-[1.08] tracking-tight text-[#111111]"
          style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}
        >
          {profile.name}
        </h2>
        <p className="mb-8 text-[13px] font-semibold uppercase tracking-wide text-[#1a5c34]">
          {profile.title}
        </p>

        {profile.quote && (
          <figure className="mb-8">
            <blockquote className="border-l-[3px] border-[#a8824f] bg-[#fafaf7] py-6 pl-6 pr-4 font-sans text-[1.1rem] italic leading-[1.6] text-[#3d3d3d]">
              <p>&ldquo;{profile.quote}&rdquo;</p>
            </blockquote>
          </figure>
        )}

        {profile.bio && (
          <div className="space-y-3.5 text-[14px] leading-relaxed text-[#5a5a5a]">
            <PortableText value={profile.bio} components={customPortableTextComponents} />
          </div>
        )}
      </div>
    </div>
  );
}

export function FounderSection({ founder, coFounder }: FounderSectionProps) {
  const completeFounder = founder?.name && founder.title ? founder : null;
  const completeCoFounder = hasCompleteProfile(coFounder) ? coFounder : null;

  if (!completeFounder && !completeCoFounder) return null;

  return (
    <section className="bg-white px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl space-y-24 md:space-y-32">
        {completeFounder && <LeadershipProfile profile={completeFounder} label="Founder" />}
        {completeCoFounder && (
          <LeadershipProfile profile={completeCoFounder} label="Co-Founder" imageOnRight />
        )}
      </div>
    </section>
  );
}
