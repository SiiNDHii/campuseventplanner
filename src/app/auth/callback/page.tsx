import { auth } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth-server";

export default async function CallbackPage() {
  const session = await auth();
  const user = await getCurrentUser();

  if (!session || !user) {
    redirect("/login");
  }

  // Role-based redirect
  switch (user.role) {
    case "ADMIN":
      redirect("/admin");
    case "ORGANIZER":
      redirect("/organizer/events");
    case "STUDENT":
    default:
      redirect("/events");
  }
}
