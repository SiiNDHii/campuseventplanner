"use client";

import Link from "next/link";
import { format } from "date-fns";
import { motion, useReducedMotion } from "framer-motion";
import { Calendar, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Props = {
  id: string;
  title: string;
  venue: string;
  startsAt: Date;
  registrationCount?: number;
  categoryLabel?: string;
};

export function EventCard({
  id,
  title,
  venue,
  startsAt,
  registrationCount,
  categoryLabel,
}: Props) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      whileHover={reduce ? undefined : { y: -5 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
    >
      <Link
        href={`/events/${id}`}
        className={cn(
          "cep-glass group block h-full rounded-2xl p-4 shadow-lg shadow-black/[0.06] transition-all duration-300 ease-out active:scale-[0.99] sm:p-5 dark:shadow-black/45",
          "[@media(hover:hover)]:hover:border-violet-500/35 [@media(hover:hover)]:hover:shadow-xl [@media(hover:hover)]:hover:shadow-violet-500/18 motion-reduce:active:scale-100"
        )}
      >
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {categoryLabel && (
            <Badge variant="accent" className="font-normal">
              {categoryLabel}
            </Badge>
          )}
        </div>
        <h2 className="text-base font-semibold leading-snug tracking-tight text-[var(--foreground)] transition-colors duration-200 sm:text-lg [@media(hover:hover)]:group-hover:text-violet-300">
          {title}
        </h2>
        <div className="mt-3 space-y-2 text-sm text-[var(--muted-foreground)]">
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0 text-violet-400/80" />
            <span>{venue}</span>
          </p>
          <p className="flex items-center gap-2 font-medium text-[var(--foreground)]/90">
            <Calendar className="h-4 w-4 shrink-0 text-blue-400/80" />
            <span>{format(startsAt, "EEE, MMM d · h:mm a")}</span>
          </p>
          {registrationCount != null && (
            <p className="flex items-center gap-2 text-xs">
              <Users className="h-3.5 w-3.5 text-emerald-400/90" />
              <span>
                {registrationCount} registered
              </span>
            </p>
          )}
        </div>
        <div className="mt-3 flex items-center text-sm font-medium text-violet-400 opacity-100 transition-opacity duration-300 sm:mt-4 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100">
          View details →
        </div>
      </Link>
    </motion.div>
  );
}
