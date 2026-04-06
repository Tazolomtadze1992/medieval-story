"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { editorialEase } from "@/lib/motion/variants";
import { cn } from "@/lib/utils";

type ChapterCounterProps = {
  current: number;
  total: number;
  className?: string;
};

export function ChapterCounter({ current, total, className }: ChapterCounterProps) {
  const prefersReduced = useReducedMotion();

  return (
    <p
      className={cn("text-chapter-meta tabular-nums inline-flex items-end", className)}
      aria-live="polite"
      aria-atomic="true"
    >
      <span
        className="relative inline-block overflow-hidden align-bottom"
        style={{ height: "1.31em", lineHeight: 1 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={current}
            className="inline-block"
            initial={prefersReduced ? false : { y: "115%" }}
            animate={{ y: 0 }}
            exit={prefersReduced ? undefined : { y: "-115%" }}
            transition={
              prefersReduced
                ? { duration: 0 }
                : { duration: 0.62, ease: editorialEase }
            }
          >
            {String(current).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </span>
      <span aria-hidden>/</span>
      <span>{String(total).padStart(2, "0")}</span>
    </p>
  );
}