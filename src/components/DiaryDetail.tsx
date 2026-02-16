"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getEntry, deleteEntry } from "@/lib/firebase/diary";
import { deletePhoto } from "@/lib/firebase/storage";
import { useAuth } from "@/components/AuthProvider";
import CommentSection from "@/components/CommentSection";
import type { DiaryEntry } from "@/lib/types";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

interface Props {
  date: string;
}

export default function DiaryDetail({ date }: Props) {
  const router = useRouter();
  const { isAdminUser } = useAuth();

  const [entry, setEntry] = useState<DiaryEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getEntry(date);
        setEntry(data);
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }
    if (date) load();
  }, [date]);

  async function handleDelete() {
    if (!confirm("이 일기를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."))
      return;
    try {
      if (entry) {
        for (const photo of entry.photos) {
          try {
            await deletePhoto(photo.path);
          } catch {
            // ignore
          }
        }
        await deleteEntry(date);
      }
      router.push("/diary");
    } catch {
      alert("삭제에 실패했습니다");
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-3 border-baby-taupe border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!entry) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-baby-text-light mb-4">일기를 찾을 수 없습니다</p>
        <Link href="/diary" className="text-baby-taupe underline text-sm">
          목록으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* 뒤로가기 */}
      <Link
        href="/diary"
        className="inline-flex items-center gap-1 text-sm text-baby-text-light hover:text-baby-taupe mb-6 transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        목록으로
      </Link>

      {/* 날짜 & 제목 */}
      <div className="mb-8">
        <p className="text-sm text-baby-text-light mb-2">
          {format(new Date(entry.date), "yyyy년 M월 d일 (EEEE)", {
            locale: ko,
          })}
        </p>
        {entry.title && (
          <h1 className="font-serif text-3xl text-baby-taupe font-bold">
            {entry.title}
          </h1>
        )}
      </div>

      {/* 사진 갤러리 */}
      {entry.photos.length > 0 && (
        <div className="mb-8">
          {entry.photos.length === 1 ? (
            <div className="rounded-2xl overflow-hidden">
              <img
                src={entry.photos[0].url}
                alt=""
                className="w-full cursor-pointer"
                onClick={() => setSelectedPhoto(0)}
              />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {entry.photos.map((photo, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-xl overflow-hidden cursor-pointer"
                  onClick={() => setSelectedPhoto(i)}
                >
                  <img
                    src={photo.url}
                    alt=""
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 본문 */}
      <div className="mb-8">
        <p className="text-baby-text leading-relaxed whitespace-pre-wrap text-base">
          {entry.content}
        </p>
      </div>

      {/* 관리자 버튼 */}
      {isAdminUser && (
        <div className="flex gap-3 mb-8 border-t border-baby-border pt-6">
          <Link
            href={`/write?date=${entry.date}`}
            className="px-4 py-2 rounded-lg border border-baby-taupe text-baby-taupe text-sm hover:bg-baby-pink transition-colors"
          >
            수정하기
          </Link>
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded-lg border border-red-300 text-red-400 text-sm hover:bg-red-50 transition-colors"
          >
            삭제하기
          </button>
        </div>
      )}

      {/* 댓글 */}
      <CommentSection entryDate={date} />

      {/* 사진 라이트박스 */}
      {selectedPhoto !== null && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={() => setSelectedPhoto(null)}
          >
            &times;
          </button>
          <img
            src={entry.photos[selectedPhoto].url}
            alt=""
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          {entry.photos.length > 1 && (
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
              {entry.photos.map((_, i) => (
                <button
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i === selectedPhoto ? "bg-white" : "bg-white/40"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPhoto(i);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
