import type { Transition } from "framer-motion";
import { editorialEase } from "./variants";

/** Re-export for intro sequences — same calm curve as chapter motion */
export const pageIntroEase = editorialEase;

/**
 * Phase 1 intro timings (overlay + title + block only).
 * Tune here when adding the next phase (e.g. dismiss / expand).
 */
export const PAGE_INTRO_TIMINGS = {
  /** Word mask reveal duration */
  titleDuration: 0.88,
  /** “Garden” starts after mount */
  gardenDelay: 0.18,
  /** “Archive” starts after “Garden” */
  wordStagger: 0.14,
  /** Pause after the later word finishes, then the block moves */
  gapBeforeBlock: 0.14,
} as const;

/** Small square accent + mask (em, tied to intro title font size) */
export const INTRO_ACCENT_BLOCK = {
  /** Width === height */
  size: "0.24em",
  /** Slightly wider than the square: short masked runway from the right */
  maskWidth: "0.34em",
  /** Enough vertical room so a tilted square does not clip mid-motion */
  maskHeight: "0.34em",
  /** Flush past the mask’s right edge — short travel vs mask width */
  initialX: "0.34em",
  /** Strong enough to read on a square */
  initialRotate: 180,
} as const;

/**
 * Square accent: `x` + `rotate` share one tween — one rotate-in, transform-only.
 */
export const blockEntranceTransition = (delay: number, reduced: boolean) => {
  if (reduced) {
    return { duration: 0, delay: 0 } as const;
  }
  return {
    delay,
    duration: 0.88,
    ease: pageIntroEase,
  } as const;
};

export function pageIntroTransition(reduced: boolean | null): Transition {
  if (reduced) return { duration: 0 };
  return { duration: PAGE_INTRO_TIMINGS.titleDuration, ease: pageIntroEase };
}

/** When the block should begin (seconds), relative to overlay mount */
export function blockEnterDelaySeconds(reduced: boolean | null): number {
  if (reduced) return 0;
  const { gardenDelay, wordStagger, titleDuration, gapBeforeBlock } =
    PAGE_INTRO_TIMINGS;
  const archiveDelay = gardenDelay + wordStagger;
  const titleDone = Math.max(
    gardenDelay + titleDuration,
    archiveDelay + titleDuration,
  );
  return titleDone + gapBeforeBlock;
}
