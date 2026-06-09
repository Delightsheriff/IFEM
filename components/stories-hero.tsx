import Image from "next/image";
import { SuccessStory } from "@/interface/sanity";
import { getStoryImageUrl } from "@/lib/image-utils";
import { DEFAULT_STATS } from "@/lib/site-stats";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";

interface StoriesHeroProps {
  stories: SuccessStory[];
  stats?: {
    studentsPlaced: number;
    successRate: number;
    yearsOfExperience: number;
  };
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

  const studentsPlaced = stats?.studentsPlaced ?? DEFAULT_STATS.studentsPlaced;
  const successRate = stats?.successRate ?? DEFAULT_STATS.visaSuccessRate;
  const yearsOfExperience = stats?.yearsOfExperience ?? DEFAULT_STATS.yearsInService;

  return (
    <section className="relative h-svh min-h-150 overflow-hidden bg-charcoal">
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
                    className="relative shrink-0 overflow-hidden"
                    style={{ height: "260px" }}
                  >
                    <Image
                      src={getStoryImageUrl(story)}
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
        <div className="absolute inset-0 bg-linear-to-t from-charcoal via-charcoal/80 to-charcoal/25 pointer-events-none" />
        <div className="absolute inset-0 bg-linear-to-r from-charcoal/50 via-transparent to-charcoal/50 pointer-events-none" />
        {/* Forest green bottom strip */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-forest z-10" />

        {/* Foreground content */}
        <div className="relative h-full flex flex-col items-center justify-end pb-16 px-6 text-center z-10">
          <div className="hero-fade-1 mb-6">
            <SectionEyebrow align="center" tone="sage">
              Real People. Real Journeys.
            </SectionEyebrow>
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
            <div className="w-px h-8 bg-linear-to-b from-white/30 to-transparent" />
          </div>
        </div>
      </section>
  );
}
