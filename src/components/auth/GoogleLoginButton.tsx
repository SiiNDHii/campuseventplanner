"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface GoogleLoginButtonProps {
  redirectUrl?: string;
  fullWidth?: boolean;
}

export function GoogleLoginButton({
  redirectUrl = "/events",
  fullWidth = true,
}: GoogleLoginButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleGoogleSignIn() {
    try {
      setIsLoading(true);
      await signIn("google", {
        callbackUrl: redirectUrl,
        redirect: true,
      });
    } catch (error) {
      console.error("Sign in error:", error);
      setIsLoading(false);
    }
  }

  return (
    <motion.button
      onClick={handleGoogleSignIn}
      disabled={isLoading}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`flex items-center justify-center gap-3 px-6 py-3 rounded-xl font-medium text-white transition-all duration-300 ${
        fullWidth ? "w-full" : ""
      } ${
        isLoading
          ? "bg-gray-500 cursor-not-allowed"
          : "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:shadow-lg hover:shadow-purple-500/50"
      }`}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Signing in...</span>
        </>
      ) : (
        <>
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 c0-3.331,2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.461,2.268,15.365,1.25,12.545,1.25 c-6.343,0-11.5,5.157-11.5,11.5c0,6.343,5.157,11.5,11.5,11.5c6.344,0,11.5-5.157,11.5-11.5c0-0.828-0.084-1.628-0.239-2.405 H12.545z" />
          </svg>
          <span>Continue with Google</span>
        </>
      )}
    </motion.button>
  );
}
