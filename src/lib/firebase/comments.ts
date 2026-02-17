"use client";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  onSnapshot,
  type Unsubscribe,
} from "firebase/firestore";
import { db } from "./config";
import type { Comment } from "../types";

const COMMENTS_COL = "comments";
const MAX_COMMENT_LENGTH = 2000;

function sanitizeComment(text: string): string {
  return text
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .trim();
}

export async function addComment(
  comment: Omit<Comment, "id" | "createdAt">
) {
  if (!comment.content || !comment.content.trim()) {
    throw new Error("댓글 내용을 입력해주세요.");
  }
  if (comment.content.length > MAX_COMMENT_LENGTH) {
    throw new Error(`댓글은 ${MAX_COMMENT_LENGTH}자 이내로 작성해주세요.`);
  }
  if (!comment.userId) {
    throw new Error("로그인이 필요합니다.");
  }
  if (!comment.entryDate) {
    throw new Error("일기 날짜 정보가 없습니다.");
  }
  return addDoc(collection(db, COMMENTS_COL), {
    ...comment,
    content: sanitizeComment(comment.content),
    userName: comment.userName || "익명",
    createdAt: Timestamp.now(),
  });
}

export async function getCommentsByEntry(entryDate: string): Promise<Comment[]> {
  if (!entryDate) {
    return [];
  }
  const q = query(
    collection(db, COMMENTS_COL),
    where("entryDate", "==", entryDate),
    orderBy("createdAt", "asc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Comment));
}

export function subscribeToComments(
  entryDate: string,
  callback: (comments: Comment[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  if (!entryDate) {
    callback([]);
    return () => {};
  }
  const q = query(
    collection(db, COMMENTS_COL),
    where("entryDate", "==", entryDate),
    orderBy("createdAt", "asc")
  );
  return onSnapshot(
    q,
    (snap) => {
      const comments = snap.docs.map(
        (d) => ({ id: d.id, ...d.data() } as Comment)
      );
      callback(comments);
    },
    (error) => {
      console.error("댓글 구독 오류:", error);
      if (onError) {
        onError(error);
      }
    }
  );
}

export async function getRecentComments(count = 10): Promise<Comment[]> {
  const safeCount = Math.min(Math.max(1, count), 100);
  const q = query(
    collection(db, COMMENTS_COL),
    orderBy("createdAt", "desc"),
    limit(safeCount)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Comment));
}

export async function deleteComment(commentId: string) {
  if (!commentId) {
    throw new Error("댓글 ID가 없습니다.");
  }
  await deleteDoc(doc(db, COMMENTS_COL, commentId));
}
