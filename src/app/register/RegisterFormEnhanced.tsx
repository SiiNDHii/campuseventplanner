"use client";

import Link from "next/link";
import { useActionState, useEffect, useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Mail, Eye, EyeOff, GraduationCap, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { signUp } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { FormAlert } from "@/components/ui/form-alert";
import { cn } from "@/lib/utils";

export function RegisterForm() {
  const reduce = useReducedMotion();
  const emailId = useId();
  const passwordId = useId();
  const nameId = useId();
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const [state, formAction, pending] = useActionState(
    async (_prev: { error?: string } | null, formData: FormData) => {
      return signUp(_prev, formData);
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
      <div
        className="pointer-events-none absolute inset-0 rounded-[1.35rem] bg-gradient-to-br from-white/40 via-transparent to-violet-500/[0.07] dark:from-white/[0.04] dark:to-violet-500/[0.12]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-4 -top-px h-px rounded-full bg-gradient-to-r from-transparent via-violet-400/60 to-transparent opacity-80 dark:via-violet-400/40"
        aria-hidden
      />

      <div className="relative z-10">
        <div className="mb-7 flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg shadow-purple-500/35 ring-4 ring-purple-500/10 dark:ring-purple-400/15">
            <GraduationCap className="h-6 w-6 text-white" aria-hidden />
          </div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-2xl">
            Join Campus<span className="cep-gradient-text">Events</span>
          </h2>
          <p className="mt-2 max-w-[280px] text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Create your account and discover campus events happening near you.
          </p>
        </div>

        <form action={formAction} className="space-y-5">
          {state?.error && <FormAlert variant="error">{state.error}</FormAlert>}

          <div className="space-y-2">
            <label htmlFor={nameId} className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Full Name (optional)
            </label>
            <input
              id={nameId}
              name="name"
              type="text"
              placeholder="John Doe"
              className={cn(
                "w-full rounded-xl border border-slate-300/50 bg-white/50 px-4 py-2.5 text-slate-900 placeholder-slate-400/60 backdrop-blur-sm transition-all duration-200 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-400/30 dark:border-white/10 dark:bg-slate-900/20 dark:text-slate-50 dark:placeholder-slate-400/40 dark:focus:border-violet-400 dark:focus:ring-violet-500/40"
              )}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor={emailId} className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Campus Email
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
                placeholder="student@university.edu"
                className={cn(
                  "w-full rounded-xl border border-slate-300/50 bg-white/50 px-4 py-2.5 pl-10 text-slate-900 placeholder-slate-400/60 backdrop-blur-sm transition-all duration-200 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-400/30 dark:border-white/10 dark:bg-slate-900/20 dark:text-slate-50 dark:placeholder-slate-400/40 dark:focus:border-violet-400 dark:focus:ring-violet-500/40"
                )}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor={passwordId} className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Password
            </label>
            <div className="relative">
              <input
                id={passwordId}
                name="password"
                type={showPassword ? "text" : "password"}
                required
                minLength={8}
                placeholder="••••••••"
                className={cn(
                  "w-full rounded-xl border border-slate-300/50 bg-white/50 px-4 py-2.5 text-slate-900 placeholder-slate-400/60 backdrop-blur-sm transition-all duration-200 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-400/30 dark:border-white/10 dark:bg-slate-900/20 dark:text-slate-50 dark:placeholder-slate-400/40 dark:focus:border-violet-400 dark:focus:ring-violet-500/40"
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
              </button>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">At least 8 characters</p>
          </div>

          <div className="flex items-start gap-3 rounded-lg bg-slate-50/50 p-3 dark:bg-slate-800/30">
            <input
              type="checkbox"
              id="terms"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-600"
            />
            <label htmlFor="terms" className="text-xs text-slate-600 dark:text-slate-400">
              I agree to the Terms & Conditions and understand my data will be used to improve events
            </label>
          </div>

          <Button
            type="submit"
            disabled={pending || !agreedToTerms}
            className="w-full gap-2 rounded-xl py-2.5"
            variant="primary"
          >
            {pending ? "Creating account..." : "Create my account"}
            <ArrowRight className="h-4 w-4 opacity-80" />
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-violet-600 transition-colors hover:text-violet-500 dark:text-violet-400 dark:hover:text-violet-300">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
