"use client";

import { useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import { addComment, subscribeToComments, deleteComment } from "@/lib/firebase/comments";
import type { Comment } from "@/lib/types";
import { format } from "date-fns";
import { isAdmin } from "@/lib/types";
import Link from "next/link";

interface Props {
  entryDate: string;
}

export default function CommentSection({ entryDate }: Props) {
  const { user, isAdminUser } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const unsub = subscribeToComments(entryDate, setComments);
    return unsub;
  }, [entryDate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user || !content.trim()) return;
    setSubmitting(true);
    try {
      const commentData: Parameters<typeof addComment>[0] = {
        entryDate,
        userId: user.uid,
        userName: user.displayName || user.email || "익명",
        content: content.trim(),
      };
      if (user.photoURL) commentData.userPhoto = user.photoURL;
      await addComment(commentData);
      setContent("");
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      alert(`댓글 작성 실패: ${msg}`);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(commentId: string) {
    if (!confirm("댓글을 삭제하시겠습니까?")) return;
    try {
      await deleteComment(commentId);
    } catch {
      alert("삭제에 실패했습니다");
    }
  }

  return (
    <section className="mt-10">
      <h3 className="font-serif text-xl text-baby-taupe mb-4">
        댓글 {comments.length > 0 && `(${comments.length})`}
      </h3>

      {/* 댓글 목록 */}
      <div className="space-y-3 mb-6">
        {comments.map((c) => (
          <div
            key={c.id}
            className="bg-baby-cream rounded-xl p-4 border border-baby-border"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {c.userPhoto && (
                  <img
                    src={c.userPhoto}
                    alt=""
                    className="w-6 h-6 rounded-full"
                  />
                )}
                <span className="text-sm font-medium text-baby-taupe">
                  {c.userName}
                </span>
                <span className="text-xs text-baby-text-light">
                  {c.createdAt?.toDate
                    ? format(c.createdAt.toDate(), "yyyy.MM.dd HH:mm")
                    : ""}
                </span>
              </div>
              {(isAdminUser || user?.uid === c.userId) && c.id && (
                <button
                  onClick={() => handleDelete(c.id!)}
                  className="text-xs text-baby-text-light hover:text-red-400 transition-colors"
                >
                  삭제
                </button>
              )}
            </div>
            <p className="text-sm text-baby-text whitespace-pre-wrap">
              {c.content}
            </p>
          </div>
        ))}
        {comments.length === 0 && (
          <p className="text-sm text-baby-text-light text-center py-4">
            아직 댓글이 없습니다
          </p>
        )}
      </div>

      {/* 댓글 입력 */}
      {user ? (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="댓글을 입력하세요..."
            className="flex-1 px-4 py-3 rounded-xl border border-baby-border bg-baby-white text-sm focus:outline-none focus:border-baby-taupe transition-colors"
          />
          <button
            type="submit"
            disabled={submitting || !content.trim()}
            className="bg-baby-taupe text-white px-5 py-3 rounded-xl text-sm font-medium hover:bg-baby-taupe-dark transition-colors disabled:opacity-50 flex-shrink-0"
          >
            {submitting ? "..." : "작성"}
          </button>
        </form>
      ) : (
        <div className="text-center py-4">
          <Link href="/login" className="text-sm text-baby-taupe underline">
            로그인하고 댓글을 남겨보세요
          </Link>
        </div>
      )}
    </section>
  );
}
