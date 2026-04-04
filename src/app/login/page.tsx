import Link from "next/link";
import { LoginForm } from "@/app/login/LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const sp = await searchParams;
  const next = sp.next && sp.next.startsWith("/") ? sp.next : "/";

  return (
    <div className="mx-auto max-w-md space-y-8 pt-4">
      <div className="text-center">
        <Link
          href="/"
          className="text-sm font-medium text-[var(--muted-foreground)] transition-colors hover:text-violet-400"
        >
          ← Back to home
        </Link>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-[var(--foreground)]">Welcome back</h1>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">
          Demo:{" "}
          <code className="rounded-lg bg-[var(--muted)]/80 px-2 py-0.5 text-xs text-violet-300">
            organizer@campus.edu
          </code>{" "}
          / <code className="rounded-lg bg-[var(--muted)]/80 px-2 py-0.5 text-xs">password123</code>
        </p>
      </div>
      <LoginForm next={next} />
    </div>
  );
}
