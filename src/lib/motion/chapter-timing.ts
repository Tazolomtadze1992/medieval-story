/**
 * Shared chapter motion timing. `CHAPTER_IMAGE_WIPE_DURATION_S` must stay in sync
 * with the wipe transition in `ChapterImageWipe`.
 */
export const CHAPTER_IMAGE_WIPE_DURATION_S = 1.62;

/** Title begins shortly after the chapter mounts (aligned with wipe start). */
export const CHAPTER_TITLE_DELAY_S = 0.04;

/** Horizontal mask + opacity for the chapter title. */
export const CHAPTER_TITLE_REVEAL_DURATION_S = 0.62;

/**
 * Time after the title reveal *starts* (post `CHAPTER_TITLE_DELAY_S`) before the first
 * paragraph chunk begins. Set ~half of `CHAPTER_TITLE_REVEAL_DURATION_S` so the body
 * begins around the middle of the title animation (overlapping, not post-title).
 */
export const CHAPTER_PARAGRAPH_AFTER_TITLE_START_S = 0.18;

/** Opacity-led chunk reveal duration (paragraph). */
export const CHAPTER_PARAGRAPH_CHUNK_DURATION_S = 0.28;

/** Delay between the start of each chunk’s reveal (stagger). */
export const CHAPTER_PARAGRAPH_CHUNK_STAGGER_S = 0.05;

/** Delay from chapter mount until the first paragraph chunk animation starts. */
export function chapterParagraphEnterDelayS(): number {
  return CHAPTER_TITLE_DELAY_S + CHAPTER_PARAGRAPH_AFTER_TITLE_START_S;
}
