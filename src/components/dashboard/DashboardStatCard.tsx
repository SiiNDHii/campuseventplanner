"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number | string;
  change?: number;
  color: "violet" | "emerald" | "blue" | "pink";
}

const colorMap = {
  violet: {
    bg: "from-purple-50 to-purple-100",
    icon: "text-purple-600",
    text: "text-purple-900",
    accent: "bg-gradient-to-br from-purple-200 to-purple-300",
    border: "border-purple-200",
    shadow: "shadow-purple-200",
    iconBg: "bg-purple-100",
  },
  emerald: {
    bg: "from-emerald-50 to-teal-100",
    icon: "text-emerald-600",
    text: "text-emerald-900",
    accent: "bg-gradient-to-br from-emerald-200 to-teal-300",
    border: "border-emerald-200",
    shadow: "shadow-emerald-200",
    iconBg: "bg-emerald-100",
  },
  blue: {
    bg: "from-blue-50 to-cyan-100",
    icon: "text-blue-600",
    text: "text-blue-900",
    accent: "bg-gradient-to-br from-blue-200 to-cyan-300",
    border: "border-blue-200",
    shadow: "shadow-blue-200",
    iconBg: "bg-blue-100",
  },
  pink: {
    bg: "from-rose-50 to-pink-100",
    icon: "text-rose-600",
    text: "text-rose-900",
    accent: "bg-gradient-to-br from-rose-200 to-pink-300",
    border: "border-rose-200",
    shadow: "shadow-rose-200",
    iconBg: "bg-rose-100",
  },
};

export function DashboardStatCard({
  icon: Icon,
  label,
  value,
  change,
  color,
}: StatCardProps) {
  const colors = colorMap[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="group h-full"
    >
      <div
        className={`relative h-full overflow-hidden rounded-2xl border ${colors.border} bg-gradient-to-br ${colors.bg} p-5 transition-all duration-300 hover:border-current hover:shadow-2xl ${colors.shadow} sm:p-6 hover:-translate-y-1`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative z-10">
          <div className="mb-4 flex items-start justify-between">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${colors.iconBg}`}>
              <Icon className={`h-6 w-6 ${colors.icon}`} />
            </div>
            {change !== undefined && change !== 0 && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${change > 0 ? "bg-emerald-100 text-emerald-700" : "bg-orange-100 text-orange-700"}`}
              >
                <TrendingUp className="h-3 w-3" />
                <span>{Math.abs(change)}%</span>
              </motion.div>
            )}
          </div>

          <p className={`text-xs font-semibold uppercase tracking-widest ${colors.text} opacity-70`}>{label}</p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mt-3 flex items-baseline gap-2"
          >
            <span className={`text-4xl font-bold ${colors.text} sm:text-5xl`}>
              {value}
            </span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
