"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { registerForEventFormAction, unregisterFromEventFormAction } from "@/app/actions/registrations";
import type { FormActionState } from "@/lib/action-state";
import { Button } from "@/components/ui/button";
import { FormAlert } from "@/components/ui/form-alert";
import { Badge } from "@/components/ui/badge";

export function EventRegistrationBlock({
  eventId,
  hasRegistration,
}: {
  eventId: string;
  hasRegistration: boolean;
}) {
  const router = useRouter();
  const [regState, registerAction, regPending] = useActionState<FormActionState, FormData>(
    registerForEventFormAction.bind(null, eventId),
    null
  );
  const [unregState, unregisterAction, unregPending] = useActionState<FormActionState, FormData>(
    unregisterFromEventFormAction.bind(null, eventId),
    null
  );

  useEffect(() => {
    if (regState?.error) toast.error(regState.error);
    if (regState?.success) {
      toast.success(regState.success);
      router.refresh();
    }
  }, [regState, router]);

  useEffect(() => {
    if (unregState?.error) toast.error(unregState.error);
    if (unregState?.success) {
      toast.success(unregState.success);
      router.refresh();
    }
  }, [unregState, router]);

  if (hasRegistration) {
    return (
      <form action={unregisterAction} className="mt-4 space-y-3">
        {unregState?.error && <FormAlert variant="error">{unregState.error}</FormAlert>}
        {unregState?.success && <FormAlert variant="success">{unregState.success}</FormAlert>}
        <Badge variant="success">You&apos;re registered</Badge>
        <div>
          <Button
            type="submit"
            variant="ghost"
            loading={unregPending}
            className="text-red-400 hover:bg-red-500/10 hover:text-red-300"
          >
            {unregPending ? "Updating…" : "Unregister"}
          </Button>
        </div>
      </form>
    );
  }

  return (
    <form action={registerAction} className="mt-4 space-y-3">
      {regState?.error && <FormAlert variant="error">{regState.error}</FormAlert>}
      {regState?.success && <FormAlert variant="success">{regState.success}</FormAlert>}
      <Button type="submit" variant="primary" className="rounded-xl" loading={regPending}>
        {regPending ? "Registering…" : "Register for this event"}
      </Button>
    </form>
  );
}

export function EventRegistrationLoginHint() {
  return (
    <p className="mt-3 text-[var(--muted-foreground)]">
      <Link href="/login" className="font-medium text-violet-400 hover:underline">
        Log in
      </Link>{" "}
      to register for this event.
    </p>
  );
}
