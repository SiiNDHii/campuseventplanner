"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  if (resolvedTheme === undefined) {
    return (
      <div
        className="h-10 w-10 shrink-0 animate-pulse rounded-xl border border-[var(--card-border)] bg-[var(--muted)]/30 sm:h-9 sm:w-9"
        aria-hidden
      />
    );
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="h-10 w-10 shrink-0 rounded-xl border border-[var(--card-border)] p-0 transition-all duration-200 active:scale-95 [@media(hover:hover)]:hover:border-violet-500/25 [@media(hover:hover)]:hover:bg-[var(--muted)]/80 sm:h-9 sm:w-9"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun className="h-4 w-4 text-amber-300" /> : <Moon className="h-4 w-4 text-violet-600" />}
    </Button>
  );
}
