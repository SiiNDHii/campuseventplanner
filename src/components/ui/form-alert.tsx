import { AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type FormAlertProps = {
  variant: "error" | "success";
  children: React.ReactNode;
  className?: string;
};

export function FormAlert({ variant, children, className }: FormAlertProps) {
  const isError = variant === "error";

  return (
    <div
      role={isError ? "alert" : "status"}
      aria-live={isError ? "assertive" : "polite"}
      className={cn(
        "flex gap-3 rounded-xl border px-4 py-3 text-sm leading-relaxed",
        isError
          ? "border-red-500/35 bg-red-500/10 text-red-200 dark:text-red-300/95"
          : "border-emerald-500/35 bg-emerald-500/10 text-emerald-200 dark:text-emerald-300/95",
        className
      )}
    >
      {isError ? (
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" aria-hidden />
      ) : (
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden />
      )}
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
