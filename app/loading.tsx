"use client";

import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onLoadComplete?: () => void;
  minDuration?: number;
}

export default function Loading({
  onLoadComplete,
  minDuration = 2500,
}: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        const increment = Math.random() * 15 + 5;
        return Math.min(prev + increment, 100);
      });
    }, minDuration / 8);

    const timer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setIsFading(true);
        setTimeout(() => {
          setIsVisible(false);
          onLoadComplete?.();
        }, 500);
      }, 200);
    }, minDuration);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [minDuration, onLoadComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-9999 flex flex-col items-center justify-center bg-cream transition-opacity duration-500 ${
        isFading ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      {/* Minimal decorative element */}
      <div className="absolute left-1/2 top-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 opacity-[0.03]">
        <div
          className="h-full w-full rounded-full border border-forest"
          style={{ animation: "expandRing 3s ease-out infinite" }}
        />
      </div>

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center"
        style={{ animation: "fadeInUp 0.6s ease-out" }}
      >
        {/* Logo mark */}
        <div className="mb-8">
          <div className="relative flex h-20 w-20 items-center justify-center">
            {/* Outer ring */}
            <div
              className="absolute inset-0 rounded-full border-2 border-sage/40"
              style={{ animation: "pulse 2s ease-in-out infinite" }}
            />
            {/* Progress ring */}
            <svg className="absolute inset-0 h-full w-full -rotate-90">
              <circle
                cx="40"
                cy="40"
                r="38"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-forest"
                strokeLinecap="round"
                style={{
                  strokeDasharray: `${2 * Math.PI * 38}`,
                  strokeDashoffset: `${2 * Math.PI * 38 * (1 - progress / 100)}`,
                  transition: "stroke-dashoffset 0.3s ease-out",
                }}
              />
            </svg>
            {/* Center logo */}
            <span className="font-serif text-2xl font-bold text-forest">
              IF
            </span>
          </div>
        </div>

        {/* Brand name */}
        <h1 className="mb-2 font-serif text-3xl font-semibold tracking-tight text-charcoal">
          IFEM
        </h1>
        <p className="mb-8 text-sm tracking-widest text-gray uppercase">
          Education
        </p>

        {/* Progress bar */}
        <div className="h-0.5 w-48 overflow-hidden rounded-full bg-sage/20">
          <div
            className="h-full rounded-full bg-forest transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Loading text */}
        <p className="mt-4 text-xs text-gray">
          {progress < 100 ? "Loading" : "Ready"}
          {progress < 100 && (
            <span className="inline-flex w-6">
              <span style={{ animation: "dots 1.4s infinite" }}>...</span>
            </span>
          )}
        </p>
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes expandRing {
          0% {
            transform: scale(0.8);
            opacity: 1;
          }
          100% {
            transform: scale(1.2);
            opacity: 0;
          }
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.4;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.6;
          }
        }

        @keyframes dots {
          0%,
          20% {
            content: ".";
          }
          40% {
            content: "..";
          }
          60%,
          100% {
            content: "...";
          }
        }
      `}</style>
    </div>
  );
}
