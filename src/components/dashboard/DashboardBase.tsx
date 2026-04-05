"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BarChart3, Users, Calendar, Sparkles, ArrowRight } from "lucide-react";
import { DashboardStatCard } from "@/components/dashboard/DashboardStatCard";
import { DashboardSearch } from "@/components/dashboard/DashboardSearch";
import { RegisteredEventsSection, type RegisteredEvent } from "@/components/dashboard/RegisteredEventsSection";
import { EventCard } from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { inferEventCategory } from "@/lib/event-categories";

interface DashboardBaseProps {
  stats: {
    totalEvents: number;
    totalUsers: number;
    userRegisteredEvents: number;
    userAttendedEvents: number;
  };
  recentEvents: Array<{
    id: string;
    title: string;
    venue: string;
    description: string;
    startsAt: string;
    registrationCount: number;
  }>;
  userRegisteredEvents: RegisteredEvent[];
  isAuthenticated: boolean;
  userName?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function DashboardBase({
  stats,
  recentEvents,
  userRegisteredEvents,
  isAuthenticated,
  userName,
}: DashboardBaseProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Filter recent events based on search and category
  const filteredEvents = useMemo(() => {
    return recentEvents.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase());

      if (selectedCategory === "all") return matchesSearch;

      const inferredCategory = inferEventCategory(
        event.title,
        event.description,
        event.venue
      );
      return matchesSearch && inferredCategory === selectedCategory;
    });
  }, [searchQuery, selectedCategory, recentEvents]);

  return (
    <div className="space-y-8 pb-6 sm:space-y-10 sm:pb-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-4">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 via-pink-500 to-rose-600 shadow-lg shadow-purple-500/40"
          >
            <BarChart3 className="h-7 w-7 text-white" />
          </motion.div>
          <div className="flex-1">
            <div className="flex items-baseline gap-2">
              <h1 className="text-3xl font-bold tracking-tight text-purple-950 sm:text-4xl">
                Dashboard
              </h1>
              <span className="text-xs font-bold text-purple-600 px-3 py-1 rounded-full bg-purple-100 border border-purple-200">
                v1.0
              </span>
            </div>
            <p className="mt-2 text-sm text-purple-700">
              {isAuthenticated
                ? `✨ Welcome back! Discover amazing campus events and manage your registrations.`
                : "🎓 Explore upcoming campus events and discover what's happening around you."}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Statistics Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <motion.div variants={itemVariants}>
          <DashboardStatCard
            icon={Calendar}
            label="Total Events"
            value={stats.totalEvents}
            color="violet"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <DashboardStatCard
            icon={Users}
            label="Community Members"
            value={stats.totalUsers}
            color="emerald"
          />
        </motion.div>

        {isAuthenticated && (
          <>
            <motion.div variants={itemVariants}>
              <DashboardStatCard
                icon={Sparkles}
                label="My Registrations"
                value={stats.userRegisteredEvents}
                color="blue"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <DashboardStatCard
                icon={Calendar}
                label="Events Attended"
                value={stats.userAttendedEvents}
                color="pink"
              />
            </motion.div>
          </>
        )}
      </motion.div>

      {/* Search and Filter */}
      <DashboardSearch
        onSearchChange={setSearchQuery}
        onCategoryChange={setSelectedCategory}
        categories={[
          { label: "Academic", value: "academic" },
          { label: "Sports", value: "sports" },
          { label: "Cultural", value: "cultural" },
          { label: "Social", value: "social" },
        ]}
      />

      {/* My Registered Events Section */}
      {isAuthenticated && userRegisteredEvents.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="h-1 w-8 rounded-full bg-gradient-to-r from-gradient from-teal-500 to-cyan-500" />
              <h2 className="text-2xl font-bold text-teal-900">
                My Registered Events
              </h2>
            </div>
            <p className="text-sm text-teal-700 ml-11">
              Manage your registrations and track your attendance
            </p>
          </div>
          <RegisteredEventsSection events={userRegisteredEvents} />
        </motion.section>
      )}

      {/* Browse All Events Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-3">
              <div className="h-1 w-8 rounded-full bg-gradient-to-r from-purple-500 to-rose-500" />
              <h2 className="text-2xl font-bold text-purple-900">
                {searchQuery || selectedCategory !== "all"
                  ? "Filtered Events"
                  : "Upcoming Events"}
              </h2>
            </div>
            <p className="text-sm text-purple-700 ml-11">
              {filteredEvents.length} event{filteredEvents.length !== 1 ? "s" : ""} found
            </p>
          </div>
          {!(searchQuery || selectedCategory !== "all") && (
            <Link href="/events">
              <Button
                variant="secondary"
                size="sm"
                className="hidden gap-2 sm:flex"
              >
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>

        {filteredEvents.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 p-8 text-center sm:p-12"
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Calendar className="mx-auto mb-4 h-12 w-12 text-purple-400" />
            </motion.div>
            <h3 className="text-lg font-semibold text-purple-900">
              No events found
            </h3>
            <p className="mt-2 text-sm text-purple-700">
              Try adjusting your search or filters to find more amazing events.
            </p>
            {(searchQuery || selectedCategory !== "all") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="mt-4 inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 text-sm font-semibold text-white hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
              >
                Clear Filters
              </button>
            )}
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <EventCard
                  id={event.id}
                  title={event.title}
                  venue={event.venue}
                  startsAt={new Date(event.startsAt)}
                  registrationCount={event.registrationCount}
                  categoryLabel={inferEventCategory(
                    event.title,
                    event.description,
                    event.venue
                  )}
                />
              </motion.div>
            ))}
          </div>
        )}
      </motion.section>

      {/* CTA for Unauthenticated Users */}
      {!isAuthenticated && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="rounded-3xl border border-purple-300 bg-gradient-to-r from-purple-100 via-pink-100 to-rose-100 p-8 text-center sm:p-12 overflow-hidden relative"
        >
          <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-purple-200/40 blur-2xl" />
          <div className="absolute -left-20 -bottom-20 h-40 w-40 rounded-full bg-pink-200/40 blur-2xl" />
          
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="relative mb-4"
          >
            <Sparkles className="mx-auto h-8 w-8 text-purple-600" />
          </motion.div>
          <h3 className="relative text-2xl font-bold text-purple-900">
            Join our vibrant community
          </h3>
          <p className="relative mx-auto mt-2 max-w-lg text-purple-700">
            Sign up to discover amazing events, register instantly, get smart reminders, and share feedback with organizers.
          </p>
          <div className="relative mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <Link href="/register">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 sm:w-auto shadow-lg shadow-purple-500/20">
                Create Account
              </Button>
            </Link>
            <Link href="/login">
              <Button
                variant="secondary"
                className="w-full border-purple-500/50 hover:border-purple-500/80 sm:w-auto"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </motion.section>
      )}
    </div>
  );
}
