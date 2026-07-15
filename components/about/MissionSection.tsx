import {
  Compass,
  Target,
  HeartHandshake,
  Lightbulb,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Mission {
  title: string;
  description: string;
  icon?: "compass" | "target" | "heart-handshake" | "lightbulb" | "shield-check" | "sparkles";
}

const MISSION_ICONS: LucideIcon[] = [Compass, Target, HeartHandshake, Lightbulb, ShieldCheck, Sparkles];
const MISSION_ICON_BY_KEY: Record<string, LucideIcon> = {
  compass: Compass, target: Target, "heart-handshake": HeartHandshake,
  lightbulb: Lightbulb, "shield-check": ShieldCheck, sparkles: Sparkles,
};

interface MissionSectionProps {
  missions: Mission[];
}

export function MissionSection({ missions }: MissionSectionProps) {
  if (missions.length === 0) return null;

  return (
    <section className="bg-[#f3f3ef] px-6 py-24 md:py-32 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center" data-reveal="fade-up">
          <p className="mb-4 flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a5c34]">
            <span className="h-px w-6 bg-[#1a5c34]" />
            Our Mission
            <span className="h-px w-6 bg-[#1a5c34]" />
          </p>
          <h2
            className="font-sans font-extrabold leading-[1.08] tracking-tight text-[#111111]"
            style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}
          >
            Why We Exist
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[1rem] leading-[1.75] text-[#7a7a7a]">
            Our core mission drives everything we do in supporting students on their journey to UK education.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {missions.map((mission, index) => {
            const Icon = (mission.icon && MISSION_ICON_BY_KEY[mission.icon]) || MISSION_ICONS[index % MISSION_ICONS.length];
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl border border-[#e2e2de] bg-white p-8 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1a5c34]/25 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
                data-reveal="fade-up"
                style={{ "--reveal-delay": `${index * 0.08}s` } as React.CSSProperties}
              >
                <span aria-hidden="true" className="absolute right-6 top-6 font-sans text-4xl font-extrabold leading-none text-[#f3f3ef] transition-colors duration-200 group-hover:text-[#e8f3ec] select-none">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-[#e8f3ec] transition-colors duration-200 group-hover:bg-[#1a5c34]">
                  <Icon aria-hidden="true" className="h-5 w-5 text-[#1a5c34] transition-colors duration-200 group-hover:text-white" />
                </div>
                <h3 className="mb-2.5 font-sans text-[15px] font-semibold text-[#111111]">{mission.title}</h3>
                <p className="text-[13px] leading-relaxed text-[#7a7a7a]">{mission.description}</p>
                <div className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-[#1a5c34] transition-transform duration-300 group-hover:scale-x-100" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
