import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/**
 * Rectangular prev/next chapter control: larger hit area than the 32×32 circular inset control,
 * same border + inset shadow language as InsetCircleButton for cohesion.
 */
const shell = [
  "relative inline-flex h-10 w-10 shrink-0 items-center justify-center bg-black p-2.5",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#000000] focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  "disabled:pointer-events-none disabled:opacity-40",
  "",
] as const;

const variantText = {
  accent: "text-white",
} as const;

export type ChapterNavButtonProps = ComponentProps<"button"> & {
  variant?: keyof typeof variantText;
};

export function ChapterNavButton({
  className,
  variant = "accent",
  type = "button",
  ...props
}: ChapterNavButtonProps) {
  return (
    <button
      type={type}
      className={cn(shell, variantText[variant], className)}
      {...props}
    />
  );
}
