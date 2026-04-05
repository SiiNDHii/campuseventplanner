import { auth } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import {
  Users,
  BarChart3,
  Shield,
  Settings,
  AlertCircle,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const session = await auth();
  const user = await getCurrentUser();

  // Only allow admins
  if (!session || user?.role !== "ADMIN") {
    redirect("/");
  }

  // Fetch statistics
  const totalUsers = await prisma.user.count();
  const organizers = await prisma.user.count({
    where: { role: "ORGANIZER" },
  });
  const students = await prisma.user.count({
    where: { role: "STUDENT" },
  });
  const totalEvents = await prisma.event.count();
  const publishedEvents = await prisma.event.count({
    where: { published: true },
  });
  const totalRegistrations = await prisma.registration.count();
  const totalFeedback = await prisma.feedback.count();
  const allIncidents = await prisma.incident.findMany({
    include: { event: true },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  const incidentsByCategory = allIncidents.reduce(
    (acc: Record<string, number>, incident: typeof allIncidents[0]) => {
      acc[incident.category] = (acc[incident.category] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const stats = [
    {
      label: "Total Users",
      value: totalUsers,
      icon: Users,
      subtext: `${organizers} Organizers, ${students} Students`,
    },
    {
      label: "Total Events",
      value: totalEvents,
      icon: BarChart3,
      subtext: `${publishedEvents} Published`,
    },
    {
      label: "Registrations",
      value: totalRegistrations,
      icon: TrendingUp,
      subtext: "Active registrations",
    },
    {
      label: "Feedback",
      value: totalFeedback,
      icon: CheckCircle,
      subtext: "Total submissions",
    },
  ];

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <Shield className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-[var(--foreground)]">
            Admin Dashboard
          </h1>
          <p className="text-sm text-[var(--muted-foreground)]">
            Welcome, {user?.name || "Administrator"}
          </p>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-[var(--muted-foreground)]">{stat.label}</p>
                <p className="mt-2 text-3xl font-bold text-[var(--foreground)]">
                  {stat.value.toLocaleString()}
                </p>
                <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                  {stat.subtext}
                </p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                <stat.icon className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/organizer/events">
            <button className="w-full p-4 rounded-lg border border-[var(--card-border)] hover:border-violet-500/50 hover:bg-violet-500/5 transition-all text-left">
              <p className="font-semibold text-[var(--foreground)]">
                Manage Events
              </p>
              <p className="text-sm text-[var(--muted-foreground)] mt-1">
                View and moderate all events
              </p>
            </button>
          </Link>

          <Link href="/">
            <button className="w-full p-4 rounded-lg border border-[var(--card-border)] hover:border-blue-500/50 hover:bg-blue-500/5 transition-all text-left">
              <p className="font-semibold text-[var(--foreground)]">
                System Reports
              </p>
              <p className="text-sm text-[var(--muted-foreground)] mt-1">
                View platform analytics
              </p>
            </button>
          </Link>
        </div>
      </Card>

      {/* Recent Incidents */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-[var(--foreground)] flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Recent Incidents
        </h2>
        {allIncidents.length === 0 ? (
          <Card className="p-6 text-center text-[var(--muted-foreground)]">
            No incidents reported yet.
          </Card>
        ) : (
          <Card className="overflow-hidden p-0">
            <ul className="divide-y divide-[var(--card-border)]">
              {allIncidents.map((incident) => (
                <li
                  key={incident.id}
                  className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/events/${incident.eventId}`}
                      className="font-medium text-violet-400 hover:underline"
                    >
                      {incident.event.title}
                    </Link>
                    <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                      {incident.description}
                    </p>
                    <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                      {incident.category} ·{" "}
                      {format(incident.createdAt, "PPp")}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        )}
      </section>

      {/* Incident Categories */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-[var(--foreground)]">
          Incident Categories
        </h2>
        <Card className="p-5">
          <div className="space-y-3">
            {Object.entries(incidentsByCategory).length === 0 ? (
              <p className="text-sm text-[var(--muted-foreground)]">
                No incident data available
              </p>
            ) : (
              Object.entries(incidentsByCategory).map(([category, count]) => (
                <div
                  key={category}
                  className="flex items-center justify-between p-2 rounded hover:bg-white/5 transition-colors"
                >
                  <span className="text-sm font-medium text-[var(--foreground)]">
                    {category}
                  </span>
                  <span className="text-sm font-semibold text-violet-400">
                    {count as number}
                  </span>
                </div>
              ))
            )}
          </div>
        </Card>
      </section>
    </div>
  );
}
