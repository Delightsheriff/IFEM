"use client";

import React from "react";
import { useEffect, useMemo, useRef, useCallback, useState } from "react";
import { useGesture } from "@use-gesture/react";

export interface SuccessStory {
  _id: string;
  studentName: string;
  schoolDestination: string;
  comment: string;
  mediaType: "image" | "video";
  studentImage?: {
    asset: {
      _ref: string;
      url?: string;
    };
  };
  studentVideo?: {
    asset: {
      _ref: string;
      url?: string;
    };
  };
}

type DomeGalleryProps = {
  stories?: SuccessStory[];
  fit?: number;
  fitBasis?: "auto" | "min" | "max" | "width" | "height";
  minRadius?: number;
  maxRadius?: number;
  padFactor?: number;
  overlayBlurColor?: string;
  maxVerticalRotationDeg?: number;
  dragSensitivity?: number;
  enlargeTransitionMs?: number;
  segments?: number;
  dragDampening?: number;
  openedImageWidth?: string;
  openedImageHeight?: string;
  imageBorderRadius?: string;
  openedImageBorderRadius?: string;
  onStorySelect?: (story: SuccessStory | null) => void;
};

type ItemDef = {
  _id: string;
  studentName: string;
  schoolDestination: string;
  comment: string;
  mediaType: "image" | "video";
  mediaSrc: string;
  videoSrc: string;
  x: number;
  y: number;
  sizeX: number;
  sizeY: number;
  originalIndex: number;
};

function getImageSrc(story: SuccessStory): string {
  return story.studentImage?.asset?.url || "";
}

function getVideoSrc(story: SuccessStory): string {
  if (story.mediaType === "video" && story.studentVideo?.asset?.url) {
    return story.studentVideo.asset.url;
  }
  return "";
}

function getTileSrc(story: SuccessStory): string {
  // For video stories, use video URL with #t=0.1 as thumbnail if no image
  // For image stories, use the image URL
  if (story.mediaType === "video") {
    const imgSrc = getImageSrc(story);
    if (imgSrc) return imgSrc;
    // Fallback: use the video itself at t=0.1 as a thumbnail
    const videoSrc = getVideoSrc(story);
    // If we have a video src, return it to attempt using it (or a placeholder in the future)
    // Note: The img tag might fail to load if it's not an image, but modern browsers often don't show video in img tags.
    // Ideally, we'd use a dedicated placeholder, but for now we try the video URL which might not work.
    // However, the best approach is to just return a placeholder if no image exists.
    return videoSrc ? `${videoSrc}` : "";
  }
  return getImageSrc(story);
}

const DEFAULT_STORIES: SuccessStory[] = [
  {
    _id: "1",
    studentName: "Sarah M.",
    schoolDestination: "University of Manchester, UK",
    comment:
      "The guidance I received was incredible. Every step of my application was handled with care.",
    mediaType: "image",
    studentImage: {
      asset: {
        _ref: "img1",
        url: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=800",
      },
    },
  },
  {
    _id: "2",
    studentName: "James L.",
    schoolDestination: "Kyoto University, Japan",
    comment:
      "From visa processing to university admission, the team made it seamless.",
    mediaType: "image",
    studentImage: {
      asset: {
        _ref: "img2",
        url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800",
      },
    },
  },
  {
    _id: "3",
    studentName: "Elena R.",
    schoolDestination: "Politecnico di Milano, Italy",
    comment:
      "I never imagined studying abroad could be this smooth. Thank you for everything!",
    mediaType: "image",
    studentImage: {
      asset: {
        _ref: "img3",
        url: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800",
      },
    },
  },
  {
    _id: "4",
    studentName: "Michael T.",
    schoolDestination: "University of Cape Town, SA",
    comment:
      "They helped me secure a full scholarship. My life has completely changed.",
    mediaType: "image",
    studentImage: {
      asset: {
        _ref: "img4",
        url: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=800",
      },
    },
  },
  {
    _id: "5",
    studentName: "Anna K.",
    schoolDestination: "University of Sydney, Australia",
    comment:
      "The best decision I ever made was trusting this team with my future.",
    mediaType: "image",
    studentImage: {
      asset: {
        _ref: "img5",
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
      },
    },
  },
  {
    _id: "6",
    studentName: "David H.",
    schoolDestination: "UiT Arctic University, Norway",
    comment:
      "Studying in Norway was a dream come true. The support was phenomenal.",
    mediaType: "image",
    studentImage: {
      asset: {
        _ref: "img6",
        url: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800",
      },
    },
  },
  {
    _id: "7",
    studentName: "Lisa W.",
    schoolDestination: "Udayana University, Bali",
    comment: "An experience that shaped who I am today. Forever grateful.",
    mediaType: "image",
    studentImage: {
      asset: {
        _ref: "img7",
        url: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800",
      },
    },
  },
];

const DEFAULTS = {
  maxVerticalRotationDeg: 5,
  dragSensitivity: 20,
  enlargeTransitionMs: 300,
  segments: 35,
};

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);
const normalizeAngle = (d: number) => ((d % 360) + 360) % 360;
const wrapAngleSigned = (deg: number) => {
  const a = (((deg + 180) % 360) + 360) % 360;
  return a - 180;
};
const getDataNumber = (el: HTMLElement, name: string, fallback: number) => {
  const attr = el.dataset[name] ?? el.getAttribute(`data-${name}`);
  const n = attr == null ? NaN : parseFloat(attr);
  return Number.isFinite(n) ? n : fallback;
};

function buildItems(pool: SuccessStory[], seg: number): ItemDef[] {
  const xCols = Array.from({ length: seg }, (_, i) => -37 + i * 2);
  const evenYs = [-4, -2, 0, 2, 4];
  const oddYs = [-3, -1, 1, 3, 5];

  const coords = xCols.flatMap((x, c) => {
    const ys = c % 2 === 0 ? evenYs : oddYs;
    return ys.map((y) => ({ x, y, sizeX: 2, sizeY: 2 }));
  });

  const totalSlots = coords.length;
  if (pool.length === 0) {
    return coords.map((c) => ({
      ...c,
      _id: "",
      studentName: "",
      schoolDestination: "",
      comment: "",
      mediaType: "image" as const,
      mediaSrc: "",
      videoSrc: "",
      originalIndex: -1,
    }));
  }

  const normalizedStories = pool.map((story, idx) => ({
    _id: story._id,
    studentName: story.studentName || "",
    schoolDestination: story.schoolDestination || "",
    comment: story.comment || "",
    mediaType: story.mediaType || "image",
    mediaSrc: getTileSrc(story),
    videoSrc: getVideoSrc(story),
    originalIndex: idx,
  }));

  const usedStories = Array.from(
    { length: totalSlots },
    (_, i) => normalizedStories[i % normalizedStories.length],
  );

  for (let i = 1; i < usedStories.length; i++) {
    if (usedStories[i].mediaSrc === usedStories[i - 1].mediaSrc) {
      for (let j = i + 1; j < usedStories.length; j++) {
        if (usedStories[j].mediaSrc !== usedStories[i].mediaSrc) {
          const tmp = usedStories[i];
          usedStories[i] = usedStories[j];
          usedStories[j] = tmp;
          break;
        }
      }
    }
  }

  return coords.map((c, i) => ({
    ...c,
    ...usedStories[i],
  }));
}

function computeItemBaseRotation(
  offsetX: number,
  offsetY: number,
  sizeX: number,
  sizeY: number,
  segments: number,
) {
  const unit = 360 / segments / 2;
  const rotateY = unit * (offsetX + (sizeX - 1) / 2);
  const rotateX = unit * (offsetY - (sizeY - 1) / 2);
  return { rotateX, rotateY };
}

export default function DomeGallery({
  stories = DEFAULT_STORIES,
  fit = 0.5,
  fitBasis = "auto",
  minRadius = 600,
  maxRadius = Infinity,
  padFactor = 0.25,
  overlayBlurColor = "#0a0a0a",
  maxVerticalRotationDeg = DEFAULTS.maxVerticalRotationDeg,
  dragSensitivity = DEFAULTS.dragSensitivity,
  enlargeTransitionMs = DEFAULTS.enlargeTransitionMs,
  segments = DEFAULTS.segments,
  dragDampening = 2,
  openedImageWidth = "420px",
  openedImageHeight = "520px",
  imageBorderRadius = "16px",
  openedImageBorderRadius = "24px",
  onStorySelect,
}: DomeGalleryProps): React.JSX.Element {
  const rootRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const focusedElRef = useRef<HTMLElement | null>(null);
  const originalTilePositionRef = useRef<{
    left: number;
    top: number;
    width: number;
    height: number;
  } | null>(null);

  const [, setActiveStory] = useState<ItemDef | null>(null);

  const rotationRef = useRef({ x: 0, y: 0 });
  const startRotRef = useRef({ x: 0, y: 0 });
  const startPosRef = useRef<{ x: number; y: number } | null>(null);
  const draggingRef = useRef(false);
  const cancelTapRef = useRef(false);
  const movedRef = useRef(false);
  const inertiaRAF = useRef<number | null>(null);
  const pointerTypeRef = useRef<"mouse" | "pen" | "touch">("mouse");
  const tapTargetRef = useRef<HTMLElement | null>(null);
  const openingRef = useRef(false);
  const openStartedAtRef = useRef(0);
  const lastDragEndAt = useRef(0);

  const scrollLockedRef = useRef(false);
  const lockScroll = useCallback(() => {
    if (scrollLockedRef.current) return;
    scrollLockedRef.current = true;
    document.body.classList.add("dg-scroll-lock");
  }, []);
  const unlockScroll = useCallback(() => {
    if (!scrollLockedRef.current) return;
    if (rootRef.current?.getAttribute("data-enlarging") === "true") return;
    scrollLockedRef.current = false;
    document.body.classList.remove("dg-scroll-lock");
  }, []);

  const items = useMemo(
    () => buildItems(stories, segments),
    [stories, segments],
  );

  const applyTransform = (xDeg: number, yDeg: number) => {
    const el = sphereRef.current;
    if (el) {
      el.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
    }
  };

  const lockedRadiusRef = useRef<number | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ro = new ResizeObserver((entries) => {
      const cr = entries[0].contentRect;
      const w = Math.max(1, cr.width),
        h = Math.max(1, cr.height);
      const minDim = Math.min(w, h),
        maxDim = Math.max(w, h),
        aspect = w / h;
      let basis: number;
      switch (fitBasis) {
        case "min":
          basis = minDim;
          break;
        case "max":
          basis = maxDim;
          break;
        case "width":
          basis = w;
          break;
        case "height":
          basis = h;
          break;
        default:
          basis = aspect >= 1.3 ? w : minDim;
      }
      let radius = basis * fit;
      const heightGuard = h * 1.35;
      radius = Math.min(radius, heightGuard);
      radius = clamp(radius, minRadius, maxRadius);
      lockedRadiusRef.current = Math.round(radius);

      const viewerPad = Math.max(8, Math.round(minDim * padFactor));
      root.style.setProperty("--radius", `${lockedRadiusRef.current}px`);
      root.style.setProperty("--viewer-pad", `${viewerPad}px`);
      root.style.setProperty("--overlay-blur-color", overlayBlurColor);
      root.style.setProperty("--tile-radius", imageBorderRadius);
      root.style.setProperty("--enlarge-radius", openedImageBorderRadius);
      applyTransform(rotationRef.current.x, rotationRef.current.y);

      const enlargedOverlay = viewerRef.current?.querySelector(
        ".enlarge",
      ) as HTMLElement;
      if (enlargedOverlay && frameRef.current && mainRef.current) {
        const frameR = frameRef.current.getBoundingClientRect();
        const mainR = mainRef.current.getBoundingClientRect();

        const hasCustomSize = openedImageWidth && openedImageHeight;
        if (hasCustomSize) {
          const tempDiv = document.createElement("div");
          tempDiv.style.cssText = `position: absolute; width: ${openedImageWidth}; height: ${openedImageHeight}; visibility: hidden;`;
          document.body.appendChild(tempDiv);
          const tempRect = tempDiv.getBoundingClientRect();
          document.body.removeChild(tempDiv);

          const centeredLeft =
            frameR.left - mainR.left + (frameR.width - tempRect.width) / 2;
          const centeredTop =
            frameR.top - mainR.top + (frameR.height - tempRect.height) / 2;

          enlargedOverlay.style.left = `${centeredLeft}px`;
          enlargedOverlay.style.top = `${centeredTop}px`;
        } else {
          enlargedOverlay.style.left = `${frameR.left - mainR.left}px`;
          enlargedOverlay.style.top = `${frameR.top - mainR.top}px`;
          enlargedOverlay.style.width = `${frameR.width}px`;
          enlargedOverlay.style.height = `${frameR.height}px`;
        }
      }
    });
    ro.observe(root);
    return () => ro.disconnect();
  }, [
    fit,
    fitBasis,
    minRadius,
    maxRadius,
    padFactor,
    overlayBlurColor,
    imageBorderRadius,
    openedImageBorderRadius,
    openedImageWidth,
    openedImageHeight,
  ]);

  useEffect(() => {
    applyTransform(rotationRef.current.x, rotationRef.current.y);
  }, []);

  const stopInertia = useCallback(() => {
    if (inertiaRAF.current) {
      cancelAnimationFrame(inertiaRAF.current);
      inertiaRAF.current = null;
    }
  }, []);

  const startInertia = useCallback(
    (vx: number, vy: number) => {
      const MAX_V = 1.4;
      let vX = clamp(vx, -MAX_V, MAX_V) * 80;
      let vY = clamp(vy, -MAX_V, MAX_V) * 80;
      let frames = 0;
      const d = clamp(dragDampening ?? 0.6, 0, 1);
      const frictionMul = 0.94 + 0.055 * d;
      const stopThreshold = 0.015 - 0.01 * d;
      const maxFrames = Math.round(90 + 270 * d);
      const step = () => {
        vX *= frictionMul;
        vY *= frictionMul;
        if (Math.abs(vX) < stopThreshold && Math.abs(vY) < stopThreshold) {
          inertiaRAF.current = null;
          return;
        }
        if (++frames > maxFrames) {
          inertiaRAF.current = null;
          return;
        }
        const nextX = clamp(
          rotationRef.current.x - vY / 200,
          -maxVerticalRotationDeg,
          maxVerticalRotationDeg,
        );
        const nextY = wrapAngleSigned(rotationRef.current.y + vX / 200);
        rotationRef.current = { x: nextX, y: nextY };
        applyTransform(nextX, nextY);
        inertiaRAF.current = requestAnimationFrame(step);
      };
      stopInertia();
      inertiaRAF.current = requestAnimationFrame(step);
    },
    [dragDampening, maxVerticalRotationDeg, stopInertia],
  );

  useGesture(
    {
      onDragStart: ({ event }) => {
        if (focusedElRef.current) return;
        stopInertia();

        const evt = event as PointerEvent;
        pointerTypeRef.current =
          (evt.pointerType as "mouse" | "pen" | "touch") || "mouse";
        if (pointerTypeRef.current === "touch") evt.preventDefault();
        if (pointerTypeRef.current === "touch") lockScroll();
        draggingRef.current = true;
        cancelTapRef.current = false;
        movedRef.current = false;
        startRotRef.current = { ...rotationRef.current };
        startPosRef.current = { x: evt.clientX, y: evt.clientY };
        const potential = (evt.target as Element).closest?.(
          ".item__image",
        ) as HTMLElement | null;
        tapTargetRef.current = potential || null;
      },
      onDrag: ({
        event,
        last,
        velocity: velArr = [0, 0],
        direction: dirArr = [0, 0],
        movement,
      }) => {
        if (
          focusedElRef.current ||
          !draggingRef.current ||
          !startPosRef.current
        )
          return;

        const evt = event as PointerEvent;
        if (pointerTypeRef.current === "touch") evt.preventDefault();

        const dxTotal = evt.clientX - startPosRef.current.x;
        const dyTotal = evt.clientY - startPosRef.current.y;

        if (!movedRef.current) {
          const dist2 = dxTotal * dxTotal + dyTotal * dyTotal;
          if (dist2 > 16) movedRef.current = true;
        }

        const nextX = clamp(
          startRotRef.current.x - dyTotal / dragSensitivity,
          -maxVerticalRotationDeg,
          maxVerticalRotationDeg,
        );
        const nextY = startRotRef.current.y + dxTotal / dragSensitivity;

        const cur = rotationRef.current;
        if (cur.x !== nextX || cur.y !== nextY) {
          rotationRef.current = { x: nextX, y: nextY };
          applyTransform(nextX, nextY);
        }

        if (last) {
          draggingRef.current = false;
          let isTap = false;

          if (startPosRef.current) {
            const dx = evt.clientX - startPosRef.current.x;
            const dy = evt.clientY - startPosRef.current.y;
            const dist2 = dx * dx + dy * dy;
            const TAP_THRESH_PX = pointerTypeRef.current === "touch" ? 10 : 6;
            if (dist2 <= TAP_THRESH_PX * TAP_THRESH_PX) {
              isTap = true;
            }
          }

          const [vMagX, vMagY] = velArr;
          const [dirX, dirY] = dirArr;
          let vx = vMagX * dirX;
          let vy = vMagY * dirY;

          if (
            !isTap &&
            Math.abs(vx) < 0.001 &&
            Math.abs(vy) < 0.001 &&
            Array.isArray(movement)
          ) {
            const [mx, my] = movement;
            vx = (mx / dragSensitivity) * 0.02;
            vy = (my / dragSensitivity) * 0.02;
          }

          if (!isTap && (Math.abs(vx) > 0.005 || Math.abs(vy) > 0.005)) {
            startInertia(vx, vy);
          }
          startPosRef.current = null;
          cancelTapRef.current = !isTap;

          if (isTap && tapTargetRef.current && !focusedElRef.current) {
            openItemFromElement(tapTargetRef.current);
          }
          tapTargetRef.current = null;

          if (cancelTapRef.current)
            setTimeout(() => (cancelTapRef.current = false), 120);
          if (pointerTypeRef.current === "touch") unlockScroll();
          if (movedRef.current) lastDragEndAt.current = performance.now();
          movedRef.current = false;
        }
      },
    },
    { target: mainRef, eventOptions: { passive: false } },
  );

  const closeOverlay = useCallback(() => {
    if (performance.now() - openStartedAtRef.current < 250) return;
    const el = focusedElRef.current;
    if (!el) return;
    const parent = el.parentElement as HTMLElement;
    const overlay = viewerRef.current?.querySelector(
      ".enlarge",
    ) as HTMLElement | null;
    if (!overlay) return;

    // Pause any playing video
    const videoEl = overlay.querySelector("video");
    if (videoEl) {
      videoEl.pause();
      videoEl.src = "";
    }

    const refDiv = parent.querySelector(
      ".item__image--reference",
    ) as HTMLElement | null;

    const originalPos = originalTilePositionRef.current;
    if (!originalPos) {
      overlay.remove();
      if (refDiv) refDiv.remove();
      parent.style.setProperty("--rot-y-delta", `0deg`);
      parent.style.setProperty("--rot-x-delta", `0deg`);
      el.style.visibility = "";
      (el.style as CSSStyleDeclaration & { zIndex: string }).zIndex = "0";
      focusedElRef.current = null;
      rootRef.current?.removeAttribute("data-enlarging");
      openingRef.current = false;
      setActiveStory(null);
      onStorySelect?.(null);
      return;
    }

    const currentRect = overlay.getBoundingClientRect();
    const rootRect = rootRef.current!.getBoundingClientRect();

    const originalPosRelativeToRoot = {
      left: originalPos.left - rootRect.left,
      top: originalPos.top - rootRect.top,
      width: originalPos.width,
      height: originalPos.height,
    };

    const overlayRelativeToRoot = {
      left: currentRect.left - rootRect.left,
      top: currentRect.top - rootRect.top,
      width: currentRect.width,
      height: currentRect.height,
    };

    const animatingOverlay = document.createElement("div");
    animatingOverlay.className = "enlarge-closing";
    animatingOverlay.style.cssText = `
      position: absolute;
      left: ${overlayRelativeToRoot.left}px;
      top: ${overlayRelativeToRoot.top}px;
      width: ${overlayRelativeToRoot.width}px;
      height: ${overlayRelativeToRoot.height}px;
      z-index: 9999;
      border-radius: ${openedImageBorderRadius};
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0,0,0,.35);
      transition: all ${enlargeTransitionMs}ms ease-out;
      pointer-events: none;
      margin: 0;
      transform: none;
    `;

    // Use the poster image for the close animation
    const posterSrc = parent.dataset.src || "";
    if (posterSrc) {
      const imgEl = document.createElement("img");
      imgEl.src = posterSrc;
      imgEl.style.cssText = "width: 100%; height: 100%; object-fit: cover;";
      animatingOverlay.appendChild(imgEl);
    }

    overlay.remove();
    rootRef.current!.appendChild(animatingOverlay);

    void animatingOverlay.getBoundingClientRect();

    setActiveStory(null);
    onStorySelect?.(null);

    requestAnimationFrame(() => {
      animatingOverlay.style.left = originalPosRelativeToRoot.left + "px";
      animatingOverlay.style.top = originalPosRelativeToRoot.top + "px";
      animatingOverlay.style.width = originalPosRelativeToRoot.width + "px";
      animatingOverlay.style.height = originalPosRelativeToRoot.height + "px";
      animatingOverlay.style.opacity = "0";
    });

    const cleanup = () => {
      animatingOverlay.remove();
      originalTilePositionRef.current = null;

      if (refDiv) refDiv.remove();
      parent.style.transition = "none";
      el.style.transition = "none";

      parent.style.setProperty("--rot-y-delta", `0deg`);
      parent.style.setProperty("--rot-x-delta", `0deg`);

      requestAnimationFrame(() => {
        el.style.visibility = "";
        el.style.opacity = "0";
        (el.style as CSSStyleDeclaration & { zIndex: string }).zIndex = "0";
        focusedElRef.current = null;
        rootRef.current?.removeAttribute("data-enlarging");

        requestAnimationFrame(() => {
          parent.style.transition = "";
          el.style.transition = "opacity 300ms ease-out";

          requestAnimationFrame(() => {
            el.style.opacity = "1";
            setTimeout(() => {
              el.style.transition = "";
              el.style.opacity = "";
              openingRef.current = false;
              if (
                !draggingRef.current &&
                rootRef.current?.getAttribute("data-enlarging") !== "true"
              ) {
                document.body.classList.remove("dg-scroll-lock");
              }
            }, 300);
          });
        });
      });
    };

    animatingOverlay.addEventListener("transitionend", cleanup, {
      once: true,
    });
  }, [enlargeTransitionMs, openedImageBorderRadius, onStorySelect]);

  useEffect(() => {
    const scrim = scrimRef.current;
    if (!scrim) return;

    scrim.addEventListener("click", closeOverlay);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeOverlay();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      scrim.removeEventListener("click", closeOverlay);
      window.removeEventListener("keydown", onKey);
    };
  }, [closeOverlay]);

  const openItemFromElement = (el: HTMLElement) => {
    if (openingRef.current) return;
    openingRef.current = true;
    openStartedAtRef.current = performance.now();
    lockScroll();
    const parent = el.parentElement as HTMLElement;
    focusedElRef.current = el;
    el.setAttribute("data-focused", "true");
    const offsetX = getDataNumber(parent, "offsetX", 0);
    const offsetY = getDataNumber(parent, "offsetY", 0);
    const sizeX = getDataNumber(parent, "sizeX", 2);
    const sizeY = getDataNumber(parent, "sizeY", 2);
    const parentRot = computeItemBaseRotation(
      offsetX,
      offsetY,
      sizeX,
      sizeY,
      segments,
    );
    const parentY = normalizeAngle(parentRot.rotateY);
    const globalY = normalizeAngle(rotationRef.current.y);
    let rotY = -(parentY + globalY) % 360;
    if (rotY < -180) rotY += 360;
    const rotX = -parentRot.rotateX - rotationRef.current.x;
    parent.style.setProperty("--rot-y-delta", `${rotY}deg`);
    parent.style.setProperty("--rot-x-delta", `${rotX}deg`);
    const refDiv = document.createElement("div");
    refDiv.className = "item__image item__image--reference opacity-0";
    refDiv.style.transform = `rotateX(${-parentRot.rotateX}deg) rotateY(${-parentRot.rotateY}deg)`;
    parent.appendChild(refDiv);

    void refDiv.offsetHeight;

    const tileR = refDiv.getBoundingClientRect();
    const mainR = mainRef.current?.getBoundingClientRect();
    const frameR = frameRef.current?.getBoundingClientRect();

    if (!mainR || !frameR || tileR.width <= 0 || tileR.height <= 0) {
      openingRef.current = false;
      focusedElRef.current = null;
      parent.removeChild(refDiv);
      unlockScroll();
      return;
    }

    originalTilePositionRef.current = {
      left: tileR.left,
      top: tileR.top,
      width: tileR.width,
      height: tileR.height,
    };
    el.style.visibility = "hidden";
    (el.style as CSSStyleDeclaration & { zIndex: string }).zIndex = "0";

    // Find the story data
    const storyIndex = parseInt(parent.dataset.storyIndex || "-1", 10);
    const storyData = storyIndex >= 0 ? items[storyIndex] : null;
    if (storyData) {
      setActiveStory(storyData);
      // Find original story for callback
      const originalStory = stories[storyData.originalIndex];
      if (originalStory) onStorySelect?.(originalStory);
    }

    const overlay = document.createElement("div");
    overlay.className = "enlarge";
    overlay.style.cssText = `position:absolute; left:${frameR.left - mainR.left}px; top:${frameR.top - mainR.top}px; width:${frameR.width}px; height:${frameR.height}px; opacity:0; z-index:30; will-change:transform,opacity; transform-origin:top left; transition:transform ${enlargeTransitionMs}ms ease, opacity ${enlargeTransitionMs}ms ease; border-radius:${openedImageBorderRadius}; overflow:hidden; box-shadow:0 25px 50px -12px rgba(0,0,0,.5);`;
    const rawSrc =
      parent.dataset.src ||
      (el.querySelector("img") as HTMLImageElement)?.src ||
      "";
    const rawAlt =
      parent.dataset.alt ||
      (el.querySelector("img") as HTMLImageElement)?.alt ||
      "";

    // Create the content wrapper
    const contentWrapper = document.createElement("div");
    contentWrapper.style.cssText =
      "width:100%; height:100%; position:relative; display:flex; flex-direction:column;";

    // Detect media type from storyData
    const isVideo = storyData?.mediaType === "video";
    const videoSrc = storyData?.videoSrc || "";

    if (isVideo && videoSrc) {
      // Create video container
      const videoContainer = document.createElement("div");
      videoContainer.style.cssText = `width:100%; height:100%; position:relative; background:#000;`;

      const video = document.createElement("video");
      video.src = videoSrc;
      video.poster = rawSrc;
      video.controls = true;
      video.playsInline = true;
      video.style.cssText = `width:100%; height:100%; object-fit:contain;`;
      video.setAttribute("controlsList", "nodownload");

      // Play button overlay - user clicks to play with sound
      const playOverlay = document.createElement("div");
      playOverlay.style.cssText = `
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0,0,0,0.3);
        cursor: pointer;
        transition: opacity 300ms ease;
      `;
      playOverlay.innerHTML = `
        <div style="width: 80px; height: 80px; border-radius: 50%; background: rgba(255,255,255,0.95); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 20px rgba(0,0,0,0.3);">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        </div>
      `;

      playOverlay.addEventListener("click", () => {
        video.play();
        playOverlay.style.opacity = "0";
        playOverlay.style.pointerEvents = "none";
      });

      video.addEventListener("pause", () => {
        if (video.currentTime > 0 && !video.ended) {
          playOverlay.style.opacity = "1";
          playOverlay.style.pointerEvents = "auto";
        }
      });

      video.addEventListener("play", () => {
        playOverlay.style.opacity = "0";
        playOverlay.style.pointerEvents = "none";
      });

      videoContainer.appendChild(video);
      videoContainer.appendChild(playOverlay);
      contentWrapper.appendChild(videoContainer);
    } else {
      const imgElement = document.createElement("img");
      imgElement.src = rawSrc;
      imgElement.alt = rawAlt;
      imgElement.style.cssText = `width:100%; height:100%; object-fit:cover;`;
      contentWrapper.appendChild(imgElement);
    }

    // Create testimonial section
    if (storyData && storyData.comment) {
      const testimonialDiv = document.createElement("div");
      testimonialDiv.className = "testimonial-section";
      testimonialDiv.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 24px;
        background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.8) 70%, transparent 100%);
        color: white;
        opacity: 0;
        transform: translateY(10px);
        transition: opacity 400ms ease 200ms, transform 400ms ease 200ms;
      `;

      const nameEl = document.createElement("p");
      nameEl.style.cssText =
        "font-size: 14px; font-weight: 600; margin: 0 0 4px 0; color: rgba(255,255,255,0.7); text-transform: uppercase; letter-spacing: 0.05em;";
      nameEl.textContent = storyData.studentName || "Student";

      const destEl = document.createElement("p");
      destEl.style.cssText =
        "font-size: 12px; margin: 0 0 12px 0; color: rgba(255,255,255,0.5);";
      destEl.textContent = storyData.schoolDestination || "";

      const quoteEl = document.createElement("p");
      quoteEl.style.cssText =
        "font-size: 15px; line-height: 1.5; margin: 0; color: rgba(255,255,255,0.9); font-style: italic;";
      quoteEl.textContent = `"${storyData.comment}"`;

      testimonialDiv.appendChild(nameEl);
      testimonialDiv.appendChild(destEl);
      testimonialDiv.appendChild(quoteEl);
      contentWrapper.appendChild(testimonialDiv);

      // Animate testimonial in after overlay opens
      setTimeout(() => {
        testimonialDiv.style.opacity = "1";
        testimonialDiv.style.transform = "translateY(0)";
      }, enlargeTransitionMs + 50);
    }

    overlay.appendChild(contentWrapper);
    viewerRef.current!.appendChild(overlay);

    const tx0 = tileR.left - frameR.left;
    const ty0 = tileR.top - frameR.top;
    const sx0 = tileR.width / frameR.width;
    const sy0 = tileR.height / frameR.height;

    const validSx0 = isFinite(sx0) && sx0 > 0 ? sx0 : 1;
    const validSy0 = isFinite(sy0) && sy0 > 0 ? sy0 : 1;

    overlay.style.transform = `translate(${tx0}px, ${ty0}px) scale(${validSx0}, ${validSy0})`;
    setTimeout(() => {
      if (!overlay.parentElement) return;
      overlay.style.opacity = "1";
      overlay.style.transform = "translate(0px, 0px) scale(1, 1)";
      rootRef.current?.setAttribute("data-enlarging", "true");
    }, 16);
    const wantsResize = openedImageWidth || openedImageHeight;
    if (wantsResize) {
      const onFirstEnd = (ev: TransitionEvent) => {
        if (ev.propertyName !== "transform") return;
        overlay.removeEventListener("transitionend", onFirstEnd);
        const prevTransition = overlay.style.transition;
        overlay.style.transition = "none";
        const tempWidth = openedImageWidth || `${frameR.width}px`;
        const tempHeight = openedImageHeight || `${frameR.height}px`;
        overlay.style.width = tempWidth;
        overlay.style.height = tempHeight;
        const newRect = overlay.getBoundingClientRect();
        overlay.style.width = frameR.width + "px";
        overlay.style.height = frameR.height + "px";
        void overlay.offsetWidth;
        overlay.style.transition = `left ${enlargeTransitionMs}ms ease, top ${enlargeTransitionMs}ms ease, width ${enlargeTransitionMs}ms ease, height ${enlargeTransitionMs}ms ease`;
        const centeredLeft =
          frameR.left - mainR.left + (frameR.width - newRect.width) / 2;
        const centeredTop =
          frameR.top - mainR.top + (frameR.height - newRect.height) / 2;
        requestAnimationFrame(() => {
          overlay.style.left = `${centeredLeft}px`;
          overlay.style.top = `${centeredTop}px`;
          overlay.style.width = tempWidth;
          overlay.style.height = tempHeight;
        });
        const cleanupSecond = () => {
          overlay.removeEventListener("transitionend", cleanupSecond);
          overlay.style.transition = prevTransition;
        };
        overlay.addEventListener("transitionend", cleanupSecond, {
          once: true,
        });
      };
      overlay.addEventListener("transitionend", onFirstEnd);
    }
  };

  useEffect(() => {
    return () => {
      document.body.classList.remove("dg-scroll-lock");
    };
  }, []);

  const cssStyles = `
    .sphere-root {
      --radius: 520px;
      --viewer-pad: 72px;
      --circ: calc(var(--radius) * 3.14);
      --rot-y: calc((360deg / var(--segments-x)) / 2);
      --rot-x: calc((360deg / var(--segments-y)) / 2);
      --item-width: calc(var(--circ) / var(--segments-x));
      --item-height: calc(var(--circ) / var(--segments-y));
    }
    
    .sphere-root * { box-sizing: border-box; }
    .sphere, .sphere-item, .item__image { transform-style: preserve-3d; }
    
    .stage {
      width: 100%;
      height: 100%;
      display: grid;
      place-items: center;
      position: absolute;
      inset: 0;
      margin: auto;
      perspective: calc(var(--radius) * 2);
      perspective-origin: 50% 50%;
    }
    
    .sphere {
      transform: translateZ(calc(var(--radius) * -1));
      will-change: transform;
      position: absolute;
    }
    
    .sphere-item {
      width: calc(var(--item-width) * var(--item-size-x));
      height: calc(var(--item-height) * var(--item-size-y));
      position: absolute;
      top: -999px;
      bottom: -999px;
      left: -999px;
      right: -999px;
      margin: auto;
      transform-origin: 50% 50%;
      backface-visibility: hidden;
      transition: transform 300ms;
      transform: rotateY(calc(var(--rot-y) * (var(--offset-x) + ((var(--item-size-x) - 1) / 2)) + var(--rot-y-delta, 0deg))) 
                 rotateX(calc(var(--rot-x) * (var(--offset-y) - ((var(--item-size-y) - 1) / 2)) + var(--rot-x-delta, 0deg))) 
                 translateZ(var(--radius));
    }
    
    .sphere-root[data-enlarging="true"] .scrim {
      opacity: 1 !important;
      pointer-events: all !important;
    }
    
    @media (max-aspect-ratio: 1/1) {
      .viewer-frame {
        height: auto !important;
        width: 100% !important;
      }
    }
    
    .item__image {
      position: absolute;
      inset: 8px;
      border-radius: var(--tile-radius, 12px);
      overflow: hidden;
      cursor: pointer;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      transition: transform 300ms, box-shadow 300ms;
      pointer-events: auto;
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
    }
    
    .item__image:hover {
      transform: translateZ(0) scale(1.02);
      box-shadow: 0 8px 30px rgba(0,0,0,0.3);
    }
    
    .item__image--reference {
      position: absolute;
      inset: 8px;
      pointer-events: none;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: cssStyles }} />
      <div
        ref={rootRef}
        className="sphere-root relative w-full h-full"
        style={
          {
            ["--segments-x" as string]: segments,
            ["--segments-y" as string]: segments,
            ["--overlay-blur-color" as string]: overlayBlurColor,
            ["--tile-radius" as string]: imageBorderRadius,
            ["--enlarge-radius" as string]: openedImageBorderRadius,
          } as React.CSSProperties
        }
      >
        <style dangerouslySetInnerHTML={{ __html: `
          .sphere-root[data-enlarging="true"] + .content-overlay,
          .sphere-root[data-enlarging="true"] ~ .content-overlay {
             opacity: 0;
             pointer-events: none;
             transition: opacity 300ms ease;
          }
        `}} />
        <main
          ref={mainRef}
          className="absolute inset-0 grid place-items-center overflow-hidden select-none bg-transparent"
          style={{
            touchAction: "none",
            WebkitUserSelect: "none",
          }}
        >
          <div className="stage">
            <div ref={sphereRef} className="sphere">
              {items.map((it, i) => (
                <div
                  key={`${it.x},${it.y},${i}`}
                  className="sphere-item absolute m-auto"
                  data-src={it.mediaSrc}
                  data-alt={it.studentName}
                  data-offset-x={it.x}
                  data-offset-y={it.y}
                  data-size-x={it.sizeX}
                  data-size-y={it.sizeY}
                  data-story-index={i}
                  style={
                    {
                      ["--offset-x" as string]: it.x,
                      ["--offset-y" as string]: it.y,
                      ["--item-size-x" as string]: it.sizeX,
                      ["--item-size-y" as string]: it.sizeY,
                      top: "-999px",
                      bottom: "-999px",
                      left: "-999px",
                      right: "-999px",
                    } as React.CSSProperties
                  }
                >
                  <div
                    className="item__image absolute block overflow-hidden cursor-pointer bg-muted transition-transform duration-300"
                    role="button"
                    tabIndex={0}
                    aria-label={
                      it.studentName
                        ? `View ${it.studentName}'s story`
                        : "View student story"
                    }
                    onClick={(e) => {
                      if (draggingRef.current) return;
                      if (movedRef.current) return;
                      if (performance.now() - lastDragEndAt.current < 80)
                        return;
                      if (openingRef.current) return;
                      openItemFromElement(e.currentTarget as HTMLElement);
                    }}
                    onPointerUp={(e) => {
                      if (
                        (e.nativeEvent as PointerEvent).pointerType !== "touch"
                      )
                        return;
                      if (draggingRef.current) return;
                      if (movedRef.current) return;
                      if (performance.now() - lastDragEndAt.current < 80)
                        return;
                      if (openingRef.current) return;
                      openItemFromElement(e.currentTarget as HTMLElement);
                    }}
                    style={{
                      inset: "8px",
                      borderRadius: `var(--tile-radius, ${imageBorderRadius})`,
                      backfaceVisibility: "hidden",
                    }}
                  >
                      <img
                        src={it.mediaSrc || "/placeholder.svg"}
                        draggable={false}
                        alt={it.studentName || "Student story"}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover pointer-events-none"
                        style={{
                          backfaceVisibility: "hidden",
                        }}
                        onError={(e) => {
                           // Fallback if video URL in img fails or image fails
                           e.currentTarget.style.display = 'none';
                           e.currentTarget.parentElement?.classList.add('bg-black');
                        }}
                      />

                    {it.mediaType === "video" && (
                      <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ backfaceVisibility: "hidden" }}
                      >
                         <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center border border-white/20">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="none">
                                <polygon points="5 3 19 12 5 21 5 3" />
                            </svg>
                         </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="absolute inset-0 m-auto z-3 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(rgba(235, 235, 235, 0) 65%, var(--overlay-blur-color, ${overlayBlurColor}) 100%)`,
            }}
          />

          <div
            className="absolute inset-0 m-auto z-3 pointer-events-none"
            style={{
              WebkitMaskImage: `radial-gradient(rgba(235, 235, 235, 0) 70%, var(--overlay-blur-color, ${overlayBlurColor}) 90%)`,
              maskImage: `radial-gradient(rgba(235, 235, 235, 0) 70%, var(--overlay-blur-color, ${overlayBlurColor}) 90%)`,
              backdropFilter: "blur(3px)",
            }}
          />

          <div
            className="absolute left-0 right-0 top-0 h-30 z-5 pointer-events-none rotate-180"
            style={{
              background: `linear-gradient(to bottom, transparent, var(--overlay-blur-color, ${overlayBlurColor}))`,
            }}
          />
          <div
            className="absolute left-0 right-0 bottom-0 h-30 z-5 pointer-events-none"
            style={{
              background: `linear-gradient(to bottom, transparent, var(--overlay-blur-color, ${overlayBlurColor}))`,
            }}
          />

          <div
            ref={viewerRef}
            className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center"
            style={{ padding: "var(--viewer-pad)" }}
          >
            <div
              ref={scrimRef}
              className="scrim absolute inset-0 z-10 pointer-events-none opacity-0 transition-opacity duration-500"
              style={{
                background: "rgba(0, 0, 0, 0.6)",
                backdropFilter: "blur(8px)",
              }}
            />
            <div
              ref={frameRef}
              className="viewer-frame h-full aspect-3/4 flex"
              style={{
                borderRadius: `var(--enlarge-radius, ${openedImageBorderRadius})`,
              }}
            />
          </div>
        </main>
      </div>
    </>
  );
}
