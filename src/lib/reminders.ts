import { prisma } from "@/lib/prisma";

function hoursUntil(startsAt: Date, now: Date) {
  return (startsAt.getTime() - now.getTime()) / (1000 * 60 * 60);
}

/** Creates in-app notifications for registered users; idempotent via ReminderLog. */
export async function processEventReminders(now = new Date()) {
  const events = await prisma.event.findMany({
    where: { published: true, startsAt: { gt: now } },
    include: {
      registrations: { select: { userId: true } },
    },
  });

  let created = 0;

  for (const event of events) {
    const h = hoursUntil(event.startsAt, now);

    for (const reg of event.registrations) {
      if (h <= 25 && h >= 23) {
        const existing = await prisma.reminderLog.findUnique({
          where: {
            eventId_userId_kind: {
              eventId: event.id,
              userId: reg.userId,
              kind: "DAY_BEFORE",
            },
          },
        });
        if (!existing) {
          await prisma.$transaction([
            prisma.notification.create({
              data: {
                userId: reg.userId,
                eventId: event.id,
                title: `Tomorrow: ${event.title}`,
                body: `Your event starts in about 24 hours at ${event.venue}.`,
              },
            }),
            prisma.reminderLog.create({
              data: {
                eventId: event.id,
                userId: reg.userId,
                kind: "DAY_BEFORE",
              },
            }),
          ]);
          created += 1;
        }
      }

      if (h <= 1.5 && h >= 0.5) {
        const existing = await prisma.reminderLog.findUnique({
          where: {
            eventId_userId_kind: {
              eventId: event.id,
              userId: reg.userId,
              kind: "HOUR_BEFORE",
            },
          },
        });
        if (!existing) {
          await prisma.$transaction([
            prisma.notification.create({
              data: {
                userId: reg.userId,
                eventId: event.id,
                title: `Starting soon: ${event.title}`,
                body: `Starts in about one hour at ${event.venue}.`,
              },
            }),
            prisma.reminderLog.create({
              data: {
                eventId: event.id,
                userId: reg.userId,
                kind: "HOUR_BEFORE",
              },
            }),
          ]);
          created += 1;
        }
      }
    }
  }

  return { notificationsCreated: created };
}
