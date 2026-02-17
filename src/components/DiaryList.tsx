"use client";

import { useEffect, useState, useMemo, useCallback, memo } from "react";
import Link from "next/link";
import { getEntriesPage } from "@/lib/firebase/diary";
import type { DiaryEntry } from "@/lib/types";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import type { DocumentSnapshot } from "firebase/firestore";
import Spinner from "@/components/Spinner";

const PAGE_SIZE = 20;

/** Memoized individual diary entry item to prevent unnecessary re-renders */
const DiaryEntryItem = memo(function DiaryEntryItem({
  entry,
}: {
  entry: DiaryEntry;
}) {
  return (
    <Link
      href={`/diary?date=${entry.date}`}
      className="flex gap-4 bg-baby-white rounded-xl p-4 border border-baby-border hover:shadow-sm transition-shadow"
    >
      {entry.photos && entry.photos.length > 0 && (
        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={entry.photos[0].url}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
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
  );
});

export default function DiaryList() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [lastDoc, setLastDoc] = useState<DocumentSnapshot | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const result = await getEntriesPage(PAGE_SIZE);
        if (!cancelled) {
          setEntries(result.entries);
          setLastDoc(result.lastDoc);
          setHasMore(result.entries.length === PAGE_SIZE);
        }
      } catch (err) {
        console.error("일기 목록 로드 실패:", err);
        if (!cancelled) {
          setError("일기 목록을 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore || !lastDoc) return;
    setLoadingMore(true);
    try {
      const result = await getEntriesPage(PAGE_SIZE, lastDoc);
      setEntries((prev) => [...prev, ...result.entries]);
      setLastDoc(result.lastDoc);
      setHasMore(result.entries.length === PAGE_SIZE);
    } catch (err) {
      console.error("추가 일기 로드 실패:", err);
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, hasMore, lastDoc]);

  /** Memoize the grouped-by-month computation to avoid recalculating on every render */
  const { grouped, months } = useMemo(() => {
    const g = entries.reduce<Record<string, DiaryEntry[]>>((acc, entry) => {
      const month = entry.date.substring(0, 7);
      if (!acc[month]) acc[month] = [];
      acc[month].push(entry);
      return acc;
    }, {});
    const m = Object.keys(g).sort((a, b) => b.localeCompare(a));
    return { grouped: g, months: m };
  }, [entries]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl text-baby-taupe font-bold mb-8">
        일기 목록
      </h1>

      {loading ? (
        <div className="flex justify-center py-12">
          <Spinner size="md" />
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-400 text-sm mb-3">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-baby-taupe text-sm underline"
          >
            다시 시도
          </button>
        </div>
      ) : entries.length === 0 ? (
        <div className="text-center py-16">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto text-baby-taupe-light mb-4" aria-hidden="true">
            <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <p className="text-baby-text-light mb-2">
            아직 작성된 일기가 없습니다
          </p>
          <p className="text-baby-text-light text-sm mb-6">
            소중한 아기의 첫 이야기를 기록해보세요
          </p>
          <Link
            href="/write"
            className="inline-block bg-baby-taupe text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-baby-taupe-dark transition-colors"
          >
            첫 일기 쓰기
          </Link>
        </div>
      ) : (
        <div className="space-y-10">
          {months.map((month) => (
            <section key={month}>
              <h2 className="font-serif text-xl text-baby-taupe mb-4 border-b border-baby-border pb-2">
                {format(new Date(month + "-01"), "yyyy년 M월", { locale: ko })}
              </h2>
              <div className="space-y-3">
                {grouped[month].map((entry) => (
                  <DiaryEntryItem key={entry.date} entry={entry} />
                ))}
              </div>
            </section>
          ))}

          {/* Load More button */}
          {hasMore && (
            <div className="flex justify-center pt-4">
              <button
                onClick={loadMore}
                disabled={loadingMore}
                className="px-6 py-3 rounded-xl border border-baby-border text-baby-text-light text-sm hover:bg-baby-cream-dark transition-colors disabled:opacity-50"
              >
                {loadingMore ? (
                  <span className="flex items-center gap-2">
                    <Spinner size="sm" />
                    불러오는 중...
                  </span>
                ) : (
                  "더 보기"
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
