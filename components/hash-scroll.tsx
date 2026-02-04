"use client";

import type React from "react";

import { useEffect, useRef } from "react";

interface HashScrollProps {
  text: React.ReactNode;
}

export default function HashScroll({ text }: HashScrollProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    const id = text
      ?.toString()
      .toLowerCase()
      .replaceAll(/[^-\w]+/g, "-")
      .replaceAll(/--+/g, "-")
      .replace(/^-|-$/g, "");

    if (hash === id && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [text]);

  return <span ref={ref}>{text}</span>;
}
