import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { SESSION_COOKIE } from "@/lib/constants";
import { JWT_AUDIENCE, JWT_ISSUER, verifySessionJwt } from "@/lib/session-token";

function getSecret() {
  const s = process.env.AUTH_SECRET;
  if (!s) throw new Error("AUTH_SECRET is not set");
  return new TextEncoder().encode(s);
}

export type SessionUser = {
  userId: string;
  email: string;
  role: string;
};

export async function createSession(user: SessionUser) {
  const token = await new SignJWT({
    email: user.email,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.userId)
    .setIssuer(JWT_ISSUER)
    .setAudience(JWT_AUDIENCE)
    .setExpirationTime("7d")
    .sign(getSecret());

  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });
}

export async function clearSession() {
  (await cookies()).delete(SESSION_COOKIE);
}

export async function getSession(): Promise<SessionUser | null> {
  const raw = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!raw) return null;
  const verified = await verifySessionJwt(raw, getSecret());
  if (!verified) return null;
  return {
    userId: verified.userId,
    email: verified.email,
    role: verified.role,
  };
}

export function isOrganizerRole(role: string) {
  return role === "ORGANIZER" || role === "ADMIN";
}
