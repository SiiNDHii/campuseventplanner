"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { FormActionState } from "@/lib/action-state";
import { entityIdSchema } from "@/lib/validation/schemas";

export async function registerForEventFormAction(
  eventId: string,
  _prev: FormActionState,
  _formData: FormData
): Promise<FormActionState> {
  void _prev;
  void _formData;
  if (!entityIdSchema.safeParse(eventId).success) {
    return { error: "Invalid event." };
  }

  const session = await getSession();
  if (!session) {
    return { error: "You must be signed in to register." };
  }

  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event || !event.published) {
    return { error: "This event is not available for registration." };
  }

  await prisma.registration.upsert({
    where: {
      userId_eventId: { userId: session.userId, eventId },
    },
    update: {},
    create: { userId: session.userId, eventId },
  });

  revalidatePath("/events");
  revalidatePath(`/events/${eventId}`);

  return { success: "You’re registered for this event." };
}

export async function unregisterFromEventFormAction(
  eventId: string,
  _prev: FormActionState,
  _formData: FormData
): Promise<FormActionState> {
  void _prev;
  void _formData;
  if (!entityIdSchema.safeParse(eventId).success) {
    return { error: "Invalid event." };
  }

  const session = await getSession();
  if (!session) {
    return { error: "You must be signed in." };
  }

  await prisma.registration.deleteMany({
    where: { userId: session.userId, eventId },
  });

  revalidatePath("/events");
  revalidatePath(`/events/${eventId}`);

  return { success: "You’re no longer registered." };
}
