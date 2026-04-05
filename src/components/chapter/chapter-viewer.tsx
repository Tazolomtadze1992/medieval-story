"use client";

import { useCallback, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Chapter } from "@/types/chapter";
import { EditorialLayout } from "@/components/layout/editorial-layout";
import { ChapterImageWipe } from "@/components/chapter/chapter-image-wipe";
import { ChapterTextPanel } from "@/components/chapter/chapter-text-panel";
import { ChapterNavigation } from "@/components/chapter/chapter-navigation";
import { ThumbnailRail } from "@/components/chapter/thumbnail-rail";
import { ChapterCounter } from "@/components/chapter/chapter-counter";
import { chapterTextPresence } from "@/lib/motion/variants";
import { subtle, withReducedMotion } from "@/lib/motion/transitions";
import { cn } from "@/lib/utils";

type ChapterViewerProps = {
  chapters: Chapter[];
  activeIndex: number;
  onIndexChange: (index: number) => void;
  showDropCapOnFirst?: boolean;
  className?: string;
  topBar?: React.ReactNode;
};

export function ChapterViewer({
  chapters,
  activeIndex,
  onIndexChange,
  showDropCapOnFirst = true,
  className,
  topBar,
}: ChapterViewerProps) {
  const prefersReduced = useReducedMotion();
  const transition = withReducedMotion(prefersReduced, subtle);
  const chapter = chapters[activeIndex];
  const total = chapters.length;
  const canGoPrevious = activeIndex > 0;
  const canGoNext = activeIndex < total - 1;

  const goPrevious = useCallback(() => {
    if (canGoPrevious) onIndexChange(activeIndex - 1);
  }, [activeIndex, canGoPrevious, onIndexChange]);

  const goNext = useCallback(() => {
    if (canGoNext) onIndexChange(activeIndex + 1);
  }, [activeIndex, canGoNext, onIndexChange]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrevious();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goPrevious, goNext]);

  if (!chapter) {
    return null;
  }

  /** One shared row in the left 4-column band: label | counter (cols 2–3) | prev/next (col 4). */
  const leftColumnFooter = (
    <div
      className={cn(
        "grid w-full min-w-0 grid-cols-1 gap-4",
        "lg:grid-cols-4 lg:items-end lg:gap-x-8",
      )}
    >
      <p className="text-site-title text-foreground min-w-0 lg:justify-self-start">
        Garden Archive
      </p>
      <ChapterCounter
        current={activeIndex + 1}
        total={total}
        className="min-w-0 lg:col-span-2 lg:justify-self-end"
      />
      <ChapterNavigation
        onPrevious={goPrevious}
        onNext={goNext}
        canGoPrevious={canGoPrevious}
        canGoNext={canGoNext}
        className="min-w-0 lg:w-full lg:min-w-0 lg:justify-between lg:gap-0"
      />
    </div>
  );

  return (
    <div className={cn("flex h-full min-h-0 flex-1 flex-col", className)}>
      <EditorialLayout
        topBar={topBar}
        textPanel={
          <div className="flex h-full min-h-0 w-full min-w-0 flex-col">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={chapter.id}
                variants={chapterTextPresence}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={transition}
                className="min-h-0 w-full min-w-0 flex-1 overflow-y-auto"
              >
                <ChapterTextPanel
                  title={chapter.title}
                  body={chapter.body}
                  paragraphLines={chapter.paragraphLines}
                  dropCap={showDropCapOnFirst && activeIndex === 0}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        }
        leftColumnFooter={leftColumnFooter}
        imagePanel={
          <div className="h-full w-full">
            <ChapterImageWipe
              chapterKey={chapter.id}
              activeIndex={activeIndex}
              imageSrc={chapter.imageSrc}
              imageAlt={chapter.imageAlt}
              priority={activeIndex === 0}
              accentColor={chapter.themeAccent}
              className="h-full min-h-[200px] border-0 shadow-none lg:min-h-0"
            />
          </div>
        }
        bottomRail={
          <ThumbnailRail
            chapters={chapters}
            activeIndex={activeIndex}
            onSelect={onIndexChange}
          />
        }
      />
    </div>
  );
}
