"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createTaskFormAction } from "@/app/actions/tasks";
import type { FormActionState } from "@/lib/action-state";
import { Button } from "@/components/ui/button";
import { FormAlert } from "@/components/ui/form-alert";
import { Input, Select } from "@/components/ui/input";

type Assignee = { id: string; name: string | null; email: string; role: string };

export function TaskCreateForm({ eventId, assignees }: { eventId: string; assignees: Assignee[] }) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState<FormActionState, FormData>(
    createTaskFormAction.bind(null, eventId),
    null
  );

  useEffect(() => {
    if (state?.error) toast.error(state.error);
    if (state?.success) {
      toast.success(state.success);
      router.refresh();
    }
  }, [state, router]);

  return (
    <form action={formAction} className="mt-5 grid gap-4 sm:grid-cols-2">
      {state?.error && (
        <div className="sm:col-span-2">
          <FormAlert variant="error">{state.error}</FormAlert>
        </div>
      )}
      {state?.success && (
        <div className="sm:col-span-2">
          <FormAlert variant="success">{state.success}</FormAlert>
        </div>
      )}
      <label className="block text-sm sm:col-span-2">
        <span className="mb-1.5 block font-medium text-[var(--foreground)]">Task name</span>
        <Input name="name" required placeholder="What needs to be done?" disabled={pending} />
      </label>
      <label className="block text-sm">
        <span className="mb-1.5 block font-medium text-[var(--foreground)]">Assigned to</span>
        <Select name="assignedToId" required className="mt-0" disabled={pending}>
          {assignees.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name ?? u.email} ({u.role})
            </option>
          ))}
        </Select>
      </label>
      <label className="block text-sm">
        <span className="mb-1.5 block font-medium text-[var(--foreground)]">Deadline</span>
        <Input name="deadline" type="datetime-local" required disabled={pending} />
      </label>
      <div className="sm:col-span-2">
        <Button type="submit" variant="primary" className="rounded-xl" loading={pending}>
          {pending ? "Adding…" : "Add task"}
        </Button>
      </div>
    </form>
  );
}
