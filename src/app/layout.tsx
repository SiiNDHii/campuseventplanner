import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { Nav } from "@/components/Nav";
import { AppProviders } from "@/components/providers/AppProviders";
import { PageTransition } from "@/components/layout/PageTransition";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Campus Event Planner",
  description: "Plan campus events, tasks, feedback, and learning insights.",
};

export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full antialiased">
        <AppProviders>
          <div className="cep-mesh relative flex min-h-full flex-col">
            <Nav />
            <main className="relative z-0 mx-auto w-full max-w-6xl flex-1 px-4 py-6 pb-[max(7rem,calc(env(safe-area-inset-bottom,0px)+5.75rem))] sm:px-6 sm:py-8 md:pb-10 lg:px-8">
              <PageTransition>{children}</PageTransition>
            </main>
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
