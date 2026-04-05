/**
 * Editorial chapter / slide for the Garden Archive viewer.
 * Reorder the exported array in content files to change sequence.
 */
export type Chapter = {
  id: string;
  title: string;
  body: string;
  /**
   * Optional art-directed paragraph segments for staggered reveal (2–4 short strings).
   * If omitted, `getParagraphChunks` derives chunks from `body`.
   */
  paragraphLines?: string[];
  imageSrc: string;
  imageAlt: string;
  thumbnailSrc?: string;
  chapterNumber?: number;
  /** Optional CSS color (e.g. oklch(...) or var(--accent)) for subtle per-chapter accents */
  themeAccent?: string;
};
