import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  /** Shows spinner and disables the button while true. */
  loading?: boolean;
};

const spinnerSizeForButton = { sm: "sm" as const, md: "md" as const, lg: "lg" as const };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      type = "button",
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const base =
      "inline-flex items-center justify-center gap-2 font-medium rounded-xl touch-manipulation transition-all duration-200 ease-out active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:pointer-events-none disabled:opacity-50 disabled:active:scale-100 motion-reduce:transition-none motion-reduce:active:scale-100";

    const sizes = {
      sm: "text-xs px-3 py-1.5",
      md: "text-sm px-4 py-2.5",
      lg: "text-base px-6 py-3",
    };

    const variants = {
      primary: "cep-btn-primary text-white",
      secondary:
        "border border-[var(--card-border)] bg-[var(--muted)]/50 text-[var(--foreground)] shadow-sm hover:border-violet-500/20 hover:bg-[var(--muted)] hover:shadow-md hover:shadow-violet-500/5 dark:hover:shadow-black/30",
      ghost:
        "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]/60 active:bg-[var(--muted)]/80",
      danger:
        "bg-red-600 text-white shadow-lg shadow-red-500/20 hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/35",
    };

    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type}
        className={cn(base, sizes[size], variants[variant], className)}
        disabled={isDisabled}
        aria-busy={loading}
        {...props}
      >
        {loading && <Spinner size={spinnerSizeForButton[size]} />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
