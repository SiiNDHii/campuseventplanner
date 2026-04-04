"use client";

import { deleteEvent } from "@/app/actions/events";
import { FormSubmitButton } from "@/components/ui/form-submit-button";

export function DeleteEventForm({ eventId }: { eventId: string }) {
  return (
    <form action={deleteEvent.bind(null, eventId)} className="border-t border-[var(--card-border)] pt-8">
      <FormSubmitButton variant="danger" className="rounded-xl">
        Delete event
      </FormSubmitButton>
    </form>
  );
}
