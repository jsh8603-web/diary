"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getEntry, deleteEntry } from "@/lib/firebase/diary";
import { deletePhoto } from "@/lib/firebase/storage";
import { useAuth } from "@/components/AuthProvider";
import { useToast } from "@/components/Toast";
import CommentSection from "@/components/CommentSection";
import Spinner from "@/components/Spinner";
import type { DiaryEntry } from "@/lib/types";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

interface Props {
  date: string;
}

export default function DiaryDetail({ date }: Props) {
  const router = useRouter();
  const { isAdminUser } = useAuth();
  const { showToast } = useToast();

  const [entry, setEntry] = useState<DiaryEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const data = await getEntry(date);
        if (!cancelled) {
          setEntry(data);
        }
      } catch (err) {
        console.error("일기 로드 실패:", err);
        if (!cancelled) {
          setError("일기를 불러오는데 실패했습니다.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }
    if (date) load();
    return () => {
      cancelled = true;
    };
  }, [date]);

  // Lightbox navigation helper
  const navigatePhoto = useCallback(
    (direction: "prev" | "next") => {
      if (selectedPhoto === null || !entry?.photos) return;
      const total = entry.photos.length;
      if (total <= 1) return;
      if (direction === "prev") {
        setSelectedPhoto(selectedPhoto > 0 ? selectedPhoto - 1 : total - 1);
      } else {
        setSelectedPhoto(selectedPhoto < total - 1 ? selectedPhoto + 1 : 0);
      }
    },
    [selectedPhoto, entry?.photos]
  );

  // Keyboard navigation (ESC, arrows) for lightbox
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (selectedPhoto === null) return;
      if (e.key === "Escape") {
        setSelectedPhoto(null);
      } else if (e.key === "ArrowLeft") {
        navigatePhoto("prev");
      } else if (e.key === "ArrowRight") {
        navigatePhoto("next");
      }
    }
    if (selectedPhoto !== null) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedPhoto, navigatePhoto]);

  // Touch swipe for lightbox
  useEffect(() => {
    if (selectedPhoto === null) return;

    let touchStartX = 0;

    function handleTouchStart(e: TouchEvent) {
      touchStartX = e.changedTouches[0].screenX;
    }

    function handleTouchEnd(e: TouchEvent) {
      const touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      const threshold = 50;
      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          navigatePhoto("next");
        } else {
          navigatePhoto("prev");
        }
      }
    }

    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [selectedPhoto, navigatePhoto]);

  const handleDelete = useCallback(async () => {
    if (!confirm("이 일기를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."))
      return;
    try {
      if (entry?.photos) {
        for (const photo of entry.photos) {
          try {
            await deletePhoto(photo.path);
          } catch (err) {
            console.error("사진 삭제 실패:", err);
          }
        }
      }
      await deleteEntry(date);
      showToast("일기가 삭제되었습니다", "success");
      router.push("/diary");
    } catch (err) {
      console.error("일기 삭제 실패:", err);
      showToast("삭제에 실패했습니다", "error");
    }
  }, [entry, date, router, showToast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-red-400 text-sm mb-3">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="text-baby-taupe text-sm underline"
        >
          다시 시도
        </button>
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
      {entry.photos && entry.photos.length > 0 && (
        <div className="mb-8">
          {entry.photos.length === 1 ? (
            <div className="rounded-2xl overflow-hidden">
              <img
                src={entry.photos[0].url}
                alt=""
                className="w-full cursor-pointer"
                onClick={() => setSelectedPhoto(0)}
                loading="lazy"
                decoding="async"
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
                    loading="lazy"
                    decoding="async"
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
      {selectedPhoto !== null && entry.photos && entry.photos[selectedPhoto] && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
          role="dialog"
          aria-modal="true"
          aria-label="사진 보기"
        >
          <button
            className="absolute top-4 right-4 text-white text-2xl z-10"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedPhoto(null);
            }}
            aria-label="닫기"
          >
            &times;
          </button>

          {/* Left arrow */}
          {entry.photos.length > 1 && (
            <button
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                navigatePhoto("prev");
              }}
              aria-label="이전 사진"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}

          <img
            src={entry.photos[selectedPhoto].url}
            alt={`사진 ${selectedPhoto + 1}`}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Right arrow */}
          {entry.photos.length > 1 && (
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                navigatePhoto("next");
              }}
              aria-label="다음 사진"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}

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
                  aria-label={`사진 ${i + 1}`}
                  aria-current={i === selectedPhoto ? "true" : undefined}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
