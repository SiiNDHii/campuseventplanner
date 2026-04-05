"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { createSession, clearSession, getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ROLES } from "@/lib/constants";
import { safeInternalPath, signInFormSchema, signUpFormSchema } from "@/lib/validation/schemas";

export type AuthState = {
  error?: string;
  success?: string;
  type?: "error" | "success";
  message?: string;
} | null;

export async function signIn(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const parsed = signInFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    next: formData.get("next") ?? undefined,
  });
  if (!parsed.success) {
    return {
      type: "error",
      message: parsed.error.issues[0]?.message ?? "Invalid input.",
    };
  }
  const { email, password, next } = parsed.data;
  const safeNext = safeInternalPath(next ?? "/");

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return {
      type: "error",
      message: "Invalid email or password.",
    };
  }

  await createSession({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  redirect(safeNext);
}

export async function signUp(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const parsed = signUpFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    name: formData.get("name"),
  });
  if (!parsed.success) {
    return {
      type: "error",
      message: parsed.error.issues[0]?.message ?? "Invalid input.",
    };
  }
  const { email, password, name } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return {
      type: "error",
      message: "An account with this email already exists.",
    };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      name: name ?? null,
      role: ROLES.STUDENT,
    },
  });

  await createSession({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  redirect("/events");
}

export async function signOut() {
  await clearSession();
  redirect("/");
}

export async function getCurrentUser() {
  const session = await getSession();
  if (!session) return null;
  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, email: true, name: true, role: true },
  });
  return user ?? null;
}
