import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
  hover = false,
}: {
  className?: string;
  children: React.ReactNode;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        "cep-glass rounded-2xl p-5 shadow-lg shadow-black/[0.06] sm:p-6 dark:shadow-black/45",
        hover &&
          "duration-300 ease-out motion-reduce:hover:translate-y-0 [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:border-violet-500/25 [@media(hover:hover)]:hover:shadow-xl [@media(hover:hover)]:hover:shadow-violet-500/12 dark:[@media(hover:hover)]:hover:shadow-violet-500/20",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mb-4", className)}>{children}</div>;
}

export function CardTitle({ className, children }: { className?: string; children: React.ReactNode }) {
  return <h3 className={cn("text-lg font-semibold tracking-tight text-[var(--foreground)]", className)}>{children}</h3>;
}

export function CardDescription({ className, children }: { className?: string; children: React.ReactNode }) {
  return <p className={cn("text-sm text-[var(--muted-foreground)]", className)}>{children}</p>;
}
