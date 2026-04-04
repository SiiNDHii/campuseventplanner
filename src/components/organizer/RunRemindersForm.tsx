"use client";

import { Zap } from "lucide-react";
import { runRemindersNow } from "@/app/actions/reminders";
import { FormSubmitButton } from "@/components/ui/form-submit-button";

export function RunRemindersForm() {
  return (
    <form action={runRemindersNow}>
      <FormSubmitButton variant="secondary" className="gap-2 rounded-xl">
        <Zap className="h-4 w-4 shrink-0" />
        Run smart reminders
      </FormSubmitButton>
    </form>
  );
}
