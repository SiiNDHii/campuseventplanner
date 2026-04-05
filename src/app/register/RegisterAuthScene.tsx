"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = {
  children: React.ReactNode;
};

export function RegisterAuthScene({ children }: Props) {
  const reduce = useReducedMotion();

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="fixed inset-0 -z-50">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/40 via-blue-500/30 to-purple-500/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
        {!reduce && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-emerald-500/40 via-blue-500/20 to-purple-500/40 opacity-0"
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </div>

      {!reduce ? (
        <>
          <motion.div
            className="pointer-events-none absolute -left-40 top-20 -z-40 h-96 w-96 rounded-full bg-emerald-500/20 blur-[80px]"
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -40, 20, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="pointer-events-none absolute -bottom-32 -right-40 -z-40 h-80 w-80 rounded-full bg-purple-500/20 blur-[80px]"
            animate={{
              x: [0, -30, 25, 0],
              y: [0, 35, -15, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          <motion.div
            className="pointer-events-none absolute left-1/4 top-1/2 -z-40 h-72 w-72 -translate-y-1/2 rounded-full bg-blue-500/15 blur-[70px]"
            animate={{
              scale: [1, 1.15, 0.95, 1],
              opacity: [0.5, 0.8, 0.5, 0.5],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </>
      ) : (
        <>
          <div className="pointer-events-none absolute -left-40 top-20 -z-40 h-96 w-96 rounded-full bg-emerald-500/10 blur-[80px]" />
          <div className="pointer-events-none absolute -bottom-32 -right-40 -z-40 h-80 w-80 rounded-full bg-purple-500/10 blur-[80px]" />
        </>
      )}

      <div className="pointer-events-none fixed inset-0 -z-30 bg-white/10 backdrop-blur-sm dark:bg-slate-950/20 dark:backdrop-blur-xl" />

      {!reduce && (
        <>
          <motion.div
            className="pointer-events-none fixed left-1/3 top-1/4 -z-40 h-2 w-2 rounded-full bg-white/60"
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="pointer-events-none fixed right-1/4 bottom-1/3 -z-40 h-1.5 w-1.5 rounded-full bg-white/50"
            animate={{
              y: [0, 15, 0],
              x: [0, -8, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          />
        </>
      )}

      <div className="relative z-10 flex min-h-screen w-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
}
