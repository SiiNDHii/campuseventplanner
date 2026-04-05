"use client";

import { useActionState } from "react";
import { markEventAsAttended } from "@/app/actions/attendance";
import { Button } from "@/components/ui/button";
import { FormAlert } from "@/components/ui/form-alert";
import { CheckCircle } from "lucide-react";

type State = { error?: string; success?: string } | null;

export function MarkAttendedButton({ eventId, isAttended }: { eventId: string; isAttended: boolean }) {
  const [state, formAction, pending] = useActionState(async (_prev: State) => {
    return markEventAsAttended(eventId);
  }, null);

  if (isAttended) {
    return (
      <div className="flex items-center gap-2 rounded-lg bg-green-500/10 px-3 py-2 text-sm font-medium text-green-600 dark:text-green-400">
        <CheckCircle className="h-4 w-4" />
        Event attended ✓
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-2">
      {state?.error && <FormAlert variant="error">{state.error}</FormAlert>}
      {state?.success && <FormAlert variant="success">{state.success}</FormAlert>}
      <Button 
        type="submit" 
        variant="primary" 
        disabled={pending}
        className="w-full"
      >
        {pending ? "Marking as attended..." : "Mark as attended"}
      </Button>
    </form>
  );
}
