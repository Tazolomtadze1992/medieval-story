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
import { introContentStepTransition } from "@/lib/motion/page-intro";
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
  /** Intro phase 3: 0–4 layered reveal; omit after intro ends */
  introRevealStage?: number;
  /** Skip default chapter entrance motion after intro */
  entranceComplete?: boolean;
};

export function ChapterViewer({
  chapters,
  activeIndex,
  onIndexChange,
  showDropCapOnFirst = true,
  className,
  topBar,
  introRevealStage,
  entranceComplete = false,
}: ChapterViewerProps) {
  const prefersReduced = useReducedMotion();
  const transition = withReducedMotion(prefersReduced, subtle);
  const introTrans = introContentStepTransition(prefersReduced);
  const ir = introRevealStage;
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
  const leftColumnFooterInner = (
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

  const leftColumnFooter =
    ir !== undefined ? (
      <motion.div
        className="w-full"
        initial={false}
        animate={{
          opacity: ir >= 4 ? 1 : 0,
          y: ir >= 4 ? 0 : 4,
        }}
        transition={introTrans}
      >
        {leftColumnFooterInner}
      </motion.div>
    ) : (
      leftColumnFooterInner
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
                  introRevealStage={ir}
                  entranceComplete={entranceComplete}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        }
        leftColumnFooter={leftColumnFooter}
        imagePanel={
          <motion.div
            className="h-full w-full"
            initial={false}
            animate={{
              opacity: ir !== undefined ? (ir >= 3 ? 1 : 0) : 1,
              y: ir !== undefined ? (ir >= 3 ? 0 : 10) : 0,
            }}
            transition={introTrans}
          >
            <ChapterImageWipe
              chapterKey={chapter.id}
              activeIndex={activeIndex}
              imageSrc={chapter.imageSrc}
              imageAlt={chapter.imageAlt}
              priority={activeIndex === 0}
              accentColor={chapter.themeAccent}
              className="h-full min-h-[200px] border-0 shadow-none lg:min-h-0"
            />
          </motion.div>
        }
        bottomRail={
          ir !== undefined ? (
            <motion.div
              className="ml-auto w-max min-w-0 max-w-full"
              initial={false}
              animate={{
                opacity: ir >= 4 ? 1 : 0,
                y: ir >= 4 ? 0 : 4,
              }}
              transition={introTrans}
            >
              <ThumbnailRail
                chapters={chapters}
                activeIndex={activeIndex}
                onSelect={onIndexChange}
              />
            </motion.div>
          ) : (
            <ThumbnailRail
              chapters={chapters}
              activeIndex={activeIndex}
              onSelect={onIndexChange}
            />
          )
        }
      />
    </div>
  );
}
