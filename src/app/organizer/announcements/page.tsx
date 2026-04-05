import { notFound, redirect } from "next/navigation";
import { getSession, isOrganizerRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { MessageSquare, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function AnnouncementsPage() {
  const session = await getSession();
  if (!session || !isOrganizerRole(session.role)) redirect("/login");

  const announcements = await prisma.announcement.findMany({
    where: session.role === "ADMIN" ? {} : { organizerId: session.userId },
    include: {
      event: { select: { id: true, title: true } },
      organizer: { select: { name: true, email: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div className="space-y-8 pb-8">
      <Link
        href="/organizer/events"
        className="inline-flex items-center gap-2 text-sm font-medium text-[var(--muted-foreground)] hover:text-violet-400"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to dashboard
      </Link>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">Announcements</h1>
        <p className="text-[var(--muted-foreground)]">View all announcements sent to event registrants.</p>
      </div>

      {announcements.length === 0 ? (
        <Card className="flex flex-col items-center justify-center px-8 py-20 text-center">
          <MessageSquare className="mb-4 h-12 w-12 text-[var(--muted-foreground)]" />
          <h2 className="text-lg font-semibold text-[var(--foreground)]">No announcements yet</h2>
          <p className="mt-2 max-w-sm text-sm text-[var(--muted-foreground)]">
            Announcements will appear here when you send them to event registrants.
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {announcements.map((announcement: typeof announcements[0]) => (
            <Card key={announcement.id} className="p-5 hover:bg-[var(--muted)]/30 transition-colors">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/events/${announcement.eventId}`}
                    className="text-sm font-semibold text-violet-400 hover:underline"
                  >
                    {announcement.event.title}
                  </Link>
                  <p className="mt-2 text-sm text-[var(--foreground)]">{announcement.message}</p>
                  <p className="mt-3 text-xs text-[var(--muted-foreground)]">
                    {format(announcement.createdAt, "PPp")}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
