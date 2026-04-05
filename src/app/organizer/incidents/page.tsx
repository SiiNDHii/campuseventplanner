import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { AlertCircle, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";

export default async function IncidentsPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const incidents = await prisma.incident.findMany({
    where: { userId: session.userId },
    include: {
      event: { select: { id: true, title: true } },
      user: { select: { name: true, email: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  const categoryColors: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
    LATE_START: { bg: "bg-yellow-500/10", text: "text-yellow-600 dark:text-yellow-400", icon: "⏰" },
    POOR_MANAGEMENT: { bg: "bg-red-500/10", text: "text-red-600 dark:text-red-400", icon: "👥" },
    VENUE_ISSUE: { bg: "bg-orange-500/10", text: "text-orange-600 dark:text-orange-400", icon: "📍" },
    OTHER: { bg: "bg-blue-500/10", text: "text-blue-600 dark:text-blue-400", icon: "❓" },
  };

  return (
    <div className="space-y-8 pb-8">
      <Link
        href="/notifications"
        className="inline-flex items-center gap-2 text-sm font-medium text-[var(--muted-foreground)] hover:text-violet-400"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to notifications
      </Link>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">Your Incident Reports</h1>
        <p className="text-[var(--muted-foreground)]">Help organizers improve by reporting issues you experienced.</p>
      </div>

      {incidents.length === 0 ? (
        <Card className="flex flex-col items-center justify-center px-8 py-20 text-center">
          <CheckCircle className="mb-4 h-12 w-12 text-green-500/60" />
          <h2 className="text-lg font-semibold text-[var(--foreground)]">No incidents reported</h2>
          <p className="mt-2 max-w-sm text-sm text-[var(--muted-foreground)]">
            Hope your events have been running smoothly!
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {incidents.map((incident: typeof incidents[0]) => {
            const categoryInfo = categoryColors[incident.category] || categoryColors.OTHER;
            return (
              <Card key={incident.id} className="p-5 hover:bg-[var(--muted)]/30 transition-colors">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Link
                        href={`/events/${incident.eventId}`}
                        className="text-sm font-semibold text-violet-400 hover:underline"
                      >
                        {incident.event.title}
                      </Link>
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryInfo.bg} ${categoryInfo.text}`}>
                        {incident.category.replace(/_/g, " ")}
                      </span>
                      {incident.isAnonymous && <span className="text-xs text-[var(--muted-foreground)]">Anonymous</span>}
                    </div>
                    <p className="mt-2 text-sm text-[var(--foreground)]">{incident.description}</p>
                    <p className="mt-3 text-xs text-[var(--muted-foreground)]">
                      {format(incident.createdAt, "PPp")}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
