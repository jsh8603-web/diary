"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";
import WriteNewForm from "@/components/WriteNewForm";
import WriteEditForm from "@/components/WriteEditForm";
import Spinner from "@/components/Spinner";

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
            <Spinner size="md" />
          </div>
        }
      >
        <WriteRouter />
      </Suspense>
    </AuthGuard>
  );
}
