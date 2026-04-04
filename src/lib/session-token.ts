import { jwtVerify } from "jose";
import { z } from "zod";

/** Issuer / audience prevent token reuse across apps and tighten verification. */
export const JWT_ISSUER = "campus-event-planner";
export const JWT_AUDIENCE = "cep-session";

const sessionPayloadSchema = z.object({
  sub: z.string().min(1),
  email: z.string().email(),
  role: z.enum(["ADMIN", "ORGANIZER", "STUDENT"]),
});

export type VerifiedSession = {
  userId: string;
  email: string;
  role: "ADMIN" | "ORGANIZER" | "STUDENT";
};

/**
 * Verify HS256 session JWT: signature, exp, iss, aud, and payload shape.
 * Use from proxy (Edge) and from server `getSession` (Node).
 */
export async function verifySessionJwt(
  token: string,
  secret: Uint8Array
): Promise<VerifiedSession | null> {
  try {
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ["HS256"],
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
    });
    const parsed = sessionPayloadSchema.safeParse(payload);
    if (!parsed.success) return null;
    return {
      userId: parsed.data.sub,
      email: parsed.data.email,
      role: parsed.data.role,
    };
  } catch {
    return null;
  }
}
