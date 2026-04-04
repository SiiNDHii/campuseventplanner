import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { ClipboardList } from "lucide-react";
import { getSession, isOrganizerRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { setTaskStatus, deleteTask } from "@/app/actions/tasks";
import { TaskCreateForm } from "@/components/tasks/TaskCreateForm";
import { Card } from "@/components/ui/card";
import { FormSubmitButton } from "@/components/ui/form-submit-button";
import { Badge } from "@/components/ui/badge";

export default async function EventTasksPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getSession();
  if (!session || !isOrganizerRole(session.role)) notFound();

  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      tasks: {
        orderBy: { deadline: "asc" },
        include: { assignedTo: { select: { name: true, email: true } } },
      },
    },
  });
  if (!event) notFound();
  if (session.role !== "ADMIN" && event.organizerId !== session.userId) notFound();

  const assignees = await prisma.user.findMany({
    where: { role: { in: ["STUDENT", "ORGANIZER", "ADMIN"] } },
    orderBy: { email: "asc" },
    select: { id: true, name: true, email: true, role: true },
  });

  return (
    <div className="space-y-8 pb-8">
      <Link
        href={`/organizer/events/${id}/edit`}
        className="inline-flex text-sm font-medium text-[var(--muted-foreground)] hover:text-violet-400"
      >
        ← Back to event
      </Link>
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/15 text-violet-400">
          <ClipboardList className="h-5 w-5" />
        </span>
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Tasks</h1>
          <p className="text-sm text-[var(--muted-foreground)]">{event.title}</p>
        </div>
      </div>

      <Card className="p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-[var(--foreground)]">New task</h2>
        <TaskCreateForm eventId={id} assignees={assignees} />
      </Card>

      <section>
        <h2 className="text-lg font-semibold text-[var(--foreground)]">Team tasks</h2>
        {event.tasks.length === 0 ? (
          <Card className="mt-4 p-8 text-center text-sm text-[var(--muted-foreground)]">No tasks yet.</Card>
        ) : (
          <ul className="mt-4 space-y-3">
            {event.tasks.map((t) => (
              <li key={t.id}>
                <Card className="flex flex-wrap items-start justify-between gap-4 p-5">
                  <div>
                    <p className="font-medium text-[var(--foreground)]">{t.name}</p>
                    <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                      {t.assignedTo.name ?? t.assignedTo.email} · Due {format(t.deadline, "PPp")}
                    </p>
                    <Badge variant={t.status === "DONE" ? "success" : "warning"} className="mt-2">
                      {t.status === "DONE" ? "Done" : "Pending"}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <form action={setTaskStatus.bind(null, t.id, t.status === "DONE" ? "PENDING" : "DONE")}>
                      <FormSubmitButton variant="ghost" size="sm" className="rounded-lg text-violet-400">
                        {t.status === "DONE" ? "Mark pending" : "Mark done"}
                      </FormSubmitButton>
                    </form>
                    <form action={deleteTask.bind(null, t.id)}>
                      <FormSubmitButton
                        variant="ghost"
                        size="sm"
                        className="rounded-lg text-red-400 hover:bg-red-500/10"
                      >
                        Remove
                      </FormSubmitButton>
                    </form>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
