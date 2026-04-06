"use client";

import type { CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  blockEnterDelaySeconds,
  blockEntranceTransition,
  INTRO_ACCENT_BLOCK,
  pageIntroTransition,
  PAGE_INTRO_TIMINGS,
} from "@/lib/motion/page-intro";
import { cn } from "@/lib/utils";

/**
 * Phase 1: full-screen dark layer + split word reveal + accent block.
 * Does not dismiss or reveal the page yet — extend with a second phase later.
 */
export function GardenArchiveIntroOverlay() {
  const prefersReduced = useReducedMotion();
  const reduced = Boolean(prefersReduced);

  const titleT = pageIntroTransition(prefersReduced);
  const blockDelay = blockEnterDelaySeconds(prefersReduced);

  const { gardenDelay, wordStagger } = PAGE_INTRO_TIMINGS;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[200] flex items-center justify-center",
        "bg-[#121212]",
        "pointer-events-auto select-none",
      )}
      aria-hidden
    >
      <div className="flex max-w-[min(92vw,42rem)] flex-col items-center px-6">
        <div
          className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 md:gap-x-4"
          style={
            {
              fontSize: "clamp(1.75rem, 4.2vw, 2.85rem)",
              lineHeight: 1.05,
            } satisfies CSSProperties
          }
        >
          <WordReveal
            reduced={reduced}
            delay={gardenDelay}
            direction="from-below"
            className="font-[family-name:var(--font-site-title)] font-normal tracking-[-0.04em] text-white"
            transition={titleT}
          >
            Garden
          </WordReveal>
          <div className="inline-flex items-end gap-[0.08em] md:gap-[0.1em]">
            <WordReveal
              reduced={reduced}
              delay={gardenDelay + wordStagger}
              direction="from-above"
              className="font-sans font-normal tracking-[0.02em] text-white/95"
              transition={titleT}
            >
              Archive
            </WordReveal>

            {/* Tight masked slot: square starts fully outside the clip, then rotates in from close range */}
            <span
              className="relative inline-block shrink-0 overflow-hidden self-end"
              style={{
                width: INTRO_ACCENT_BLOCK.maskWidth,
                height: `calc(${INTRO_ACCENT_BLOCK.maskHeight} + 10px)`,
              }}
              aria-hidden
            >
              <motion.div
                initial={
                  reduced
                    ? false
                    : {
                        opacity: 0,
                        x: INTRO_ACCENT_BLOCK.initialX,
                        rotate: INTRO_ACCENT_BLOCK.initialRotate,
                      }
                }
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{
                  ...blockEntranceTransition(
                    reduced ? 0 : blockDelay,
                    reduced,
                  ),
                  opacity: {
                    duration: reduced ? 0 : 0.01,
                    delay: reduced ? 0 : blockDelay,
                  },
                }}
                className="absolute bottom-[10px] left-0 shrink-0 bg-[#f4efe6]"
                style={{
                  width: INTRO_ACCENT_BLOCK.size,
                  height: INTRO_ACCENT_BLOCK.size,
                  transformOrigin: "center center",
                }}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function WordReveal({
  children,
  direction,
  delay,
  reduced,
  className,
  transition,
}: {
  children: React.ReactNode;
  direction: "from-below" | "from-above";
  reduced: boolean;
  delay: number;
  className?: string;
  transition: ReturnType<typeof pageIntroTransition>;
}) {
  const fromY = direction === "from-below" ? "115%" : "-115%";

  return (
    <div className="overflow-hidden py-[0.04em]">
      <motion.span
        className={cn("inline-block", className)}
        initial={reduced ? false : { y: fromY, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          ...transition,
          delay: reduced ? 0 : delay,
        }}
      >
        {children}
      </motion.span>
    </div>
  );
}
