"use client";

import { useEffect, useState } from "react";
import { GraduationCap } from "lucide-react";

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
      {/* Logo and spinner */}
      <div className="flex flex-col items-center">
        {/* Animated logo container */}
        <div className="relative mb-6">
          {/* Outer ring */}
          <div className="w-16 h-16 rounded-full border-2 border-sage/30" />
          
          {/* Spinning arc */}
          <div className="absolute inset-0">
            <svg className="w-16 h-16 animate-spin" viewBox="0 0 64 64">
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                className="text-forest"
                strokeDasharray="140 60"
                transform="rotate(-30 32 32)"
              />
            </svg>
          </div>
          
          {/* Centered icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <GraduationCap className="w-7 h-7 text-forest" />
          </div>
        </div>

        {/* Brand name */}
        <p className="font-serif text-xl font-bold text-charcoal tracking-wide">
          IFEM Education
        </p>
        
        {/* Loading text */}
        <p className="text-sm text-gray mt-2 animate-pulse">
          Loading...
        </p>
      </div>

      {/* Minimal decorative elements */}
      <div className="absolute bottom-8 left-8 w-2 h-2 rounded-full bg-sage/30 animate-pulse" style={{ animationDelay: "0s" }} />
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-terracotta/30 animate-pulse" style={{ animationDelay: "0.2s" }} />
      <div className="absolute bottom-8 right-8 w-2 h-2 rounded-full bg-forest/30 animate-pulse" style={{ animationDelay: "0.4s" }} />
    </div>
  );
}
