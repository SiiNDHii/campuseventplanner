import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { Users } from "lucide-react";
import { getSession, isOrganizerRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function ParticipantsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getSession();
  if (!session || !isOrganizerRole(session.role)) notFound();

  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      registrations: {
        orderBy: { createdAt: "asc" },
        include: { user: { select: { email: true, name: true, role: true } } },
      },
    },
  });
  if (!event) notFound();
  if (session.role !== "ADMIN" && event.organizerId !== session.userId) notFound();

  return (
    <div className="space-y-8 pb-8">
      <Link
        href={`/organizer/events/${id}/edit`}
        className="inline-flex text-sm font-medium text-[var(--muted-foreground)] hover:text-violet-400"
      >
        ← Back to event
      </Link>
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
          <Users className="h-5 w-5" />
        </span>
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Participants</h1>
          <p className="text-sm text-[var(--muted-foreground)]">
            {event.registrations.length} registered · {event.title}
          </p>
        </div>
      </div>

      {event.registrations.length === 0 ? (
        <Card className="p-10 text-center text-[var(--muted-foreground)]">No registrations yet.</Card>
      ) : (
        <Card className="overflow-hidden p-0">
          <ul className="divide-y divide-[var(--card-border)]">
            {event.registrations.map((r) => (
              <li key={r.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
                <div>
                  <span className="font-medium text-[var(--foreground)]">{r.user.name ?? r.user.email}</span>
                  <span className="ml-2 text-sm text-[var(--muted-foreground)]">{r.user.email}</span>
                  <Badge variant="outline" className="ml-2">
                    {r.user.role}
                  </Badge>
                </div>
                <span className="text-xs text-[var(--muted-foreground)]">{format(r.createdAt, "PPp")}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}
