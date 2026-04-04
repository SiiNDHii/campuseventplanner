"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = {
  children: React.ReactNode;
};

export function LoginAuthScene({ children }: Props) {
  const reduce = useReducedMotion();

  return (
    <div className="relative -mx-4 flex min-h-[calc(100dvh-5.5rem)] flex-col items-center justify-center px-4 pb-16 pt-6 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      {/* Base wash */}
      <div
        className="pointer-events-none fixed inset-0 -z-20 bg-gradient-to-b from-violet-50/90 via-white to-blue-50/70 dark:from-slate-950 dark:via-slate-950 dark:to-indigo-950/80"
        aria-hidden
      />

      {/* Glass frosted veil */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-white/30 backdrop-blur-[2px] dark:bg-slate-950/20 dark:backdrop-blur-[3px]"
        aria-hidden
      />

      {/* Animated blobs */}
      {!reduce ? (
        <>
          <motion.div
            className="pointer-events-none fixed -left-32 top-1/4 -z-10 h-[420px] w-[420px] rounded-full bg-violet-400/30 blur-[100px] dark:bg-violet-600/25"
            aria-hidden
            animate={{
              x: [0, 40, -10, 0],
              y: [0, -30, 15, 0],
              scale: [1, 1.08, 0.95, 1],
            }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="pointer-events-none fixed -right-24 bottom-1/4 -z-10 h-[380px] w-[380px] rounded-full bg-blue-400/25 blur-[90px] dark:bg-blue-600/20"
            aria-hidden
            animate={{
              x: [0, -35, 20, 0],
              y: [0, 25, -20, 0],
              scale: [1, 1.12, 0.92, 1],
            }}
            transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          <motion.div
            className="pointer-events-none fixed left-1/4 top-1/2 -z-10 h-[320px] w-[320px] -translate-y-1/2 rounded-full bg-fuchsia-400/20 blur-[85px] dark:bg-fuchsia-600/15"
            aria-hidden
            animate={{
              x: [0, 50, -30, 0],
              y: [0, 40, -25, 0],
              opacity: [0.7, 1, 0.75, 0.7],
            }}
            transition={{ duration: 19, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.div
            className="pointer-events-none fixed left-1/2 top-0 -z-10 h-[280px] w-[min(90vw,48rem)] -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-500/20 via-fuchsia-500/15 to-blue-500/20 blur-3xl dark:from-violet-500/12 dark:via-fuchsia-500/10 dark:to-blue-500/12"
            aria-hidden
            animate={{
              scale: [1, 1.06, 0.98, 1],
              opacity: [0.85, 1, 0.9, 0.85],
            }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      ) : (
        <>
          <div className="pointer-events-none fixed -left-32 top-1/4 -z-10 h-[420px] w-[420px] rounded-full bg-violet-400/25 blur-[100px] dark:bg-violet-600/20" aria-hidden />
          <div className="pointer-events-none fixed -right-24 bottom-1/4 -z-10 h-[380px] w-[380px] rounded-full bg-blue-400/20 blur-[90px] dark:bg-blue-600/15" aria-hidden />
        </>
      )}

      <div className="relative z-10 flex w-full max-w-md flex-col items-center">{children}</div>
    </div>
  );
}
