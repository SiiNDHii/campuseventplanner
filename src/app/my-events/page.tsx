import Link from "next/link";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import { CalendarCheck, ArrowRight, Sparkles, CheckCircle } from "lucide-react";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function MyEventsPage() {
  const session = await getSession();
  if (!session) redirect("/login?next=/my-events");

  const registrations = await prisma.registration.findMany({
    where: { userId: session.userId },
    include: {
      event: {
        select: { id: true, title: true, startsAt: true, venue: true, description: true, organizer: { select: { name: true } } },
      },
    },
    orderBy: { event: { startsAt: "asc" } },
  });

  const upcomingEvents = registrations.filter((r: typeof registrations[0]) => r.event.startsAt > new Date());
  const pastEvents = registrations.filter((r: typeof registrations[0]) => r.event.startsAt <= new Date());

  return (
    <div className="space-y-10 pb-10">
      <div className="flex items-center gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-400">
          <CalendarCheck className="h-6 w-6" />
        </span>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">My Events</h1>
          <p className="mt-2 text-[var(--muted-foreground)]">Events you're registered for</p>
        </div>
      </div>

      {registrations.length === 0 ? (
        <Card className="flex flex-col items-center justify-center px-8 py-20 text-center">
          <CalendarCheck className="mb-4 h-12 w-12 text-[var(--muted-foreground)]" />
          <h2 className="text-lg font-semibold text-[var(--foreground)]">No registrations yet</h2>
          <p className="mt-2 max-w-sm text-sm text-[var(--muted-foreground)]">
            Discover and register for campus events to see them here.
          </p>
          <Link
            href="/events"
            className="cep-btn-primary mt-6 inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold text-white"
          >
            Browse events <ArrowRight className="h-4 w-4" />
          </Link>
        </Card>
      ) : (
        <div className="space-y-10">
          {upcomingEvents.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-violet-400" />
                <h2 className="text-lg font-semibold text-[var(--foreground)]">Upcoming ({upcomingEvents.length})</h2>
              </div>
              <ul className="space-y-3">
                {upcomingEvents.map((reg: typeof registrations[0]) => (
                  <li key={reg.id}>
                    <Link href={`/events/${reg.event.id}`}>
                      <Card hover className="p-5">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div className="min-w-0 flex-1">
                            <h3 className="text-lg font-semibold text-[var(--foreground)] hover:text-violet-400">
                              {reg.event.title}
                            </h3>
                            <p className="mt-2 text-sm text-[var(--muted-foreground)]">{reg.event.venue}</p>
                            <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                              by {reg.event.organizer.name || "Campus"}
                            </p>
                            <p className="mt-3 text-sm font-medium text-[var(--foreground)]">
                              {format(reg.event.startsAt, "PPp")}
                            </p>
                          </div>
                          <Badge variant="success" className="shrink-0">
                            Registered
                          </Badge>
                        </div>
                      </Card>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {pastEvents.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-lg font-semibold text-[var(--foreground)]">Past Events ({pastEvents.length})</h2>
              <ul className="space-y-3">
                {pastEvents.map((reg: typeof registrations[0]) => (
                  <li key={reg.id}>
                    <Link href={`/events/${reg.event.id}`}>
                      <Card className="p-5 hover:bg-[var(--muted)]/30 transition-colors">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start gap-2">
                              <h3 className="text-lg font-semibold text-[var(--foreground)]">{reg.event.title}</h3>
                            </div>
                            <p className="mt-2 text-sm text-[var(--muted-foreground)]">{reg.event.venue}</p>
                            <p className="mt-3 text-sm text-[var(--muted-foreground)]">
                              {format(reg.event.startsAt, "PPp")}
                            </p>
                          </div>
                          <div className="shrink-0 flex flex-col gap-2">
                            {reg.attended ? (
                              <Badge variant="success" className="flex items-center gap-1">
                                <CheckCircle className="h-3 w-3" />
                                Attended
                              </Badge>
                            ) : (
                              <Badge variant="outline">
                                Registered
                              </Badge>
                            )}
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
