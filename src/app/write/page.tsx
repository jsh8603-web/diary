"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";
import WriteNewForm from "@/components/WriteNewForm";
import WriteEditForm from "@/components/WriteEditForm";

function WriteRouter() {
  const searchParams = useSearchParams();
  const editDate = searchParams.get("date");

  if (editDate) {
    return <WriteEditForm date={editDate} />;
  }
  return <WriteNewForm />;
}

export default function WritePage() {
  return (
    <AuthGuard>
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="w-6 h-6 border-2 border-baby-taupe border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <WriteRouter />
      </Suspense>
    </AuthGuard>
  );
}
