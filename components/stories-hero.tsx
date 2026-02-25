import Image from "next/image";
import Link from "next/link";
import { SuccessStory } from "@/interface/sanity";

interface StoriesHeroProps {
  stories: SuccessStory[];
}

function getImageUrl(story: SuccessStory): string {
  return (
    story.studentImage?.url ||
    story.studentImage?.asset?.url ||
    "/placeholder.svg?height=800&width=600"
  );
}

// Distribute stories evenly into N columns
function distributeIntoColumns(
  stories: SuccessStory[],
  cols: number,
): SuccessStory[][] {
  const columns: SuccessStory[][] = Array.from({ length: cols }, () => []);
  if (stories.length === 0) return columns;

  // Repeat stories enough to fill columns visually (min 3 per column)
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

export default function StoriesHero({ stories }: StoriesHeroProps) {
  const columns = distributeIntoColumns(stories, 4);
  const total = stories.length;

  return (
    <>
      {/* Keyframe styles injected once */}
      <style>{`
        @keyframes float-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(-33.333%); }
        }
        @keyframes float-down {
          0% { transform: translateY(-33.333%); }
          100% { transform: translateY(0); }
        }
        .animate-float-slow   { animation: float-up   22s linear infinite; }
        .animate-float-medium { animation: float-up   16s linear infinite; }
        .animate-float-fast   { animation: float-up   12s linear infinite; }
        .animate-float-medium-rev { animation: float-down 18s linear infinite; }

        @keyframes fade-up-in {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up-1 { animation: fade-up-in 0.8s ease forwards; }
        .animate-fade-up-2 { animation: fade-up-in 0.8s 0.15s ease forwards; opacity:0; }
        .animate-fade-up-3 { animation: fade-up-in 0.8s 0.3s ease forwards; opacity:0; }
        .animate-fade-up-4 { animation: fade-up-in 0.8s 0.45s ease forwards; opacity:0; }

        @keyframes pulse-ring {
          0%,100% { box-shadow: 0 0 0 0 rgba(0,107,56,0.35); }
          50% { box-shadow: 0 0 0 12px rgba(0,107,56,0); }
        }
        .animate-pulse-ring { animation: pulse-ring 3s ease-in-out infinite; }
      `}</style>

      <section className="relative h-screen min-h-[600px] overflow-hidden bg-charcoal">
        {/* ── Collage Background ─────────────────────────────── */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex gap-2 px-2 pointer-events-none"
        >
          {columns.map((col, ci) => {
            // Triple the column to make seamless loop
            const tripled = [...col, ...col, ...col];
            return (
              <div
                key={ci}
                className={`flex flex-col gap-2 flex-1 will-change-transform ${COLUMN_ANIMATIONS[ci % COLUMN_ANIMATIONS.length]}`}
              >
                {tripled.map((story, si) => (
                  <div
                    key={`${story._id}-${si}`}
                    className="relative rounded-xl overflow-hidden flex-shrink-0"
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

        {/* ── Gradient Overlays ──────────────────────────────── */}
        {/* Bottom-to-top cream fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2d2d2d] via-[#2d2d2d]/80 to-[#2d2d2d]/30 pointer-events-none" />
        {/* Left vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2d2d2d]/60 via-transparent to-[#2d2d2d]/60 pointer-events-none" />

        {/* ── Foreground Content ─────────────────────────────── */}
        <div className="relative h-full flex flex-col items-center justify-end pb-16 px-6 text-center z-10">
          {/* Eyebrow */}
          <p className="animate-fade-up-1 text-sage font-sans text-xs md:text-sm uppercase tracking-[0.25em] mb-4 font-medium">
            Real People. Real Journeys.
          </p>

          {/* Main Headline */}
          <h1 className="animate-fade-up-2 font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] mb-6 text-balance max-w-4xl">
            Their World,
            <br />
            <span className="italic text-sage">Your Next Chapter</span>
          </h1>

          {/* Sub-copy */}
          <p className="animate-fade-up-3 font-sans text-white/70 text-base md:text-lg max-w-xl mb-10 leading-relaxed">
            Every face in this gallery is a student who trusted us with their
            future — and made it.
          </p>

          {/* Stat pill */}
          <div className="animate-fade-up-4 flex items-center gap-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-8 py-4 mb-8">
            <div className="text-center">
              <p className="font-serif text-3xl md:text-4xl font-bold text-white">
                {total > 0 ? `${total}+` : "500+"}
              </p>
              <p className="text-white/60 text-xs uppercase tracking-widest mt-1">
                Lives Changed
              </p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <p className="font-serif text-3xl md:text-4xl font-bold text-white">
                98%
              </p>
              <p className="text-white/60 text-xs uppercase tracking-widest mt-1">
                Success Rate
              </p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <p className="font-serif text-3xl md:text-4xl font-bold text-white">
                5+
              </p>
              <p className="text-white/60 text-xs uppercase tracking-widest mt-1">
                Years
              </p>
            </div>
          </div>

          {/* Scroll hint */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-white/40 text-xs font-sans tracking-widest uppercase">
              Scroll to explore their stories
            </p>
            <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
          </div>
        </div>

        {/* ── CTA floating button ────────────────────────────── */}
        <div className="absolute top-6 right-6 z-20">
          <Link
            href="/contact"
            className="animate-pulse-ring inline-flex items-center gap-2 bg-forest text-white font-sans font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-forest/90 transition-colors shadow-lg"
          >
            Start Your Journey
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
