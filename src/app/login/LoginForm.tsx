"use client";

import { signIn } from "@/app/actions/auth";
import type { AuthState } from "@/app/actions/auth";
import { FormAlert } from "@/components/ui/form-alert";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { motion } from "framer-motion";
import { LogIn, Mail, Lock } from "lucide-react";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

interface LoginFormProps {
  next?: string;
}

export function LoginForm({ next = "/" }: LoginFormProps) {
  const [state, formAction, isPending] = useActionState<AuthState, FormData>(
    signIn,
    null
  );

  return (
    <motion.form
      action={formAction}
      className="w-full space-y-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <input type="hidden" name="next" value={next} />
      <div className="rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl shadow-purple-500/5 overflow-hidden p-8 sm:p-10">
        {/* Icon Header */}
        <motion.div
          className="flex justify-center mb-6"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <div className="relative h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
              <LogIn className="h-8 w-8 text-white" strokeWidth={2} />
            </div>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.div
          className="text-center mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent mb-2"
            variants={itemVariants}
          >
            Welcome Back
          </motion.h1>
          <motion.p
            className="text-sm sm:text-base text-white/60"
            variants={itemVariants}
          >
            Sign in to access your event dashboard
          </motion.p>
        </motion.div>

        {/* Error Alert */}
        {state?.message && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4"
          >
            <FormAlert type={state.type || "error"} message={state.message} />
          </motion.div>
        )}

        {/* Form Fields */}
        <motion.div
          className="space-y-4 mb-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Email Input */}
          <motion.div variants={itemVariants} className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-purple-400 transition-colors">
              <Mail className="h-5 w-5" />
            </div>
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              required
              disabled={isPending}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:bg-white/15 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/40 focus:outline-none disabled:opacity-50 transition-all duration-300"
            />
          </motion.div>

          {/* Password Input */}
          <motion.div variants={itemVariants} className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-purple-400 transition-colors">
              <Lock className="h-5 w-5" />
            </div>
            <input
              type="password"
              name="password"
              placeholder="Your password"
              required
              disabled={isPending}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:bg-white/15 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/40 focus:outline-none disabled:opacity-50 transition-all duration-300"
            />
          </motion.div>

          {/* Remember & Forgot */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-between text-sm"
          >
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                name="remember"
                defaultChecked
                disabled={isPending}
                className="rounded border border-white/20 bg-white/10 text-purple-500 checkbox-sm cursor-pointer accent-purple-500 disabled:opacity-50"
              />
              <span className="text-white/70 group-hover:text-white/90 transition-colors">
                Remember me
              </span>
            </label>
            <Link
              href="/forgot-password"
              className="text-white/60 hover:text-white/90 transition-colors"
            >
              Forgot password?
            </Link>
          </motion.div>
        </motion.div>

        {/* Submit Button */}
        <motion.div variants={itemVariants} initial="hidden" animate="visible">
          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-purple-500/40 hover:shadow-purple-500/60 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
          >
            {isPending ? (
              <>
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <LogIn className="h-5 w-5" />
                Sign In
              </>
            )}
          </Button>
        </motion.div>

        {/* Divider */}
        <motion.div variants={itemVariants} initial="hidden" animate="visible" className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <span className="text-xs text-white/50 font-medium uppercase tracking-wide">Demo Accounts</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </motion.div>

        {/* Demo Credentials */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3 mb-6"
        >
          {/* Organizer Demo */}
          <motion.div
            variants={itemVariants}
            className="rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/40 p-4 cursor-pointer hover:from-purple-500/30 hover:to-pink-500/30 transition-all group"
            onClick={() => {
              const form = document.querySelector('form');
              const emailInput = form?.querySelector('input[name="email"]') as HTMLInputElement;
              const passwordInput = form?.querySelector('input[name="password"]') as HTMLInputElement;
              if (emailInput) emailInput.value = 'organizer@campus.edu';
              if (passwordInput) passwordInput.value = 'password123';
            }}
          >
            <div className="text-sm font-semibold text-purple-200 group-hover:text-purple-100 transition-colors">
              👨‍💼 Event Organizer
            </div>
            <div className="text-xs text-white/60 mt-1">
              <div className="font-mono">organizer@campus.edu</div>
              <div className="font-mono">password123</div>
            </div>
          </motion.div>

          {/* Student Demo */}
          <motion.div
            variants={itemVariants}
            className="rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-400/40 p-4 cursor-pointer hover:from-blue-500/30 hover:to-cyan-500/30 transition-all group"
            onClick={() => {
              const form = document.querySelector('form');
              const emailInput = form?.querySelector('input[name="email"]') as HTMLInputElement;
              const passwordInput = form?.querySelector('input[name="password"]') as HTMLInputElement;
              if (emailInput) emailInput.value = 'student@campus.edu';
              if (passwordInput) passwordInput.value = 'password123';
            }}
          >
            <div className="text-sm font-semibold text-blue-200 group-hover:text-blue-100 transition-colors">
              🎓 Student
            </div>
            <div className="text-xs text-white/60 mt-1">
              <div className="font-mono">student@campus.edu</div>
              <div className="font-mono">password123</div>
            </div>
          </motion.div>

          {/* Admin Demo */}
          <motion.div
            variants={itemVariants}
            className="rounded-lg bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-400/40 p-4 cursor-pointer hover:from-orange-500/30 hover:to-red-500/30 transition-all group"
            onClick={() => {
              const form = document.querySelector('form');
              const emailInput = form?.querySelector('input[name="email"]') as HTMLInputElement;
              const passwordInput = form?.querySelector('input[name="password"]') as HTMLInputElement;
              if (emailInput) emailInput.value = 'admin@campus.edu';
              if (passwordInput) passwordInput.value = 'password123';
            }}
          >
            <div className="text-sm font-semibold text-orange-200 group-hover:text-orange-100 transition-colors">
              🔐 Admin
            </div>
            <div className="text-xs text-white/60 mt-1">
              <div className="font-mono">admin@campus.edu</div>
              <div className="font-mono">password123</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div variants={itemVariants} initial="hidden" animate="visible" className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <span className="text-xs text-white/50 font-medium uppercase tracking-wide">Or</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </motion.div>

        {/* Sign Up Link */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="text-center text-sm"
        >
          <span className="text-white/70">Don't have an account? </span>
          <Link
            href="/register"
            className="font-semibold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text hover:from-blue-300 hover:to-purple-300 transition-all duration-300"
          >
            Create one
          </Link>
        </motion.div>

        {/* Bottom Badge */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="mt-6 pt-6 border-t border-white/10"
        >
          <p className="text-xs text-white/40 text-center">
            🔒 Secure authentication powered by Next.js & Prisma
          </p>
        </motion.div>
      </div>
    </motion.form>
  );
}
