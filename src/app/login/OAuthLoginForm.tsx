"use client";

import { motion } from "framer-motion";
import { LogIn, Mail, Shield } from "lucide-react";
import { GoogleLoginButton } from "@/components/auth/GoogleLoginButton";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

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

interface OAuthLoginFormProps {
  next?: string;
}

export function OAuthLoginForm({ next = "/events" }: OAuthLoginFormProps) {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <motion.div className="w-full space-y-8">
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
            Sign in with your Google account to access your event dashboard
          </motion.p>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200 text-sm"
          >
            {error === "OAuthCallback"
              ? "There was an error signing in. Please try again."
              : "An error occurred during sign in."}
          </motion.div>
        )}

        {/* Google Login Button */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="mb-6"
        >
          <GoogleLoginButton redirectUrl={next} fullWidth />
        </motion.div>

        {/* Divider */}
        <motion.div
          variants={itemVariants}
          className="relative my-6"
        >
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/20"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gradient-to-b from-slate-900 to-slate-800 text-white/50">
              Secure OAuth Sign-in
            </span>
          </div>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Roles Info Card */}
          <motion.div
            variants={itemVariants}
            className="p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 flex items-start gap-3"
          >
            <Shield className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-white mb-1">Role-Based Access</p>
              <p className="text-white/60">
                Your role (Admin, Organizer, or Student) is automatically assigned.
              </p>
            </div>
          </motion.div>

          {/* Email Info Card */}
          <motion.div
            variants={itemVariants}
            className="p-4 rounded-lg bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 flex items-start gap-3"
          >
            <Mail className="h-5 w-5 text-pink-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-white mb-1">Secure Authentication</p>
              <p className="text-white/60">
                Your Google account is used for secure, passwordless sign-in.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer Links */}
      <motion.div
        className="text-center text-sm text-white/60"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <p>
          By signing in, you agree to our{" "}
          <Link
            href="#"
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            Terms of Service
          </Link>
          {" "}and{" "}
          <Link
            href="#"
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            Privacy Policy
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
}
