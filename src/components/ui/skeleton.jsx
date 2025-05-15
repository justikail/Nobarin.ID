import { cn } from "@/lib/utils";

export function Skeleton({ className, shimmer = true }) {
  return (
    <div className={cn("relative rounded bg-zinc-800 animate-pulse", className)}>
      {shimmer && <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-zinc-700/20 to-transparent" />}
    </div>
  );
}

export function HomeCardSkeleton() {
  return (
    <div className="relative flex-shrink-0">
      <div className="space-y-2">
        <Skeleton className="relative h-[200px] w-[140px] md:h-[250px] md:w-[180px] overflow-hidden rounded" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}

export function HomeTopRatedSkeleton() {
  return (
    <div className="flex gap-3 rounded-lg p-2">
      <div className="relative">
        <Skeleton className="h-16 w-12 flex-shrink-0 rounded" />
        <Skeleton className="absolute -left-2 -top-1 z-10 h-6 w-6 rounded-full" shimmer={false} />
      </div>

      <div className="flex flex-1 flex-col justify-center">
        <Skeleton className="h-3.5 w-3/4 rounded" />

        <div className="mt-2 flex items-center gap-3">
          <Skeleton className="h-2.5 w-8 rounded" />
          <Skeleton className="h-2.5 w-1 rounded-full" shimmer={false} />
          <div className="flex items-center gap-1">
            <Skeleton className="h-2.5 w-2.5 rounded" />
            <Skeleton className="h-2.5 w-6 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
