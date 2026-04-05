"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const isAuthShell = pathname === "/login" || pathname === "/register";

  return (
    <motion.div
      key={pathname}
      initial={reduce ? false : { opacity: 0, y: isAuthShell ? 18 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduce ? 0 : isAuthShell ? 0.52 : 0.32,
        ease: isAuthShell ? [0.16, 1, 0.3, 1] : [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
