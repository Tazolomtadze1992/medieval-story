"use client";

import { ChapterNavButton } from "@/components/ui/chapter-nav-button";
import { cn } from "@/lib/utils";

type ChapterNavigationProps = {
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
  className?: string;
};

const arrowIconClass =
  "pointer-events-none block h-5 w-auto max-h-5 shrink-0 select-none";

/** Inline SVGs so `fill="currentColor"` inherits `text-white` from ChapterNavButton (`<img>` cannot). */
function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      width={11}
      height={18}
      viewBox="0 0 11 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M11 18L7.33333 18L7.33333 14.4L11 14.4L11 18Z"
        fill="currentColor"
      />
      <path
        d="M7.33333 14.4L3.66667 14.4L3.66667 10.8L7.33333 10.8L7.33333 14.4Z"
        fill="currentColor"
      />
      <path
        d="M3.66667 10.8L7.48653e-07 10.8L1.06338e-06 7.2L3.66667 7.2L3.66667 10.8Z"
        fill="currentColor"
      />
      <path
        d="M7.33333 7.2L3.66667 7.2L3.66667 3.6L7.33333 3.6L7.33333 7.2Z"
        fill="currentColor"
      />
      <path
        d="M11 3.6L7.33333 3.6L7.33333 -1.03581e-06L11 -7.15256e-07L11 3.6Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      width={11}
      height={18}
      viewBox="0 0 11 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path d="M0 0L3.66667 0L3.66667 3.6L0 3.6L0 0Z" fill="currentColor" />
      <path
        d="M3.66667 3.6L7.33333 3.6L7.33333 7.2H3.66667L3.66667 3.6Z"
        fill="currentColor"
      />
      <path
        d="M7.33333 7.2L11 7.2L11 10.8H7.33333V7.2Z"
        fill="currentColor"
      />
      <path
        d="M3.66667 10.8L7.33333 10.8L7.33333 14.4L3.66667 14.4L3.66667 10.8Z"
        fill="currentColor"
      />
      <path d="M0 14.4H3.66667L3.66667 18H0L0 14.4Z" fill="currentColor" />
    </svg>
  );
}

export function ChapterNavigation({
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext,
  className,
}: ChapterNavigationProps) {
  return (
    <nav
      className={cn("flex items-center gap-[12px]", className)}
      aria-label="Chapter navigation"
    >
      <ChapterNavButton
        variant="accent"
        onClick={onPrevious}
        disabled={!canGoPrevious}
        aria-label="Previous chapter"
      >
        <ArrowLeftIcon className={arrowIconClass} />
      </ChapterNavButton>
      <ChapterNavButton
        variant="accent"
        onClick={onNext}
        disabled={!canGoNext}
        aria-label="Next chapter"
      >
        <ArrowRightIcon className={arrowIconClass} />
      </ChapterNavButton>
    </nav>
  );
}
