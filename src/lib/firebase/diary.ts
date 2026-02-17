"use client";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
  Timestamp,
  where,
  startAfter,
  DocumentSnapshot,
} from "firebase/firestore";
import { db } from "./config";
import type { DiaryEntry } from "../types";

const ENTRIES_COL = "entries";

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const YEAR_MONTH_REGEX = /^\d{4}-\d{2}$/;

function validateDate(date: string): void {
  if (!date || !DATE_REGEX.test(date)) {
    throw new Error(`잘못된 날짜 형식입니다: ${date} (YYYY-MM-DD 형식 필요)`);
  }
}

function validateYearMonth(yearMonth: string): void {
  if (!yearMonth || !YEAR_MONTH_REGEX.test(yearMonth)) {
    throw new Error(`잘못된 연월 형식입니다: ${yearMonth} (YYYY-MM 형식 필요)`);
  }
}

function toEntry(d: DocumentSnapshot): DiaryEntry {
  const data = d.data();
  return {
    date: data?.date ?? d.id,
    content: data?.content ?? "",
    photos: Array.isArray(data?.photos) ? data.photos : [],
    authorId: data?.authorId ?? "",
    authorName: data?.authorName ?? "",
    createdAt: data?.createdAt ?? Timestamp.now(),
    updatedAt: data?.updatedAt ?? Timestamp.now(),
    ...(data?.title ? { title: data.title } : {}),
  } as DiaryEntry;
}

export async function getEntry(date: string): Promise<DiaryEntry | null> {
  validateDate(date);
  const snap = await getDoc(doc(db, ENTRIES_COL, date));
  return snap.exists() ? toEntry(snap) : null;
}

export async function getRecentEntries(count = 6): Promise<DiaryEntry[]> {
  const safeCount = Math.min(Math.max(1, count), 100);
  const q = query(
    collection(db, ENTRIES_COL),
    orderBy("date", "desc"),
    limit(safeCount)
  );
  const snap = await getDocs(q);
  return snap.docs.map(toEntry);
}

export async function getEntriesByMonth(
  yearMonth: string
): Promise<DiaryEntry[]> {
  validateYearMonth(yearMonth);
  const q = query(
    collection(db, ENTRIES_COL),
    where("date", ">=", `${yearMonth}-01`),
    where("date", "<=", `${yearMonth}-31`),
    orderBy("date", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map(toEntry);
}

export async function getAllEntries(): Promise<DiaryEntry[]> {
  const q = query(collection(db, ENTRIES_COL), orderBy("date", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(toEntry);
}

export async function getEntriesPage(
  pageSize: number,
  lastDoc?: DocumentSnapshot
): Promise<{ entries: DiaryEntry[]; lastDoc: DocumentSnapshot | null }> {
  const safePageSize = Math.min(Math.max(1, pageSize), 100);
  let q;
  if (lastDoc) {
    q = query(
      collection(db, ENTRIES_COL),
      orderBy("date", "desc"),
      startAfter(lastDoc),
      limit(safePageSize)
    );
  } else {
    q = query(
      collection(db, ENTRIES_COL),
      orderBy("date", "desc"),
      limit(safePageSize)
    );
  }
  const snap = await getDocs(q);
  const entries = snap.docs.map(toEntry);
  const last = snap.docs.length > 0 ? snap.docs[snap.docs.length - 1] : null;
  return { entries, lastDoc: last };
}

export async function getEntriesInRange(
  startDate: string,
  endDate: string
): Promise<DiaryEntry[]> {
  validateDate(startDate);
  validateDate(endDate);
  if (startDate > endDate) {
    throw new Error("시작 날짜가 종료 날짜보다 클 수 없습니다.");
  }
  const q = query(
    collection(db, ENTRIES_COL),
    where("date", ">=", startDate),
    where("date", "<=", endDate),
    orderBy("date", "asc")
  );
  const snap = await getDocs(q);
  return snap.docs.map(toEntry);
}

export async function createEntry(
  entry: Omit<DiaryEntry, "createdAt" | "updatedAt">
) {
  validateDate(entry.date);
  if (!entry.content || !entry.content.trim()) {
    throw new Error("일기 내용을 입력해주세요.");
  }
  if (!entry.authorId) {
    throw new Error("작성자 정보가 없습니다. 다시 로그인해주세요.");
  }
  const now = Timestamp.now();
  await setDoc(doc(db, ENTRIES_COL, entry.date), {
    ...entry,
    content: entry.content.trim(),
    photos: Array.isArray(entry.photos) ? entry.photos : [],
    createdAt: now,
    updatedAt: now,
  });
}

export async function updateEntry(
  date: string,
  data: Partial<Omit<DiaryEntry, "createdAt">>
) {
  validateDate(date);
  // date 필드는 document ID이므로 업데이트로 변경할 수 없게 제거
  const { date: _removedDate, ...safeData } = data as Partial<DiaryEntry>;
  await updateDoc(doc(db, ENTRIES_COL, date), {
    ...safeData,
    updatedAt: Timestamp.now(),
  });
}

export async function deleteEntry(date: string) {
  validateDate(date);
  await deleteDoc(doc(db, ENTRIES_COL, date));
}
