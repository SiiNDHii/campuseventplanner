import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md space-y-8 text-center">
        <div className="flex justify-center">
          <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-400">
            <AlertCircle className="h-10 w-10" />
          </span>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)]">Page not found</h1>
          <p className="text-base text-[var(--muted-foreground)]">
            Sorry, we couldn't find the page you're looking for. It may have been moved or deleted.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/">
            <Button variant="primary" className="w-full sm:w-auto">
              Go home
            </Button>
          </Link>
          <Link href="/events">
            <Button variant="secondary" className="w-full sm:w-auto">
              Browse events
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
