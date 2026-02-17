"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useAuth } from "@/components/AuthProvider";
import { createEntry, getEntry } from "@/lib/firebase/diary";
import { uploadPhoto } from "@/lib/firebase/storage";
import Spinner from "@/components/Spinner";
import type { PhotoInfo } from "@/lib/types";
import { format } from "date-fns";

/** PhotoEditor is a heavy modal component - load it only when needed */
const PhotoEditor = dynamic(() => import("@/components/PhotoEditor"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
      <Spinner size="lg" className="border-white border-t-transparent" />
    </div>
  ),
});

export default function WriteNewForm() {
  const { user } = useAuth();
  const router = useRouter();
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [editingPhoto, setEditingPhoto] = useState<number | null>(null);

  // Object URL 메모리 누수 방지: 컴포넌트 언마운트 시 revoke
  useEffect(() => {
    return () => {
      previews.forEach((url) => {
        if (url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files || []);
    if (files.length + selected.length > 10) {
      setError("사진은 최대 10장까지 업로드할 수 있습니다");
      e.target.value = "";
      return;
    }
    setFiles((prev) => [...prev, ...selected]);
    selected.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPreviews((prev) => [...prev, ev.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
    // 같은 파일 다시 선택할 수 있도록 input 초기화
    e.target.value = "";
  }

  function removeFile(index: number) {
    // blob URL인 경우 메모리 해제
    if (previews[index]?.startsWith("blob:")) {
      URL.revokeObjectURL(previews[index]);
    }
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  }

  function handleEditorSave(blob: Blob, index: number) {
    const newFile = new File([blob], files[index].name, {
      type: "image/jpeg",
    });
    const url = URL.createObjectURL(blob);
    // 이전 blob URL 해제
    if (previews[index]?.startsWith("blob:")) {
      URL.revokeObjectURL(previews[index]);
    }
    setFiles((prev) => prev.map((f, i) => (i === index ? newFile : f)));
    setPreviews((prev) => prev.map((p, i) => (i === index ? url : p)));
    setEditingPhoto(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user || !content.trim()) return;

    setError("");
    setSubmitting(true);

    try {
      const existing = await getEntry(date);
      if (existing) {
        setError(
          "이미 해당 날짜의 일기가 있습니다. 수정 페이지를 이용해주세요."
        );
        setSubmitting(false);
        return;
      }

      const photos: PhotoInfo[] = [];
      for (let i = 0; i < files.length; i++) {
        const info = await uploadPhoto(files[i], date, i);
        photos.push(info);
      }

      await createEntry({
        date,
        title: title.trim() || undefined,
        content: content.trim(),
        photos,
        authorId: user.uid,
        authorName: user.displayName || user.email || "관리자",
      });

      router.push(`/diary?date=${date}`);
    } catch (err: unknown) {
      console.error("일기 저장 실패:", err);
      const msg = err instanceof Error ? err.message : "저장에 실패했습니다";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl text-baby-taupe font-bold mb-8">
        새 일기 쓰기
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="new-diary-date" className="block text-sm text-baby-text-light mb-2">
            날짜
          </label>
          <input
            id="new-diary-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-baby-border bg-baby-white text-sm focus:outline-none focus:border-baby-taupe transition-colors"
          />
        </div>

        <div>
          <label htmlFor="new-diary-title" className="block text-sm text-baby-text-light mb-2">
            제목 (선택)
          </label>
          <input
            id="new-diary-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="오늘의 제목..."
            className="w-full px-4 py-3 rounded-xl border border-baby-border bg-baby-white text-sm focus:outline-none focus:border-baby-taupe transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm text-baby-text-light mb-2">
            사진 (최대 10장)
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-2">
            {previews.map((src, i) => (
              <div
                key={i}
                className="relative aspect-square rounded-lg overflow-hidden group"
              >
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="absolute top-1 right-1 w-6 h-6 bg-black/50 text-white rounded-full text-xs flex items-center justify-center"
                >
                  &times;
                </button>
                <button
                  type="button"
                  onClick={() => setEditingPhoto(i)}
                  className="absolute bottom-1 left-1 right-1 bg-baby-taupe/80 text-white text-[10px] py-1 rounded-md text-center opacity-0 group-hover:opacity-100 transition-opacity sm:opacity-100"
                >
                  꾸미기
                </button>
              </div>
            ))}
            {files.length < 10 && (
              <label className="aspect-square rounded-lg border-2 border-dashed border-baby-border flex items-center justify-center cursor-pointer hover:border-baby-taupe transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-baby-text-light"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </label>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="new-diary-content" className="block text-sm text-baby-text-light mb-2">
            내용
          </label>
          <textarea
            id="new-diary-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={10}
            placeholder="오늘의 이야기를 적어보세요..."
            className="w-full px-4 py-3 rounded-xl border border-baby-border bg-baby-white text-sm focus:outline-none focus:border-baby-taupe transition-colors resize-none leading-relaxed"
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={submitting || !content.trim()}
            className="bg-baby-taupe text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-baby-taupe-dark transition-colors disabled:opacity-50"
          >
            {submitting ? "저장 중..." : "저장하기"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 rounded-xl border border-baby-border text-baby-text-light text-sm hover:bg-baby-cream-dark transition-colors"
          >
            취소
          </button>
        </div>
      </form>

      {/* 사진 에디터 모달 */}
      {editingPhoto !== null && previews[editingPhoto] && (
        <PhotoEditor
          imageUrl={previews[editingPhoto]}
          onSave={(blob) => handleEditorSave(blob, editingPhoto)}
          onCancel={() => setEditingPhoto(null)}
        />
      )}
    </div>
  );
}
