import Link from "next/link";
import { Card } from "@/components/ui/card";
import { EventCreateForm } from "@/components/events/EventCreateForm";

export default function NewEventPage() {
  return (
    <div className="mx-auto max-w-lg space-y-8">
      <Link
        href="/organizer/events"
        className="inline-flex text-sm font-medium text-[var(--muted-foreground)] hover:text-violet-400"
      >
        ← Back to dashboard
      </Link>
      <div>
        <h1 className="text-3xl font-bold text-[var(--foreground)]">Create event</h1>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">You can refine everything after saving.</p>
      </div>
      <Card className="p-6 sm:p-8">
        <EventCreateForm />
      </Card>
    </div>
  );
}
