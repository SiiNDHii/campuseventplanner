import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type SpinnerProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
};

const sizeClass = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};

export function Spinner({ className, size = "md" }: SpinnerProps) {
  return (
    <Loader2 className={cn("shrink-0 animate-spin text-current", sizeClass[size], className)} aria-hidden />
  );
}
