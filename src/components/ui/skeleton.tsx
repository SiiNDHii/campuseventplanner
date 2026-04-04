import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-xl bg-gradient-to-r from-[var(--muted)] via-[var(--card-border)] to-[var(--muted)] bg-[length:200%_100%] dark:from-slate-800 dark:via-slate-700/80 dark:to-slate-800",
        className
      )}
    />
  );
}
