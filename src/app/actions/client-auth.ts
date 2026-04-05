"use client";

import { signOut as nextAuthSignOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export async function handleSignOut() {
  await nextAuthSignOut({
    redirectUrl: "/",
    redirect: true,
  });
}

export function useSignOut() {
  const router = useRouter();

  async function signOut() {
    await nextAuthSignOut({
      callback: () => {
        router.push("/");
      },
    });
  }

  return { signOut };
}
