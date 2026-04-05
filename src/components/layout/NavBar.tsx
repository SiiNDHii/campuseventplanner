"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Bell,
  CalendarDays,
  ChevronDown,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Sparkles,
  User,
  Settings,
  Mail,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { FormSubmitButton } from "@/components/ui/form-submit-button";

export type NavUser = {
  id: string;
  email: string;
  name: string | null;
  role: string;
};

type NavBarProps = {
  user: NavUser | null;
  isOrganizer: boolean;
  unreadNotifications: number;
};

const navLinkClass = (active: boolean) =>
  cn(
    "relative isolate rounded-xl px-3 py-2 text-sm font-medium transition-colors duration-200",
    active
      ? "text-[var(--foreground)]"
      : "text-[var(--muted-foreground)] [@media(hover:hover)]:hover:text-[var(--foreground)]"
  );

export function NavBar({ user, isOrganizer, unreadNotifications }: NavBarProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function close(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    }
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const links: { href: string; label: string; icon: React.ReactNode; organizerOnly?: boolean; badge?: boolean }[] = [
    { href: "/events", label: "Events", icon: <CalendarDays className="h-4 w-4" /> },
    { href: "/dashboard", label: "My Dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
    { href: "/organizer/events", label: "Organize", icon: <Sparkles className="h-4 w-4" />, organizerOnly: true },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--card-border)] bg-[var(--background)]/80 shadow-sm shadow-black/[0.03] backdrop-blur-xl backdrop-saturate-150 dark:shadow-black/20">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 pt-[env(safe-area-inset-top,0px)] sm:h-16 sm:gap-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex min-h-11 min-w-11 items-center gap-2.5 shrink-0 rounded-xl pr-1 transition-transform active:scale-[0.98] sm:min-h-0 sm:min-w-0 [@media(hover:hover)]:hover:opacity-95">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg shadow-purple-500/30 transition-transform duration-300 [@media(hover:hover)]:group-hover:scale-105 [@media(hover:hover)]:group-hover:shadow-purple-500/40">
            <GraduationCap className="h-5 w-5 text-white" />
          </span>
          <span className="hidden font-semibold tracking-tight text-[var(--foreground)] sm:block">
            Campus<span className="text-violet-400">Events</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links
            .filter((l) => !l.organizerOnly || isOrganizer)
            .map((l) => {
              const active = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href));
              return (
                <Link key={l.href} href={l.href} className={navLinkClass(active)}>
                  <span className="flex items-center gap-2">
                    {l.icon}
                    {l.label}
                  </span>
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-lg bg-[var(--muted)]/80"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />

          {user ? (
            <>
              <Link
                href="/notifications"
                className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--card-border)] text-[var(--muted-foreground)] transition-all duration-200 active:scale-95 [@media(hover:hover)]:hover:border-violet-500/25 [@media(hover:hover)]:hover:bg-[var(--muted)]/70 [@media(hover:hover)]:hover:text-[var(--foreground)] sm:h-9 sm:w-9"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4" />
                {unreadNotifications > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-1 text-[10px] font-bold text-white shadow-md">
                    {unreadNotifications > 9 ? "9+" : unreadNotifications}
                  </span>
                )}
              </Link>

              <div className="relative" ref={menuRef}>
                <button
                  type="button"
                  onClick={() => setMenuOpen((o) => !o)}
                  className="flex min-h-10 items-center gap-2 rounded-xl border border-[var(--card-border)] bg-[var(--muted)]/40 py-1.5 pl-2 pr-2.5 text-sm transition-all duration-200 active:scale-[0.98] [@media(hover:hover)]:hover:border-violet-500/20 [@media(hover:hover)]:hover:bg-[var(--muted)]/75 sm:min-h-0"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/30 to-pink-500/30">
                    <User className="h-3.5 w-3.5 text-violet-300" />
                  </span>
                  <span className="hidden max-w-[120px] truncate text-[var(--foreground)] sm:block">
                    {user.name ?? user.email.split("@")[0]}
                  </span>
                  <ChevronDown className={cn("h-4 w-4 text-[var(--muted-foreground)] transition", menuOpen && "rotate-180")} />
                </button>

                <AnimatePresence>
                  {menuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 z-50 mt-2 w-[min(100vw-2rem,14rem)] origin-top-right rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-1.5 shadow-2xl shadow-black/15 backdrop-blur-xl dark:shadow-black/40"
                    >
                      <div className="border-b border-[var(--card-border)] px-3 py-2">
                        <p className="truncate text-sm font-medium text-[var(--foreground)]">{user.name ?? "Account"}</p>
                        <p className="truncate text-xs text-[var(--muted-foreground)]">{user.email}</p>
                        <p className="mt-1 text-[10px] uppercase tracking-wider text-violet-400">{user.role}</p>
                      </div>
                      <Link
                        href="/my-events"
                        className="flex min-h-10 items-center gap-2 rounded-lg px-3 py-2 text-sm text-[var(--muted-foreground)] transition-colors active:bg-[var(--muted)]/50 [@media(hover:hover)]:hover:bg-[var(--muted)]/60 [@media(hover:hover)]:hover:text-[var(--foreground)]"
                        onClick={() => setMenuOpen(false)}
                      >
                        <CalendarDays className="h-4 w-4" /> My Events
                      </Link>
                      <Link
                        href="/profile"
                        className="flex min-h-10 items-center gap-2 rounded-lg px-3 py-2 text-sm text-[var(--muted-foreground)] transition-colors active:bg-[var(--muted)]/50 [@media(hover:hover)]:hover:bg-[var(--muted)]/60 [@media(hover:hover)]:hover:text-[var(--foreground)]"
                        onClick={() => setMenuOpen(false)}
                      >
                        <User className="h-4 w-4" /> My Profile
                      </Link>
                      <Link
                        href="/settings"
                        className="flex min-h-10 items-center gap-2 rounded-lg px-3 py-2 text-sm text-[var(--muted-foreground)] transition-colors active:bg-[var(--muted)]/50 [@media(hover:hover)]:hover:bg-[var(--muted)]/60 [@media(hover:hover)]:hover:text-[var(--foreground)]"
                        onClick={() => setMenuOpen(false)}
                      >
                        <Settings className="h-4 w-4" /> Settings
                      </Link>
                      <Link
                        href="/support"
                        className="flex min-h-10 items-center gap-2 rounded-lg px-3 py-2 text-sm text-[var(--muted-foreground)] transition-colors active:bg-[var(--muted)]/50 [@media(hover:hover)]:hover:bg-[var(--muted)]/60 [@media(hover:hover)]:hover:text-[var(--foreground)]"
                        onClick={() => setMenuOpen(false)}
                      >
                        <Mail className="h-4 w-4" /> Support
                      </Link>
                      <Link
                        href="/dashboard"
                        className="flex min-h-10 items-center gap-2 rounded-lg px-3 py-2 text-sm text-[var(--muted-foreground)] transition-colors active:bg-[var(--muted)]/50 [@media(hover:hover)]:hover:bg-[var(--muted)]/60 [@media(hover:hover)]:hover:text-[var(--foreground)]"
                        onClick={() => setMenuOpen(false)}
                      >
                        <LayoutDashboard className="h-4 w-4" /> My Dashboard
                      </Link>
                      <Link
                        href="/events"
                        className="flex min-h-10 items-center gap-2 rounded-lg px-3 py-2 text-sm text-[var(--muted-foreground)] transition-colors active:bg-[var(--muted)]/50 md:hidden [@media(hover:hover)]:hover:bg-[var(--muted)]/60 [@media(hover:hover)]:hover:text-[var(--foreground)]"
                        onClick={() => setMenuOpen(false)}
                      >
                        <CalendarDays className="h-4 w-4" /> Browse Events
                      </Link>
                      <Link
                        href="/dashboard"
                        className="flex min-h-10 items-center gap-2 rounded-lg px-3 py-2 text-sm text-[var(--muted-foreground)] transition-colors active:bg-[var(--muted)]/50 md:hidden [@media(hover:hover)]:hover:bg-[var(--muted)]/60 [@media(hover:hover)]:hover:text-[var(--foreground)]"
                        onClick={() => setMenuOpen(false)}
                      >
                        <LayoutDashboard className="h-4 w-4" /> My Dashboard
                      </Link>
                      <Link
                        href="/profile"
                        className="flex min-h-10 items-center gap-2 rounded-lg px-3 py-2 text-sm text-[var(--muted-foreground)] transition-colors active:bg-[var(--muted)]/50 md:hidden [@media(hover:hover)]:hover:bg-[var(--muted)]/60 [@media(hover:hover)]:hover:text-[var(--foreground)]"
                        onClick={() => setMenuOpen(false)}
                      >
                        <User className="h-4 w-4" /> My Profile
                      </Link>
                      <Link
                        href="/settings"
                        className="flex min-h-10 items-center gap-2 rounded-lg px-3 py-2 text-sm text-[var(--muted-foreground)] transition-colors active:bg-[var(--muted)]/50 md:hidden [@media(hover:hover)]:hover:bg-[var(--muted)]/60 [@media(hover:hover)]:hover:text-[var(--foreground)]"
                        onClick={() => setMenuOpen(false)}
                      >
                        <Settings className="h-4 w-4" /> Settings
                      </Link>
                      <Link
                        href="/support"
                        className="flex min-h-10 items-center gap-2 rounded-lg px-3 py-2 text-sm text-[var(--muted-foreground)] transition-colors active:bg-[var(--muted)]/50 md:hidden [@media(hover:hover)]:hover:bg-[var(--muted)]/60 [@media(hover:hover)]:hover:text-[var(--foreground)]"
                        onClick={() => setMenuOpen(false)}
                      >
                        <Mail className="h-4 w-4" /> Support
                      </Link>
                      {isOrganizer && (
                        <>
                          <Link
                            href="/organizer/events"
                            className="flex min-h-10 items-center gap-2 rounded-lg px-3 py-2 text-sm text-[var(--muted-foreground)] transition-colors active:bg-[var(--muted)]/50 md:hidden [@media(hover:hover)]:hover:bg-[var(--muted)]/60 [@media(hover:hover)]:hover:text-[var(--foreground)]"
                            onClick={() => setMenuOpen(false)}
                          >
                            <LayoutDashboard className="h-4 w-4" /> Organize Events
                          </Link>
                          <Link
                            href="/organizer/learning"
                            className="flex min-h-10 items-center gap-2 rounded-lg px-3 py-2 text-sm text-[var(--muted-foreground)] transition-colors active:bg-[var(--muted)]/50 md:hidden [@media(hover:hover)]:hover:bg-[var(--muted)]/60 [@media(hover:hover)]:hover:text-[var(--foreground)]"
                            onClick={() => setMenuOpen(false)}
                          >
                            <Sparkles className="h-4 w-4" /> Insights
                          </Link>
                        </>
                      )}
                      <button
                        onClick={async () => {
                          setMenuOpen(false);
                          await signOut({ redirectUrl: "/" });
                        }}
                        className="flex min-h-10 w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-400 transition-colors active:bg-red-500/15 mt-1 [@media(hover:hover)]:hover:bg-red-500/10"
                      >
                        <LogOut className="h-4 w-4 shrink-0" /> Sign out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="hidden rounded-xl px-3 py-2 text-sm font-medium text-[var(--muted-foreground)] transition-colors [@media(hover:hover)]:hover:bg-[var(--muted)]/60 [@media(hover:hover)]:hover:text-[var(--foreground)] sm:inline-flex"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="cep-btn-primary inline-flex min-h-10 items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold text-white sm:min-h-0"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile bottom nav — fixed safe area + 44px+ touch targets */}
      <div className="cep-nav-pad fixed bottom-0 left-0 right-0 z-40 flex border-t border-[var(--card-border)] bg-[var(--background)]/92 px-1 pt-2 shadow-[0_-8px_32px_-12px_rgba(0,0,0,0.12)] backdrop-blur-lg dark:shadow-[0_-8px_32px_-12px_rgba(0,0,0,0.45)] md:hidden">
        <div className="mx-auto flex w-full max-w-lg flex-1 justify-around gap-0.5 pb-1">
          {links
            .filter((l) => !l.organizerOnly || isOrganizer)
            .map((l) => {
              const active = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href));
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "flex min-h-12 min-w-[3.25rem] flex-1 flex-col items-center justify-center gap-0.5 rounded-xl px-2 py-1 text-[10px] font-semibold tracking-wide transition-all duration-200 active:scale-95",
                    active
                      ? "text-violet-400 [&_svg]:drop-shadow-[0_0_8px_rgba(139,92,246,0.45)]"
                      : "text-[var(--muted-foreground)]"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-xl transition-colors",
                      active ? "bg-violet-500/15 text-violet-300" : "bg-transparent"
                    )}
                  >
                    {l.icon}
                  </span>
                  {l.label}
                </Link>
              );
            })}
          {!user && (
            <Link
              href="/login"
              className={cn(
                "flex min-h-12 min-w-[3.25rem] flex-1 flex-col items-center justify-center gap-0.5 rounded-xl px-2 py-1 text-[10px] font-semibold tracking-wide transition-all duration-200 active:scale-95",
                pathname === "/login"
                  ? "text-violet-400 [&_svg]:drop-shadow-[0_0_8px_rgba(139,92,246,0.45)]"
                  : "text-[var(--muted-foreground)]"
              )}
            >
              <span
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-xl transition-colors",
                  pathname === "/login" ? "bg-violet-500/15 text-violet-300" : ""
                )}
              >
                <User className="h-4 w-4" />
              </span>
              Log in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
