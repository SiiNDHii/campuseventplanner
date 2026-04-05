import Link from "next/link";
import { CalendarCheck, LineChart, Users, LayoutDashboard } from "lucide-react";
import { Hero } from "@/components/landing/Hero";
import { Card } from "@/components/ui/card";

const features = [
  {
    title: "For students",
    description:
      "Browse a live catalog, register in one tap, get day-before and hour-before reminders, and share structured feedback after you attend.",
    icon: CalendarCheck,
  },
  {
    title: "For organizers",
    description:
      "Publish with confidence: tasks for your team, manual announcements to all registrants, participant lists, and a learning dashboard.",
    icon: Users,
  },
  {
    title: "Personal dashboard",
    description:
      "Track your registrations, search events by category, see real-time stats, and manage all your activities in one beautiful place.",
    icon: LayoutDashboard,
  },
  {
    title: "Insights, not guesswork",
    description:
      "Compare events, spot incident themes, and read attendee suggestions in one premium workspace built for improvement.",
    icon: LineChart,
  },
];

export default function HomePage() {
  return (
    <div className="space-y-12 pb-6 sm:space-y-16 sm:pb-8">
      <Hero />

      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
        {features.map((f) => (
          <Card key={f.title} hover className="group p-5 sm:p-7 md:p-8">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-purple-300 transition-transform duration-300 [@media(hover:hover)]:group-hover:scale-105 sm:h-12 sm:w-12">
              <f.icon className="h-6 w-6" />
            </div>
            <h2 className="text-lg font-semibold text-[var(--foreground)] sm:text-xl">{f.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted-foreground)] sm:text-base">{f.description}</p>
          </Card>
        ))}
      </section>

      <section className="cep-glass rounded-2xl border border-[var(--card-border)] px-5 py-10 text-center shadow-lg shadow-black/[0.05] sm:rounded-3xl sm:px-8 sm:py-12 dark:shadow-black/35">
        <h2 className="text-xl font-bold text-[var(--foreground)] sm:text-2xl">Ready when you are</h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[var(--muted-foreground)] sm:text-base">
          Join organizers who run calmer events with fewer no-shows and clearer feedback loops.
        </p>
        <div className="mt-6 flex w-full flex-col items-stretch gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
          <Link
            href="/events"
            className="cep-btn-primary inline-flex min-h-12 items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold text-white sm:min-h-0 sm:px-8"
          >
            Explore events
          </Link>
          <Link
            href="/dashboard"
            className="cep-btn-outline inline-flex min-h-12 items-center justify-center rounded-xl border border-[var(--card-border)] px-6 py-3 text-sm font-semibold text-[var(--foreground)] sm:min-h-0 sm:px-8"
          >
            Go to dashboard
          </Link>
          <Link
            href="/login"
            className="cep-btn-outline inline-flex min-h-12 items-center justify-center rounded-xl border border-[var(--card-border)] px-6 py-3 text-sm font-semibold text-[var(--foreground)] sm:min-h-0 sm:px-8"
          >
            Organizer login
          </Link>
        </div>
      </section>
    </div>
  );
}
