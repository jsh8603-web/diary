"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getRecentEntries } from "@/lib/firebase/diary";
import { getRecentComments } from "@/lib/firebase/comments";
import type { DiaryEntry, Comment } from "@/lib/types";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

export default function HomePage() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [e, c] = await Promise.all([
          getRecentEntries(6),
          getRecentComments(10),
        ]);
        setEntries(e);
        setComments(c);
      } catch {
        // Firebase가 설정되지 않았을 때 무시
      } finally {
        setLoading(false);
      }
    }
    load();
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
            <img
              src="/hero-baby.jpeg"
              alt="우리 아기"
              className="w-full h-full object-cover object-[center_65%]"
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
            <div className="w-6 h-6 border-2 border-baby-taupe border-t-transparent rounded-full animate-spin" />
          </div>
        ) : entries.length === 0 ? (
          <p className="text-baby-text-light text-center py-12">
            아직 작성된 일기가 없습니다
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {entries.map((entry) => (
              <Link
                key={entry.date}
                href={`/diary?date=${entry.date}`}
                className="group block bg-baby-white rounded-2xl overflow-hidden border border-baby-border hover:shadow-md transition-shadow"
              >
                {entry.photos.length > 0 && (
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={entry.photos[0].url}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
              <Link
                key={c.id}
                href={`/diary?date=${c.entryDate}`}
                className="block bg-baby-white rounded-xl p-4 border border-baby-border hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-baby-taupe">
                    {c.userName}
                  </span>
                  <span className="text-xs text-baby-text-light">
                    {c.createdAt?.toDate
                      ? format(c.createdAt.toDate(), "M월 d일")
                      : ""}
                  </span>
                </div>
                <p className="text-sm text-baby-text-light line-clamp-1">
                  {c.content}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
