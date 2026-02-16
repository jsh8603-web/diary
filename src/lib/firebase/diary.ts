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

export async function getEntry(date: string): Promise<DiaryEntry | null> {
  const snap = await getDoc(doc(db, ENTRIES_COL, date));
  return snap.exists() ? (snap.data() as DiaryEntry) : null;
}

export async function getRecentEntries(count = 6): Promise<DiaryEntry[]> {
  const q = query(
    collection(db, ENTRIES_COL),
    orderBy("date", "desc"),
    limit(count)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as DiaryEntry);
}

export async function getEntriesByMonth(
  yearMonth: string
): Promise<DiaryEntry[]> {
  const q = query(
    collection(db, ENTRIES_COL),
    where("date", ">=", `${yearMonth}-01`),
    where("date", "<=", `${yearMonth}-31`),
    orderBy("date", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as DiaryEntry);
}

export async function getAllEntries(): Promise<DiaryEntry[]> {
  const q = query(collection(db, ENTRIES_COL), orderBy("date", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as DiaryEntry);
}

export async function getEntriesPage(
  pageSize: number,
  lastDoc?: DocumentSnapshot
): Promise<{ entries: DiaryEntry[]; lastDoc: DocumentSnapshot | null }> {
  let q;
  if (lastDoc) {
    q = query(
      collection(db, ENTRIES_COL),
      orderBy("date", "desc"),
      startAfter(lastDoc),
      limit(pageSize)
    );
  } else {
    q = query(
      collection(db, ENTRIES_COL),
      orderBy("date", "desc"),
      limit(pageSize)
    );
  }
  const snap = await getDocs(q);
  const entries = snap.docs.map((d) => d.data() as DiaryEntry);
  const last = snap.docs.length > 0 ? snap.docs[snap.docs.length - 1] : null;
  return { entries, lastDoc: last };
}

export async function getEntriesInRange(
  startDate: string,
  endDate: string
): Promise<DiaryEntry[]> {
  const q = query(
    collection(db, ENTRIES_COL),
    where("date", ">=", startDate),
    where("date", "<=", endDate),
    orderBy("date", "asc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as DiaryEntry);
}

export async function createEntry(
  entry: Omit<DiaryEntry, "createdAt" | "updatedAt">
) {
  const now = Timestamp.now();
  await setDoc(doc(db, ENTRIES_COL, entry.date), {
    ...entry,
    createdAt: now,
    updatedAt: now,
  });
}

export async function updateEntry(
  date: string,
  data: Partial<Omit<DiaryEntry, "createdAt">>
) {
  await updateDoc(doc(db, ENTRIES_COL, date), {
    ...data,
    updatedAt: Timestamp.now(),
  });
}

export async function deleteEntry(date: string) {
  await deleteDoc(doc(db, ENTRIES_COL, date));
}
