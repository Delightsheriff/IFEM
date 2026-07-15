import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import type { TeamMember } from "@/interface/sanity";

interface ContactTeamSectionProps {
  teamMembers: TeamMember[];
}

export function TeamSection({ teamMembers }: ContactTeamSectionProps) {
  if (teamMembers.length === 0) return null;

  return (
    <section className="border-t border-[#e2e2de] bg-white px-4 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12" data-reveal="fade-up">
          <p className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a5c34]">
            <span className="h-px w-6 bg-[#1a5c34]" />
            Our People
          </p>
          <h2
            className="mb-3 font-sans font-extrabold leading-[1.08] tracking-tight text-[#111111]"
            style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}
          >
            Speak With Our Team
          </h2>
          <p className="max-w-xl text-[1rem] leading-[1.75] text-[#7a7a7a]">
            Direct contact with our experts for specific enquiries.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {teamMembers.map((member, i) => (
            <div
              key={member._id}
              className="group flex flex-col overflow-hidden rounded-xl border border-[#e2e2de] bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1a5c34]/20 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
              data-reveal="fade-up"
              style={{ "--reveal-delay": `${i * 0.05}s` } as React.CSSProperties}
            >
              <div className="relative h-64 overflow-hidden bg-[#e8f3ec]">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="font-sans text-4xl font-extrabold text-[#1a5c34]/30">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-[#1a5c34] transition-transform duration-300 group-hover:scale-x-100" />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="font-sans text-[14px] font-semibold leading-tight text-[#111111] mb-0.5">
                  {member.name}
                </p>
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-wide text-[#1a5c34]">
                  {member.title}
                </p>
                <div className="mt-auto flex flex-col gap-2 border-t border-[#e2e2de] pt-4">
                  <a
                    href={`mailto:${member.email}`}
                    className="flex min-w-0 items-center gap-2 text-xs text-[#7a7a7a] transition-colors hover:text-[#1a5c34]"
                  >
                    <Mail className="h-3.5 w-3.5 shrink-0 text-[#1a5c34]/50" aria-hidden="true" />
                    <span className="truncate">{member.email}</span>
                  </a>
                  {member.phone && (
                    <a
                      href={`tel:${member.phone.replace(/\s/g, "")}`}
                      className="flex min-w-0 items-center gap-2 text-xs text-[#7a7a7a] transition-colors hover:text-[#1a5c34]"
                    >
                      <Phone className="h-3.5 w-3.5 shrink-0 text-[#1a5c34]/50" aria-hidden="true" />
                      <span>{member.phone}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
