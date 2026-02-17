"use client";

import { useAuth } from "./AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading, isAdminUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || !isAdminUser)) {
      router.push("/login");
    }
  }, [user, loading, isAdminUser, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-[3px] border-baby-taupe border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || !isAdminUser) return null;

  return <>{children}</>;
}
