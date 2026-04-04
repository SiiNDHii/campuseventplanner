import Link from "next/link";
import { notFound } from "next/navigation";
import { Sparkles } from "lucide-react";
import { getSession, isOrganizerRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { INCIDENT_CATEGORIES } from "@/lib/constants";
import { Card } from "@/components/ui/card";
import { RunRemindersForm } from "@/components/organizer/RunRemindersForm";

function categoryLabel(value: string) {
  return INCIDENT_CATEGORIES.find((c) => c.value === value)?.label ?? value;
}

function avg(nums: number[]) {
  if (nums.length === 0) return null;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

function overallScore(f: {
  ratingOrganization: number;
  ratingVenue: number;
  ratingTiming: number;
  ratingExperience: number;
}) {
  return (f.ratingOrganization + f.ratingVenue + f.ratingTiming + f.ratingExperience) / 4;
}

export default async function LearningPage() {
  const session = await getSession();
  if (!session || !isOrganizerRole(session.role)) notFound();

  const events = await prisma.event.findMany({
    where: session.role === "ADMIN" ? {} : { organizerId: session.userId },
    include: {
      feedbacks: true,
      incidents: { orderBy: { createdAt: "desc" }, take: 50 },
      registrations: true,
    },
    orderBy: { startsAt: "desc" },
  });

  const incidentByCategory: Record<string, number> = {};
  for (const e of events) {
    for (const i of e.incidents) {
      incidentByCategory[i.category] = (incidentByCategory[i.category] ?? 0) + 1;
    }
  }

  const allComments = events.flatMap((e) =>
    e.feedbacks.filter((f) => f.comment && f.comment.trim()).map((f) => ({ eventTitle: e.title, comment: f.comment! }))
  );

  return (
    <div className="space-y-10 pb-10">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/30 to-blue-500/20 text-violet-300">
            <Sparkles className="h-6 w-6" />
          </span>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">Insights</h1>
            <p className="mt-2 max-w-xl text-[var(--muted-foreground)]">
              Averages, incident themes, written suggestions, and event comparison — learn what to improve next.
            </p>
          </div>
        </div>
        <RunRemindersForm />
      </div>
      <p className="text-xs text-[var(--muted-foreground)]">
        Reminders create in-app notifications (~24h and ~1h before start) for registered users. For production, schedule{" "}
        <code className="rounded-md bg-[var(--muted)]/80 px-1.5 py-0.5 text-[var(--foreground)]/80">
          POST /api/reminders/process
        </code>
        .
      </p>

      <section>
        <h2 className="text-lg font-semibold text-[var(--foreground)]">Event comparison</h2>
        <Card className="mt-4 overflow-x-auto p-0">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead className="border-b border-[var(--card-border)] bg-[var(--muted)]/30">
              <tr>
                <th className="px-4 py-3 font-medium text-[var(--foreground)]">Event</th>
                <th className="px-4 py-3 font-medium text-[var(--foreground)]">Registrations</th>
                <th className="px-4 py-3 font-medium text-[var(--foreground)]">Feedback</th>
                <th className="px-4 py-3 font-medium text-[var(--foreground)]">Avg (1–5)</th>
                <th className="px-4 py-3 font-medium text-[var(--foreground)]">Incidents</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--card-border)]">
              {events.map((e) => {
                const scores = e.feedbacks.map(overallScore);
                const average = avg(scores);
                return (
                  <tr key={e.id} className="transition-colors hover:bg-[var(--muted)]/20">
                    <td className="px-4 py-3">
                      <Link href={`/events/${e.id}`} className="font-medium text-violet-400 hover:underline">
                        {e.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-[var(--muted-foreground)]">{e.registrations.length}</td>
                    <td className="px-4 py-3 text-[var(--muted-foreground)]">{e.feedbacks.length}</td>
                    <td className="px-4 py-3 text-[var(--foreground)]">{average != null ? average.toFixed(2) : "—"}</td>
                    <td className="px-4 py-3 text-[var(--muted-foreground)]">{e.incidents.length}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">Common complaints</h2>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">Incident counts by category.</p>
          <ul className="mt-4 space-y-2">
            {Object.keys(incidentByCategory).length === 0 ? (
              <li className="text-sm text-[var(--muted-foreground)]">No incidents reported yet.</li>
            ) : (
              Object.entries(incidentByCategory)
                .sort((a, b) => b[1] - a[1])
                .map(([cat, n]) => (
                  <li
                    key={cat}
                    className="flex justify-between rounded-xl border border-[var(--card-border)] px-4 py-2.5 text-sm"
                  >
                    <span className="text-[var(--foreground)]">{categoryLabel(cat)}</span>
                    <span className="font-semibold text-violet-400">{n}</span>
                  </li>
                ))
            )}
          </ul>
        </Card>
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">Written suggestions</h2>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">Recent attendee comments.</p>
          <ul className="mt-4 max-h-80 space-y-3 overflow-y-auto text-sm">
            {allComments.length === 0 ? (
              <li className="text-[var(--muted-foreground)]">No written feedback yet.</li>
            ) : (
              allComments.slice(0, 20).map((c, i) => (
                <li key={i} className="rounded-xl border border-[var(--card-border)] p-3">
                  <p className="text-xs font-medium text-violet-400/90">{c.eventTitle}</p>
                  <p className="mt-1 whitespace-pre-wrap text-[var(--foreground)]">{c.comment}</p>
                </li>
              ))
            )}
          </ul>
        </Card>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-[var(--foreground)]">Recent incidents</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {(() => {
            const rows = events
              .flatMap((e) => e.incidents.map((i) => ({ ...i, eventTitle: e.title })))
              .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
              .slice(0, 15);
            if (rows.length === 0) {
              return (
                <li className="text-[var(--muted-foreground)]">
                  <Card className="p-8 text-center">No incidents yet.</Card>
                </li>
              );
            }
            return rows.map((i) => (
              <li key={i.id}>
                <Card className="p-4">
                  <div className="flex flex-wrap gap-2 text-xs text-[var(--muted-foreground)]">
                    <span>{i.eventTitle}</span>
                    <span>·</span>
                    <span>{categoryLabel(i.category)}</span>
                    <span>·</span>
                    <span>{i.isAnonymous ? "Anonymous" : "Named"}</span>
                  </div>
                  <p className="mt-2 whitespace-pre-wrap text-[var(--foreground)]">{i.description}</p>
                </Card>
              </li>
            ));
          })()}
        </ul>
      </section>
    </div>
  );
}
