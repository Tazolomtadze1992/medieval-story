"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { startTransition, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { CHAPTER_IMAGE_WIPE_DURATION_S } from "@/lib/motion/chapter-timing";
import { editorialEase } from "@/lib/motion/variants";

type Pair = { src: string; alt: string };

type WipeDirection = "next" | "prev";

type WipeSession = {
  from: Pair;
  to: Pair;
  id: number;
  direction: WipeDirection;
  /** Chapter index for this wipe’s target (used when interrupting mid-wipe) */
  targetIndex: number;
};

type ChapterImageWipeProps = {
  imageSrc: string;
  imageAlt: string;
  /** Stable id when the visual asset should change (e.g. chapter id) */
  chapterKey: string;
  /** Current chapter index — compared to the last committed index to pick wipe direction */
  activeIndex: number;
  priority?: boolean;
  className?: string;
  accentColor?: string;
};

/** Next: reveal L→R via `inset(0 100% 0 0)` → full. Prev: reveal R→L via `inset(0 0 0 100%)` → full. */
const clipNext = {
  initial: "inset(0 100% 0 0)",
  animate: "inset(0 0% 0 0)",
} as const;

const clipPrev = {
  initial: "inset(0 0 0 100%)",
  animate: "inset(0 0% 0 0)",
} as const;

/**
 * Replacement wipe: outgoing fixed, incoming revealed via clip-path (not a slide).
 * Direction follows index: higher index → L→R; lower index → R→L.
 */
export function ChapterImageWipe({
  imageSrc,
  imageAlt,
  chapterKey,
  activeIndex,
  priority,
  className,
  accentColor,
}: ChapterImageWipeProps) {
  const prefersReduced = useReducedMotion();
  const committedRef = useRef<Pair>({ src: imageSrc, alt: imageAlt });
  const committedIndexRef = useRef(activeIndex);
  const wipePairRef = useRef<WipeSession | null>(null);
  const [wipe, setWipe] = useState<WipeSession | null>(null);
  const [wipeKey, setWipeKey] = useState(0);
  const animIdRef = useRef(0);

  useEffect(() => {
    wipePairRef.current = wipe;
  }, [wipe]);

  useEffect(() => {
    const next: Pair = { src: imageSrc, alt: imageAlt };
    if (next.src === committedRef.current.src) {
      committedIndexRef.current = activeIndex;
      return;
    }

    if (prefersReduced) {
      committedRef.current = next;
      committedIndexRef.current = activeIndex;
      startTransition(() => setWipe(null));
      return;
    }

    if (wipePairRef.current) {
      committedRef.current = wipePairRef.current.to;
      committedIndexRef.current = wipePairRef.current.targetIndex;
    }

    const from = { ...committedRef.current };
    if (from.src === next.src) {
      return;
    }

    const direction: WipeDirection =
      activeIndex > committedIndexRef.current
        ? "next"
        : activeIndex < committedIndexRef.current
          ? "prev"
          : "next";

    const id = ++animIdRef.current;
    startTransition(() => {
      setWipe({
        from,
        to: next,
        id,
        direction,
        targetIndex: activeIndex,
      });
      setWipeKey((k) => k + 1);
    });
    committedIndexRef.current = activeIndex;
  }, [chapterKey, imageSrc, imageAlt, activeIndex, prefersReduced]);

  const shellClass = cn(
    "relative h-full w-full overflow-hidden bg-surface",
    !accentColor && "border-0",
    accentColor && "border border-frame",
    className,
  );

  const transition = prefersReduced
    ? { duration: 0 }
    : { duration: CHAPTER_IMAGE_WIPE_DURATION_S, ease: editorialEase };

  const handleWipeComplete = (sessionId: number) => {
    if (sessionId !== animIdRef.current) {
      return;
    }
    const pair = wipePairRef.current;
    if (!pair || pair.id !== sessionId) {
      return;
    }
    committedRef.current = pair.to;
    committedIndexRef.current = pair.targetIndex;
    startTransition(() => setWipe(null));
  };

  const clip =
    wipe && wipe.direction === "prev" ? clipPrev : clipNext;

  if (!wipe) {
    return (
      <div
        className={shellClass}
        style={accentColor ? { borderColor: accentColor } : undefined}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={shellClass}
      style={accentColor ? { borderColor: accentColor } : undefined}
    >
      <Image
        src={wipe.from.src}
        alt=""
        aria-hidden
        fill
        sizes="(min-width: 1024px) 55vw, 100vw"
        className="object-cover"
      />
      <motion.div
        key={`${wipe.to.src}-${wipeKey}-${wipe.direction}`}
        className="absolute inset-0 z-10 will-change-[clip-path]"
        initial={{ clipPath: clip.initial }}
        animate={{ clipPath: clip.animate }}
        transition={transition}
        onAnimationComplete={() => handleWipeComplete(wipe.id)}
      >
        <Image
          src={wipe.to.src}
          alt={wipe.to.alt}
          fill
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}
