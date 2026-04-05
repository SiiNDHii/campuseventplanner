"use client";

import Link from "next/link";
import { ArrowLeft, Bug, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function BugReportPage() {
  const [formData, setFormData] = motion.useMotionTemplate``;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border-b border-[var(--card-border)] bg-[var(--card)]/50 backdrop-blur-xl"
      >
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
          <Link
            href="/support"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Support
          </Link>
          <h1 className="text-3xl font-bold text-purple-600 sm:text-4xl">🐛 Report a Bug</h1>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            Help us improve by reporting issues you encounter
          </p>
        </div>
      </motion.div>

      {/* Content */}
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-8"
        >
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                Bug Title
              </label>
              <input
                type="text"
                placeholder="Briefly describe the issue"
                className="w-full rounded-lg border border-[var(--card-border)] bg-[var(--muted)]/40 px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                Detailed Description
              </label>
              <textarea
                placeholder="What happened? What was expected? Include steps to reproduce..."
                rows={5}
                className="w-full rounded-lg border border-[var(--card-border)] bg-[var(--muted)]/40 px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition resize-none"
              />
            </div>

            <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-500/20">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                💡 Pro Tip: Include screenshots or screen recordings to help us understand the issue better.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                alert("Bug report feature coming soon! For now, please report bugs via WhatsApp: +92 301 2954272");
              }}
              className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 font-semibold text-white hover:from-purple-700 hover:to-pink-700 transition-all"
            >
              <Bug className="mr-2 inline h-4 w-4" />
              Report Bug
            </button>
          </form>
        </motion.div>

        {/* Alternative Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-8 text-center"
        >
          <h3 className="mb-4 text-lg font-bold text-[var(--foreground)]">
            Prefer to report via WhatsApp?
          </h3>
          <a
            href="https://wa.me/923012954272"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3 font-semibold text-white hover:from-green-600 hover:to-emerald-700 transition-all"
          >
            <Zap className="h-4 w-4" />
            Message us on WhatsApp
          </a>
        </motion.div>
      </div>
    </div>
  );
}
