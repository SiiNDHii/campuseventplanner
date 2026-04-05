"use client";

import { useSession } from "next-auth/react";

export function useAuth() {
  const { data: session, status } = useSession();

  return {
    user: session?.user,
    session,
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",
    isUnauthenticated: status === "unauthenticated",
    role: session?.user?.role,
  };
}

export function isOrganizerRole(role?: string) {
  return role === "ORGANIZER" || role === "ADMIN";
}

export function isAdminRole(role?: string) {
  return role === "ADMIN";
}
