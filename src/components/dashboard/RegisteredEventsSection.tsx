"use client";

import Link from "next/link";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, ArrowRight, CalendarX } from "lucide-react";
import { Card } from "@/components/ui/card";

export interface RegisteredEvent {
  id: string;
  title: string;
  venue: string;
  startsAt: Date;
  description: string;
  registrationCount: number;
  organizerName?: string;
  attended?: boolean;
}

interface RegisteredEventsSectionProps {
  events: RegisteredEvent[];
  isLoading?: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export function RegisteredEventsSection({
  events,
  isLoading,
}: RegisteredEventsSectionProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-24 rounded-xl bg-white/5 animate-pulse"
          />
        ))}
      </div>
    );
  }

  const upcomingEvents = events.filter((e) => new Date(e.startsAt) > new Date());
  const pastEvents = events.filter((e) => new Date(e.startsAt) <= new Date());

  if (events.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center px-6 py-12 text-center sm:px-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 mb-3">
          <CalendarX className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-semibold text-[var(--foreground)]">
          No registered events yet
        </h3>
        <p className="mt-2 max-w-sm text-sm text-[var(--muted-foreground)]">
          Discover and register for upcoming campus events to see them here.
        </p>
        <Link
          href="/events"
          className="cep-btn-primary mt-6 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
        >
          Browse Events <ArrowRight className="h-4 w-4" />
        </Link>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {upcomingEvents.length > 0 && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h3 className="mb-4 text-lg font-semibold text-white">
            Upcoming Events
          </h3>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <motion.div key={event.id} variants={itemVariants}>
                <Link
                  href={`/events/${event.id}`}
                  className="group block rounded-xl border border-white/10 bg-gradient-to-r from-blue-500/10 via-cyan-500/5 to-transparent p-4 transition-all duration-300 hover:border-blue-400/30 hover:bg-gradient-to-r hover:from-blue-500/15 hover:via-cyan-500/10 sm:p-5"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1">
                      <h4 className="text-base font-semibold text-white transition-colors group-hover:text-blue-300 sm:text-lg">
                        {event.title}
                      </h4>
                      <div className="mt-2.5 flex flex-col gap-1.5 text-xs text-white/70 sm:text-sm">
                        <p className="flex items-center gap-2">
                          <Calendar className="h-3.5 w-3.5 text-blue-400/70" />
                          {format(new Date(event.startsAt), "EEE, MMM d · h:mm a")}
                        </p>
                        <p className="flex items-center gap-2">
                          <MapPin className="h-3.5 w-3.5 text-emerald-400/70" />
                          {event.venue}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-white/50 group-hover:text-blue-300/70 transition-colors">
                      <Users className="h-3.5 w-3.5" />
                      <span>{event.registrationCount} going</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {pastEvents.length > 0 && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h3 className="mb-4 text-lg font-semibold text-white/80">
            Past Events
          </h3>
          <div className="space-y-3">
            {pastEvents.map((event) => (
              <motion.div key={event.id} variants={itemVariants}>
                <Link
                  href={`/events/${event.id}`}
                  className="group block rounded-xl border border-white/5 bg-gradient-to-r from-white/[0.03] via-white/[0.01] to-transparent p-4 transition-all duration-300 hover:border-white/10 hover:bg-gradient-to-r hover:from-white/[0.05] hover:via-white/[0.02] sm:p-5"
                >
                  <div className="flex flex-col gap-3 opacity-75 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1">
                      <h4 className="text-base font-semibold text-white/80 transition-colors group-hover:text-white/90 sm:text-lg">
                        {event.title}
                      </h4>
                      <div className="mt-2.5 flex flex-col gap-1.5 text-xs text-white/60 sm:text-sm">
                        <p className="flex items-center gap-2">
                          <Calendar className="h-3.5 w-3.5 text-white/40" />
                          {format(new Date(event.startsAt), "EEE, MMM d · h:mm a")}
                        </p>
                        <p className="flex items-center gap-2">
                          <MapPin className="h-3.5 w-3.5 text-white/40" />
                          {event.venue}
                        </p>
                      </div>
                    </div>
                    <div className="text-xs font-medium text-white/40 group-hover:text-white/50 transition-colors">
                      Completed
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
