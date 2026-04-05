import { Suspense } from "react";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

function ErrorContent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      </div>

      <div className="relative z-10 max-w-md w-full">
        <div className="rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl shadow-red-500/5 overflow-hidden p-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl blur"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <div className="relative h-16 w-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                <AlertTriangle className="h-8 w-8 text-white" strokeWidth={2} />
              </div>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-white text-center mb-2">
            Authentication Error
          </h1>
          <p className="text-white/60 text-center text-sm mb-6">
            Something went wrong during the authentication process. Please try again.
          </p>

          <div className="space-y-3">
            <Link
              href="/login"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl font-medium text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
            >
              Try Again
            </Link>

            <Link
              href="/"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl font-medium text-white/60 border border-white/20 hover:border-white/40 hover:text-white transition-all duration-300"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>

          <p className="text-xs text-white/40 text-center mt-6">
            If the problem persists, please contact support at support@campusevents.com
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorContent />
    </Suspense>
  );
}
