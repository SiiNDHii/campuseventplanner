"use client";

import { toast } from "sonner";
import { cn } from "@/lib/utils";

function GoogleMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function GithubMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.111.82-.261.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.744.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.604-2.665-.305-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.96-.267 1.98-.399 3-.404 1.02.005 2.04.137 3 .404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.805 5.624-5.476 5.921.43.372.823 1.102.823 2.222 0 1.604-.015 2.897-.015 3.293 0 .322.216.694.825.576C20.565 21.795 24 17.31 24 12c0-6.63-5.37-12-12-12z"
      />
    </svg>
  );
}

const socialBtn =
  "flex h-12 w-full items-center justify-center gap-2.5 rounded-xl border text-sm font-semibold shadow-sm outline-none transition-all duration-200 " +
  "border-slate-200/90 bg-white/50 text-slate-800 backdrop-blur-md " +
  "hover:border-slate-300 hover:bg-white/80 hover:shadow-md " +
  "focus-visible:ring-2 focus-visible:ring-violet-500/35 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent " +
  "active:scale-[0.98] dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-100 dark:hover:border-white/15 dark:hover:bg-white/[0.1]";

export function SocialLoginButtons() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <button
        type="button"
        className={cn(socialBtn)}
        onClick={() => toast.info("Google sign-in isn’t connected yet. Use email and password for now.")}
      >
        <GoogleMark className="h-[18px] w-[18px] shrink-0" />
        Google
      </button>
      <button
        type="button"
        className={cn(socialBtn)}
        onClick={() => toast.info("GitHub sign-in isn’t connected yet. Use email and password for now.")}
      >
        <GithubMark className="h-[18px] w-[18px] shrink-0 text-slate-800 dark:text-slate-100" />
        GitHub
      </button>
    </div>
  );
}
