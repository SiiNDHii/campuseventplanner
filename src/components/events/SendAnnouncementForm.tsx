"use client";

import { useActionState, useId } from "react";
import { postAnnouncementFormAction } from "@/app/actions/announcements";
import { Button } from "@/components/ui/button";
import { FormAlert } from "@/components/ui/form-alert";

export type AnnouncementActionState = { error?: string; success?: string } | null;

export function SendAnnouncementForm({ eventId }: { eventId: string }) {
  const messageId = useId();

  const [state, formAction, pending] = useActionState(async (_prev: AnnouncementActionState, formData: FormData) => {
    return postAnnouncementFormAction(_prev, formData);
  }, null);

  return (
    <form action={formAction} className="space-y-4 rounded-xl border border-[var(--card-border)] p-5">
      <div className="space-y-2">
        <label htmlFor={messageId} className="block text-sm font-medium text-[var(--foreground)]">
          Message to registrants
        </label>
        <input type="hidden" name="eventId" value={eventId} />
        <textarea
          id={messageId}
          name="message"
          required
          minLength={5}
          maxLength={500}
          placeholder="Share an update with all registered participants..."
          className="min-h-24 w-full rounded-lg border border-[var(--card-border)] bg-[var(--muted)]/30 p-3 text-sm text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:border-violet-500 focus:outline-none"
        />
      </div>

      {state?.error && <FormAlert variant="error">{state.error}</FormAlert>}
      {state?.success && <FormAlert variant="success">{state.success}</FormAlert>}

      <Button type="submit" variant="primary" disabled={pending} className="w-full">
        {pending ? "Sending..." : "Send announcement"}
      </Button>
    </form>
  );
}
