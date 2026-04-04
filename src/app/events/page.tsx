import { connection } from "next/server";
import { getSession, isOrganizerRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { EventsExplorer } from "@/components/events/EventsExplorer";

export default async function EventsPage() {
  await connection();
  const session = await getSession();

  const since = new Date();
  since.setTime(since.getTime() - 24 * 60 * 60 * 1000);

  const published = await prisma.event.findMany({
    where: { published: true, startsAt: { gte: since } },
    orderBy: { startsAt: "asc" },
    include: {
      _count: { select: { registrations: true } },
    },
  });

  let drafts: Awaited<ReturnType<typeof prisma.event.findMany>> = [];
  if (session && isOrganizerRole(session.role)) {
    drafts = await prisma.event.findMany({
      where: {
        published: false,
        ...(session.role === "ADMIN" ? {} : { organizerId: session.userId }),
      },
      orderBy: { updatedAt: "desc" },
      include: { _count: { select: { registrations: true } } },
    });
  }

  return (
    <EventsExplorer
      published={published.map((e) => ({
        id: e.id,
        title: e.title,
        venue: e.venue,
        description: e.description,
        startsAt: e.startsAt.toISOString(),
        registrationCount: e._count.registrations,
      }))}
      drafts={drafts.map((e) => ({ id: e.id, title: e.title, venue: e.venue }))}
      showCreate={Boolean(session && isOrganizerRole(session.role))}
    />
  );
}
