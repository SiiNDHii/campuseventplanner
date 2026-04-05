"use server";

import bcrypt from "bcryptjs";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export type UpdateProfileState = {
  error?: string;
  success?: boolean;
  message?: string;
} | null;

export async function updateProfile(
  _prev: UpdateProfileState,
  formData: FormData
): Promise<UpdateProfileState> {
  const session = await getSession();
  if (!session) {
    return { error: "Unauthorized" };
  }

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const profileImage = formData.get("profileImage") as string;

  if (!name || !email) {
    return { message: "Name and email are required", error: "validation" };
  }

  try {
    // Check if email is already taken by another user
    const existingUser = await prisma.user.findFirst({
      where: {
        email: email,
        id: { not: session.userId },
      },
    });

    if (existingUser) {
      return { message: "Email is already in use", error: "email_taken" };
    }

    await prisma.user.update({
      where: { id: session.userId },
      data: {
        name,
        email,
        ...(profileImage && { profileImage }),
      },
    });

    return { success: true, message: "Profile updated successfully!" };
  } catch (err) {
    console.error("Error updating profile:", err);
    return { message: "Failed to update profile", error: "update_failed" };
  }
}

export async function changePassword(
  _prev: UpdateProfileState,
  formData: FormData
): Promise<UpdateProfileState> {
  const session = await getSession();
  if (!session) {
    return { error: "Unauthorized" };
  }

  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!currentPassword || !newPassword || !confirmPassword) {
    return { message: "All password fields are required", error: "validation" };
  }

  if (newPassword !== confirmPassword) {
    return { message: "New passwords do not match", error: "password_mismatch" };
  }

  if (newPassword.length < 8) {
    return { message: "Password must be at least 8 characters", error: "password_short" };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
    });

    if (!user) {
      return { message: "User not found", error: "user_not_found" };
    }

    const passwordValid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!passwordValid) {
      return { message: "Current password is incorrect", error: "invalid_password" };
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: session.userId },
      data: { passwordHash: newPasswordHash },
    });

    return { success: true, message: "Password changed successfully!" };
  } catch (err) {
    console.error("Error changing password:", err);
    return { message: "Failed to change password", error: "password_change_failed" };
  }
}
