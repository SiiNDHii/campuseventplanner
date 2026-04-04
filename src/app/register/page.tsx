import Link from "next/link";
import { RegisterForm } from "@/app/register/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-md space-y-8 pt-4">
      <div className="text-center">
        <Link
          href="/"
          className="text-sm font-medium text-[var(--muted-foreground)] transition-colors hover:text-violet-400"
        >
          ← Back to home
        </Link>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-[var(--foreground)]">Create your account</h1>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">New accounts join as students by default.</p>
      </div>
      <RegisterForm />
    </div>
  );
}
