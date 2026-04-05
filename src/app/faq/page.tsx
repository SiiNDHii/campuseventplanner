"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function FAQPage() {
  const faqs = [
    {
      q: "How do I create an account?",
      a: "Click on 'Sign Up' at the top of the page, fill in your details, and verify your email address. You'll instantly have access to browse and register for events.",
    },
    {
      q: "How do I register for an event?",
      a: "Navigate to the Events section, find an event you're interested in, click on it, and fill out the registration form. You'll receive a confirmation email with event details.",
    },
    {
      q: "Can I modify my registration?",
      a: "Yes! You can update your registration details up to 24 hours before the event starts. Go to 'My Events' and click on the event to edit.",
    },
    {
      q: "How do I withdraw from an event?",
      a: "Navigate to the event in your 'My Events' section and click the 'Cancel Registration' button. You can do this anytime.",
    },
    {
      q: "How do I become an event organizer?",
      a: "Contact our support team via WhatsApp at +92 301 2954272 to request organizer status. We'll verify your details and activate your organizer dashboard.",
    },
    {
      q: "What features are available to organizers?",
      a: "Organizers can create and manage events, assign tasks to team members, view registrations, receive feedback, track attendance, and send announcements to participants.",
    },
    {
      q: "When will I receive event reminders?",
      a: "We send two reminders: one day before the event and one hour before the event. You can customize these preferences in your Settings.",
    },
    {
      q: "How do I provide feedback for an event?",
      a: "After attending an event, go to 'My Events' and click on the event to view the feedback form. Your feedback helps organizers improve future events.",
    },
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border-b border-[var(--card-border)] bg-[var(--card)]/50 backdrop-blur-xl"
      >
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
          <Link
            href="/support"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Support
          </Link>
          <h1 className="text-3xl font-bold text-purple-600 sm:text-4xl">❓ Frequently Asked Questions</h1>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            Find answers to common questions about Campus Event Planner
          </p>
        </div>
      </motion.div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.details
              key={idx}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="group rounded-xl border border-[var(--card-border)] bg-[var(--card)] transition-colors hover:border-purple-400/50"
            >
              <summary className="flex cursor-pointer items-center justify-between px-6 py-4 font-semibold text-[var(--foreground)]">
                <span>{faq.q}</span>
                <span className="transition-transform group-open:rotate-180">
                  ▼
                </span>
              </summary>
              <div className="border-t border-[var(--card-border)] px-6 py-4 text-[var(--muted-foreground)]">
                {faq.a}
              </div>
            </motion.details>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 p-8 text-center dark:border-purple-500/30 dark:from-purple-500/20 dark:to-pink-500/20"
        >
          <h2 className="mb-2 text-2xl font-bold text-purple-900 dark:text-purple-300">
            Didn't find what you're looking for?
          </h2>
          <p className="mb-4 text-purple-700 dark:text-purple-300/80">
            Get in touch with our support team
          </p>
          <Link
            href="/support"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 font-semibold text-white hover:from-purple-700 hover:to-pink-700 transition-all"
          >
            Contact Support
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
