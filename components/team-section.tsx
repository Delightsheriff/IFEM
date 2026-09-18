import Image from "next/image";
import { Mail, MessageCircle, Phone } from "lucide-react";
import type { TeamMember } from "@/interface/sanity";

interface TeamSectionProps {
  teamMembers: TeamMember[];
  variant?: "about" | "contact";
}

const CHROME = {
  about: {
    section:
      "bg-[#f3f3ef] px-4 py-24 md:py-32 md:px-6 lg:px-8",
    eyebrow: "Meet the Team",
    heading: "Our People",
    description: null,
  },
  contact: {
    section:
      "border-t border-[#e2e2de] bg-white px-4 py-20 md:px-6 lg:px-8 md:py-28",
    eyebrow: "Our People",
    heading: "Speak With Our Team",
    description: "Direct contact with our experts for specific enquiries.",
  },
} as const;

export function TeamSection({
  teamMembers,
  variant = "about",
}: TeamSectionProps) {
  if (teamMembers.length === 0) return null;
  const chrome = CHROME[variant];

  return (
    <section className={chrome.section}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-12" data-reveal="fade-up">
          <p className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a5c34]">
            <span className="h-px w-6 bg-[#1a5c34]" />
            {chrome.eyebrow}
          </p>
          <h2
            className="mb-3 font-sans font-extrabold leading-[1.08] tracking-tight text-[#111111]"
            style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}
          >
            {chrome.heading}
          </h2>
          {chrome.description ? (
            <p className="max-w-xl text-[1rem] leading-[1.75] text-[#686868]">
              {chrome.description}
            </p>
          ) : null}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {teamMembers.map((member, i) => (
            <div
              key={member._id}
              className="group flex flex-col overflow-hidden rounded-xl surface-card surface-card-hover"
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
                <p className="mb-0.5 font-sans text-[14px] font-semibold leading-tight text-[#111111]">
                  {member.name}
                </p>
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-wide text-[#1a5c34]">
                  {member.title}
                </p>
                {variant === "contact" ? (
                  <div className="mt-auto flex flex-col gap-2 border-t border-[#e2e2de] pt-4">
                    <a
                      href={`mailto:${member.email}`}
                      className="flex min-w-0 items-center gap-2 text-xs text-[#686868] transition-colors hover:text-[#1a5c34]"
                    >
                      <Mail
                        aria-hidden="true"
                        className="h-3.5 w-3.5 shrink-0 text-[#1a5c34]/50"
                      />
                      <span className="truncate">{member.email}</span>
                    </a>
                    {member.phone ? (
                      <a
                        href={`tel:${member.phone.replace(/\s/g, "")}`}
                        className="flex min-w-0 items-center gap-2 text-xs text-[#686868] transition-colors hover:text-[#1a5c34]"
                      >
                        <Phone
                          aria-hidden="true"
                          className="h-3.5 w-3.5 shrink-0 text-[#1a5c34]/50"
                        />
                        <span>{member.phone}</span>
                      </a>
                    ) : null}
                  </div>
                ) : (
                  <div className="mt-auto">
                    <div className="space-y-1.5 border-t border-[#e2e2de] pt-4 text-[11px] text-[#686868]">
                      {member.email ? (
                        <p className="truncate">{member.email}</p>
                      ) : null}
                      {member.phone ? <p>{member.phone}</p> : null}
                    </div>
                    {member.email || member.phone ? (
                      <div className="mt-4 flex items-center gap-3">
                        {member.email ? (
                          <a
                            href={`mailto:${member.email}`}
                            aria-label={`Email ${member.name}`}
                            className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#1a5c34] transition-colors hover:text-[#154a2a]"
                          >
                            <Mail aria-hidden="true" className="h-3.5 w-3.5" />
                            Email
                          </a>
                        ) : null}
                        {member.phone ? (
                          <a
                            href={`https://wa.me/${member.phone.replace(/\D/g, "")}?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20studying%20in%20the%20UK.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`WhatsApp ${member.name}`}
                            className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#25D366] transition-colors hover:text-[#1ebe5d]"
                          >
                            <MessageCircle
                              aria-hidden="true"
                              className="h-3.5 w-3.5"
                            />
                            WhatsApp
                          </a>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}