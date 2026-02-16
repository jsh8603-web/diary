"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import DiaryList from "@/components/DiaryList";
import DiaryDetail from "@/components/DiaryDetail";

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
          <div className="w-6 h-6 border-2 border-baby-taupe border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <DiaryRouter />
    </Suspense>
  );
}
