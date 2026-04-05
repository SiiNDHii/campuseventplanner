"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Plus, Search, SlidersHorizontal } from "lucide-react";
import { EVENT_CATEGORY_OPTIONS, inferEventCategory } from "@/lib/event-categories";
import { EventCard } from "@/components/EventCard";
import { CreateEventModal } from "@/components/events/CreateEventModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type SerialEvent = {
  id: string;
  title: string;
  venue: string;
  description: string;
  startsAt: string;
  registrationCount: number;
};

type DraftEvent = {
  id: string;
  title: string;
  venue: string;
};

type Props = {
  published: SerialEvent[];
  drafts: DraftEvent[];
  showCreate: boolean;
};

export function EventsExplorer({ published, drafts, showCreate }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const reduce = useReducedMotion();

  const enriched = useMemo(
    () =>
      published.map((e) => ({
        ...e,
        inferred: inferEventCategory(e.title, e.description, e.venue),
      })),
    [published]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return enriched.filter((e) => {
      const text = `${e.title} ${e.venue} ${e.description}`.toLowerCase();
      const matchQ = !q || text.includes(q);
      const matchC = category === "all" || e.inferred === category;
      return matchQ && matchC;
    });
  }, [enriched, query, category]);

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.3 }}
            className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl"
          >
            Discover events
          </motion.h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--muted-foreground)] sm:text-base">
            Browse what&apos;s happening on campus. Filter by vibe or search venues and titles.
          </p>
        </div>
        {showCreate && (
          <Button
            type="button"
            variant="primary"
            className="shrink-0 gap-2 rounded-xl"
            onClick={() => setModalOpen(true)}
          >
            <Plus className="h-4 w-4" />
            New event
          </Button>
        )}
      </div>

      <div className="cep-glass flex flex-col gap-3 rounded-2xl border border-[var(--card-border)] p-3 shadow-md shadow-black/[0.04] sm:gap-4 sm:p-4 sm:shadow-lg dark:shadow-black/30 sm:flex-row sm:items-center">
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search events, venues, descriptions…"
            className="pl-10"
            aria-label="Search events"
          />
        </div>
        <div className="-mx-1 flex items-center gap-2 overflow-x-auto overscroll-x-contain px-1 pb-1 pt-0.5 sm:mx-0 sm:px-0 sm:pb-0 sm:pt-0">
          <SlidersHorizontal className="hidden h-4 w-4 shrink-0 text-[var(--muted-foreground)] sm:block" />
          {EVENT_CATEGORY_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setCategory(opt.id)}
              className={cn(
                "shrink-0 rounded-full px-3 py-2 text-xs font-semibold transition-all duration-200 active:scale-95 sm:py-1.5",
                category === opt.id
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30"
                  : "bg-[var(--muted)]/50 text-[var(--muted-foreground)] [@media(hover:hover)]:hover:bg-[var(--muted)]"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
            Published
          </h2>
          <span className="text-xs text-[var(--muted-foreground)]">{filtered.length} shown</span>
        </div>
        {filtered.length === 0 ? (
          <div className="cep-glass rounded-2xl border border-dashed border-[var(--card-border)] px-6 py-16 text-center">
            <p className="text-[var(--muted-foreground)]">No events match your filters.</p>
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">
              Try another category or clear your search.
            </p>
            <Button
              type="button"
              variant="secondary"
              className="mt-6"
              onClick={() => {
                setQuery("");
                setCategory("all");
              }}
            >
              Reset filters
            </Button>
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {filtered.map((e, i) => (
              <motion.li
                key={e.id}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: reduce ? 0 : Math.min(i * 0.045, 0.35),
                  duration: reduce ? 0 : 0.28,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <EventCard
                  id={e.id}
                  title={e.title}
                  venue={e.venue}
                  startsAt={new Date(e.startsAt)}
                  registrationCount={e.registrationCount}
                  categoryLabel={EVENT_CATEGORY_OPTIONS.find((o) => o.id === e.inferred)?.label ?? "Campus"}
                />
              </motion.li>
            ))}
          </ul>
        )}
      </section>

      {drafts.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-amber-500/90">Your drafts</h2>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {drafts.map((e, i) => (
              <motion.li
                key={e.id}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduce ? 0 : i * 0.05, duration: reduce ? 0 : 0.25 }}
              >
                <Link
                  href={`/organizer/events/${e.id}/edit`}
                  className="cep-glass group block rounded-2xl border border-amber-500/25 bg-amber-500/5 p-4 shadow-md transition-all duration-300 active:scale-[0.99] sm:p-5 [@media(hover:hover)]:hover:border-amber-400/45 [@media(hover:hover)]:hover:shadow-lg [@media(hover:hover)]:hover:shadow-amber-500/15"
                >
                  <Badge variant="warning" className="mb-2">
                    Draft
                  </Badge>
                  <h3 className="text-lg font-semibold text-[var(--foreground)] group-hover:text-violet-300">
                    {e.title}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--muted-foreground)]">{e.venue}</p>
                </Link>
              </motion.li>
            ))}
          </ul>
        </section>
      )}

      <CreateEventModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
