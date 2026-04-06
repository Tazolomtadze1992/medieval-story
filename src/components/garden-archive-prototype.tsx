"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ChapterViewer } from "@/components/chapter/chapter-viewer";
import { GardenArchiveIntroOverlay } from "@/components/intro/garden-archive-intro-overlay";
import { PageShell } from "@/components/layout/page-shell";
import { INTRO_CONTENT_REVEAL } from "@/lib/motion/page-intro";
import type { Chapter } from "@/types/chapter";

type GardenArchivePrototypeProps = {
  chapters: Chapter[];
};

export function GardenArchivePrototype({ chapters }: GardenArchivePrototypeProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [introDismissed, setIntroDismissed] = useState(false);
  /** Only true after the white panel finishes expanding — then staged content may sit above z-201. */
  const [pageContentAboveIntro, setPageContentAboveIntro] = useState(false);
  const [revealStage, setRevealStage] = useState(0);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const prefersReduced = useReducedMotion();

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const scheduleContentReveal = useCallback(() => {
    setPageContentAboveIntro(true);
    clearTimers();
    const r = INTRO_CONTENT_REVEAL;

    if (prefersReduced) {
      setRevealStage(4);
      timersRef.current.push(
        setTimeout(() => {
          setIntroDismissed(true);
        }, r.dismissAfterBottomReducedS * 1000),
      );
      return;
    }

    let acc = r.titleDelayS * 1000;
    timersRef.current.push(
      setTimeout(() => setRevealStage(1), acc),
    );
    acc += r.paragraphAfterTitleS * 1000;
    timersRef.current.push(
      setTimeout(() => setRevealStage(2), acc),
    );
    acc += r.imageAfterParagraphS * 1000;
    timersRef.current.push(
      setTimeout(() => setRevealStage(3), acc),
    );
    acc += r.bottomAfterImageS * 1000;
    timersRef.current.push(
      setTimeout(() => setRevealStage(4), acc),
    );
    acc += r.dismissAfterBottomS * 1000;
    timersRef.current.push(
      setTimeout(() => setIntroDismissed(true), acc),
    );
  }, [clearTimers, prefersReduced]);

  return (
    <>
      {!introDismissed ? (
        <GardenArchiveIntroOverlay onWhitePanelFull={scheduleContentReveal} />
      ) : null}
      <PageShell
        className={
          pageContentAboveIntro && !introDismissed
            ? "relative z-[202]"
            : undefined
        }
      >
        <ChapterViewer
          chapters={chapters}
          activeIndex={activeIndex}
          onIndexChange={setActiveIndex}
          introRevealStage={introDismissed ? undefined : revealStage}
          entranceComplete={introDismissed}
        />
      </PageShell>
    </>
  );
}
