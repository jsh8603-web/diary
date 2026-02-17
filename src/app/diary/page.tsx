"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import DiaryList from "@/components/DiaryList";
import DiaryDetail from "@/components/DiaryDetail";
import Spinner from "@/components/Spinner";

function DiaryRouter() {
  const searchParams = useSearchParams();
  const date = searchParams.get("date");

  if (date) {
    return <DiaryDetail date={date} />;
  }
  return <DiaryList />;
}

export default function DiaryPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <Spinner size="md" />
        </div>
      }
    >
      <DiaryRouter />
    </Suspense>
  );
}
