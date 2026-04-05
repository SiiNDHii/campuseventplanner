import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { RegisterAuthScene } from "@/app/register/RegisterAuthScene";
import { RegisterForm } from "@/app/register/RegisterForm";

export default function RegisterPage() {
  return (
    <RegisterAuthScene>
      <div className="w-full max-w-md flex flex-col items-center">
        <Link
          href="/"
          className="group mb-6 inline-flex items-center gap-2 self-start text-sm font-medium text-slate-300 transition-colors hover:text-white dark:text-slate-400 dark:hover:text-slate-200"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" aria-hidden />
          Back to home
        </Link>

        <RegisterForm />
      </div>
    </RegisterAuthScene>
  );
}
