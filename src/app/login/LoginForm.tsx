"use client";

import { useActionState, useEffect, useId, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Eye, EyeOff, GraduationCap, Lock, Mail } from "lucide-react";
import { toast } from "sonner";
import { signIn } from "@/app/actions/auth";
import { SocialLoginButtons } from "@/app/login/SocialLoginButtons";
import { Button } from "@/components/ui/button";
import { FormAlert } from "@/components/ui/form-alert";
import { cn } from "@/lib/utils";

export function LoginForm({ next }: { next: string }) {
  const reduce = useReducedMotion();
  const emailId = useId();
  const passwordId = useId();
  const [showPassword, setShowPassword] = useState(false);

  const [state, formAction, pending] = useActionState(
    async (_prev: { error?: string } | null, formData: FormData) => {
      return signIn(formData);
    },
    null
  );

  useEffect(() => {
    if (state?.error) toast.error(state.error);
  }, [state?.error]);

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: reduce ? 0 : 0.5,
        delay: reduce ? 0 : 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(
        "group/card relative w-full max-w-[420px]",
        "rounded-[1.35rem] border border-white/25 bg-white/[0.45] p-6 shadow-[0_24px_80px_-24px_rgba(79,70,229,0.38),0_0_0_1px_rgba(255,255,255,0.12)_inset] backdrop-blur-3xl backdrop-saturate-150",
        "dark:border-white/[0.1] dark:bg-slate-950/45 dark:shadow-[0_28px_90px_-28px_rgba(99,102,241,0.5),0_0_0_1px_rgba(255,255,255,0.08)_inset]",
        "transition-[box-shadow,transform] duration-300 [@media(hover:hover)]:hover:shadow-[0_36px_96px_-28px_rgba(99,102,241,0.45),0_0_0_1px_rgba(255,255,255,0.18)_inset] [@media(hover:hover)]:hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:[@media(hover:hover)]:hover:translate-y-0"
      )}
    >
      {/* Glass inner highlight */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[1.35rem] bg-gradient-to-br from-white/40 via-transparent to-violet-500/[0.07] dark:from-white/[0.04] dark:to-violet-500/[0.12]"
        aria-hidden
      />
      {/* Top gradient sheen */}
      <div
        className="pointer-events-none absolute inset-x-4 -top-px h-px rounded-full bg-gradient-to-r from-transparent via-violet-400/60 to-transparent opacity-80 dark:via-violet-400/40"
        aria-hidden
      />

      <div className="relative z-10">
        <div className="mb-7 flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 shadow-lg shadow-violet-500/35 ring-4 ring-violet-500/10 dark:ring-violet-400/15">
            <GraduationCap className="h-6 w-6 text-white" aria-hidden />
          </div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-2xl">
            Sign in to <span className="cep-gradient-text">Campus Events</span>
          </h2>
          <p className="mt-2 max-w-[280px] text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Welcome back — use your campus email to access events and your dashboard.
          </p>
        </div>

        <SocialLoginButtons />

        <div className="relative my-7">
          <div className="absolute inset-0 flex items-center" aria-hidden>
            <span className="w-full border-t border-slate-200/80 dark:border-white/10" />
          </div>
          <div className="relative flex justify-center text-xs font-medium uppercase tracking-wider">
            <span className="bg-white/80 px-3 text-slate-500 backdrop-blur-sm dark:bg-slate-950/60 dark:text-slate-400">
              or continue with email
            </span>
          </div>
        </div>

        <form action={formAction} className="space-y-5">
          <input type="hidden" name="next" value={next} />

          {state?.error && <FormAlert variant="error">{state.error}</FormAlert>}

          <div className="space-y-2">
            <label htmlFor={emailId} className="sr-only">
              Email
            </label>
            <div className="relative">
              <Mail
                className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400 transition-colors dark:text-slate-500"
                aria-hidden
              />
              <input
                id={emailId}
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@university.edu"
                className={cn(
                  "h-12 w-full rounded-xl border border-slate-200/90 bg-white/70 pl-11 pr-4 text-sm text-slate-900 shadow-sm outline-none backdrop-blur-sm transition-all duration-200",
                  "placeholder:text-slate-400 dark:border-slate-700/80 dark:bg-slate-950/40 dark:text-slate-100 dark:placeholder:text-slate-500",
                  "hover:border-slate-300 dark:hover:border-slate-600",
                  "focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/25 focus:ring-offset-2 focus:ring-offset-white dark:focus:border-violet-400/40 dark:focus:ring-violet-400/20 dark:focus:ring-offset-slate-900"
                )}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor={passwordId} className="sr-only">
              Password
            </label>
            <div className="relative">
              <Lock
                className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400 transition-colors dark:text-slate-500"
                aria-hidden
              />
              <input
                id={passwordId}
                name="password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                placeholder="Password"
                className={cn(
                  "h-12 w-full rounded-xl border border-slate-200/90 bg-white/70 py-0 pl-11 pr-12 text-sm text-slate-900 shadow-sm outline-none backdrop-blur-sm transition-all duration-200",
                  "placeholder:text-slate-400 dark:border-slate-700/80 dark:bg-slate-950/40 dark:text-slate-100 dark:placeholder:text-slate-500",
                  "hover:border-slate-300 dark:hover:border-slate-600",
                  "focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/25 focus:ring-offset-2 focus:ring-offset-white dark:focus:border-violet-400/40 dark:focus:ring-violet-400/20 dark:focus:ring-offset-slate-900"
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800/80 dark:hover:text-slate-200"
                aria-label={showPassword ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
            <label className="flex cursor-pointer select-none items-center gap-2.5 text-slate-600 dark:text-slate-400">
              <input
                type="checkbox"
                name="rememberMe"
                className="h-4 w-4 rounded-md border-slate-300 text-violet-600 transition-colors focus:ring-2 focus:ring-violet-500/30 dark:border-slate-600 dark:bg-slate-900/60 dark:text-violet-500"
              />
              <span>Remember me</span>
            </label>
            <button
              type="button"
              className="font-medium text-violet-600 transition-colors hover:text-violet-500 dark:text-violet-400 dark:hover:text-violet-300"
              onClick={() =>
                toast.info("Password reset isn’t enabled yet. Contact your campus administrator if you need help.")
              }
            >
              Forgot password?
            </button>
          </div>

          <Button
            type="submit"
            loading={pending}
            variant="primary"
            className={cn(
              "relative h-12 w-full overflow-hidden rounded-xl text-[15px] font-semibold shadow-lg shadow-violet-500/25",
              "transition-all duration-200 [@media(hover:hover)]:hover:shadow-xl [@media(hover:hover)]:hover:shadow-violet-500/35",
              "motion-reduce:transition-none"
            )}
          >
            {pending ? "Signing in…" : "Sign in"}
          </Button>

          <div className="rounded-xl border border-slate-200/70 bg-slate-50/60 px-4 py-3 text-center backdrop-blur-md dark:border-slate-700/50 dark:bg-slate-950/35">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Demo account</p>
            <p className="mt-1.5 font-mono text-[11px] leading-relaxed text-slate-700 dark:text-slate-300">
              <span className="text-violet-600 dark:text-violet-400">organizer@campus.edu</span>
              <span className="mx-1 text-slate-400">·</span>
              <span>password123</span>
            </p>
          </div>

          <p className="text-center text-sm text-slate-600 dark:text-slate-400">
            No account?{" "}
            <Link
              href="/register"
              className="font-semibold text-violet-600 underline-offset-4 transition-colors hover:text-violet-500 hover:underline dark:text-violet-400 dark:hover:text-violet-300"
            >
              Create one
            </Link>
          </p>
        </form>
      </div>
    </motion.div>
  );
}
