"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllEntries } from "@/lib/firebase/diary";
import type { DiaryEntry } from "@/lib/types";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

export default function DiaryList() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getAllEntries();
        setEntries(data);
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const grouped = entries.reduce<Record<string, DiaryEntry[]>>((acc, entry) => {
    const month = entry.date.substring(0, 7);
    if (!acc[month]) acc[month] = [];
    acc[month].push(entry);
    return acc;
  }, {});

  const months = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl text-baby-taupe font-bold mb-8">
        일기 목록
      </h1>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-6 h-6 border-2 border-baby-taupe border-t-transparent rounded-full animate-spin" />
        </div>
      ) : entries.length === 0 ? (
        <p className="text-baby-text-light text-center py-12">
          아직 작성된 일기가 없습니다
        </p>
      ) : (
        <div className="space-y-10">
          {months.map((month) => (
            <section key={month}>
              <h2 className="font-serif text-xl text-baby-taupe mb-4 border-b border-baby-border pb-2">
                {format(new Date(month + "-01"), "yyyy년 M월", { locale: ko })}
              </h2>
              <div className="space-y-3">
                {grouped[month].map((entry) => (
                  <Link
                    key={entry.date}
                    href={`/diary?date=${entry.date}`}
                    className="flex gap-4 bg-baby-white rounded-xl p-4 border border-baby-border hover:shadow-sm transition-shadow"
                  >
                    {entry.photos.length > 0 && (
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={entry.photos[0].url}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-baby-text-light mb-1">
                        {format(new Date(entry.date), "M월 d일 (EEEE)", {
                          locale: ko,
                        })}
                      </p>
                      {entry.title && (
                        <h3 className="font-serif text-base text-baby-taupe font-semibold truncate">
                          {entry.title}
                        </h3>
                      )}
                      <p className="text-sm text-baby-text-light line-clamp-2 mt-0.5">
                        {entry.content}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
