import Link from "next/link";
import { redirect } from "next/navigation";
import { QrCode, CheckCircle, AlertCircle } from "lucide-react";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { MarkAttendedButton } from "@/components/attendance/MarkAttendedButton";

interface ScanPageProps {
  params: Promise<{ id: string }>;
}

export default async function EventScanPage({ params }: ScanPageProps) {
  const { id } = await params;
  const session = await getSession();

  if (!session) {
    redirect(`/login?next=/events/${id}/scan`);
  }

  // Fetch event details
  const event = await prisma.event.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      startsAt: true,
      venue: true,
      organizer: { select: { name: true } },
    },
  });

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <AlertCircle className="h-12 w-12 text-red-400" />
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Event not found</h1>
        <p className="text-[var(--muted-foreground)]">This QR code may be invalid or expired.</p>
        <Link
          href="/events"
          className="cep-btn-primary mt-4 rounded-lg px-6 py-2.5 font-semibold"
        >
          Browse Events
        </Link>
      </div>
    );
  }

  // Check if event has passed
  const eventHasPassed = event.startsAt <= new Date();

  if (!eventHasPassed) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <AlertCircle className="h-12 w-12 text-yellow-400" />
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Event hasn't started yet</h1>
        <p className="text-[var(--muted-foreground)]">You can only mark attendance after the event ends.</p>
        <Link
          href={`/events/${event.id}`}
          className="cep-btn-primary mt-4 rounded-lg px-6 py-2.5 font-semibold"
        >
          View Event
        </Link>
      </div>
    );
  }

  // Check registration
  const registration = await prisma.registration.findFirst({
    where: {
      userId: session.userId,
      eventId: id,
    },
    select: {
      id: true,
      attended: true,
    },
  });

  if (!registration) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <AlertCircle className="h-12 w-12 text-orange-400" />
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Not registered for this event</h1>
        <p className="text-[var(--muted-foreground)]">You need to register first to mark attendance.</p>
        <Link
          href={`/events/${event.id}`}
          className="cep-btn-primary mt-4 rounded-lg px-6 py-2.5 font-semibold"
        >
          View Event
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8 py-10">
      {/* Header */}
      <div className="flex items-center gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-400">
          <QrCode className="h-6 w-6" />
        </span>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">Mark Attendance</h1>
          <p className="mt-1 text-[var(--muted-foreground)]">Scanned via QR Code</p>
        </div>
      </div>

      {/* Event Card */}
      <Card className="space-y-6 p-6">
        <div>
          <h2 className="text-2xl font-bold text-[var(--foreground)]">{event.title}</h2>
          <p className="mt-2 text-[var(--muted-foreground)]">{event.venue}</p>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            by {event.organizer.name || "Campus"}
          </p>
        </div>

        {registration.attended ? (
          <div className="flex items-center gap-3 rounded-lg bg-green-500/10 px-4 py-3">
            <CheckCircle className="h-5 w-5 text-green-400" />
            <div>
              <p className="font-semibold text-green-300">Already marked as attended</p>
              <p className="text-sm text-green-200/70">Your attendance has been recorded</p>
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              <p className="text-[var(--muted-foreground)]">
                Confirm that you attended this event by clicking the button below:
              </p>
              <MarkAttendedButton eventId={event.id} isAttended={registration.attended} />
            </div>
          </>
        )}
      </Card>

      {/* Help */}
      <div className="rounded-lg border border-[var(--border)] bg-[var(--muted)]/30 p-4 text-sm text-[var(--muted-foreground)]">
        <p className="font-medium text-[var(--foreground)]">Having issues?</p>
        <p className="mt-2">
          If the QR code scanning didn't work properly, you can also mark your attendance directly from the event page.
        </p>
        <Link
          href={`/events/${event.id}`}
          className="mt-3 inline-block font-medium text-violet-400 hover:text-violet-300"
        >
          Go to event page →
        </Link>
      </div>
    </div>
  );
}
