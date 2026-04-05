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

  return (
    <div className={cn("flex h-full min-h-0 flex-1 flex-col", className)}>
      <EditorialLayout
        topBar={topBar}
        textPanel={
          <div className="flex h-full min-h-0 w-full min-w-0 flex-col justify-between gap-8">
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
            <div className="flex shrink-0 items-center justify-between gap-4">
              <ChapterCounter current={activeIndex + 1} total={total} />
              <ChapterNavigation
                onPrevious={goPrevious}
                onNext={goNext}
                canGoPrevious={canGoPrevious}
                canGoNext={canGoNext}
              />
            </div>
          </div>
        }
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
