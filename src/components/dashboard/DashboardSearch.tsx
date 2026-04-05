"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Sliders } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface DashboardSearchProps {
  onSearchChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
  categories: Array<{ label: string; value: string }>;
}

export function DashboardSearch({
  onSearchChange,
  onCategoryChange,
  categories,
}: DashboardSearchProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  const handleCategoryClick = (value: string) => {
    setActiveCategory(value);
    onCategoryChange(value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="space-y-4 rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50/80 to-pink-50/80 p-5 transition-all duration-300 hover:border-purple-300 sm:p-6"
    >
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-purple-400" />
        <Input
          type="text"
          placeholder="Search events, venues..."
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
        />
      </div>

      {/* Category Filter */}
      <div>
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-purple-700">
          <Sliders className="h-3.5 w-3.5" />
          <span>Filter by category</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {[{ label: "All Events", value: "all" }, ...categories].map((cat) => (
            <motion.button
              key={cat.value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCategoryClick(cat.value)}
              className={`transition-all duration-200 ${
                activeCategory === cat.value
                  ? "bg-violet-500/40 text-white ring-2 ring-violet-400/50"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
              } rounded-lg px-3 py-1.5 text-sm font-medium`}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
