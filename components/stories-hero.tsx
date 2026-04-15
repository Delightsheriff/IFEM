import Image from "next/image";
import { SuccessStory } from "@/interface/sanity";

interface StoriesHeroProps {
  stories: SuccessStory[];
  stats?: {
    studentsPlaced: number;
    successRate: number;
    yearsOfExperience: number;
  };
}

function getImageUrl(story: SuccessStory): string {
  return (
    story.studentImage?.url ||
    story.studentImage?.asset?.url ||
    "/placeholder.svg?height=800&width=600"
  );
}

function distributeIntoColumns(
  stories: SuccessStory[],
  cols: number,
): SuccessStory[][] {
  const columns: SuccessStory[][] = Array.from({ length: cols }, () => []);
  if (stories.length === 0) return columns;

  const minPerCol = 3;
  const needed = cols * minPerCol;
  const pool: SuccessStory[] = [];
  while (pool.length < needed) {
    for (const s of stories) {
      if (pool.length < needed) pool.push(s);
    }
  }
  pool.forEach((s, i) => columns[i % cols].push(s));
  return columns;
}

const COLUMN_ANIMATIONS = [
  "animate-float-slow",
  "animate-float-medium",
  "animate-float-fast",
  "animate-float-medium-rev",
];

export default function StoriesHero({ stories, stats }: StoriesHeroProps) {
  const columns = distributeIntoColumns(stories, 4);

  const studentsPlaced = stats?.studentsPlaced ?? 1800;
  const successRate = stats?.successRate ?? 99.6;
  const yearsOfExperience = stats?.yearsOfExperience ?? 10;

  return (
    <>
      <style>{`
        @keyframes float-up {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-33.333%); }
        }
        @keyframes float-down {
          0%   { transform: translateY(-33.333%); }
          100% { transform: translateY(0); }
        }
        .animate-float-slow        { animation: float-up   22s linear infinite; }
        .animate-float-medium      { animation: float-up   16s linear infinite; }
        .animate-float-fast        { animation: float-up   12s linear infinite; }
        .animate-float-medium-rev  { animation: float-down 18s linear infinite; }

        @media (max-width: 1023px) {
          .animate-float-slow,
          .animate-float-medium,
          .animate-float-fast,
          .animate-float-medium-rev { animation: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-float-slow,
          .animate-float-medium,
          .animate-float-fast,
          .animate-float-medium-rev { animation: none; }
        }

        @keyframes fade-up-in {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-fade-1 { animation: fade-up-in 0.8s ease forwards; }
        .hero-fade-2 { animation: fade-up-in 0.8s 0.12s ease forwards; opacity: 0; }
        .hero-fade-3 { animation: fade-up-in 0.8s 0.24s ease forwards; opacity: 0; }
        .hero-fade-4 { animation: fade-up-in 0.8s 0.36s ease forwards; opacity: 0; }
        @media (prefers-reduced-motion: reduce) {
          .hero-fade-1, .hero-fade-2, .hero-fade-3, .hero-fade-4 {
            animation: none; opacity: 1;
          }
        }
      `}</style>

      <section className="relative h-[100svh] min-h-[600px] overflow-hidden bg-charcoal">
        {/* Photo collage background */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex gap-2 px-2 pointer-events-none select-none"
        >
          {columns.map((col, ci) => {
            const tripled = [...col, ...col, ...col];
            return (
              <div
                key={ci}
                className={`flex flex-col gap-2 flex-1 will-change-transform ${COLUMN_ANIMATIONS[ci % COLUMN_ANIMATIONS.length]}`}
              >
                {tripled.map((story, si) => (
                  <div
                    key={`${story._id}-${si}`}
                    className="relative flex-shrink-0 overflow-hidden"
                    style={{ height: "260px" }}
                  >
                    <Image
                      src={getImageUrl(story)}
                      alt={story.studentName}
                      fill
                      sizes="25vw"
                      className="object-cover"
                      priority={si < 4}
                    />
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* Gradient overlays — charcoal not blue-black */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/80 to-charcoal/25 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/50 via-transparent to-charcoal/50 pointer-events-none" />
        {/* Forest green bottom strip */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-forest z-10" />

        {/* Foreground content */}
        <div className="relative h-full flex flex-col items-center justify-end pb-16 px-6 text-center z-10">
          {/* Eyebrow — matches the rule+label pattern from the rest of the site */}
          <div className="hero-fade-1 flex items-center justify-center gap-3 mb-6">
            <span className="block w-8 h-px bg-sage/60" />
            <p className="font-sans text-[11px] font-semibold uppercase tracking-widest text-sage/80">
              Real People. Real Journeys.
            </p>
            <span className="block w-8 h-px bg-sage/60" />
          </div>

          {/* Main headline */}
          <h1 className="hero-fade-2 font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] mb-6 max-w-4xl">
            Their World,
            <br />
            <em className="not-italic text-sage">Your Next Chapter</em>
          </h1>

          {/* Sub-copy */}
          <p className="hero-fade-3 font-sans text-white/60 text-base md:text-lg max-w-xl mb-10 leading-relaxed">
            Every face in this gallery is a student who trusted us with their
            future — and made it.
          </p>

          {/* Stats row — matches the design system stat treatment */}
          <div className="hero-fade-4 flex items-center gap-0 border border-white/15 bg-charcoal/60 backdrop-blur-sm mb-10">
            {[
              { value: `${studentsPlaced}+`, label: "Lives Changed" },
              { value: `${successRate}%`, label: "Success Rate" },
              { value: `${yearsOfExperience}+`, label: "Years" },
            ].map((s, i) => (
              <div
                key={i}
                className={`px-8 py-4 text-center ${i > 0 ? "border-l border-white/15" : ""}`}
              >
                <p className="font-serif text-3xl md:text-4xl font-bold text-white leading-none mb-1">
                  {s.value}
                </p>
                <p className="text-white/50 text-[10px] uppercase tracking-widest font-semibold">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* Scroll indicator */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-white/30 text-[10px] font-sans tracking-widest uppercase">
              Scroll to explore
            </p>
            <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
          </div>
        </div>
      </section>
    </>
  );
}
