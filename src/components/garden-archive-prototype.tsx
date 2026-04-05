"use client";

import { useState } from "react";
import { ChapterViewer } from "@/components/chapter/chapter-viewer";
import { PageShell } from "@/components/layout/page-shell";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import type { Chapter } from "@/types/chapter";

type GardenArchivePrototypeProps = {
  chapters: Chapter[];
};

export function GardenArchivePrototype({ chapters }: GardenArchivePrototypeProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <PageShell
      topBar={
        <>
          <p className="text-site-title text-foreground">Garden Archive</p>
          <ThemeToggle />
        </>
      }
    >
      <ChapterViewer
        chapters={chapters}
        activeIndex={activeIndex}
        onIndexChange={setActiveIndex}
      />
    </PageShell>
  );
}
