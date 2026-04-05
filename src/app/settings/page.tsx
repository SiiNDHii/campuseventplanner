"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Bell, Lock, Palette, User, Mail, LogOut } from "lucide-react";
import { signOut } from "@/app/actions/auth";
import { FormSubmitButton } from "@/components/ui/form-submit-button";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"account" | "preferences" | "security">("account");

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
            href="/dashboard"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-purple-600 sm:text-4xl">⚙️ Settings</h1>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            Manage your account settings, preferences, and security options
          </p>
        </div>
      </motion.div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Tabs */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-8 flex gap-2 border-b border-[var(--card-border)] md:gap-4"
        >
          {[
            { id: "account", label: "Account", icon: User },
            { id: "preferences", label: "Preferences", icon: Palette },
            { id: "security", label: "Security", icon: Lock },
          ].map((tab) => {
            const TabIcon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                variants={itemVariants}
                className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "border-purple-600 text-purple-600"
                    : "border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                }`}
              >
                <TabIcon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Account Settings */}
        {activeTab === "account" && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-6">
              <h2 className="mb-6 text-xl font-bold text-[var(--foreground)]">Profile Information</h2>
              <div className="space-y-4">
                <div className="rounded-xl bg-[var(--muted)]/40 p-4">
                  <label className="text-sm font-medium text-[var(--muted-foreground)]">Full Name</label>
                  <p className="mt-2 text-lg text-[var(--foreground)]">Sam Student</p>
                </div>
                <div className="rounded-xl bg-[var(--muted)]/40 p-4">
                  <label className="text-sm font-medium text-[var(--muted-foreground)]">Email Address</label>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-lg text-[var(--foreground)]">student@campus.edu</p>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
                      ✓ Verified
                    </span>
                  </div>
                </div>
                <div className="rounded-xl bg-[var(--muted)]/40 p-4">
                  <label className="text-sm font-medium text-[var(--muted-foreground)]">Role</label>
                  <p className="mt-2 text-lg font-semibold text-purple-600">Student</p>
                </div>
              </div>
              <Button className="mt-6 w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                Edit Profile (Coming Soon)
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-6">
              <h2 className="mb-4 text-lg font-bold text-[var(--foreground)]">Account Type</h2>
              <div className="rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 p-4 dark:from-purple-500/20 dark:to-pink-500/20">
                <p className="text-sm text-purple-700 dark:text-purple-300">
                  You are registered as a <span className="font-semibold">Student</span>. Contact support if you want to become an organizer.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Preferences */}
        {activeTab === "preferences" && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-6">
              <h2 className="mb-6 text-xl font-bold text-[var(--foreground)]">Notification Preferences</h2>
              <div className="space-y-4">
                {[
                  { label: "Event Reminders", description: "Get reminders for events you registered" },
                  { label: "New Event Announcements", description: "Be notified about new events in your interests" },
                  { label: "Organizer Updates", description: "Receive updates from event organizers" },
                ].map((pref, idx) => (
                  <div key={idx} className="flex items-center justify-between rounded-xl border border-[var(--card-border)] p-4">
                    <div>
                      <p className="font-medium text-[var(--foreground)]">{pref.label}</p>
                      <p className="text-sm text-[var(--muted-foreground)]">{pref.description}</p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-5 w-5 cursor-pointer accent-purple-600"
                    />
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-6">
              <h2 className="mb-6 text-xl font-bold text-[var(--foreground)]">Display Preferences</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-xl border border-[var(--card-border)] p-4">
                  <div>
                    <p className="font-medium text-[var(--foreground)]">Dark Mode</p>
                    <p className="text-sm text-[var(--muted-foreground)]">Easier on the eyes at night</p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-5 w-5 cursor-pointer accent-purple-600"
                  />
                </div>
                <div className="flex items-center justify-between rounded-xl border border-[var(--card-border)] p-4">
                  <div>
                    <p className="font-medium text-[var(--foreground)]">Email Digest</p>
                    <p className="text-sm text-[var(--muted-foreground)]">Weekly summary of events</p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-5 w-5 cursor-pointer accent-purple-600"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Security */}
        {activeTab === "security" && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-6">
              <h2 className="mb-6 text-xl font-bold text-[var(--foreground)]">Password & Security</h2>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                Change Password (Coming Soon)
              </Button>
              <div className="mt-4 rounded-xl bg-blue-50 p-4 dark:bg-blue-500/20">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Last password change: 3 months ago
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-6">
              <h2 className="mb-6 text-xl font-bold text-[var(--foreground)]">Active Sessions</h2>
              <div className="space-y-3">
                <div className="rounded-xl border border-[var(--card-border)] p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[var(--foreground)]">Current Session</p>
                      <p className="text-sm text-[var(--muted-foreground)]">This browser on Windows</p>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="rounded-2xl border border-red-200 bg-red-50 p-6 dark:border-red-500/30 dark:bg-red-500/10">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-red-600 dark:text-red-400">
                <span>Danger Zone</span>
              </h2>
              <form action={signOut} className="space-y-3">
                <p className="text-sm text-red-700 dark:text-red-300">
                  Sign out from your account. You'll need to sign in again to access your dashboard.
                </p>
                <FormSubmitButton className="w-full bg-red-600 hover:bg-red-700 text-white">
                  <LogOut className="h-4 w-4" />
                  Sign out
                </FormSubmitButton>
              </form>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
