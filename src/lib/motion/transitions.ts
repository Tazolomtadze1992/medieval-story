import type { Transition } from "framer-motion";
import { editorialEase } from "./variants";

export const subtle: Transition = {
  duration: 0.55,
  ease: editorialEase,
};

export const staggerParent: Transition = {
  duration: 0.45,
  ease: editorialEase,
  staggerChildren: 0.06,
  delayChildren: 0.04,
};

export function withReducedMotion(
  prefersReduced: boolean | null,
  t: Transition,
): Transition {
  if (prefersReduced) {
    return { duration: 0 };
  }
  return t;
}
