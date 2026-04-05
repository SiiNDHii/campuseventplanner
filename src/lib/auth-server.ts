import { auth } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function getCurrentUser() {
  const session = await auth();
  if (!session?.user?.email) return null;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      image: true,
      profileImage: true,
    },
  });

  return user;
}

export function isOrganizerRole(role: string) {
  return role === "ORGANIZER" || role === "ADMIN";
}

export function isAdminRole(role: string) {
  return role === "ADMIN";
}
