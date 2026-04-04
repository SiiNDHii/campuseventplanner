"use client";

import { useFormStatus } from "react-dom";
import { Button, type ButtonProps } from "@/components/ui/button";

export type FormSubmitButtonProps = Omit<ButtonProps, "type" | "loading">;

/**
 * Submit button that shows a spinner while the parent `<form>` action is pending.
 * Must be rendered inside the form (uses `useFormStatus`).
 */
export function FormSubmitButton({ children, disabled, ...props }: FormSubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" {...props} disabled={disabled || pending} loading={pending}>
      {children}
    </Button>
  );
}
