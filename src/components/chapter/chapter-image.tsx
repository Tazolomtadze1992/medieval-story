import Image from "next/image";
import { cn } from "@/lib/utils";

type ChapterImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  accentColor?: string;
};

/**
 * Figma hero `img`: 869×655 — parent supplies height on large breakpoints.
 */
export function ChapterImage({
  src,
  alt,
  priority,
  className,
  accentColor,
}: ChapterImageProps) {
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden bg-surface",
        !accentColor && "border-0",
        accentColor && "border border-frame",
        className,
      )}
      style={accentColor ? { borderColor: accentColor } : undefined}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 55vw, 100vw"
        className="object-cover"
      />
    </div>
  );
}
