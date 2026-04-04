import Link from "next/link";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import { Bell } from "lucide-react";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { MarkAllNotificationsForm, MarkNotificationReadForm } from "@/components/notifications/NotificationActionForms";

export default async function NotificationsPage() {
  const session = await getSession();
  if (!session) redirect("/login?next=/notifications");

  const items = await prisma.notification.findMany({
    where: { userId: session.userId },
    orderBy: { createdAt: "desc" },
    take: 100,
    include: { event: { select: { id: true, title: true } } },
  });

  const unread = items.filter((n) => !n.read).length;

  return (
    <div className="space-y-8 pb-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-400">
            <Bell className="h-6 w-6" />
          </span>
          <div>
            <h1 className="text-3xl font-bold text-[var(--foreground)]">Notifications</h1>
            {unread > 0 && (
              <p className="text-sm text-violet-400">
                {unread} unread
              </p>
            )}
          </div>
        </div>
        {items.length > 0 && <MarkAllNotificationsForm />}
      </div>

      {items.length === 0 ? (
        <Card className="flex flex-col items-center px-8 py-16 text-center">
          <Bell className="mb-4 h-10 w-10 text-[var(--muted-foreground)]" />
          <p className="text-[var(--muted-foreground)]">You&apos;re all caught up.</p>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            Reminders and organizer updates will show up here.
          </p>
          <Link
            href="/events"
            className="cep-btn-primary mt-6 inline-flex rounded-xl px-6 py-2.5 text-sm font-semibold text-white"
          >
            Browse events
          </Link>
        </Card>
      ) : (
        <ul className="space-y-3">
          {items.map((n) => (
            <li key={n.id}>
              <Card
                className={`p-5 transition-all ${
                  !n.read
                    ? "border-violet-500/30 bg-violet-500/[0.06] shadow-lg shadow-violet-500/5"
                    : ""
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-[var(--foreground)]">{n.title}</p>
                    <p className="mt-1 text-sm text-[var(--muted-foreground)]">{n.body}</p>
                    <p className="mt-3 text-xs text-[var(--muted-foreground)]">{format(n.createdAt, "PPp")}</p>
                    {n.event && (
                      <Link
                        href={`/events/${n.event.id}`}
                        className="mt-3 inline-flex text-sm font-medium text-violet-400 hover:underline"
                      >
                        Open: {n.event.title}
                      </Link>
                    )}
                  </div>
                  {!n.read && <MarkNotificationReadForm notificationId={n.id} />}
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
