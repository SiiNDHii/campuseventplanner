import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/app/api/auth/[...nextauth]/route";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Routes that require authentication
  const isOrganizerPath = pathname.startsWith("/organizer");
  const isAdminPath = pathname.startsWith("/admin");
  const isNotificationsPath = pathname.startsWith("/notifications");
  const isProfilePath = pathname.startsWith("/profile");
  const isSettingsPath = pathname.startsWith("/settings");
  const isSupportPath = pathname.startsWith("/support");
  const isProtectedPath =
    isOrganizerPath ||
    isAdminPath ||
    isNotificationsPath ||
    isProfilePath ||
    isSettingsPath ||
    isSupportPath;

  // Public routes don't need protection
  if (!isProtectedPath) {
    return NextResponse.next();
  }

  // Check session using NextAuth
  const session = await auth();

  // If no session, redirect to login
  if (!session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const userRole = session.user?.role || "STUDENT";

  // Admin route protection
  if (isAdminPath && userRole !== "ADMIN") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Organizer route protection (organizers and admins can access)
  if (
    isOrganizerPath &&
    userRole !== "ORGANIZER" &&
    userRole !== "ADMIN"
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // All other authenticated routes allow any authenticated user
  return NextResponse.next();
}

export const config = {
  matcher: ["/organizer", "/organizer/:path*", "/notifications", "/notifications/:path*"],
};
