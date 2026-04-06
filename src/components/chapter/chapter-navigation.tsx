"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

type ChapterNavigationProps = {
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
  className?: string;
};

export function ChapterNavigation({
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext,
  className,
}: ChapterNavigationProps) {
  return (
    <nav
      className={cn("flex items-center gap-[8px]", className)}
      aria-label="Chapter navigation"
    >
      <motion.button
        type="button"
        onClick={onPrevious}
        disabled={!canGoPrevious}
        aria-label="Previous chapter"
        className="inline-flex items-center justify-center disabled:opacity-40"
        whileHover={canGoPrevious ? { scale: 1.1 } : undefined}
        whileTap={canGoPrevious ? { scale: 0.95 } : undefined}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src="/icons/gray-left.svg"
          alt=""
          aria-hidden
          className="block h-6 w-auto shrink-0 select-none"
        />
      </motion.button>
      <motion.button
        type="button"
        onClick={onNext}
        disabled={!canGoNext}
        aria-label="Next chapter"
        className="inline-flex items-center justify-center disabled:opacity-40"
        whileHover={canGoNext ? { scale: 1.1 } : undefined}
        whileTap={canGoNext ? { scale: 0.95 } : undefined}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src="/icons/gray-right.svg"
          alt=""
          aria-hidden
          className="block h-6 w-auto shrink-0 select-none"
        />
      </motion.button>
    </nav>
  );
}
