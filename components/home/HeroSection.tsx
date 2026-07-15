import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarDays, Check, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative bg-[#fafaf7] lg:grid lg:min-h-[92vh] lg:grid-cols-[1fr_44%]">
      <div className="relative z-10 flex flex-col justify-center px-6 py-20 md:px-12 lg:px-16 lg:py-24 xl:px-20">
        <h1
          className="mb-6 font-sans font-extrabold leading-[1.02] tracking-[-0.03em] text-[#111111]"
          style={{ fontSize: "clamp(2.2rem, 5.5vw, 4.75rem)" }}
        >
          <span data-reveal="fade-up" style={{ "--reveal-delay": "0.05s" } as React.CSSProperties} className="block">
            Helping African Students
          </span>
          <span data-reveal="fade-up" style={{ "--reveal-delay": "0.12s" } as React.CSSProperties} className="block">
            Secure Admission Into
          </span>
          <span data-reveal="fade-up" style={{ "--reveal-delay": "0.19s" } as React.CSSProperties} className="block">
            <span className="text-[#1a5c34]">UK Universities.</span>
          </span>
        </h1>

        <p
          className="mb-10 max-w-[30rem] text-[1.05rem] leading-[1.75] text-[#5a5a5a]"
          data-reveal="fade-up"
          style={{ "--reveal-delay": "0.28s" } as React.CSSProperties}
        >
          Expert counselling, seamless applications, and UK visa support — all provided{" "}
          <strong className="font-semibold text-[#111111]">completely free of charge.</strong>{" "}
          Trusted by over 1,800 students across Africa.
        </p>

        <div
          className="mb-12 flex flex-wrap items-center gap-3"
          data-reveal="fade-up"
          style={{ "--reveal-delay": "0.36s" } as React.CSSProperties}
        >
          <Button asChild variant="primary" size="lg" className="shadow-[0_4px_18px_rgba(26,92,52,0.28)] hover:shadow-[0_6px_24px_rgba(26,92,52,0.38)]">
            <Link href="/contact">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              Book a Free Consultation
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild variant="ghost" size="lg" className="text-[#3d3d3d] hover:text-[#111111] hover:bg-[#f3f3ef]">
            <Link href="/success-stories">
              Read Student Stories
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <div
          className="flex flex-wrap gap-y-2 gap-x-6 text-[12px] font-medium text-[#7a7a7a]"
          data-reveal="fade-in"
          style={{ "--reveal-delay": "0.4s" } as React.CSSProperties}
        >
          {[
            "No fees to students, ever",
            "47+ UK university partners",
            "Est. 2022 in Enugu, Nigeria",
          ].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-[#1a5c34]" aria-hidden="true" />
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="relative hidden lg:block overflow-hidden">
        <Image
          src="/hero-student.jpg"
          alt="African student celebrating UK university admission"
          fill
          priority
          sizes="44vw"
          quality={92}
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.08) 0%, transparent 60%)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, #fafaf7 0%, rgba(250,250,247,0.3) 12%, transparent 28%)" }}
        />
      </div>

      <div className="relative h-80 w-full overflow-hidden lg:hidden">
        <Image
          src="/hero-student.jpg"
          alt="African student celebrating UK university admission"
          fill
          priority
          sizes="100vw"
          quality={88}
          className="object-cover object-[50%_40%]"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-16"
          style={{ background: "linear-gradient(to top, #fafaf7 0%, transparent 100%)" }}
        />
      </div>
    </section>
  );
}
