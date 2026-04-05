import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LoginAuthScene } from "@/app/login/LoginAuthScene";
import { OAuthLoginForm } from "@/app/login/OAuthLoginForm";
import { auth } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const session = await auth();
  const sp = await searchParams;
  const next = sp.next && sp.next.startsWith("/") ? sp.next : "/events";

  // Redirect if already logged in
  if (session) {
    redirect(next);
  }

  return (
    <LoginAuthScene>
      <div className="w-full max-w-md flex flex-col items-center">
        <Link
          href="/"
          className="group mb-6 inline-flex items-center gap-2 self-start text-sm font-medium text-slate-300 transition-colors hover:text-white dark:text-slate-400 dark:hover:text-slate-200"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" aria-hidden />
          Back to home
        </Link>

        <OAuthLoginForm next={next} />
      </div>
    </LoginAuthScene>
  );
}
