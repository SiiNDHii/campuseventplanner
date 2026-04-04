"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { signIn } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { FormAlert } from "@/components/ui/form-alert";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export function LoginForm({ next }: { next: string }) {
  const [state, formAction, pending] = useActionState(
    async (_prev: { error?: string } | null, formData: FormData) => {
      return signIn(formData);
    },
    null
  );

  useEffect(() => {
    if (state?.error) toast.error(state.error);
  }, [state?.error]);

  return (
    <Card className="p-6 sm:p-8">
      <form action={formAction} className="space-y-5">
        <input type="hidden" name="next" value={next} />
        {state?.error && <FormAlert variant="error">{state.error}</FormAlert>}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">Email</label>
          <Input name="email" type="email" required autoComplete="email" placeholder="you@university.edu" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">Password</label>
          <Input name="password" type="password" required autoComplete="current-password" placeholder="••••••••" />
        </div>
        <Button type="submit" loading={pending} variant="primary" className="w-full rounded-xl py-3">
          {pending ? "Signing in…" : "Sign in"}
        </Button>
        <p className="text-center text-sm text-[var(--muted-foreground)]">
          No account?{" "}
          <Link href="/register" className="font-medium text-violet-400 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </Card>
  );
}
