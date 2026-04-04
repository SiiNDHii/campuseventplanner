"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem storageKey="cep-theme">
      {children}
      <Toaster
        position="top-center"
        richColors
        closeButton
        toastOptions={{
          classNames: {
            toast:
              "cep-glass !border-[var(--card-border)] !text-[var(--foreground)] !shadow-2xl !rounded-xl",
          },
        }}
      />
    </ThemeProvider>
  );
}
