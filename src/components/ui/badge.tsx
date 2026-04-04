import { cn } from "@/lib/utils";

export function Badge({
  className,
  children,
  variant = "default",
}: {
  className?: string;
  children: React.ReactNode;
  variant?: "default" | "accent" | "outline" | "success" | "warning";
}) {
  const styles = {
    default: "bg-[var(--muted)] text-[var(--muted-foreground)] border border-[var(--card-border)]",
    accent: "bg-violet-500/15 text-violet-300 border border-violet-500/30",
    outline: "border border-[var(--card-border)] text-[var(--muted-foreground)]",
    success: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25",
    warning: "bg-amber-500/15 text-amber-400 border border-amber-500/25",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-lg px-2.5 py-0.5 text-xs font-medium transition-colors duration-200",
        styles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
