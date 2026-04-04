"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { submitFeedbackFormAction } from "@/app/actions/feedback";
import type { FormActionState } from "@/lib/action-state";
import { Button } from "@/components/ui/button";
import { FormAlert } from "@/components/ui/form-alert";
import { Select, Textarea } from "@/components/ui/input";

const RATING_FIELDS = [
  ["ratingOrganization", "Organization"],
  ["ratingVenue", "Venue"],
  ["ratingTiming", "Timing"],
  ["ratingExperience", "Overall experience"],
] as const;

export function EventFeedbackForm({
  eventId,
  existingFeedback,
}: {
  eventId: string;
  existingFeedback: {
    ratingOrganization: number;
    ratingVenue: number;
    ratingTiming: number;
    ratingExperience: number;
    comment: string | null;
  } | null;
}) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState<FormActionState, FormData>(
    submitFeedbackFormAction.bind(null, eventId),
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
    <form action={formAction} className="mt-6 grid gap-4 sm:grid-cols-2">
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
      {RATING_FIELDS.map(([name, label]) => (
        <label key={name} className="block text-sm">
          <span className="font-medium text-[var(--foreground)]">{label}</span>
          <Select
            name={name}
            required
            defaultValue={String(existingFeedback?.[name] ?? 5)}
            className="mt-2"
            disabled={pending}
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </Select>
        </label>
      ))}
      <label className="block text-sm sm:col-span-2">
        <span className="font-medium text-[var(--foreground)]">Written feedback (optional)</span>
        <Textarea
          name="comment"
          rows={3}
          defaultValue={existingFeedback?.comment ?? ""}
          className="mt-2"
          disabled={pending}
        />
      </label>
      <div className="sm:col-span-2">
        <Button type="submit" variant="primary" className="rounded-xl" loading={pending}>
          {pending ? "Saving…" : existingFeedback ? "Update feedback" : "Submit feedback"}
        </Button>
      </div>
    </form>
  );
}
