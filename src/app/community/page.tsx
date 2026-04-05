"use client";

import Link from "next/link";
import { ArrowLeft, Users, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function CommunityPage() {
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
          <h1 className="text-3xl font-bold text-purple-600 sm:text-4xl">👥 Community Forum</h1>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            Connect with other students and organizers
          </p>
        </div>
      </motion.div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border-2 border-dashed border-purple-300 bg-gradient-to-br from-purple-50 to-pink-50 p-12 text-center dark:border-purple-500/50 dark:from-purple-500/10 dark:to-pink-500/10"
        >
          <Users className="mx-auto mb-4 h-12 w-12 text-purple-600" />
          <h2 className="mb-2 text-2xl font-bold text-purple-900 dark:text-purple-300">
            Community Forum Coming Soon
          </h2>
          <p className="mb-6 text-purple-700 dark:text-purple-300/80">
            We're building an awesome community space where students and organizers can connect, share ideas, and help each other.
          </p>
          <Link
            href="/support"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 font-semibold text-white hover:from-purple-700 hover:to-pink-700 transition-all"
          >
            Back to Support
          </Link>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-8 text-center"
        >
          <h3 className="mb-4 text-xl font-bold text-[var(--foreground)]">
            Want to suggest features for the community forum?
          </h3>
          <p className="mb-6 text-[var(--muted-foreground)]">
            Share your ideas with our team via WhatsApp or contact form
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href="https://wa.me/923012954272"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3 font-semibold text-white hover:from-green-600 hover:to-emerald-700 transition-all"
            >
              <MessageSquare className="h-4 w-4" />
              WhatsApp
            </a>
            <Link
              href="/support"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 font-semibold text-white hover:from-purple-700 hover:to-pink-700 transition-all"
            >
              Contact Form
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
