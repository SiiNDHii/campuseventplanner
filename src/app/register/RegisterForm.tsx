"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { signUp } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { FormAlert } from "@/components/ui/form-alert";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export function RegisterForm() {
  const [state, formAction, pending] = useActionState(
    async (_prev: { error?: string } | null, formData: FormData) => {
      return signUp(formData);
    },
    null
  );

  useEffect(() => {
    if (state?.error) toast.error(state.error);
  }, [state?.error]);

  return (
    <Card className="p-6 sm:p-8">
      <form action={formAction} className="space-y-5">
        {state?.error && <FormAlert variant="error">{state.error}</FormAlert>}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">Name (optional)</label>
          <Input name="name" type="text" autoComplete="name" placeholder="Alex Student" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">Email</label>
          <Input name="email" type="email" required autoComplete="email" placeholder="you@university.edu" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">Password</label>
          <Input
            name="password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            placeholder="8+ chars, with a letter and a number"
          />
        </div>
        <Button type="submit" loading={pending} variant="primary" className="w-full rounded-xl py-3">
          {pending ? "Creating account…" : "Create account"}
        </Button>
        <p className="text-center text-sm text-[var(--muted-foreground)]">
          Already registered?{" "}
          <Link href="/login" className="font-medium text-violet-400 hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </Card>
  );
}
