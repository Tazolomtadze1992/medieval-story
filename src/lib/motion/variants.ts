import type { Variants } from "framer-motion";

/** Calm editorial easing — not snappy / bouncy */
export const editorialEase = [0.22, 1, 0.36, 1] as const;

/**
 * Chapter text presence wrapper: keep the parent static so masked child reveals/exits
 * do the visual work. If the whole block fades/slides, the text feels like it flies
 * in/out instead of emerging from an invisible box.
 */
export const chapterTextPresence: Variants = {
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 1, y: 0 },
};

/** Optional masked reveal — subtle clip, editorial not flashy */
export const maskedReveal: Variants = {
  initial: { opacity: 0, clipPath: "inset(0 0 100% 0)" },
  animate: { opacity: 1, clipPath: "inset(0 0 0% 0)" },
  exit: { opacity: 0, clipPath: "inset(0 0 100% 0)" },
};
