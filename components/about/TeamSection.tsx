import Image from "next/image";
import { Mail, MessageCircle } from "lucide-react";
import type { TeamMember } from "@/interface/sanity";

interface Chairman {
  name: string;
  title: string;
  image?: {
    url?: string;
    alt?: string;
  };
}

interface TeamSectionProps {
  teamMembers: TeamMember[];
  chairman?: Chairman | null;
}

export function TeamSection({ teamMembers, chairman }: TeamSectionProps) {
  if (teamMembers.length === 0 && !chairman) return null;

  return (
    <section className="bg-[#f3f3ef] px-6 py-24 md:py-32 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14" data-reveal="fade-up">
          <p className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a5c34]">
            <span className="h-px w-6 bg-[#1a5c34]" />
            Meet the Team
          </p>
          <h2
            className="font-sans font-extrabold leading-[1.08] tracking-tight text-[#111111]"
            style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}
          >
            Our People
          </h2>
        </div>

        {chairman && (
          <div
            className="mb-16 flex flex-col items-center"
            data-reveal="fade-up"
          >
            <div className="relative mb-8 h-80 w-80 overflow-hidden rounded-2xl border border-[#e2e2de] shadow-[0_20px_60px_rgba(0,0,0,0.12)] md:h-96 md:w-96">
              {chairman.image?.url ? (
                <Image
                  src={chairman.image.url}
                  alt={chairman.image.alt ?? chairman.name}
                  fill
                  sizes="(max-width: 768px) 320px, 384px"
                  className="object-contain"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[#e8f3ec]">
                  <span className="font-sans text-6xl font-extrabold text-[#1a5c34]/30">
                    {chairman.name.charAt(0)}
                  </span>
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 h-1 bg-[#1a5c34]" />
            </div>
            <h3 className="mb-1 font-sans text-2xl font-bold text-[#111111]">{chairman.name}</h3>
            <p className="text-[13px] font-semibold uppercase tracking-wide text-[#1a5c34]">
              {chairman.title}
            </p>
          </div>
        )}

        {teamMembers.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {teamMembers.map((member, i) => (
              <div
                key={member._id}
                className="group overflow-hidden rounded-xl border border-[#e2e2de] bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1a5c34]/20 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
                data-reveal="fade-up"
                style={{ "--reveal-delay": `${i * 0.05}s` } as React.CSSProperties}
              >
                <div className="relative h-64 overflow-hidden bg-[#e8f3ec]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-[#1a5c34] transition-transform duration-300 group-hover:scale-x-100" />
                </div>
                <div className="p-5">
                  <h3 className="mb-0.5 font-sans text-[14px] font-semibold text-[#111111]">{member.name}</h3>
                  <p className="mb-4 text-[11px] font-semibold uppercase tracking-wide text-[#1a5c34]">{member.title}</p>
                  <div className="space-y-1.5 border-t border-[#e2e2de] pt-4 text-[11px] text-[#7a7a7a]">
                    {member.email && <p className="truncate">{member.email}</p>}
                    {member.phone && <p>{member.phone}</p>}
                  </div>
                  {(member.email || member.phone) && (
                    <div className="mt-4 flex items-center gap-3">
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          aria-label={`Email ${member.name}`}
                          className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#1a5c34] hover:text-[#154a2a] transition-colors"
                        >
                          <Mail aria-hidden="true" className="h-3.5 w-3.5" />
                          Email
                        </a>
                      )}
                      {member.phone && (
                        <a
                          href={`https://wa.me/${member.phone.replace(/\D/g, "")}?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20studying%20in%20the%20UK.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`WhatsApp ${member.name}`}
                          className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#25D366] hover:text-[#1ebe5d] transition-colors"
                        >
                          <MessageCircle aria-hidden="true" className="h-3.5 w-3.5" />
                          WhatsApp
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
