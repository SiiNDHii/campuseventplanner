"use client";

import { CheckCheck } from "lucide-react";
import { markAllNotificationsRead, markNotificationRead } from "@/app/actions/notifications";
import { FormSubmitButton } from "@/components/ui/form-submit-button";

export function MarkAllNotificationsForm() {
  return (
    <form action={markAllNotificationsRead}>
      <FormSubmitButton variant="secondary" className="gap-2 rounded-xl">
        <CheckCheck className="h-4 w-4 shrink-0" />
        Mark all read
      </FormSubmitButton>
    </form>
  );
}

export function MarkNotificationReadForm({ notificationId }: { notificationId: string }) {
  return (
    <form action={markNotificationRead.bind(null, notificationId)}>
      <FormSubmitButton variant="ghost" size="sm" className="shrink-0 rounded-lg text-xs">
        Mark read
      </FormSubmitButton>
    </form>
  );
}
