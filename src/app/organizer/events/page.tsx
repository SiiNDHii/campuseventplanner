import Link from "next/link";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import { ArrowRight, Calendar, ClipboardList, Plus, Users, Zap, TrendingUp } from "lucide-react";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function OrganizerEventsPage() {
  const session = await getSession();
  if (!session) redirect("/login?next=/organizer/events");

  const events = await prisma.event.findMany({
    where: session.role === "ADMIN" ? {} : { organizerId: session.userId },
    orderBy: { startsAt: "asc" },
    include: { 
      _count: { select: { registrations: true, tasks: true, feedbacks: true, incidents: true } },
      registrations: true,
      feedbacks: true,
    },
  });

  // Calculate stats
  const totalRegistrations = events.reduce((sum, e) => sum + e._count.registrations, 0);
  const totalFeedback = events.reduce((sum, e) => sum + e._count.feedbacks, 0);
  const avgRating = events.length > 0 ? (
    events
      .flatMap(e => e.feedbacks)
      .reduce((sum, f) => sum + (f.ratingOrganization + f.ratingVenue + f.ratingTiming + f.ratingExperience) / 4, 0) / 
    (events.reduce((sum, e) => sum + e.feedbacks.length, 0) || 1)
  ).toFixed(1) : "N/A";

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">Dashboard</h1>
          <p className="mt-2 text-[var(--muted-foreground)]">Manage your campus events in one place.</p>
        </div>
        <Link
          href="/organizer/events/new"
          className="cep-btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
        >
          <Plus className="h-4 w-4" /> New event
        </Link>
      </div>

      {events.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--muted-foreground)]">Total Registrations</p>
                <p className="mt-1 text-2xl font-bold text-[var(--foreground)]">{totalRegistrations}</p>
              </div>
              <Users className="h-8 w-8 text-violet-400/40" />
            </div>
          </Card>
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--muted-foreground)]">Feedback Submitted</p>
                <p className="mt-1 text-2xl font-bold text-[var(--foreground)]">{totalFeedback}</p>
              </div>
              <Zap className="h-8 w-8 text-amber-400/40" />
            </div>
          </Card>
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--muted-foreground)]">Avg Rating</p>
                <p className="mt-1 text-2xl font-bold text-[var(--foreground)]">{avgRating} / 5</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-400/40" />
            </div>
          </Card>
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <h2 className="text-lg font-semibold text-[var(--foreground)]">Your Events</h2>
        <Link
          href="/organizer/learning"
          className="text-sm font-medium text-violet-400 hover:underline"
        >
          View insights →
        </Link>
      </div>

      {events.length === 0 ? (
        <Card className="flex flex-col items-center justify-center px-8 py-20 text-center">
          <Calendar className="mb-4 h-12 w-12 text-[var(--muted-foreground)]" />
          <h2 className="text-lg font-semibold text-[var(--foreground)]">No events yet</h2>
          <p className="mt-2 max-w-sm text-sm text-[var(--muted-foreground)]">
            Create your first event to start collecting registrations and feedback.
          </p>
          <Link
            href="/organizer/events/new"
            className="cep-btn-primary mt-6 inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold text-white"
          >
            <Plus className="h-4 w-4" /> Create event
          </Link>
        </Card>
      ) : (
        <ul className="space-y-3">
          {events.map((e) => (
            <li key={e.id}>
              <Card hover className="flex flex-wrap items-center justify-between gap-4 p-5">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link href={`/events/${e.id}`} className="truncate text-lg font-semibold text-[var(--foreground)] hover:text-violet-400">
                      {e.title}
                    </Link>
                    <Badge variant={e.published ? "success" : "warning"}>{e.published ? "Live" : "Draft"}</Badge>
                  </div>
                  <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--muted-foreground)]">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {format(e.startsAt, "PPp")}
                    </span>
                    <span>{e._count.registrations} registered</span>
                    <span className="inline-flex items-center gap-1">
                      <ClipboardList className="h-3.5 w-3.5" />
                      {e._count.tasks} tasks
                    </span>
                    {e._count.feedbacks > 0 && <span className="text-violet-400">{e._count.feedbacks} feedback</span>}
                  </p>
                </div>
                <Link
                  href={`/organizer/events/${e.id}/edit`}
                  className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-violet-400 transition-colors hover:text-violet-300"
                >
                  Manage <ArrowRight className="h-4 w-4" />
                </Link>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
