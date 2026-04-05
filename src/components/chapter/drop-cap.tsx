import { cn } from "@/lib/utils";

type DropCapProps = {
  children: React.ReactNode;
  /** When false, renders children without decorative first-letter styling */
  enabled?: boolean;
  className?: string;
};

/**
 * Wraps story body blocks; enables `.story-decorative` drop cap via CSS in globals.css.
 */
export function DropCap({ children, enabled = true, className }: DropCapProps) {
  if (!enabled) {
    return <>{children}</>;
  }
  return <div className={cn("story-decorative", className)}>{children}</div>;
}
