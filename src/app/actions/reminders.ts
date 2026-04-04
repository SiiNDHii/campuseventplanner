"use server";

import { revalidatePath } from "next/cache";
import { getSession, isOrganizerRole } from "@/lib/auth";
import { processEventReminders } from "@/lib/reminders";

export async function runRemindersNow(): Promise<void> {
  const session = await getSession();
  if (!session || !isOrganizerRole(session.role)) return;

  await processEventReminders();
  revalidatePath("/notifications");
  revalidatePath("/organizer/learning");
}
