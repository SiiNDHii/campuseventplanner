import { connection } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { BarChart3, Users, Calendar, Sparkles } from "lucide-react";
import { DashboardStatCard } from "@/components/dashboard/DashboardStatCard";
import { DashboardBase } from "@/components/dashboard/DashboardBase";

export const metadata = {
  title: "Dashboard - Campus Event Planner",
  description: "View your event statistics and manage registrations",
};

export default async function DashboardPage() {
  await connection();
  const session = await getSession();

  // Fetch statistics
  const totalEvents = await prisma.event.count({
    where: { published: true },
  });

  const totalUsers = await prisma.user.count();

  let userStats = {
    registeredEvents: 0,
    totalRegistrations: 0,
    attendedEvents: 0,
    pastFeedback: 0,
  };

  if (session) {
    userStats.registeredEvents = await prisma.registration.count({
      where: { userId: session.userId },
    });

    userStats.totalRegistrations = await prisma.registration.count();

    userStats.pastFeedback = await prisma.feedback.count({
      where: { userId: session.userId },
    });

    // Count attended events for user
    const now = new Date();
    userStats.attendedEvents = await prisma.registration.count({
      where: {
        userId: session.userId,
        event: {
          startsAt: { lt: now },
        },
      },
    });
  }

  // Fetch recent events
  const since = new Date();
  since.setTime(since.getTime() - 24 * 60 * 60 * 1000);

  const recentEvents = await prisma.event.findMany({
    where: { published: true, startsAt: { gte: since } },
    orderBy: { startsAt: "asc" },
    take: 6,
    include: {
      _count: { select: { registrations: true } },
    },
  });

  // Fetch user's registered events
  let userRegisteredEvents = [];
  if (session) {
    userRegisteredEvents = await prisma.registration.findMany({
      where: { userId: session.userId },
      include: {
        event: {
          select: {
            id: true,
            title: true,
            startsAt: true,
            venue: true,
            description: true,
            organizer: { select: { name: true } },
            _count: { select: { registrations: true } },
          },
        },
      },
      orderBy: { event: { startsAt: "desc" } },
    });
  }

  return (
    <DashboardBase
      stats={{
        totalEvents,
        totalUsers,
        userRegisteredEvents: userStats.registeredEvents,
        userAttendedEvents: userStats.attendedEvents,
      }}
      recentEvents={recentEvents.map((e: any) => ({
        id: e.id,
        title: e.title,
        venue: e.venue,
        description: e.description,
        startsAt: e.startsAt.toISOString(),
        registrationCount: e._count.registrations,
      }))}
      userRegisteredEvents={userRegisteredEvents.map((reg: any) => ({
        id: reg.event.id,
        title: reg.event.title,
        venue: reg.event.venue,
        startsAt: reg.event.startsAt,
        description: reg.event.description,
        registrationCount: reg.event._count.registrations,
        organizerName: reg.event.organizer?.name,
      }))}
      isAuthenticated={Boolean(session)}
      userName={session?.email}
    />
  );
}
