const MAX_CHUNKS = 4;

/**
 * Resolves paragraph copy into 1–4 sequential animation chunks.
 * Prefer explicit `paragraphLines` from chapter content; otherwise splits `body` heuristically.
 */
export function getParagraphChunks(
  body: string,
  explicit?: string[] | undefined,
): string[] {
  const trimmed = explicit
    ?.map((s) => s.trim())
    .filter((s) => s.length > 0);
  if (trimmed?.length) {
    return trimmed.slice(0, MAX_CHUNKS);
  }
  return defaultChunksFromBody(body.trim());
}

function defaultChunksFromBody(text: string): string[] {
  if (!text) {
    return [""];
  }

  if (/\n/.test(text)) {
    const byNewline = text
      .split(/\n+/)
      .map((s) => s.trim())
      .filter(Boolean);
    if (byNewline.length) {
      return byNewline.slice(0, MAX_CHUNKS);
    }
  }

  const sentences = splitSentences(text);
  return groupSentences(sentences, MAX_CHUNKS);
}

function splitSentences(text: string): string[] {
  const parts = text.split(/(?<=[.!?])\s+/).filter(Boolean);
  return parts.length ? parts : [text];
}

/** Merge long sentence lists into at most `maxChunks` strings. */
function groupSentences(sentences: string[], maxChunks: number): string[] {
  if (sentences.length === 0) {
    return [""];
  }

  if (sentences.length === 1) {
    const one = sentences[0];
    const bySemi = one
      .split(/;\s+/)
      .map((s) => s.trim())
      .filter(Boolean);
    if (bySemi.length >= 2) {
      return bySemi.slice(0, maxChunks);
    }
    return [one];
  }

  if (sentences.length <= maxChunks) {
    return sentences;
  }

  const out: string[] = [];
  const n = sentences.length;
  const per = Math.ceil(n / maxChunks);
  for (let i = 0; i < n; i += per) {
    out.push(sentences.slice(i, i + per).join(" "));
  }
  return out.slice(0, maxChunks);
}
