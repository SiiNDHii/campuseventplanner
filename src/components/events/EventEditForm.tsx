"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { updateEventFormAction, type EventActionState } from "@/app/actions/events";
import { postAnnouncementFormAction } from "@/app/actions/announcements";
import { Button } from "@/components/ui/button";
import { FormAlert } from "@/components/ui/form-alert";
import { DeleteEventForm } from "@/components/events/DeleteEventForm";
import { Input, Textarea } from "@/components/ui/input";

type EventShape = {
  id: string;
  title: string;
  venue: string;
  description: string;
  startsAtLocal: string;
  published: boolean;
};

export function EventEditForm({ event }: { event: EventShape }) {
  const [saveState, saveAction, savePending] = useActionState<EventActionState, FormData>(
    updateEventFormAction.bind(null, event.id),
    null
  );

  const [announceState, announceAction, announcePending] = useActionState<EventActionState, FormData>(
    postAnnouncementFormAction.bind(null, event.id),
    null
  );

  useEffect(() => {
    if (saveState?.error) toast.error(saveState.error);
  }, [saveState?.error]);

  useEffect(() => {
    if (saveState?.success) toast.success(saveState.success);
  }, [saveState?.success]);

  useEffect(() => {
    if (announceState?.error) toast.error(announceState.error);
  }, [announceState?.error]);

  useEffect(() => {
    if (announceState?.success) toast.success(announceState.success);
  }, [announceState?.success]);

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)]/50 p-6 sm:p-8">
        <form action={saveAction} className="space-y-5">
          {saveState?.error && <FormAlert variant="error">{saveState.error}</FormAlert>}
          {saveState?.success && <FormAlert variant="success">{saveState.success}</FormAlert>}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">Title</label>
            <Input name="title" required defaultValue={event.title} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">Venue</label>
            <Input name="venue" required defaultValue={event.venue} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">Date & time</label>
            <Input name="startsAt" type="datetime-local" required defaultValue={event.startsAtLocal} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">Description</label>
            <Textarea name="description" rows={4} defaultValue={event.description} />
          </div>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-[var(--muted-foreground)]">
            <input
              type="checkbox"
              name="published"
              defaultChecked={event.published}
              className="rounded border-[var(--card-border)] text-violet-600"
            />
            Published
          </label>
          <Button type="submit" variant="primary" className="w-full rounded-xl py-3" loading={savePending}>
            {savePending ? "Saving…" : "Save changes"}
          </Button>
        </form>
      </div>

      <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)]/50 p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-[var(--foreground)]">Manual announcement</h2>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">
          Sends an in-app notification to every registered attendee.
        </p>
        <form action={announceAction} className="mt-5 space-y-4">
          {announceState?.error && <FormAlert variant="error">{announceState.error}</FormAlert>}
          {announceState?.success && <FormAlert variant="success">{announceState.success}</FormAlert>}
          <Textarea name="message" required rows={3} placeholder="Room change, schedule update, etc." />
          <Button type="submit" variant="secondary" className="rounded-xl" loading={announcePending}>
            {announcePending ? "Sending…" : "Broadcast to participants"}
          </Button>
        </form>
      </div>

      <DeleteEventForm eventId={event.id} />
    </div>
  );
}
