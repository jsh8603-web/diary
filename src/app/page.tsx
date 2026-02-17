"use client";

import { useEffect, useState, memo } from "react";
import Link from "next/link";
import { getRecentEntries } from "@/lib/firebase/diary";
import { getRecentComments } from "@/lib/firebase/comments";
import type { DiaryEntry, Comment } from "@/lib/types";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import Spinner from "@/components/Spinner";

/** Memoized recent entry card to prevent unnecessary re-renders */
const RecentEntryCard = memo(function RecentEntryCard({
  entry,
}: {
  entry: DiaryEntry;
}) {
  return (
    <Link
      href={`/diary?date=${entry.date}`}
      className="group block bg-baby-white rounded-2xl overflow-hidden border border-baby-border hover:shadow-md transition-shadow"
    >
      {entry.photos && entry.photos.length > 0 && (
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={entry.photos[0].url}
            alt=""
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            decoding="async"
          />
        </div>
      )}
      <div className="p-4">
        <p className="text-xs text-baby-text-light mb-1">
          {format(new Date(entry.date), "yyyy년 M월 d일 (EEEE)", {
            locale: ko,
          })}
        </p>
        {entry.title && (
          <h3 className="font-serif text-lg text-baby-taupe font-semibold mb-1">
            {entry.title}
          </h3>
        )}
        <p className="text-sm text-baby-text-light line-clamp-2">
          {entry.content}
        </p>
      </div>
    </Link>
  );
});

/** Memoized recent comment item */
const RecentCommentItem = memo(function RecentCommentItem({
  comment,
}: {
  comment: Comment;
}) {
  return (
    <Link
      href={`/diary?date=${comment.entryDate}`}
      className="block bg-baby-white rounded-xl p-4 border border-baby-border hover:shadow-sm transition-shadow"
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-sm font-medium text-baby-taupe">
          {comment.userName}
        </span>
        <span className="text-xs text-baby-text-light">
          {comment.createdAt?.toDate
            ? format(comment.createdAt.toDate(), "M월 d일")
            : ""}
        </span>
      </div>
      <p className="text-sm text-baby-text-light line-clamp-1">
        {comment.content}
      </p>
    </Link>
  );
});

export default function HomePage() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [e, c] = await Promise.all([
          getRecentEntries(6),
          getRecentComments(10),
        ]);
        if (!cancelled) {
          setEntries(e);
          setComments(c);
        }
      } catch (err) {
        console.error("홈 데이터 로드 실패:", err);
        if (!cancelled) {
          setError("데이터를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.");
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

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-baby-pink to-baby-cream py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-baby-taupe-light text-sm tracking-widest uppercase mb-3">
            Baby Diary
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl text-baby-taupe font-bold mb-4">
            우리 아기 일기
          </h1>
          <p className="text-baby-text-light text-lg mb-8">
            소중한 매일의 순간을 기록합니다
          </p>
          <div className="w-56 h-72 sm:w-64 sm:h-80 mx-auto rounded-[50%] overflow-hidden border-4 border-white shadow-lg mb-8">
            {/* Hero image: priority loading with fetchpriority="high" */}
            <img
              src="/hero-baby.jpeg"
              alt="우리 아기"
              className="w-full h-full object-cover object-[center_65%]"
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <div>
            <Link
              href="/diary"
              className="inline-block bg-baby-taupe text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-baby-taupe-dark transition-colors"
            >
              일기 보러가기
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Entries */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <h2 className="font-serif text-2xl text-baby-taupe mb-6">최근 일기</h2>
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
          <div className="text-center py-12">
            <p className="text-baby-text-light mb-4">
              아직 작성된 일기가 없습니다
            </p>
            <Link
              href="/write"
              className="inline-block bg-baby-taupe text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-baby-taupe-dark transition-colors"
            >
              첫 일기 쓰러가기
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {entries.map((entry) => (
              <RecentEntryCard key={entry.date} entry={entry} />
            ))}
          </div>
        )}
      </section>

      {/* Recent Comments */}
      {comments.length > 0 && (
        <section className="max-w-3xl mx-auto px-4 pb-12">
          <h2 className="font-serif text-2xl text-baby-taupe mb-6">
            최근 댓글
          </h2>
          <div className="space-y-3">
            {comments.map((c) => (
              <RecentCommentItem key={c.id} comment={c} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
