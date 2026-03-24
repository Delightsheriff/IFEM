"use client";

import { useEffect, useState, useMemo } from "react";
import { cn } from "@/lib/utils";

interface LoadingScreenProps {
  onLoadComplete?: () => void;
  minDuration?: number;
}

export default function Loading({
  onLoadComplete,
  minDuration = 500,
}: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  const particles = useMemo(
    () =>
      Array.from({ length: 6 }).map((_, i) => ({
        id: i,
        left: `${[10, 25, 40, 60, 75, 90][i]}%`,
        delay: `${[0, 1.5, 3, 2, 4, 0.5][i]}s`,
        color: [
          "bg-forest",
          "bg-sage",
          "bg-terracotta",
          "bg-sage",
          "bg-forest",
          "bg-sage",
        ][i],
        xOffset: [20, -30, 40, -20, 30, -40][i],
      })),
    [],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFading(true);
      setTimeout(() => {
        setIsVisible(false);
        onLoadComplete?.();
      }, 700);
    }, minDuration);

    return () => clearTimeout(timer);
  }, [minDuration, onLoadComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-9999 flex flex-col items-center justify-center bg-cream transition-opacity duration-700 ease-in-out",
        isFading ? "pointer-events-none opacity-0" : "opacity-100",
      )}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,var(--cream)_0%,#ffffff_50%,var(--cream)_100%)] bg-size-[200%_200%] animate-[gradientShift_8s_ease_infinite]" />

      {/* Floating Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className={cn(
            "absolute w-2 h-2 rounded-full opacity-0 animate-[particleFloat_6s_ease-in-out_infinite]",
            p.color,
          )}
          style={
            {
              left: p.left,
              animationDelay: p.delay,
              "--x-offset": `${p.xOffset}px`,
            } as React.CSSProperties
          }
        />
      ))}

      <div className="relative z-10 flex flex-col items-center animate-[contentFadeIn_0.8s_ease]">
        {/* Orbital Spinner */}
        <div className="relative w-24 h-24 md:w-32 md:h-32 mb-6">
          <div className="absolute inset-0 border-[3px] border-transparent border-t-forest border-r-forest rounded-full animate-[spin_2s_linear_infinite]" />
          <div className="absolute inset-[12.5%] border-[3px] border-transparent border-b-sage border-l-sage rounded-full animate-[spin_2.5s_linear_infinite_reverse]" />
          <div className="absolute inset-[25%] border-[3px] border-transparent border-t-terracotta border-r-terracotta rounded-full animate-[spin_1.8s_linear_infinite]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-forest rounded-full shadow-[0_0_20px_rgba(0,107,56,0.4)] animate-[centerPulse_1.5s_ease-in-out_infinite]" />
        </div>
      </div>

      <style jsx global>{`
        @keyframes gradientShift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        @keyframes particleFloat {
          0% {
            transform: translate(0, 100vh) scale(0);
            opacity: 0;
          }
          10%,
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translate(var(--x-offset), -100vh) scale(1);
            opacity: 0;
          }
        }
        @keyframes contentFadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes logoPulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes centerPulse {
          0%,
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.3);
            opacity: 0.7;
          }
        }
        @keyframes dotBounce {
          0%,
          80%,
          100% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          40% {
            transform: scale(1.2);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
