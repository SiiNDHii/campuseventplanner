"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function markNotificationRead(id: string): Promise<void> {
  const session = await getSession();
  if (!session) return;

  await prisma.notification.updateMany({
    where: { id, userId: session.userId },
    data: { read: true },
  });

  revalidatePath("/notifications");
}

export async function markAllNotificationsRead(): Promise<void> {
  const session = await getSession();
  if (!session) return;

  await prisma.notification.updateMany({
    where: { userId: session.userId, read: false },
    data: { read: true },
  });

  revalidatePath("/notifications");
}
