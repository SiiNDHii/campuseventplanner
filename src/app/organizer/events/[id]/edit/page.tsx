import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { getSession, isOrganizerRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { EventEditForm } from "@/components/events/EventEditForm";

function toLocalInput(d: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  const y = d.getFullYear();
  const m = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const h = pad(d.getHours());
  const min = pad(d.getMinutes());
  return `${y}-${m}-${day}T${h}:${min}`;
}

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getSession();
  if (!session || !isOrganizerRole(session.role)) notFound();

  const event = await prisma.event.findUnique({ where: { id } });
  if (!event) notFound();
  if (session.role !== "ADMIN" && event.organizerId !== session.userId) notFound();

  return (
    <div className="mx-auto max-w-lg space-y-8 pb-8">
      <Link
        href="/organizer/events"
        className="inline-flex text-sm font-medium text-[var(--muted-foreground)] hover:text-violet-400"
      >
        ← Dashboard
      </Link>
      <div>
        <h1 className="text-3xl font-bold text-[var(--foreground)]">Edit event</h1>
        <Link
          href={`/events/${id}`}
          className="mt-2 inline-flex items-center gap-1 text-sm text-violet-400 hover:underline"
        >
          View public page <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>

      <EventEditForm
        event={{
          id: event.id,
          title: event.title,
          venue: event.venue,
          description: event.description,
          startsAtLocal: toLocalInput(event.startsAt),
          published: event.published,
        }}
      />

      <div className="flex flex-wrap gap-3">
        <Link
          href={`/organizer/events/${id}/tasks`}
          className="rounded-xl border border-[var(--card-border)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--muted)]/50"
        >
          Tasks
        </Link>
        <Link
          href={`/organizer/events/${id}/participants`}
          className="rounded-xl border border-[var(--card-border)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--muted)]/50"
        >
          Participants
        </Link>
        <a
          href={`/events/${id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-[var(--card-border)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--muted)]/50"
        >
          View Public Page ↗
        </a>
      </div>
    </div>
  );
}
