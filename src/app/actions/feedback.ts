"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { FormActionState } from "@/lib/action-state";
import { entityIdSchema, feedbackFormSchema } from "@/lib/validation/schemas";

export async function submitFeedbackFormAction(
  eventId: string,
  _prev: FormActionState,
  formData: FormData
): Promise<FormActionState> {
  if (!entityIdSchema.safeParse(eventId).success) {
    return { error: "Invalid event." };
  }

  const session = await getSession();
  if (!session) {
    return { error: "You must be signed in to submit feedback." };
  }

  const registered = await prisma.registration.findUnique({
    where: {
      userId_eventId: { userId: session.userId, eventId },
    },
  });
  if (!registered) {
    return { error: "Register for this event before leaving feedback." };
  }

  const raw = {
    ratingOrganization: formData.get("ratingOrganization"),
    ratingVenue: formData.get("ratingVenue"),
    ratingTiming: formData.get("ratingTiming"),
    ratingExperience: formData.get("ratingExperience"),
    comment: formData.get("comment"),
  };
  const parsed = feedbackFormSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check your ratings and try again." };
  }

  const {
    ratingOrganization,
    ratingVenue,
    ratingTiming,
    ratingExperience,
    comment,
  } = parsed.data;

  await prisma.feedback.upsert({
    where: {
      eventId_userId: { eventId, userId: session.userId },
    },
    update: {
      ratingOrganization,
      ratingVenue,
      ratingTiming,
      ratingExperience,
      comment,
    },
    create: {
      eventId,
      userId: session.userId,
      ratingOrganization,
      ratingVenue,
      ratingTiming,
      ratingExperience,
      comment,
    },
  });

  revalidatePath(`/events/${eventId}`);
  revalidatePath("/organizer/learning");

  return { success: "Feedback saved." };
}
