import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  rounded?: "sm" | "md" | "lg" | "full";
}

const roundedClasses = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

export function Skeleton({ className, rounded = "md" }: SkeletonProps) {
  return (
    <div
      className={cn(
        "shimmer",
        roundedClasses[rounded],
        className
      )}
    />
  );
}

export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn("h-4", i === lines - 1 && "w-2/3")}
        />
      ))}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-5 space-y-3">
      <Skeleton className="h-32 w-full" rounded="lg" />
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="flex gap-2">
        <Skeleton className="h-8 w-20" rounded="lg" />
        <Skeleton className="h-8 w-20" rounded="lg" />
      </div>
    </div>
  );
}

export function SkeletonList({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl border border-neutral-200 p-4 flex items-center gap-4">
          <Skeleton className="h-10 w-10" rounded="full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          <Skeleton className="h-8 w-16" rounded="lg" />
        </div>
      ))}
    </div>
  );
}
