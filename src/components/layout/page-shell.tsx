import { cn } from "@/lib/utils";

type PageShellProps = {
  children: React.ReactNode;
  topBar?: React.ReactNode;
  className?: string;
  frameClassName?: string;
};

/**
 * Viewport-height shell: 32px top, 16px sides and bottom, 32px gap header → body.
 * Body fills remaining height (`flex-1 min-h-0`) so main + rail compose within the viewport.
 */
export function PageShell({
  children,
  topBar,
  className,
  frameClassName,
}: PageShellProps) {
  return (
    <div
      className={cn(
        "flex h-dvh min-h-0 flex-col gap-8 bg-background px-4 pt-8 pb-4 text-foreground",
        className,
      )}
    >
      {topBar ? (
        <header className="flex shrink-0 items-center justify-between gap-6">
          {topBar}
        </header>
      ) : null}
      <div
        className={cn("flex min-h-0 flex-1 flex-col", frameClassName)}
      >
        {children}
      </div>
    </div>
  );
}
