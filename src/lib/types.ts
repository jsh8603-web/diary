import { Timestamp } from "firebase/firestore";

export interface PhotoInfo {
  url: string;
  path: string; // Storage path for deletion
  width?: number;
  height?: number;
}

export interface DiaryEntry {
  date: string; // YYYY-MM-DD (document ID)
  title?: string;
  content: string;
  photos: PhotoInfo[];
  authorId: string;
  authorName: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Comment {
  id?: string;
  entryDate: string; // 연결된 일기 날짜
  userId: string;
  userName: string;
  userPhoto?: string;
  content: string;
  createdAt: Timestamp;
}

export interface AppConfig {
  babyName: string;
  babyBirthDate: string; // YYYY-MM-DD
  appTitle: string;
}

export const ADMIN_EMAILS = (
  process.env.NEXT_PUBLIC_ADMIN_EMAILS || ""
).split(",").map((e) => e.trim().toLowerCase());

export function isAdmin(email: string | null | undefined): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
}
