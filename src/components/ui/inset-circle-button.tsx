import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/**
 * Figma circular controls (theme + chapter arrows): 32×32, #eee border, inset highlight.
 */
const insetShell = [
  "relative inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-[#eee] bg-white p-2",
  "shadow-[inset_-2px_-1px_2px_0px_rgba(0,0,0,0.1),inset_1px_1px_1.8px_0px_rgba(0,0,0,0.19)]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fba809]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  "disabled:pointer-events-none disabled:opacity-40",
  "dark:border-neutral-600 dark:bg-neutral-950",
] as const;

const variantText = {
  /** Chapter arrows — Figma glyph color */
  accent: "text-[#fba809]",
  /** Theme moon/sun — Figma uses dark icon on light */
  neutral: "text-foreground",
} as const;

export type InsetCircleButtonProps = ComponentProps<"button"> & {
  variant?: keyof typeof variantText;
};

export function InsetCircleButton({
  className,
  variant = "accent",
  type = "button",
  ...props
}: InsetCircleButtonProps) {
  return (
    <button
      type={type}
      className={cn(insetShell, variantText[variant], className)}
      {...props}
    />
  );
}
