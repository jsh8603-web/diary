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

export async function addComment(
  comment: Omit<Comment, "id" | "createdAt">
) {
  return addDoc(collection(db, COMMENTS_COL), {
    ...comment,
    createdAt: Timestamp.now(),
  });
}

export async function getCommentsByEntry(entryDate: string): Promise<Comment[]> {
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
  callback: (comments: Comment[]) => void
): Unsubscribe {
  const q = query(
    collection(db, COMMENTS_COL),
    where("entryDate", "==", entryDate),
    orderBy("createdAt", "asc")
  );
  return onSnapshot(q, (snap) => {
    const comments = snap.docs.map(
      (d) => ({ id: d.id, ...d.data() } as Comment)
    );
    callback(comments);
  });
}

export async function getRecentComments(count = 10): Promise<Comment[]> {
  const q = query(
    collection(db, COMMENTS_COL),
    orderBy("createdAt", "desc"),
    limit(count)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Comment));
}

export async function deleteComment(commentId: string) {
  await deleteDoc(doc(db, COMMENTS_COL, commentId));
}
