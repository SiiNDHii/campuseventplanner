import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LoginAuthScene } from "@/app/login/LoginAuthScene";
import { LoginForm } from "@/app/login/LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const sp = await searchParams;
  const next = sp.next && sp.next.startsWith("/") ? sp.next : "/";

  return (
    <LoginAuthScene>
      <Link
        href="/"
        className="group mb-8 inline-flex items-center gap-2 self-start text-sm font-medium text-slate-600 transition-colors hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-400 sm:self-auto"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" aria-hidden />
        Back to home
      </Link>

      <LoginForm next={next} />
    </LoginAuthScene>
  );
}
