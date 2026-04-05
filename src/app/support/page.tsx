"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Mail, MessageSquare, Phone, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Reset form after 2 seconds
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setSubmitted(false);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
          <Link
            href="/dashboard"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-purple-600 sm:text-4xl">📩 Contact & Support</h1>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            We're here to help! Get in touch with our support team
          </p>
        </div>
      </motion.div>

      {/* Content */}
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-8 md:grid-cols-2"
        >
          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-6">
              <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-[var(--foreground)]">
                <MessageCircle className="h-6 w-6 text-purple-600" />
                Get In Touch
              </h2>

              <div className="space-y-4">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/923012954272"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-xl border border-[var(--card-border)] bg-gradient-to-br from-green-50 to-emerald-50 p-4 hover:border-green-400 hover:shadow-lg transition-all dark:from-green-500/20 dark:to-emerald-500/20"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 text-white">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-green-900 group-hover:text-green-700 dark:text-green-300">
                      WhatsApp
                    </p>
                    <p className="text-sm text-green-700/70 dark:text-green-300/70">+92 301 2954272</p>
                  </div>
                  <MessageSquare className="ml-auto h-5 w-5 text-green-600 group-hover:translate-x-1 transition-transform" />
                </a>

                {/* Email */}
                <a
                  href="mailto:support@campuseventplanner.com"
                  className="group flex items-center gap-4 rounded-xl border border-[var(--card-border)] bg-gradient-to-br from-blue-50 to-purple-50 p-4 hover:border-purple-400 hover:shadow-lg transition-all dark:from-blue-500/20 dark:to-purple-500/20"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-blue-900 group-hover:text-blue-700 dark:text-blue-300">
                      Email Support
                    </p>
                    <p className="text-sm text-blue-700/70 dark:text-blue-300/70">support@campuseventplanner.com</p>
                  </div>
                  <Mail className="ml-auto h-5 w-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
                </a>

                {/* Phone */}
                <div className="flex items-center gap-4 rounded-xl border border-[var(--card-border)] bg-gradient-to-br from-orange-50 to-red-50 p-4 dark:from-orange-500/20 dark:to-red-500/20">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-500 text-white">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-orange-900 dark:text-orange-300">Call Us</p>
                    <p className="text-sm text-orange-700/70 dark:text-orange-300/70">+92 301 2954272</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-6">
              <h3 className="mb-4 text-lg font-bold text-[var(--foreground)]">Quick Links</h3>
              <div className="space-y-2">
                {[
                  { label: "FAQ", href: "/faq" },
                  { label: "Help Center", href: "/help" },
                  { label: "Community Forum", href: "/community" },
                  { label: "Report Bug", href: "/bug-report" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-[var(--muted-foreground)] hover:bg-[var(--muted)]/60 hover:text-[var(--foreground)] transition-colors"
                  >
                    <span>→</span> {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Business Hours */}
            <div className="rounded-2xl border border-[var(--card-border)] bg-gradient-to-br from-purple-50 to-pink-50 p-6 dark:from-purple-500/20 dark:to-pink-500/20">
              <h3 className="mb-4 flex items-center gap-2 font-bold text-purple-900 dark:text-purple-300">
                <Clock className="h-5 w-5" />
                Business Hours
              </h3>
              <div className="space-y-2 text-sm text-purple-700 dark:text-purple-300/80">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-6">
            <h2 className="mb-6 text-2xl font-bold text-[var(--foreground)]">Send us a Message</h2>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center rounded-xl border-2 border-emerald-500 bg-emerald-50 p-8 text-center dark:bg-emerald-500/20"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500">
                  <Send className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-emerald-900 dark:text-emerald-300">
                  Message Sent! ✓
                </h3>
                <p className="text-sm text-emerald-700 dark:text-emerald-300/80">
                  Thank you for contacting us. We'll get back to you soon!
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="w-full rounded-lg border border-[var(--card-border)] bg-[var(--muted)]/40 px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="w-full rounded-lg border border-[var(--card-border)] bg-[var(--muted)]/40 px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    required
                    className="w-full rounded-lg border border-[var(--card-border)] bg-[var(--muted)]/40 px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us what's on your mind..."
                    required
                    rows={5}
                    className="w-full rounded-lg border border-[var(--card-border)] bg-[var(--muted)]/40 px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-all hover:shadow-lg"
                >
                  <Send className="h-4 w-4" />
                  Send Message
                </Button>

                <p className="text-xs text-[var(--muted-foreground)] text-center">
                  We usually respond within 24 hours
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div variants={itemVariants} className="mt-12 rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-8">
          <h2 className="mb-6 text-2xl font-bold text-[var(--foreground)]">Frequently Asked Questions</h2>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              { q: "How do I register for an event?", a: "Browse events on the homepage, click on an event, and fill out the registration form." },
              { q: "Can I change my registration?", a: "Yes, you can modify your registration up to 24 hours before the event starts." },
              { q: "How do I become an organizer?", a: "Contact our support team via WhatsApp to request organizer status." },
              { q: "What if I can't attend an event?", a: "You can cancel your registration anytime from your dashboard." },
            ].map((faq, idx) => (
              <div key={idx} className="rounded-lg border border-[var(--card-border)] p-4">
                <p className="font-semibold text-[var(--foreground)] mb-2">Q: {faq.q}</p>
                <p className="text-sm text-[var(--muted-foreground)]">A: {faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
