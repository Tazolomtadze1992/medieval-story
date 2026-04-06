"use client";

import type { CSSProperties } from "react";
import { useCallback, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  blockEnterDelaySeconds,
  blockEntranceTransition,
  INTRO_ACCENT_BLOCK,
  introExpandTransition,
  pageIntroTransition,
  PAGE_INTRO_TIMINGS,
} from "@/lib/motion/page-intro";
import { cn } from "@/lib/utils";

type IntroPhase = "intro" | "expanding" | "expanded";

type GardenArchiveIntroOverlayProps = {
  /** Fires once the white panel finishes growing to fullscreen (start content reveal). */
  onWhitePanelFull?: () => void;
};

/**
 * Phase 1: dark layer + split title + masked accent square.
 * Phase 2: square → full-screen cream panel (page still hidden).
 */
export function GardenArchiveIntroOverlay({
  onWhitePanelFull,
}: GardenArchiveIntroOverlayProps) {
  const prefersReduced = useReducedMotion();
  const reduced = Boolean(prefersReduced);

  const titleT = pageIntroTransition(prefersReduced);
  const blockDelay = blockEnterDelaySeconds(prefersReduced);

  const { gardenDelay, wordStagger } = PAGE_INTRO_TIMINGS;

  const [phase, setPhase] = useState<IntroPhase>("intro");
  const [expandRect, setExpandRect] = useState<DOMRect | null>(null);
  const accentRef = useRef<HTMLDivElement>(null);
  const accentSettledRef = useRef(false);

  const onAccentIntroComplete = useCallback(() => {
    if (accentSettledRef.current) return;
    accentSettledRef.current = true;
    const el = accentRef.current;
    if (!el) return;
    setExpandRect(el.getBoundingClientRect());
    setPhase("expanding");
  }, []);

  const onExpandComplete = useCallback(() => {
    setPhase("expanded");
    onWhitePanelFull?.();
  }, [onWhitePanelFull]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[200] flex items-center justify-center",
        "bg-[#121212]",
        "select-none",
        phase === "expanded"
          ? "pointer-events-none"
          : "pointer-events-auto",
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
                ref={accentRef}
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
                onAnimationComplete={onAccentIntroComplete}
                className={cn(
                  "absolute bottom-[10px] left-0 shrink-0 bg-[#f4efe6]",
                  phase !== "intro" && "opacity-0",
                )}
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

      {expandRect != null && phase !== "intro" ? (
        <motion.div
          className="fixed z-[201] bg-background pointer-events-none"
          initial={{
            top: expandRect.top,
            left: expandRect.left,
            width: expandRect.width,
            height: expandRect.height,
          }}
          animate={{
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
          }}
          transition={introExpandTransition(prefersReduced)}
          onAnimationComplete={onExpandComplete}
        />
      ) : null}
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
