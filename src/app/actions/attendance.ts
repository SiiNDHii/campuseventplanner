"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function markEventAsAttended(eventId: string): Promise<{ error?: string; success?: string }> {
  const session = await getSession();
  if (!session) {
    return { error: "You must be signed in." };
  }

  try {
    // Check if user is registered for this event
    const registration = await prisma.registration.findUnique({
      where: {
        userId_eventId: {
          userId: session.userId,
          eventId: eventId,
        },
      },
    });

    if (!registration) {
      return { error: "You are not registered for this event." };
    }

    // Update registration to mark as attended
    await prisma.registration.update({
      where: {
        userId_eventId: {
          userId: session.userId,
          eventId: eventId,
        },
      },
      data: {
        attended: true,
        attendedAt: new Date(),
      },
    });

    revalidatePath("/my-events");
    revalidatePath(`/events/${eventId}`);

    return { success: "Event marked as attended!" };
  } catch (err) {
    console.error("Error marking event as attended:", err);
    return { error: "Failed to mark event as attended." };
  }
}
