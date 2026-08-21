import Image from "next/image";
import type { About } from "@/interface/sanity";

interface AboutHeroSectionProps {
  aboutDetails: About | null;
}

export function HeroSection({ aboutDetails }: AboutHeroSectionProps) {
  return (
    <section className="relative bg-[#fafaf7] overflow-hidden lg:grid lg:min-h-[72vh] lg:grid-cols-[1fr_42%]">
      <div className="relative z-10 flex flex-col justify-center px-6 py-20 md:px-12 lg:px-16 lg:py-24 xl:px-20">
        <div className="mb-7 inline-flex w-fit items-center gap-2" data-reveal="fade-in">
          <span className="h-px w-8 bg-[#1a5c34]" aria-hidden="true" />
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1a5c34]">
            Est. {aboutDetails?.establishedYear ?? 2022}
          </p>
        </div>
        <h1
          className="mb-6 font-sans font-extrabold leading-[1.04] tracking-[-0.025em] text-[#111111]"
          style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)" }}
          data-reveal="fade-up"
        >
          <span className="hero-blur-1 block">{aboutDetails?.headline ?? "Guiding Students"}</span>
          <span className="hero-blur-2 block text-[#1a5c34]">to UK Universities</span>
        </h1>
        <p
          className="mb-8 max-w-[30rem] text-[1.05rem] leading-[1.75] text-[#5a5a5a]"
          data-reveal="fade-up"
          style={{ "--reveal-delay": "0.15s" } as React.CSSProperties}
        >
          {aboutDetails?.tagline ??
            "Nigeria's most trusted education consultancy for UK university admissions — completely free of charge."}
        </p>
        <div
          className="h-[3px] w-10 rounded-full bg-[#a8824f]"
          data-reveal="fade-in"
          style={{ "--reveal-delay": "0.25s" } as React.CSSProperties}
        />
      </div>

      <div className="relative hidden lg:block overflow-hidden">
        {aboutDetails?.heroImage?.url ? (
          <>
            <Image
              src={aboutDetails.heroImage.url}
              alt="IFEM Education team"
              fill
              sizes="42vw"
              quality={90}
              className="object-cover object-top"
              priority
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #fafaf7 0%, rgba(250,250,247,0.2) 14%, transparent 30%)" }} />
            <div className="absolute inset-x-0 bottom-0 h-1 bg-[#1a5c34]" />
          </>
        ) : (
          <>
            <Image
              src="/hero-student.jpg"
              alt="IFEM Education — students on their way to UK universities"
              fill
              sizes="42vw"
              quality={90}
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #fafaf7 0%, rgba(250,250,247,0.2) 14%, transparent 30%)" }} />
          </>
        )}
      </div>

      <div className="relative h-72 w-full overflow-hidden lg:hidden">
        <Image
          src={aboutDetails?.heroImage?.url ?? "/hero-student.jpg"}
          alt="IFEM Education team"
          fill
          sizes="100vw"
          quality={88}
          className="object-cover object-[50%_30%]"
          priority
        />
        <div
          className="absolute inset-x-0 bottom-0 h-10"
          style={{ background: "linear-gradient(to top, #fafaf7 0%, transparent 100%)" }}
        />
      </div>
    </section>
  );
}
