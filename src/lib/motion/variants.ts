import type { Variants } from "framer-motion";

/** Calm editorial easing — not snappy / bouncy */
export const editorialEase = [0.22, 1, 0.36, 1] as const;

/** Whole text column on chapter swap: no enter (title/body handle motion); exit only for AnimatePresence. */
export const chapterTextPresence: Variants = {
  initial: { opacity: 1 },
  animate: { opacity: 1 },
  exit: { opacity: 0, y: -8 },
};

/**
 * Chapter title: left-to-right horizontal mask (text stays fixed; clip-path uncovers).
 * Pair with editorial easing — not a loading-bar sweep.
 */
export const chapterTitleMaskReveal: Variants = {
  initial: {
    opacity: 0,
    clipPath: "inset(0 100% 0 0)",
    y: 3,
  },
  animate: {
    opacity: 1,
    clipPath: "inset(0 0% 0 0)",
    y: 0,
  },
};

/** Story paragraph chunk: restrained opacity + tiny lift (no clip mask). */
export const chapterParagraphChunk: Variants = {
  initial: { opacity: 0, y: 5 },
  animate: { opacity: 1, y: 0 },
};

/** Optional masked reveal — subtle clip, editorial not flashy */
export const maskedReveal: Variants = {
  initial: { opacity: 0, clipPath: "inset(0 0 100% 0)" },
  animate: { opacity: 1, clipPath: "inset(0 0 0% 0)" },
  exit: { opacity: 0, clipPath: "inset(0 0 100% 0)" },
};

/**
 * Initial page reveal after site intro only — body copy.
 * Softer L→R clip than `chapterTitleMaskReveal` (20% vs full width), minimal y.
 */
export const introHandoffParagraphMaskReveal: Variants = {
  initial: {
    opacity: 1,
    clipPath: "inset(0 22% 0 0)",
    y: 2,
  },
  animate: {
    opacity: 1,
    clipPath: "inset(0 0% 0 0)",
    y: 0,
  },
};
