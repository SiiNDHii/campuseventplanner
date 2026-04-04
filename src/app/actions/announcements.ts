"use server";

import { revalidatePath } from "next/cache";
import { getSession, isOrganizerRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { EventActionState } from "@/app/actions/events";
import { announcementMessageSchema, entityIdSchema } from "@/lib/validation/schemas";

export async function postAnnouncementFormAction(
  eventId: string,
  _prev: EventActionState,
  formData: FormData
): Promise<EventActionState> {
  const session = await getSession();
  if (!session || !isOrganizerRole(session.role)) {
    return { error: "Unauthorized." };
  }

  if (!entityIdSchema.safeParse(eventId).success) {
    return { error: "Invalid event." };
  }

  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event) return { error: "Event not found." };
  if (session.role !== "ADMIN" && event.organizerId !== session.userId) {
    return { error: "You can’t post announcements for this event." };
  }

  const msg = announcementMessageSchema.safeParse(formData.get("message"));
  if (!msg.success) {
    return { error: msg.error.issues[0]?.message ?? "Invalid message." };
  }
  const text = msg.data;

  await prisma.announcement.create({
    data: {
      eventId,
      organizerId: session.userId,
      message: text,
    },
  });

  const regs = await prisma.registration.findMany({
    where: { eventId },
    select: { userId: true },
  });

  if (regs.length > 0) {
    await prisma.notification.createMany({
      data: regs.map((r) => ({
        userId: r.userId,
        eventId,
        title: `Update: ${event.title}`,
        body: text.slice(0, 500),
      })),
    });
  }

  revalidatePath(`/events/${eventId}`);
  revalidatePath(`/organizer/events/${eventId}/edit`);

  if (regs.length === 0) {
    return { success: "Announcement posted. No registrants yet — no notifications sent." };
  }
  return { success: "Announcement sent to all registered attendees." };
}
