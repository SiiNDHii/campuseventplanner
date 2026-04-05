"use client";

import { signUp } from "@/app/actions/auth";
import type { AuthState } from "@/app/actions/auth";
import { FormAlert } from "@/components/ui/form-alert";
import { Button } from "@/components/ui/button";
import { useActionState, useState } from "react";
import { motion } from "framer-motion";
import { UserPlus, Mail, Lock, User, Check, X } from "lucide-react";
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

export function RegisterForm() {
  const [state, formAction, isPending] = useActionState<AuthState, FormData>(
    signUp,
    null
  );
  const [password, setPassword] = useState("");

  // Password validation checks
  const hasMinLength = password.length >= 8;
  const hasLetters = /[a-zA-Z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const passwordValid = hasMinLength && hasLetters && hasNumbers;

  return (
    <motion.form
      action={formAction}
      className="w-full space-y-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl shadow-emerald-500/5 overflow-hidden p-8 sm:p-10">
        {/* Icon Header */}
        <motion.div
          className="flex justify-center mb-6"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-blue-500 to-purple-500 rounded-2xl blur"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <div className="relative h-16 w-16 rounded-2xl bg-gradient-to-br from-emerald-500 via-blue-500 to-purple-500 flex items-center justify-center">
              <UserPlus className="h-8 w-8 text-white" strokeWidth={2} />
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
            className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-300 via-blue-300 to-purple-300 bg-clip-text text-transparent mb-2"
            variants={itemVariants}
          >
            Create Account
          </motion.h1>
          <motion.p
            className="text-sm sm:text-base text-white/60"
            variants={itemVariants}
          >
            Join us and start managing your events today
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
          {/* Name Input */}
          <motion.div variants={itemVariants} className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-emerald-400 transition-colors">
              <User className="h-5 w-5" />
            </div>
            <input
              type="text"
              name="name"
              placeholder="Full name"
              required
              disabled={isPending}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:bg-white/15 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/40 focus:outline-none disabled:opacity-50 transition-all duration-300"
            />
          </motion.div>

          {/* Email Input */}
          <motion.div variants={itemVariants} className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-emerald-400 transition-colors">
              <Mail className="h-5 w-5" />
            </div>
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              required
              disabled={isPending}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:bg-white/15 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/40 focus:outline-none disabled:opacity-50 transition-all duration-300"
            />
          </motion.div>

          {/* Password Input */}
          <motion.div variants={itemVariants} className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-emerald-400 transition-colors">
              <Lock className="h-5 w-5" />
            </div>
            <input
              type="password"
              name="password"
              placeholder="Create a strong password"
              required
              disabled={isPending}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:bg-white/15 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/40 focus:outline-none disabled:opacity-50 transition-all duration-300"
            />
          </motion.div>

          {/* Password Requirements */}
          {password && (
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2"
            >
              <p className="text-xs font-semibold text-white/70 uppercase tracking-wider">
                Password Requirements
              </p>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-sm">
                  {hasMinLength ? (
                    <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  ) : (
                    <X className="h-4 w-4 text-red-400/50 flex-shrink-0" />
                  )}
                  <span
                    className={`transition-colors ${
                      hasMinLength ? "text-white/80" : "text-white/40"
                    }`}
                  >
                    At least 8 characters
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  {hasLetters ? (
                    <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  ) : (
                    <X className="h-4 w-4 text-red-400/50 flex-shrink-0" />
                  )}
                  <span
                    className={`transition-colors ${
                      hasLetters ? "text-white/80" : "text-white/40"
                    }`}
                  >
                    Contains letters
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  {hasNumbers ? (
                    <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  ) : (
                    <X className="h-4 w-4 text-red-400/50 flex-shrink-0" />
                  )}
                  <span
                    className={`transition-colors ${
                      hasNumbers ? "text-white/80" : "text-white/40"
                    }`}
                  >
                    Contains numbers
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Terms Checkbox */}
          <motion.div variants={itemVariants} className="flex items-start gap-3 pt-2">
            <input
              type="checkbox"
              name="terms"
              id="terms"
              required
              disabled={isPending}
              className="mt-1 rounded border border-white/20 bg-white/10 text-emerald-500 checkbox-sm cursor-pointer accent-emerald-500 disabled:opacity-50"
            />
            <label htmlFor="terms" className="text-xs text-white/70 cursor-pointer leading-relaxed">
              I agree to the{" "}
              <Link href="/terms" className="text-white/90 hover:text-white underline">
                Terms of Service
              </Link>
              {" "}and{" "}
              <Link href="/privacy" className="text-white/90 hover:text-white underline">
                Privacy Policy
              </Link>
            </label>
          </motion.div>
        </motion.div>

        {/* Submit Button */}
        <motion.div variants={itemVariants} initial="hidden" animate="visible">
          <Button
            type="submit"
            disabled={isPending || !passwordValid}
            className="w-full bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 hover:from-emerald-600 hover:via-blue-600 hover:to-purple-600 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-emerald-500/40 hover:shadow-emerald-500/60 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
          >
            {isPending ? (
              <>
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Creating account...
              </>
            ) : (
              <>
                <UserPlus className="h-5 w-5" />
                Create Account
              </>
            )}
          </Button>
        </motion.div>

        {/* Divider */}
        <motion.div variants={itemVariants} initial="hidden" animate="visible" className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <span className="text-xs text-white/50 font-medium uppercase tracking-wide">Or</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </motion.div>

        {/* Sign In Link */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="text-center text-sm"
        >
          <span className="text-white/70">Already have an account? </span>
          <Link
            href="/login"
            className="font-semibold text-transparent bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text hover:from-emerald-300 hover:to-blue-300 transition-all duration-300"
          >
            Sign in
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
            ✨ Instant account creation, no credit card needed
          </p>
        </motion.div>
      </div>
    </motion.form>
  );
}
