import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import {
  ArrowLeft,
  Calendar,
  Megaphone,
  MapPin,
  Pencil,
  UserRound,
  Users,
  ClipboardList,
} from "lucide-react";
import { getSession, isOrganizerRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  EventRegistrationBlock,
  EventRegistrationLoginHint,
} from "@/components/events/EventRegistrationBlock";
import { EventFeedbackForm } from "@/components/events/EventFeedbackForm";
import { EventIncidentForm } from "@/components/events/EventIncidentForm";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getSession();

  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      organizer: { select: { name: true, email: true } },
      announcements: { orderBy: { createdAt: "desc" }, take: 20 },
      _count: { select: { registrations: true } },
    },
  });

  if (!event) notFound();

  const canViewUnpublished =
    session &&
    isOrganizerRole(session.role) &&
    (session.role === "ADMIN" || event.organizerId === session.userId);

  if (!event.published && !canViewUnpublished) {
    notFound();
  }

  const registration = session
    ? await prisma.registration.findUnique({
        where: { userId_eventId: { userId: session.userId, eventId: id } },
      })
    : null;

  const existingFeedback = session
    ? await prisma.feedback.findUnique({
        where: { eventId_userId: { eventId: id, userId: session.userId } },
      })
    : null;

  return (
    <div className="space-y-10 pb-8">
      <Link
        href="/events"
        className="inline-flex items-center gap-2 text-sm font-medium text-[var(--muted-foreground)] transition-colors hover:text-violet-400"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to events
      </Link>

      <div className="relative overflow-hidden rounded-3xl border border-[var(--card-border)] bg-[var(--card)]/50 p-8 sm:p-10">
        <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 translate-x-1/4 -translate-y-1/4 rounded-full bg-violet-600/15 blur-3xl" />
        {!event.published && (
          <Badge variant="warning" className="mb-4">
            Draft — not public
          </Badge>
        )}
        <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">{event.title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--muted-foreground)]">{event.description}</p>

        <dl className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="flex gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
              <Calendar className="h-5 w-5" />
            </span>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wider text-[var(--muted-foreground)]">When</dt>
              <dd className="mt-1 font-medium text-[var(--foreground)]">{format(event.startsAt, "PPP p")}</dd>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
              <MapPin className="h-5 w-5" />
            </span>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wider text-[var(--muted-foreground)]">Venue</dt>
              <dd className="mt-1 font-medium text-[var(--foreground)]">{event.venue}</dd>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
              <UserRound className="h-5 w-5" />
            </span>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wider text-[var(--muted-foreground)]">Organizer</dt>
              <dd className="mt-1 font-medium text-[var(--foreground)]">{event.organizer.name ?? event.organizer.email}</dd>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400">
              <Users className="h-5 w-5" />
            </span>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wider text-[var(--muted-foreground)]">Registrations</dt>
              <dd className="mt-1 font-medium text-[var(--foreground)]">{event._count.registrations}</dd>
            </div>
          </div>
        </dl>
      </div>

      {session && isOrganizerRole(session.role) && (session.role === "ADMIN" || event.organizerId === session.userId) && (
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/organizer/events/${id}/edit`}
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--card-border)] bg-[var(--muted)]/50 px-4 py-2.5 text-sm font-medium text-[var(--foreground)] transition-all hover:bg-[var(--muted)]"
            )}
          >
            <Pencil className="h-4 w-4" /> Edit
          </Link>
          <Link
            href={`/organizer/events/${id}/tasks`}
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--card-border)] bg-[var(--muted)]/50 px-4 py-2.5 text-sm font-medium text-[var(--foreground)] transition-all hover:bg-[var(--muted)]"
            )}
          >
            <ClipboardList className="h-4 w-4" /> Tasks
          </Link>
          <Link
            href={`/organizer/events/${id}/participants`}
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--card-border)] bg-[var(--muted)]/50 px-4 py-2.5 text-sm font-medium text-[var(--foreground)] transition-all hover:bg-[var(--muted)]"
            )}
          >
            <Users className="h-4 w-4" /> Participants
          </Link>
        </div>
      )}

      {event.published && (
        <Card className="p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">Registration</h2>
          {!session ? (
            <EventRegistrationLoginHint />
          ) : (
            <EventRegistrationBlock eventId={id} hasRegistration={!!registration} />
          )}
        </Card>
      )}

      {event.announcements.length > 0 && (
        <section>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-[var(--foreground)]">
            <Megaphone className="h-5 w-5 text-violet-400" />
            Announcements
          </h2>
          <ul className="space-y-3">
            {event.announcements.map((a) => (
              <li key={a.id}>
                <Card className="p-4">
                  <p className="text-xs text-[var(--muted-foreground)]">{format(a.createdAt, "PPp")}</p>
                  <p className="mt-2 whitespace-pre-wrap text-sm text-[var(--foreground)]">{a.message}</p>
                </Card>
              </li>
            ))}
          </ul>
        </section>
      )}

      {event.published && registration && (
        <Card className="p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">Feedback</h2>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            Rate organization, venue, timing, and overall experience (1–5). You can update anytime.
          </p>
          <EventFeedbackForm eventId={id} existingFeedback={existingFeedback} />
        </Card>
      )}

      {event.published && (
        <Card className="p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">Report an issue</h2>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            Optional anonymous reports. Signed-in users can attach identity by unchecking anonymous.
          </p>
          <EventIncidentForm eventId={id} showAnonymousOption={!!session} />
        </Card>
      )}
    </div>
  );
}
