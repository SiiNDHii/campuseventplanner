"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { createEventFormAction, type EventActionState } from "@/app/actions/events";
import { Button } from "@/components/ui/button";
import { FormAlert } from "@/components/ui/form-alert";
import { Input, Textarea } from "@/components/ui/input";

type Props = {
  onCancel?: () => void;
  className?: string;
};

export function EventCreateForm({ onCancel, className }: Props) {
  const [state, formAction, pending] = useActionState<EventActionState, FormData>(
    createEventFormAction,
    null
  );

  useEffect(() => {
    if (state?.error) toast.error(state.error);
  }, [state?.error]);

  return (
    <form action={formAction} className={className}>
      {state?.error && (
        <FormAlert variant="error" className="mb-4">
          {state.error}
        </FormAlert>
      )}
      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-[var(--muted-foreground)]">Title</label>
          <Input name="title" required placeholder="e.g. Spring career fair" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-[var(--muted-foreground)]">Venue</label>
          <Input name="venue" required placeholder="Building & room" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-[var(--muted-foreground)]">Date & time</label>
          <Input name="startsAt" type="datetime-local" required />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-[var(--muted-foreground)]">Description</label>
          <Textarea name="description" rows={3} placeholder="What should attendees know?" />
        </div>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-[var(--muted-foreground)]">
          <input type="checkbox" name="published" className="rounded border-[var(--card-border)] text-violet-600" />
          Publish immediately
        </label>
        <div className="flex justify-end gap-2 pt-2">
          {onCancel && (
            <Button type="button" variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit" variant="primary" loading={pending}>
            {pending ? "Creating…" : "Create & continue"}
          </Button>
        </div>
      </div>
    </form>
  );
}
