"use server";

import { revalidatePath } from "next/cache";
import { getSession, isOrganizerRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { FormActionState } from "@/lib/action-state";
import { entityIdSchema, parseTaskFormData, taskStatusSchema } from "@/lib/validation/schemas";

async function assertOrganizerOwnsEvent(sessionUserId: string, role: string, eventId: string) {
  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event) return null;
  if (role === "ADMIN") return event;
  if (event.organizerId !== sessionUserId) return null;
  return event;
}

export async function createTaskFormAction(
  eventId: string,
  _prev: FormActionState,
  formData: FormData
): Promise<FormActionState> {
  const session = await getSession();
  if (!session || !isOrganizerRole(session.role)) {
    return { error: "Unauthorized." };
  }

  if (!entityIdSchema.safeParse(eventId).success) {
    return { error: "Invalid event." };
  }

  const event = await assertOrganizerOwnsEvent(session.userId, session.role, eventId);
  if (!event) {
    return { error: "Event not found or you don’t have access." };
  }

  const parsed = parseTaskFormData(formData);
  if (!parsed.success) {
    return { error: parsed.error };
  }
  const { name, assignedToId, deadline } = parsed.data;

  const assignee = await prisma.user.findUnique({ where: { id: assignedToId } });
  if (!assignee) {
    return { error: "That assignee was not found." };
  }

  await prisma.task.create({
    data: {
      eventId,
      name,
      assignedToId,
      createdById: session.userId,
      deadline,
      status: "PENDING",
    },
  });

  revalidatePath(`/organizer/events/${eventId}/tasks`);

  return { success: "Task added." };
}

export async function setTaskStatus(taskId: string, status: "PENDING" | "DONE"): Promise<void> {
  const session = await getSession();
  if (!session) return;

  if (!entityIdSchema.safeParse(taskId).success) return;
  if (!taskStatusSchema.safeParse(status).success) return;

  const task = await prisma.task.findUnique({
    where: { id: taskId },
    include: { event: true },
  });
  if (!task) return;

  const isOrganizer =
    isOrganizerRole(session.role) &&
    (session.role === "ADMIN" || task.event.organizerId === session.userId);
  const isAssignee = task.assignedToId === session.userId;

  if (!isOrganizer && !isAssignee) return;

  await prisma.task.update({
    where: { id: taskId },
    data: { status },
  });

  revalidatePath(`/organizer/events/${task.eventId}/tasks`);
}

export async function deleteTask(taskId: string): Promise<void> {
  const session = await getSession();
  if (!session || !isOrganizerRole(session.role)) return;

  if (!entityIdSchema.safeParse(taskId).success) return;

  const task = await prisma.task.findUnique({
    where: { id: taskId },
    include: { event: true },
  });
  if (!task) return;
  if (session.role !== "ADMIN" && task.event.organizerId !== session.userId) return;

  await prisma.task.delete({ where: { id: taskId } });
  revalidatePath(`/organizer/events/${task.eventId}/tasks`);
}
