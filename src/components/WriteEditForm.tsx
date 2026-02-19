"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useAuth } from "@/components/AuthProvider";
import { getEntry, updateEntry } from "@/lib/firebase/diary";
import { uploadPhoto, deletePhoto } from "@/lib/firebase/storage";
import Spinner from "@/components/Spinner";
import type { DiaryEntry, PhotoInfo } from "@/lib/types";

/** PhotoEditor is a heavy modal component - load it only when needed */
const PhotoEditor = dynamic(() => import("@/components/PhotoEditor"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
      <Spinner size="lg" className="border-white border-t-transparent" />
    </div>
  ),
});

interface Props {
  date: string;
}

export default function WriteEditForm({ date }: Props) {
  const router = useRouter();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [entry, setEntry] = useState<DiaryEntry | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [existingPhotos, setExistingPhotos] = useState<PhotoInfo[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);
  const [removedPhotos, setRemovedPhotos] = useState<PhotoInfo[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [editingNewPhoto, setEditingNewPhoto] = useState<number | null>(null);

  // Object URL 메모리 누수 방지: 컴포넌트 언마운트 시 revoke
  useEffect(() => {
    return () => {
      newPreviews.forEach((url) => {
        if (url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleNewPhotoEditorSave(blob: Blob, index: number) {
    const newFile = new File([blob], newFiles[index].name, {
      type: "image/jpeg",
    });
    const url = URL.createObjectURL(blob);
    // 이전 blob URL 해제
    if (newPreviews[index]?.startsWith("blob:")) {
      URL.revokeObjectURL(newPreviews[index]);
    }
    setNewFiles((prev) => prev.map((f, i) => (i === index ? newFile : f)));
    setNewPreviews((prev) => prev.map((p, i) => (i === index ? url : p)));
    setEditingNewPhoto(null);
  }

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const data = await getEntry(date);
        if (!cancelled && data) {
          setEntry(data);
          setTitle(data.title || "");
          setContent(data.content);
          setExistingPhotos(data.photos || []);
        }
      } catch (err) {
        console.error("일기 데이터 로드 실패:", err);
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

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files || []);
    const total = existingPhotos.length + newFiles.length + selected.length;
    if (total > 10) {
      setError("사진은 최대 10장까지 업로드할 수 있습니다");
      e.target.value = "";
      return;
    }
    setNewFiles((prev) => [...prev, ...selected]);
    selected.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setNewPreviews((prev) => [...prev, ev.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
    // 같은 파일 다시 선택할 수 있도록 input 초기화
    e.target.value = "";
  }

  function removeExistingPhoto(index: number) {
    const photo = existingPhotos[index];
    setRemovedPhotos((prev) => [...prev, photo]);
    setExistingPhotos((prev) => prev.filter((_, i) => i !== index));
  }

  function removeNewFile(index: number) {
    // blob URL인 경우 메모리 해제
    if (newPreviews[index]?.startsWith("blob:")) {
      URL.revokeObjectURL(newPreviews[index]);
    }
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
    setNewPreviews((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user || !content.trim()) return;

    setError("");
    setSubmitting(true);

    try {
      for (const photo of removedPhotos) {
        try {
          await deletePhoto(photo.path);
        } catch (err) {
          console.error("사진 삭제 실패:", err);
        }
      }

      const newPhotos: PhotoInfo[] = [];
      for (let i = 0; i < newFiles.length; i++) {
        const info = await uploadPhoto(
          newFiles[i],
          date,
          existingPhotos.length + i
        );
        newPhotos.push(info);
      }

      await updateEntry(date, {
        title: title.trim() || undefined,
        content: content.trim(),
        photos: [...existingPhotos, ...newPhotos],
      });

      router.push(`/diary?date=${date}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "저장에 실패했습니다";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!entry) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-baby-text-light">일기를 찾을 수 없습니다</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl text-baby-taupe font-bold mb-8">
        일기 수정
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="edit-diary-date" className="block text-sm text-baby-text-light mb-2">
            날짜
          </label>
          <input
            id="edit-diary-date"
            type="date"
            value={date}
            disabled
            className="w-full px-4 py-3 rounded-xl border border-baby-border bg-baby-cream-dark text-sm opacity-60"
          />
        </div>

        <div>
          <label htmlFor="edit-diary-title" className="block text-sm text-baby-text-light mb-2">
            제목 (선택)
          </label>
          <input
            id="edit-diary-title"
            data-testid="edit-title-input"
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
            {existingPhotos.map((photo, i) => (
              <div
                key={`existing-${i}`}
                className="relative aspect-square rounded-lg overflow-hidden"
              >
                <img
                  src={photo.url}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeExistingPhoto(i)}
                  className="absolute top-1 right-1 w-6 h-6 bg-black/50 text-white rounded-full text-xs flex items-center justify-center"
                >
                  &times;
                </button>
              </div>
            ))}
            {newPreviews.map((src, i) => (
              <div
                key={`new-${i}`}
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
                  onClick={() => removeNewFile(i)}
                  className="absolute top-1 right-1 w-6 h-6 bg-black/50 text-white rounded-full text-xs flex items-center justify-center"
                >
                  &times;
                </button>
                <button
                  type="button"
                  onClick={() => setEditingNewPhoto(i)}
                  className="absolute bottom-1 left-1 right-1 bg-baby-taupe/80 text-white text-[10px] py-1 rounded-md text-center opacity-0 group-hover:opacity-100 transition-opacity sm:opacity-100"
                >
                  꾸미기
                </button>
              </div>
            ))}
            {existingPhotos.length + newFiles.length < 10 && (
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
          <label htmlFor="edit-diary-content" className="block text-sm text-baby-text-light mb-2">
            내용
          </label>
          <textarea
            id="edit-diary-content"
            data-testid="edit-content-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={10}
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
            data-testid="edit-submit-button"
            type="submit"
            disabled={submitting || !content.trim()}
            className="bg-baby-taupe text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-baby-taupe-dark transition-colors disabled:opacity-50"
          >
            {submitting ? "저장 중..." : "수정하기"}
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
      {editingNewPhoto !== null && newPreviews[editingNewPhoto] && (
        <PhotoEditor
          imageUrl={newPreviews[editingNewPhoto]}
          onSave={(blob) => handleNewPhotoEditorSave(blob, editingNewPhoto)}
          onCancel={() => setEditingNewPhoto(null)}
        />
      )}
    </div>
  );
}
