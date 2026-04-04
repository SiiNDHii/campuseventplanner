"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession, isOrganizerRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { entityIdSchema, parseEventFormData } from "@/lib/validation/schemas";

export type EventActionState = { error?: string; success?: string } | null;

export async function createEventFormAction(
  _prev: EventActionState,
  formData: FormData
): Promise<EventActionState> {
  const session = await getSession();
  if (!session || !isOrganizerRole(session.role)) {
    return { error: "You must be signed in as an organizer to create events." };
  }

  const parsed = parseEventFormData(formData);
  if (!parsed.success) {
    return { error: parsed.error };
  }
  const { title, description, venue, startsAtDate: startsAt, published } = parsed.data;

  const event = await prisma.event.create({
    data: {
      title,
      description,
      venue,
      startsAt,
      published,
      organizerId: session.userId,
    },
  });

  revalidatePath("/events");
  revalidatePath("/organizer/events");
  redirect(`/organizer/events/${event.id}/edit`);
}

export async function updateEventFormAction(
  eventId: string,
  _prev: EventActionState,
  formData: FormData
): Promise<EventActionState> {
  const session = await getSession();
  if (!session || !isOrganizerRole(session.role)) {
    return { error: "Unauthorized." };
  }

  const idCheck = entityIdSchema.safeParse(eventId);
  if (!idCheck.success) {
    return { error: "Invalid event." };
  }

  const existing = await prisma.event.findUnique({ where: { id: eventId } });
  if (!existing || (existing.organizerId !== session.userId && session.role !== "ADMIN")) {
    return { error: "Event not found or you don’t have access." };
  }

  const parsed = parseEventFormData(formData);
  if (!parsed.success) {
    return { error: parsed.error };
  }
  const { title, description, venue, startsAtDate: startsAt, published } = parsed.data;

  await prisma.event.update({
    where: { id: eventId },
    data: { title, description, venue, startsAt, published },
  });

  revalidatePath("/events");
  revalidatePath(`/events/${eventId}`);
  revalidatePath("/organizer/events");
  revalidatePath(`/organizer/events/${eventId}/edit`);

  return { success: "Changes saved." };
}

export async function deleteEvent(eventId: string): Promise<void> {
  const session = await getSession();
  if (!session || !isOrganizerRole(session.role)) return;

  if (!entityIdSchema.safeParse(eventId).success) return;

  const existing = await prisma.event.findUnique({ where: { id: eventId } });
  if (!existing || (existing.organizerId !== session.userId && session.role !== "ADMIN")) return;

  await prisma.event.delete({ where: { id: eventId } });
  revalidatePath("/events");
  revalidatePath("/organizer/events");
  redirect("/organizer/events");
}
