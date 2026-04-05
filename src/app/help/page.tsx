import { ArrowLeft, HelpCircle, BookOpen, Zap, Users, Clipboard } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";

const faqs = [
  {
    category: "Getting Started",
    icon: <Zap className="h-5 w-5" />,
    items: [
      {
        q: "How do I register for an event?",
        a: "Browse events on the Events page, click on an event you're interested in, and click the Register button. You'll need to be logged in.",
      },
      {
        q: "What's the difference between a draft and published event?",
        a: "Draft events are only visible to the organizer. Published events are visible to all students and can receive registrations.",
      },
      {
        q: "Can I unregister from an event?",
        a: "Yes, visit the event page and click Unregister. You'll receive no further reminders for that event.",
      },
    ],
  },
  {
    category: "For Students",
    icon: <BookOpen className="h-5 w-5" />,
    items: [
      {
        q: "When will I get reminders?",
        a: "You'll receive notifications ~24 hours and ~1 hour before each event you're registered for.",
      },
      {
        q: "How do I provide feedback?",
        a: "After an event ends, visit the event page and scroll to the feedback section. Rate your experience and share comments.",
      },
      {
        q: "Can I report an issue with an event?",
        a: "Yes, on the event page you can report incidents (late start, venue issues, etc.) to help organizers improve.",
      },
    ],
  },
  {
    category: "For Organizers",
    icon: <Users className="h-5 w-5" />,
    items: [
      {
        q: "How do I create an event?",
        a: "Go to your Dashboard and click 'New event'. Fill in event details (title, description, venue, date/time) and save.",
      },
      {
        q: "How do I manage tasks for my event?",
        a: "From the event edit page, click 'Tasks'. Create tasks, assign them to team members, and track completion.",
      },
      {
        q: "How do I send announcements to registrants?",
        a: "Go to the Participants page for your event. You can compose and send a message to all registered attendees.",
      },
      {
        q: "How do I view feedback?",
        a: "Go to Insights in your dashboard. You'll see event comparisons, ratings, incident themes, and participant comments.",
      },
      {
        q: "Can I download participant lists?",
        a: "Visit the Participants page for your event to view all registered attendees and their registration dates.",
      },
    ],
  },
  {
    category: "Privacy & Safety",
    icon: <Clipboard className="h-5 w-5" />,
    items: [
      {
        q: "Is my data private?",
        a: "Yes. Email addresses and personal information are never shared. Incident reports can be submitted anonymously.",
      },
      {
        q: "Who can see my registered events?",
        a: "Only you and event organizers. Your registration is private unless you choose to share it.",
      },
      {
        q: "How do I delete my account?",
        a: "Contact your campus administrator. Your data will be securely removed from the system.",
      },
    ],
  },
];

export default function HelpPage() {
  return (
    <div className="space-y-10 pb-10">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-[var(--muted-foreground)] hover:text-violet-400"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to home
      </Link>

      <div className="flex items-center gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-400">
          <HelpCircle className="h-6 w-6" />
        </span>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">Help & FAQ</h1>
          <p className="mt-2 text-[var(--muted-foreground)]">Find answers to common questions</p>
        </div>
      </div>

      <div className="space-y-8">
        {faqs.map((section) => (
          <section key={section.category} className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--muted)]/60 text-[var(--foreground)]">
                {section.icon}
              </span>
              <h2 className="text-xl font-semibold text-[var(--foreground)]">{section.category}</h2>
            </div>

            <div className="space-y-3">
              {section.items.map((item, idx) => (
                <Card key={idx} className="p-5">
                  <h3 className="font-semibold text-[var(--foreground)]">{item.q}</h3>
                  <p className="mt-3 text-sm text-[var(--muted-foreground)]">{item.a}</p>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>

      <Card className="border-violet-500/20 bg-violet-500/5 p-6 text-center">
        <p className="text-[var(--foreground)]">Still have questions?</p>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">
          Contact your campus administrator or email{" "}
          <a href="mailto:support@campuseventplanner.edu" className="text-violet-400 hover:underline">
            support@campuseventplanner.edu
          </a>
        </p>
      </Card>
    </div>
  );
}
