"use client";

import { useEffect, useState } from "react";

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
      <div className="flex flex-col items-center gap-4">
        {/* Simple spinner */}
        <div className="w-10 h-10 border-2 border-sage/30 border-t-forest rounded-full animate-spin" />
        
        <p className="text-sm text-gray font-medium">Loading...</p>
      </div>
    </div>
  );
}
