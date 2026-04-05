import { cn } from "@/lib/utils";

type ChapterCounterProps = {
  current: number;
  total: number;
  className?: string;
};

export function ChapterCounter({ current, total, className }: ChapterCounterProps) {
  return (
    <p
      className={cn("text-chapter-meta tabular-nums", className)}
      aria-live="polite"
      aria-atomic="true"
    >
      {String(current).padStart(2, "0")}/{String(total).padStart(2, "0")}
    </p>
  );
}
