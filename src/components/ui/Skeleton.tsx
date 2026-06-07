import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-2xl bg-neutral-200 dark:bg-neutral-800",
        className
      )}
    />
  );
}

export function PinCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white dark:bg-neutral-900 shadow-sm">
      <Skeleton className="w-full aspect-[3/4] rounded-none" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-8 w-20 rounded-full" />
          <Skeleton className="h-8 w-20 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function MasonryGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="break-inside-avoid">
          <PinCardSkeleton />
        </div>
      ))}
    </div>
  );
}
