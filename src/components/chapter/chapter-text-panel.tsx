"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import {
  chapterParagraphChunk,
  chapterTitleMaskReveal,
  editorialEase,
  introHandoffParagraphMaskReveal,
} from "@/lib/motion/variants";
import {
  CHAPTER_PARAGRAPH_CHUNK_DURATION_S,
  CHAPTER_PARAGRAPH_CHUNK_STAGGER_S,
  CHAPTER_TITLE_DELAY_S,
  CHAPTER_TITLE_REVEAL_DURATION_S,
  chapterParagraphEnterDelayS,
} from "@/lib/motion/chapter-timing";
import {
  introHandoffParagraphTransition,
  introHandoffTitleTransition,
} from "@/lib/motion/page-intro";
import { withReducedMotion } from "@/lib/motion/transitions";
import { getParagraphChunks } from "@/lib/text/paragraph-chunks";

type ChapterTextPanelProps = {
  title: string;
  body: string;
  /** Art-directed segments; merged with `body` via `getParagraphChunks` when provided. */
  paragraphLines?: string[];
  dropCap?: boolean;
  className?: string;
  /**
   * Intro-only: staged opacity (0–4). Omit after intro so normal chapter motion runs on navigation.
   */
  introRevealStage?: number;
  /** After intro overlay unmounts — skip title/body entrance variants on first paint. */
  entranceComplete?: boolean;
};

/** Figma `text container`: 24px gap between chapter title and body */
export function ChapterTextPanel({
  title,
  body,
  paragraphLines,
  dropCap = false,
  className,
  introRevealStage,
  entranceComplete = false,
}: ChapterTextPanelProps) {
  const prefersReduced = useReducedMotion();

  const chunks = useMemo(
    () => getParagraphChunks(body, paragraphLines),
    [body, paragraphLines],
  );

  const titleTransition = withReducedMotion(prefersReduced, {
    duration: CHAPTER_TITLE_REVEAL_DURATION_S,
    delay: CHAPTER_TITLE_DELAY_S,
    ease: editorialEase,
  });

  const paragraphBaseDelay = chapterParagraphEnterDelayS();

  const introTitleTrans = introHandoffTitleTransition(prefersReduced);
  const introParagraphTrans = introHandoffParagraphTransition(prefersReduced);

  const inIntro =
    introRevealStage !== undefined && introRevealStage !== null;

  if (inIntro) {
    const stage = introRevealStage;
    const titleDone = stage >= 1;
    const paragraphDone = stage >= 2;

    return (
      <div className={cn("flex w-full min-w-0 flex-col gap-6", className)}>
        <motion.h2
          className="text-chapter-title text-foreground will-change-[clip-path,opacity,transform]"
          variants={chapterTitleMaskReveal}
          initial={prefersReduced ? false : "initial"}
          animate={titleDone ? "animate" : "initial"}
          transition={introTitleTrans}
        >
          {title}
        </motion.h2>
        <motion.div
          className={cn(
            "text-story-body text-foreground w-full min-w-0",
            dropCap && "story-decorative",
          )}
          variants={introHandoffParagraphMaskReveal}
          initial={prefersReduced ? false : "initial"}
          animate={paragraphDone ? "animate" : "initial"}
          transition={introParagraphTrans}
        >
          <p className="max-w-none text-pretty">
            {chunks.map((chunk, i) => (
              <span key={i} className="block">
                {chunk}
              </span>
            ))}
          </p>
        </motion.div>
      </div>
    );
  }

  const skipEntrance = entranceComplete || prefersReduced;

  return (
    <div className={cn("flex w-full min-w-0 flex-col gap-6", className)}>
      <motion.h2
        className="text-chapter-title text-foreground will-change-[clip-path,opacity]"
        variants={chapterTitleMaskReveal}
        initial={skipEntrance ? false : "initial"}
        animate="animate"
        transition={titleTransition}
      >
        {title}
      </motion.h2>
      <div
        className={cn(
          "text-story-body text-foreground w-full min-w-0",
          dropCap && "story-decorative",
        )}
      >
        <p className="max-w-none text-pretty">
          {chunks.map((chunk, i) => (
            <motion.span
              key={i}
              className="block will-change-[opacity,transform]"
              variants={chapterParagraphChunk}
              initial={skipEntrance ? false : "initial"}
              animate="animate"
              transition={withReducedMotion(prefersReduced, {
                duration: CHAPTER_PARAGRAPH_CHUNK_DURATION_S,
                delay:
                  paragraphBaseDelay + i * CHAPTER_PARAGRAPH_CHUNK_STAGGER_S,
                ease: editorialEase,
              })}
            >
              {chunk}
            </motion.span>
          ))}
        </p>
      </div>
    </div>
  );
}
