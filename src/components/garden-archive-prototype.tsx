"use client";

import { useState } from "react";
import { ChapterViewer } from "@/components/chapter/chapter-viewer";
import { GardenArchiveIntroOverlay } from "@/components/intro/garden-archive-intro-overlay";
import { PageShell } from "@/components/layout/page-shell";
import type { Chapter } from "@/types/chapter";

type GardenArchivePrototypeProps = {
  chapters: Chapter[];
};

export function GardenArchivePrototype({ chapters }: GardenArchivePrototypeProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <GardenArchiveIntroOverlay />
      <PageShell>
        <ChapterViewer
          chapters={chapters}
          activeIndex={activeIndex}
          onIndexChange={setActiveIndex}
        />
      </PageShell>
    </>
  );
}
