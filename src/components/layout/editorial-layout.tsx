import { cn } from "@/lib/utils";

/** Figma `image carousel` band height: 46px thumbs + `pb-0.5` (½ of former `pb-1`) */
const THUMB_RAIL_SLOT_CLASS = "h-[48px] min-h-[48px]";

type EditorialLayoutProps = {
  textPanel: React.ReactNode;
  imagePanel: React.ReactNode;
  bottomRail?: React.ReactNode;
  topBar?: React.ReactNode;
  className?: string;
};

/**
 * Vertical stack: flexible main row (`flex-1`) + fixed-height thumbnail slot.
 * Main row: `lg+` two-column grid, columns `419fr` and `869fr`, gap `48px` (`gap-12`).
 */
export function EditorialLayout({
  textPanel,
  imagePanel,
  bottomRail,
  topBar,
  className,
}: EditorialLayoutProps) {
  return (
    <div className={cn("flex min-h-0 flex-1 flex-col gap-8", className)}>
      {topBar ? <div className="shrink-0">{topBar}</div> : null}

      <div
        className={cn(
          "grid min-h-0 flex-1 grid-cols-1 gap-12",
          "lg:grid-cols-[minmax(0,419fr)_minmax(0,869fr)] lg:items-stretch lg:gap-12",
        )}
      >
        <div className="order-2 flex min-h-0 w-full min-w-0 flex-col lg:order-1 lg:h-full lg:min-h-0">
          {textPanel}
        </div>
        <div className="order-1 min-h-[200px] w-full min-w-0 lg:order-2 lg:min-h-0 lg:h-full">
          {imagePanel}
        </div>
      </div>

      {bottomRail ? (
        <div
          className={cn(
            "flex shrink-0 flex-col justify-center",
            THUMB_RAIL_SLOT_CLASS,
          )}
        >
          {bottomRail}
        </div>
      ) : null}
    </div>
  );
}
