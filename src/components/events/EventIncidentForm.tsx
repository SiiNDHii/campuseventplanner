"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { reportIncidentFormAction } from "@/app/actions/incidents";
import type { FormActionState } from "@/lib/action-state";
import { INCIDENT_CATEGORIES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { FormAlert } from "@/components/ui/form-alert";
import { Select, Textarea } from "@/components/ui/input";

export function EventIncidentForm({ eventId, showAnonymousOption }: { eventId: string; showAnonymousOption: boolean }) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState<FormActionState, FormData>(
    reportIncidentFormAction.bind(null, eventId),
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
    <form action={formAction} className="mt-6 max-w-lg space-y-4">
      {state?.error && <FormAlert variant="error">{state.error}</FormAlert>}
      {state?.success && <FormAlert variant="success">{state.success}</FormAlert>}
      <label className="block text-sm">
        <span className="font-medium text-[var(--foreground)]">Category</span>
        <Select name="category" required className="mt-2">
          {INCIDENT_CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </Select>
      </label>
      <label className="block text-sm">
        <span className="font-medium text-[var(--foreground)]">Description</span>
        <Textarea name="description" required rows={4} className="mt-2" minLength={10} disabled={pending} />
      </label>
      {showAnonymousOption && (
        <label className="flex cursor-pointer items-center gap-2 text-sm text-[var(--muted-foreground)]">
          <input
            type="checkbox"
            name="anonymous"
            defaultChecked
            className="rounded border-[var(--card-border)] text-violet-600"
          />
          Submit anonymously
        </label>
      )}
      <Button type="submit" variant="secondary" className="rounded-xl" loading={pending}>
        {pending ? "Submitting…" : "Submit report"}
      </Button>
    </form>
  );
}
