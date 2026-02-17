"use client";

import { useEffect, useState, useCallback, memo } from "react";
import { useAuth } from "./AuthProvider";
import { useToast } from "./Toast";
import { addComment, subscribeToComments, deleteComment } from "@/lib/firebase/comments";
import type { Comment } from "@/lib/types";
import { format } from "date-fns";
import Link from "next/link";

interface Props {
  entryDate: string;
}

/** Memoized individual comment item */
const CommentItem = memo(function CommentItem({
  comment,
  canDelete,
  onDelete,
}: {
  comment: Comment;
  canDelete: boolean;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="bg-baby-cream rounded-xl p-4 border border-baby-border">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {comment.userPhoto && (
            <img
              src={comment.userPhoto}
              alt=""
              className="w-6 h-6 rounded-full"
            />
          )}
          <span className="text-sm font-medium text-baby-taupe">
            {comment.userName}
          </span>
          <span className="text-xs text-baby-text-light">
            {comment.createdAt?.toDate
              ? format(comment.createdAt.toDate(), "yyyy.MM.dd HH:mm")
              : ""}
          </span>
        </div>
        {canDelete && comment.id && (
          <button
            onClick={() => onDelete(comment.id!)}
            className="text-xs text-baby-text-light hover:text-red-400 transition-colors"
          >
            삭제
          </button>
        )}
      </div>
      <p className="text-sm text-baby-text whitespace-pre-wrap">
        {comment.content}
      </p>
    </div>
  );
});

export default function CommentSection({ entryDate }: Props) {
  const { user, isAdminUser } = useAuth();
  const { showToast } = useToast();
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const unsub = subscribeToComments(entryDate, (newComments) => {
      setComments(newComments);
    });
    return () => unsub();
  }, [entryDate]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
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
        console.error("댓글 작성 실패:", err);
        const msg = err instanceof Error ? err.message : "댓글 작성에 실패했습니다";
        showToast(msg, "error");
      } finally {
        setSubmitting(false);
      }
    },
    [user, content, entryDate]
  );

  const handleDelete = useCallback(async (commentId: string) => {
    if (!confirm("댓글을 삭제하시겠습니까?")) return;
    try {
      await deleteComment(commentId);
      showToast("댓글이 삭제되었습니다", "success");
    } catch (err) {
      console.error("댓글 삭제 실패:", err);
      showToast("삭제에 실패했습니다", "error");
    }
  }, [showToast]);

  const handleContentChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setContent(e.target.value);
    },
    []
  );

  return (
    <section className="mt-10">
      <h3 className="font-serif text-xl text-baby-taupe mb-4">
        댓글 {comments.length > 0 && `(${comments.length})`}
      </h3>

      {/* 댓글 목록 */}
      <div className="space-y-3 mb-6">
        {comments.map((c) => (
          <CommentItem
            key={c.id}
            comment={c}
            canDelete={isAdminUser || user?.uid === c.userId}
            onDelete={handleDelete}
          />
        ))}
        {comments.length === 0 && (
          <div className="text-center py-6">
            <p className="text-sm text-baby-text-light">
              첫 번째 댓글을 남겨주세요
            </p>
            <p className="text-xs text-baby-text-light mt-1">
              따뜻한 한마디가 큰 힘이 됩니다
            </p>
          </div>
        )}
      </div>

      {/* 댓글 입력 */}
      {user ? (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={content}
            onChange={handleContentChange}
            placeholder="댓글을 입력하세요..."
            aria-label="댓글 입력"
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
