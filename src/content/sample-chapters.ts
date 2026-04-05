import type { Chapter } from "@/types/chapter";

/**
 * Sample chapters — edit this array to change copy, order, and imagery.
 * `thumbnailSrc` uses the same asset as `imageSrc` per chapter for local files.
 * Optional `paragraphLines` art-directs the staggered paragraph reveal (2–4 chunks).
 */
export const sampleChapters: Chapter[] = [
  {
    id: "arrival",
    chapterNumber: 1,
    title: "The Walled Garden",
    body: "Morning finds the gate unlocked. Moss holds the silence between stones, and the path bends toward a fountain that has forgotten its own name. You are here to read the garden as others read a book: slowly, and with attention paid to margins.",
    paragraphLines: [
      "Morning finds the gate unlocked. Moss holds the silence between stones, and the path bends toward a fountain that has forgotten its own name.",
      "You are here to read the garden as others read a book: slowly, and with attention paid to margins.",
    ],
    imageSrc: "/images/chapter-1.jpeg",
    imageAlt: "Garden Archive chapter 1 — The Walled Garden",
    thumbnailSrc: "/images/chapter-1.jpeg",
    themeAccent: "oklch(0.58 0.09 155)",
  },
  {
    id: "herbarium",
    chapterNumber: 2,
    title: "Leaves Like Marginalia",
    body: "Each leaf is a note in the margin of the season. The archive remembers what the weather erases: a curl at the edge, a vein like ink, the moment a stem chose direction. Nothing here insists; it offers.",
    paragraphLines: [
      "Each leaf is a note in the margin of the season. The archive remembers what the weather erases: a curl at the edge, a vein like ink, the moment a stem chose direction.",
      "Nothing here insists; it offers.",
    ],
    imageSrc: "/images/chapter-2.jpeg",
    imageAlt: "Garden Archive chapter 2 — Leaves Like Marginalia",
    thumbnailSrc: "/images/chapter-2.jpeg",
  },
  {
    id: "evening",
    chapterNumber: 3,
    title: "The Quiet After",
    body: "The light lowers and the borders soften. What remains is not an ending but a place held open: a chapter that can be walked again tomorrow, same path, different weather, new sentences forming underfoot.",
    paragraphLines: [
      "The light lowers and the borders soften.",
      "What remains is not an ending but a place held open: a chapter that can be walked again tomorrow, same path, different weather, new sentences forming underfoot.",
    ],
    imageSrc: "/images/chapter-3.jpeg",
    imageAlt: "Garden Archive chapter 3 — The Quiet After",
    thumbnailSrc: "/images/chapter-3.jpeg",
  },
  {
    id: "threshold",
    chapterNumber: 4,
    title: "At the Threshold",
    body: "Every gate asks a question. You answer with your footsteps: not permission, but presence. Beyond the lintel the air changes—cooler, older—and the archive breathes as if it had been waiting.",
    paragraphLines: [
      "Every gate asks a question. You answer with your footsteps: not permission, but presence.",
      "Beyond the lintel the air changes—cooler, older—and the archive breathes as if it had been waiting.",
    ],
    imageSrc: "/images/chapter-4.jpeg",
    imageAlt: "Garden Archive chapter 4 — At the Threshold",
    thumbnailSrc: "/images/chapter-4.jpeg",
  },
  {
    id: "statuary",
    chapterNumber: 5,
    title: "Figures in the Grass",
    body: "Stone keeps what flesh forgets. The figures do not watch; they remember. Around them the grass rehearses the same green sentence, season after season, a quiet chorus.",
    paragraphLines: [
      "Stone keeps what flesh forgets. The figures do not watch; they remember.",
      "Around them the grass rehearses the same green sentence, season after season, a quiet chorus.",
    ],
    imageSrc: "/images/chapter-5.jpeg",
    imageAlt: "Garden Archive chapter 5 — Figures in the Grass",
    thumbnailSrc: "/images/chapter-5.jpeg",
  },
  {
    id: "water",
    chapterNumber: 6,
    title: "The Basin’s Edge",
    body: "Water holds the sky twice: once above, once below, slightly trembling. You lean and the garden leans back, not as flattery but as fact. The surface is a page you cannot turn without breaking it.",
    paragraphLines: [
      "Water holds the sky twice: once above, once below, slightly trembling.",
      "You lean and the garden leans back, not as flattery but as fact.",
      "The surface is a page you cannot turn without breaking it.",
    ],
    imageSrc: "/images/chapter-6.jpeg",
    imageAlt: "Garden Archive chapter 6 — The Basin’s Edge",
    thumbnailSrc: "/images/chapter-6.jpeg",
  },
  {
    id: "canopy",
    chapterNumber: 7,
    title: "Under the High Trees",
    body: "Cypress, yew, whatever lifts the roof—here the light arrives in coins. You walk through small fortunes of shade and spend them slowly, one step at a time.",
    paragraphLines: [
      "Cypress, yew, whatever lifts the roof—here the light arrives in coins.",
      "You walk through small fortunes of shade and spend them slowly, one step at a time.",
    ],
    imageSrc: "/images/chapter-7.jpeg",
    imageAlt: "Garden Archive chapter 7 — Under the High Trees",
    thumbnailSrc: "/images/chapter-7.jpeg",
  },
  {
    id: "return",
    chapterNumber: 8,
    title: "The Path Home",
    body: "To leave is not to finish. The archive keeps your name in its margin, penciled light, and the garden will read you back whenever you return—same gate, different weather, the story still open.",
    paragraphLines: [
      "To leave is not to finish.",
      "The archive keeps your name in its margin, penciled light, and the garden will read you back whenever you return—same gate, different weather, the story still open.",
    ],
    imageSrc: "/images/chapter-8.jpeg",
    imageAlt: "Garden Archive chapter 8 — The Path Home",
    thumbnailSrc: "/images/chapter-8.jpeg",
  },
  {
    id: "garden-study",
    chapterNumber: 9,
    title: "Garden (study)",
    body: "Temporary study slide. Paths, beds, and a held breath — placeholder copy until this chapter is written.",
    paragraphLines: [
      "Temporary study slide. Paths, beds, and a held breath — placeholder copy until this chapter is written.",
    ],
    imageSrc: "/images/garden.png",
    imageAlt: "Garden Archive — garden study",
    thumbnailSrc: "/images/garden.png",
  },
  {
    id: "beauty-study",
    chapterNumber: 10,
    title: "Beauty (study)",
    body: "Temporary study slide. Light on a still surface — placeholder copy until this chapter is written.",
    paragraphLines: [
      "Temporary study slide. Light on a still surface — placeholder copy until this chapter is written.",
    ],
    imageSrc: "/images/beauty.png",
    imageAlt: "Garden Archive — beauty study",
    thumbnailSrc: "/images/beauty.png",
  },
  {
    id: "statue-study",
    chapterNumber: 11,
    title: "Statue (study)",
    body: "Temporary study slide. Stone and weather — placeholder copy until this chapter is written.",
    paragraphLines: [
      "Temporary study slide. Stone and weather — placeholder copy until this chapter is written.",
    ],
    imageSrc: "/images/statue.png",
    imageAlt: "Garden Archive — statue study",
    thumbnailSrc: "/images/statue.png",
  },
];
