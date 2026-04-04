import { getCurrentUser } from "@/app/actions/auth";
import { isOrganizerRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NavBar } from "@/components/layout/NavBar";

export async function Nav() {
  const user = await getCurrentUser();
  let unreadNotifications = 0;
  if (user) {
    unreadNotifications = await prisma.notification.count({
      where: { userId: user.id, read: false },
    });
  }

  return (
    <NavBar
      user={
        user
          ? { id: user.id, email: user.email, name: user.name, role: user.role }
          : null
      }
      isOrganizer={user ? isOrganizerRole(user.role) : false}
      unreadNotifications={unreadNotifications}
    />
  );
}
