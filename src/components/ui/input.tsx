import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "flex min-h-11 w-full rounded-xl border border-[var(--card-border)] bg-[var(--muted)]/40 px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] transition-all duration-200 sm:min-h-0 sm:py-2.5",
        "hover:border-[var(--muted-foreground)]/20 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/25",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

export const Textarea = forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[100px] w-full rounded-xl border border-[var(--card-border)] bg-[var(--muted)]/40 px-4 py-3 text-base text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] transition-all duration-200 sm:text-sm",
        "hover:border-[var(--muted-foreground)]/20 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/25",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

export const Select = forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "flex min-h-11 w-full rounded-xl border border-[var(--card-border)] bg-[var(--muted)]/40 px-4 py-3 text-sm text-[var(--foreground)] transition-all duration-200 sm:min-h-0 sm:py-2.5",
        "hover:border-[var(--muted-foreground)]/20 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/25",
        className
      )}
      {...props}
    />
  )
);
Select.displayName = "Select";
