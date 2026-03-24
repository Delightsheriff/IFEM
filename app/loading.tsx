"use client";

import { useEffect, useState } from "react";
import { GraduationCap, Globe, Award } from "lucide-react";

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFading(true);
      setTimeout(() => {
        setIsVisible(false);
        onLoadComplete?.();
      }, 300);
    }, minDuration);

    return () => clearTimeout(timer);
  }, [minDuration, onLoadComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-9999 flex flex-col items-center justify-center bg-cream transition-opacity duration-300 ${
        isFading ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      {/* Animated circles background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-forest/5 rounded-full animate-pulse blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-terracotta/5 rounded-full animate-pulse blur-3xl" style={{ animationDelay: "1s" }} />
      </div>

      {/* Main loader */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Container */}
        <div className="relative w-32 h-32 mb-8">
          {/* Outer circle */}
          <svg className="w-full h-full animate-[spin_3s_linear_infinite]" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-sage/20"
            />
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="180 239"
              className="text-forest"
              transform="rotate(-90 50 50)"
            />
          </svg>

          {/* Inner circle */}
          <svg className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] animate-[spin_2s_linear_infinite_reverse]" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="100 151"
              className="text-terracotta"
              transform="rotate(-90 50 50)"
            />
          </svg>

          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-forest rounded-xl flex items-center justify-center shadow-lg shadow-forest/20">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Orbiting dots */}
          <div className="absolute inset-0 animate-[spin_4s_linear_infinite]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-sage rounded-full" />
          </div>
          <div className="absolute inset-0 animate-[spin_3s_linear_infinite_reverse]">
            <div className="absolute bottom-0 right-4 w-1.5 h-1.5 bg-terracotta rounded-full" />
          </div>
        </div>

        {/* Brand */}
        <h1 className="font-serif text-2xl font-bold text-charcoal tracking-wide">
          IFEM <span className="text-forest">Education</span>
        </h1>

        {/* Animated dots */}
        <div className="flex items-center gap-1 mt-3">
          <span className="w-1.5 h-1.5 bg-forest rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="w-1.5 h-1.5 bg-forest rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="w-1.5 h-1.5 bg-forest rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>

        {/* Tagline */}
        <p className="text-sm text-gray mt-4">
          Bridging your dreams to reality
        </p>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-6 left-6 flex flex-col gap-2">
        <Globe className="w-5 h-5 text-sage/30" />
        <Award className="w-4 h-4 text-sage/20 ml-4" />
      </div>
      <div className="absolute bottom-6 right-6 flex flex-col gap-2 items-end">
        <GraduationCap className="w-4 h-4 text-sage/20" />
        <Award className="w-5 h-5 text-sage/30 ml-4" />
      </div>
    </div>
  );
}
