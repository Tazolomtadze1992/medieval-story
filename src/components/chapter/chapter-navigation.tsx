"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { InsetCircleButton } from "@/components/ui/inset-circle-button";
import { cn } from "@/lib/utils";

type ChapterNavigationProps = {
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
  className?: string;
};

/** Figma `Page arrows`: gap 17px, 32×32 inset circles, arrow fill #fba809 */
export function ChapterNavigation({
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext,
  className,
}: ChapterNavigationProps) {
  return (
    <nav
      className={cn("flex items-center gap-[17px]", className)}
      aria-label="Chapter navigation"
    >
      <InsetCircleButton
        variant="accent"
        onClick={onPrevious}
        disabled={!canGoPrevious}
        aria-label="Previous chapter"
      >
        <ChevronLeft className="size-[14px]" strokeWidth={2} aria-hidden />
      </InsetCircleButton>
      <InsetCircleButton
        variant="accent"
        onClick={onNext}
        disabled={!canGoNext}
        aria-label="Next chapter"
      >
        <ChevronRight className="size-[14px]" strokeWidth={2} aria-hidden />
      </InsetCircleButton>
    </nav>
  );
}
