import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/constants";
import { verifySessionJwt } from "@/lib/session-token";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const secret = process.env.AUTH_SECRET;

  const isOrganizerPath = pathname.startsWith("/organizer");
  const isNotificationsPath = pathname.startsWith("/notifications");

  if (!isOrganizerPath && !isNotificationsPath) {
    return NextResponse.next();
  }

  if (!secret) {
    return NextResponse.next();
  }

  const key = new TextEncoder().encode(secret);

  const redirectLogin = (next: string, clearSession: boolean) => {
    const login = new URL("/login", request.url);
    login.searchParams.set("next", next);
    const res = NextResponse.redirect(login);
    if (clearSession) {
      res.cookies.delete(SESSION_COOKIE);
    }
    return res;
  };

  const nextParam = isOrganizerPath ? "/organizer/events" : "/notifications";

  if (!token) {
    return redirectLogin(nextParam, false);
  }

  const verified = await verifySessionJwt(token, key);
  if (!verified) {
    return redirectLogin(nextParam, true);
  }

  if (isOrganizerPath && verified.role !== "ORGANIZER" && verified.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/organizer", "/organizer/:path*", "/notifications", "/notifications/:path*"],
};
