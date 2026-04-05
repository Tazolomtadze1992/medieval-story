"use client";

import { useState } from "react";
import { ChapterViewer } from "@/components/chapter/chapter-viewer";
import { PageShell } from "@/components/layout/page-shell";
import type { Chapter } from "@/types/chapter";

type GardenArchivePrototypeProps = {
  chapters: Chapter[];
};

export function GardenArchivePrototype({ chapters }: GardenArchivePrototypeProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <PageShell>
      <ChapterViewer
        chapters={chapters}
        activeIndex={activeIndex}
        onIndexChange={setActiveIndex}
      />
    </PageShell>
  );
}
