"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Chapter } from "@/types/chapter";

type ThumbnailRailProps = {
  chapters: Chapter[];
  activeIndex: number;
  onSelect: (index: number) => void;
  className?: string;
};

/**
 * Figma `image carousel` (scaled ~½): 65×46, gap 8px, full width; active = restrained dark edge.
 */
export function ThumbnailRail({
  chapters,
  activeIndex,
  onSelect,
  className,
}: ThumbnailRailProps) {
  return (
    <div
      className={cn(
        "flex w-full min-w-0 gap-2 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
      role="tablist"
      aria-label="Chapters"
    >
      {chapters.map((chapter, index) => {
        const isActive = index === activeIndex;
        const thumb = chapter.thumbnailSrc ?? chapter.imageSrc;
        return (
          <button
            key={chapter.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-current={isActive ? "true" : undefined}
            id={`chapter-tab-${chapter.id}`}
            onClick={() => onSelect(index)}
            className={cn(
              "relative box-border h-[46px] w-[65px] shrink-0 overflow-hidden bg-transparent",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fba809]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              isActive
                ? "shadow-[inset_0_0_0_1px_rgba(0,0,0,0.88)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.75)]"
                : "shadow-[inset_0_0_0_1px_transparent]",
            )}
          >
            <Image
              src={thumb}
              alt=""
              fill
              sizes="65px"
              className="object-cover"
            />
            <span className="sr-only">
              {chapter.title}
              {isActive ? ", current" : ""}
            </span>
          </button>
        );
      })}
    </div>
  );
}
