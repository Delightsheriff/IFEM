import { SERVICE_GROUPS } from "@/lib/services";
import {
  Briefcase,
  Check,
  GraduationCap,
  Users,
  ShieldCheck,
  Stethoscope,
  FileCheck,
  ScanLine,
  Plane,
  PiggyBank,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const SERVICE_ICONS: Record<string, LucideIcon> = {
  "Career Counselling":          GraduationCap,
  "Interview Preparation":       Users,
  "Visa Counselling":            ShieldCheck,
  "Medical Appointment Booking": Stethoscope,
  "Admission Processing":        FileCheck,
  "Biometric Reservation":       ScanLine,
  "Flight Booking":              Plane,
  "Funding Solutions":           PiggyBank,
};

const ALL_SERVICES = SERVICE_GROUPS.flatMap((g) => g.items);

export function ServicesSection() {
  return (
    <section className="bg-[#f3f3ef] px-6 py-24 md:py-32 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div data-reveal="fade-up">
            <p className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a5c34]">
              <span className="h-px w-6 bg-[#1a5c34]" />
              What We Do
            </p>
            <h2
              className="font-sans font-extrabold leading-[1.08] tracking-tight text-[#111111]"
              style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}
            >
              Your Entire UK Journey,{" "}
              <span style={{ color: "#a8824f" }}>Covered.</span>
            </h2>
          </div>
          <div
            className="flex items-center gap-8"
            data-reveal="fade-in"
            style={{ "--reveal-delay": "0.15s" } as React.CSSProperties}
          >
            <div className="text-center">
              <p className="font-sans text-4xl font-extrabold text-[#111111]">8</p>
              <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-widest text-[#686868]">Services</p>
            </div>
            <div className="h-8 w-px bg-[#e2e2de]" />
            <div className="text-center">
              <p className="font-sans text-4xl font-extrabold" style={{ color: "#1a5c34" }}>Free</p>
              <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-widest text-[#686868]">To You</p>
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {ALL_SERVICES.map((service, i) => {
            const Icon = SERVICE_ICONS[service.name] ?? Briefcase;
            return (
              <div
                key={service.name}
                className="group relative flex flex-col gap-4 rounded-xl border border-[#e2e2de] bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1a5c34]/20 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
                data-reveal="fade-up"
                style={{ "--reveal-delay": `${i * 0.04}s` } as React.CSSProperties}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#e8f3ec] transition-colors duration-200 group-hover:bg-[#1a5c34]">
                  <Icon
                    className="h-5 w-5 text-[#1a5c34] transition-colors duration-200 group-hover:text-white"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h3 className="mb-1.5 font-sans text-[14px] font-semibold leading-snug text-[#111111]">
                    {service.name}
                  </h3>
                  <p className="text-xs leading-relaxed text-[#686868]">{service.desc}</p>
                </div>
                <span
                  aria-hidden="true"
                  className="absolute right-4 top-4 font-sans text-[2rem] font-extrabold leading-none text-[#f3f3ef] transition-colors duration-200 group-hover:text-[#e8f3ec]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            );
          })}
        </div>

        <div
          className="mt-6 flex items-center gap-3 rounded-xl border border-[#e8f3ec] bg-[#e8f3ec]/50 px-6 py-4"
          data-reveal="fade-in"
          style={{ "--reveal-delay": "0.4s" } as React.CSSProperties}
        >
          <Check className="h-4 w-4 shrink-0 text-[#1a5c34]" aria-hidden="true" />
          <p className="text-sm text-[#3d3d3d]">
            All 8 services are{" "}
            <strong className="text-[#111111]">completely free of charge</strong> — no fees to students, ever.
          </p>
        </div>
      </div>
    </section>
  );
}
