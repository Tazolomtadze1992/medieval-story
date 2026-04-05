import { cn } from "@/lib/utils";

/** Figma `image carousel` band height: 46px thumbs + `pb-0.5` (½ of former `pb-1`) */
const THUMB_RAIL_SLOT_CLASS = "h-[48px] min-h-[48px]";

type EditorialLayoutProps = {
  textPanel: React.ReactNode;
  imagePanel: React.ReactNode;
  /** Bottom band aligned to the global 12-column grid (counter, nav, site label). */
  leftColumnFooter?: React.ReactNode;
  bottomRail?: React.ReactNode;
  topBar?: React.ReactNode;
  className?: string;
};

/**
 * Optional top bar, then a 12-column grid:
 * - Row 1 (`lg+`): text `col-span-4`, main image `col-span-8`, gutter `32px` (`gap-8`).
 * - Row 2 (`lg+`): shared bottom band — left footer `col-span-4` + thumbnail rail `col-span-8` (same row).
 * Horizontal page inset comes from `PageShell` (`px-4`).
 */
export function EditorialLayout({
  textPanel,
  imagePanel,
  leftColumnFooter,
  bottomRail,
  topBar,
  className,
}: EditorialLayoutProps) {
  return (
    <div className={cn("flex min-h-0 flex-1 flex-col gap-8", className)}>
      {topBar ? <div className="shrink-0">{topBar}</div> : null}

      <div
        className={cn(
          "grid min-h-0 flex-1 grid-cols-1 gap-12 max-lg:grid-rows-[auto_minmax(0,1fr)_auto_auto]",
          "lg:grid-cols-12 lg:grid-rows-[minmax(0,1fr)_auto] lg:items-stretch lg:gap-8",
        )}
      >
        <div className="order-2 flex min-h-0 w-full min-w-0 flex-col lg:order-1 lg:col-span-4 lg:row-start-1 lg:h-full lg:min-h-0">
          {textPanel}
        </div>
        <div
          className={cn(
            "order-1 min-h-[200px] w-full min-w-0",
            "lg:order-2 lg:col-span-8 lg:col-start-5 lg:row-start-1 lg:min-h-0 lg:h-full",
          )}
        >
          <div className="h-full min-h-0 w-full min-w-0">{imagePanel}</div>
        </div>
        {leftColumnFooter ? (
          <div className="order-3 min-w-0 shrink-0 lg:order-3 lg:col-span-4 lg:col-start-1 lg:row-start-2">
            {leftColumnFooter}
          </div>
        ) : null}
        {bottomRail ? (
          <div
            className={cn(
              "order-4 min-w-0 shrink-0 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
              "lg:order-4 lg:col-span-8 lg:col-start-5 lg:row-start-2",
              THUMB_RAIL_SLOT_CLASS,
            )}
          >
            <div className="ml-auto w-max min-w-0 max-w-full">{bottomRail}</div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
