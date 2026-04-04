"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CalendarHeart, Sparkles } from "lucide-react";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--card)]/40 px-5 py-12 sm:rounded-3xl sm:px-10 sm:py-20 md:px-12 md:py-24">
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-80 rounded-full bg-blue-600/15 blur-3xl" />

      <div className="relative mx-auto max-w-3xl text-center">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.4 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 px-3 py-1.5 text-xs font-medium text-violet-300 sm:mb-6 sm:px-4"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Built for modern campuses
        </motion.div>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduce ? 0 : 0.05, duration: reduce ? 0 : 0.45 }}
          className="text-[1.75rem] font-bold leading-[1.15] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
        >
          <span className="cep-gradient-text">Plan events</span>
          <br />
          <span className="text-[var(--foreground)]">students actually attend</span>
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduce ? 0 : 0.12, duration: reduce ? 0 : 0.4 }}
          className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[var(--muted-foreground)] sm:mt-6 sm:text-lg"
        >
          One place for discovery, registration, smart reminders, structured feedback, and organizer insights — without
          the spreadsheet chaos.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduce ? 0 : 0.2, duration: reduce ? 0 : 0.4 }}
          className="mt-8 flex w-full flex-col items-stretch gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4"
        >
          <Link
            href="/events"
            className="cep-btn-primary inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold text-white sm:w-auto sm:min-h-0 sm:px-8"
          >
            <CalendarHeart className="h-5 w-5 shrink-0" />
            Browse events
            <ArrowRight className="h-4 w-4 shrink-0 opacity-80" />
          </Link>
          <Link
            href="/register"
            className="cep-btn-outline inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-[var(--card-border)] bg-[var(--muted)]/40 px-6 py-3.5 text-base font-semibold text-[var(--foreground)] sm:w-auto sm:min-h-0 sm:px-8"
          >
            Create free account
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
