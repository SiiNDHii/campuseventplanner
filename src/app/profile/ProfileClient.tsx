"use client";

import { useState, useRef, useActionState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Upload, Lock, User, Mail, Check, AlertCircle, Eye, EyeOff } from "lucide-react";
import { updateProfile, changePassword } from "@/app/actions/profile";
import { FormAlert } from "@/components/ui/form-alert";
import { Button } from "@/components/ui/button";

interface ProfilePageProps {
  user: {
    id: string;
    name: string | null;
    email: string;
    role: string;
    profileImage: string | null;
  };
}

export default function ProfilePage({ user }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState<"edit" | "password">("edit");
  const [profileImage, setProfileImage] = useState<string | null>(user.profileImage);
  const [showPasswordFields, setShowPasswordFields] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [editState, editAction, isEditPending] = useActionState(updateProfile, null);
  const [passwordState, passwordAction, isPasswordPending] = useActionState(changePassword, null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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
          <h1 className="text-3xl font-bold text-purple-600 sm:text-4xl">👤 My Profile</h1>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            Manage your account information and preferences
          </p>
        </div>
      </motion.div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-8 lg:grid-cols-3"
        >
          {/* Profile Card Sidebar */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-6 sticky top-4">
              <div className="text-center">
                {/* Profile Picture */}
                <div className="relative mx-auto mb-4 h-24 w-24">
                  {profileImage ? (
                    <Image
                      src={profileImage}
                      alt={user.name || "Profile"}
                      width={96}
                      height={96}
                      className="h-24 w-24 rounded-full border-4 border-purple-200 object-cover"
                    />
                  ) : (
                    <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-purple-200 bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                      <User className="h-12 w-12 text-purple-600" />
                    </div>
                  )}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -right-2 -bottom-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-purple-600 to-pink-600 text-white transition-transform hover:scale-110 dark:border-slate-950"
                  >
                    <Upload className="h-4 w-4" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>

                <h2 className="mb-1 text-xl font-bold text-[var(--foreground)]">
                  {user.name || "User"}
                </h2>
                <p className="mb-3 text-sm text-[var(--muted-foreground)]">{user.email}</p>
                <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700 dark:bg-purple-500/20 dark:text-purple-300">
                  {user.role}
                </span>

                <div className="mt-4 rounded-lg bg-[var(--muted)]/40 p-3 text-xs text-[var(--muted-foreground)]">
                  Click the camera icon to update your profile picture
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tabs Content */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            {/* Tabs */}
            <div className="mb-6 flex gap-2 border-b border-[var(--card-border)]">
              {[
                { id: "edit", label: "Edit Profile", icon: User },
                { id: "password", label: "Password", icon: Lock },
              ].map((tab) => {
                const TabIcon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? "border-purple-600 text-purple-600"
                        : "border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                    }`}
                  >
                    <TabIcon className="h-4 w-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              {/* Edit Profile Tab */}
              {activeTab === "edit" && (
                <motion.form
                  key="edit"
                  action={editAction}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="space-y-6"
                >
                  {/* Profile Image Hidden Input */}
                  <input type="hidden" name="profileImage" value={profileImage || ""} />

                  {/* Alerts */}
                  {editState?.message && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <FormAlert
                        type={editState.success ? "success" : "error"}
                        message={editState.message}
                      />
                    </motion.div>
                  )}

                  {/* Name Field */}
                  <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-6">
                    <label className="block text-sm font-semibold text-[var(--foreground)] mb-3">
                      <User className="mr-2 inline h-4 w-4" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      defaultValue={user.name || ""}
                      placeholder="Your full name"
                      className="w-full rounded-lg border border-[var(--card-border)] bg-[var(--muted)]/40 px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-6">
                    <label className="block text-sm font-semibold text-[var(--foreground)] mb-3">
                      <Mail className="mr-2 inline h-4 w-4" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      defaultValue={user.email}
                      placeholder="your@email.com"
                      className="w-full rounded-lg border border-[var(--card-border)] bg-[var(--muted)]/40 px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition"
                    />
                  </div>

                  {/* Account Info */}
                  <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--muted)]/40 p-6">
                    <h3 className="mb-4 font-semibold text-[var(--foreground)]">Account Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[var(--muted-foreground)]">Account Type:</span>
                        <span className="font-medium text-[var(--foreground)]">{user.role}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--muted-foreground)]">Member Since:</span>
                        <span className="font-medium text-[var(--foreground)]">April 2026</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isEditPending}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
                  >
                    {isEditPending ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </motion.form>
              )}

              {/* Password Tab */}
              {activeTab === "password" && (
                <motion.form
                  key="password"
                  action={passwordAction}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="space-y-6"
                >
                  {/* Alerts */}
                  {passwordState?.message && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <FormAlert
                        type={passwordState.success ? "success" : "error"}
                        message={passwordState.message}
                      />
                    </motion.div>
                  )}

                  {/* Security Info */}
                  <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-500/30 dark:bg-blue-500/10">
                    <p className="flex items-start gap-3 text-sm text-blue-700 dark:text-blue-300">
                      <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                      <span>
                        Use a strong password with at least 8 characters including uppercase, lowercase, and numbers.
                      </span>
                    </p>
                  </div>

                  {/* Current Password */}
                  <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-6">
                    <label className="block text-sm font-semibold text-[var(--foreground)] mb-3">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPasswordFields.current ? "text" : "password"}
                        name="currentPassword"
                        placeholder="Enter your current password"
                        className="w-full rounded-lg border border-[var(--card-border)] bg-[var(--muted)]/40 px-4 py-3 pr-10 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswordFields((p) => ({ ...p, current: !p.current }))}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                      >
                        {showPasswordFields.current ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* New Password */}
                  <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-6">
                    <label className="block text-sm font-semibold text-[var(--foreground)] mb-3">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPasswordFields.new ? "text" : "password"}
                        name="newPassword"
                        placeholder="Enter your new password"
                        className="w-full rounded-lg border border-[var(--card-border)] bg-[var(--muted)]/40 px-4 py-3 pr-10 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswordFields((p) => ({ ...p, new: !p.new }))}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                      >
                        {showPasswordFields.new ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-6">
                    <label className="block text-sm font-semibold text-[var(--foreground)] mb-3">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPasswordFields.confirm ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirm your new password"
                        className="w-full rounded-lg border border-[var(--card-border)] bg-[var(--muted)]/40 px-4 py-3 pr-10 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswordFields((p) => ({ ...p, confirm: !p.confirm }))}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                      >
                        {showPasswordFields.confirm ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isPasswordPending}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
                  >
                    {isPasswordPending ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Changing Password...
                      </>
                    ) : (
                      <>
                        <Lock className="h-4 w-4" />
                        Change Password
                      </>
                    )}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
