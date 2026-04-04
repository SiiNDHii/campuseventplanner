"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { FormActionState } from "@/lib/action-state";
import { entityIdSchema, incidentFormSchema } from "@/lib/validation/schemas";

export async function reportIncidentFormAction(
  eventId: string,
  _prev: FormActionState,
  formData: FormData
): Promise<FormActionState> {
  if (!entityIdSchema.safeParse(eventId).success) {
    return { error: "Invalid event." };
  }

  const session = await getSession();

  const raw = {
    category: formData.get("category"),
    description: formData.get("description"),
    anonymous: formData.get("anonymous") === "on",
  };
  const parsed = incidentFormSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please fix the form and try again." };
  }

  const { category, description, anonymous } = parsed.data;

  if (anonymous || !session) {
    await prisma.incident.create({
      data: {
        eventId,
        userId: null,
        category,
        description,
        isAnonymous: true,
      },
    });
  } else {
    await prisma.incident.create({
      data: {
        eventId,
        userId: session.userId,
        category,
        description,
        isAnonymous: false,
      },
    });
  }

  revalidatePath(`/events/${eventId}`);
  revalidatePath("/organizer/learning");

  return { success: "Report submitted. Thank you." };
}
