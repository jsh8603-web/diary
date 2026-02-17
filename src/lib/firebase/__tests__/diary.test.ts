/**
 * Tests for src/lib/firebase/diary.ts
 * - getEntry, getRecentEntries, getAllEntries
 * - createEntry, updateEntry, deleteEntry
 * - getEntriesInRange, date format validation
 */

import {
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  doc,
  collection,
  query,
  orderBy,
  limit,
  where,
  Timestamp,
} from "firebase/firestore";

// Mock firebase/firestore
jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(),
  getDocs: jest.fn(),
  setDoc: jest.fn(),
  updateDoc: jest.fn(),
  deleteDoc: jest.fn(),
  addDoc: jest.fn(),
  query: jest.fn(),
  orderBy: jest.fn(),
  limit: jest.fn(),
  where: jest.fn(),
  Timestamp: {
    now: jest.fn(() => ({
      toDate: () => new Date("2025-01-15T00:00:00Z"),
    })),
  },
  onSnapshot: jest.fn(),
  startAfter: jest.fn(),
}));

jest.mock("../config", () => ({
  db: {},
  auth: {},
  storage: {},
}));

import {
  getEntry,
  getRecentEntries,
  getAllEntries,
  createEntry,
  updateEntry,
  deleteEntry,
  getEntriesInRange,
} from "../diary";

const mockedGetDoc = getDoc as jest.MockedFunction<typeof getDoc>;
const mockedGetDocs = getDocs as jest.MockedFunction<typeof getDocs>;
const mockedSetDoc = setDoc as jest.MockedFunction<typeof setDoc>;
const mockedUpdateDoc = updateDoc as jest.MockedFunction<typeof updateDoc>;
const mockedDeleteDoc = deleteDoc as jest.MockedFunction<typeof deleteDoc>;
const mockedTimestamp = Timestamp as jest.Mocked<typeof Timestamp>;

describe("diary service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ── Date format validation ──

  describe("date format validation", () => {
    it("should reject invalid date formats", async () => {
      await expect(getEntry("2025/01/15")).rejects.toThrow("잘못된 날짜 형식");
      await expect(getEntry("20250115")).rejects.toThrow("잘못된 날짜 형식");
      await expect(getEntry("")).rejects.toThrow("잘못된 날짜 형식");
      await expect(getEntry("abc")).rejects.toThrow("잘못된 날짜 형식");
    });

    it("should accept valid YYYY-MM-DD format", async () => {
      mockedGetDoc.mockResolvedValue({
        exists: () => false,
        data: () => undefined,
        id: "2025-01-15",
      } as any);

      const result = await getEntry("2025-01-15");
      expect(result).toBeNull();
    });
  });

  // ── getEntry ──

  describe("getEntry", () => {
    it("should return entry when document exists", async () => {
      const mockData = {
        date: "2025-01-15",
        content: "Today was a great day!",
        photos: [],
        authorId: "user123",
        authorName: "John",
        createdAt: { toDate: () => new Date() },
        updatedAt: { toDate: () => new Date() },
      };
      mockedGetDoc.mockResolvedValue({
        exists: () => true,
        data: () => mockData,
        id: "2025-01-15",
      } as any);

      const result = await getEntry("2025-01-15");

      expect(result).not.toBeNull();
      expect(result!.date).toBe("2025-01-15");
      expect(result!.content).toBe("Today was a great day!");
      expect(result!.authorId).toBe("user123");
      expect(doc).toHaveBeenCalled();
      expect(getDoc).toHaveBeenCalled();
    });

    it("should return null when document does not exist", async () => {
      mockedGetDoc.mockResolvedValue({
        exists: () => false,
        data: () => undefined,
        id: "2025-01-15",
      } as any);

      const result = await getEntry("2025-01-15");

      expect(result).toBeNull();
    });

    it("should handle entry with title", async () => {
      const mockData = {
        date: "2025-01-15",
        title: "A special day",
        content: "Content here",
        photos: [],
        authorId: "user123",
        authorName: "John",
        createdAt: { toDate: () => new Date() },
        updatedAt: { toDate: () => new Date() },
      };
      mockedGetDoc.mockResolvedValue({
        exists: () => true,
        data: () => mockData,
        id: "2025-01-15",
      } as any);

      const result = await getEntry("2025-01-15");

      expect(result!.title).toBe("A special day");
    });

    it("should use doc id as date if data.date is missing", async () => {
      const mockData = {
        content: "Content",
        photos: [],
        authorId: "user123",
        authorName: "John",
        createdAt: { toDate: () => new Date() },
        updatedAt: { toDate: () => new Date() },
      };
      mockedGetDoc.mockResolvedValue({
        exists: () => true,
        data: () => mockData,
        id: "2025-01-15",
      } as any);

      const result = await getEntry("2025-01-15");

      expect(result!.date).toBe("2025-01-15");
    });
  });

  // ── getRecentEntries ──

  describe("getRecentEntries", () => {
    it("should return entries ordered by date desc", async () => {
      const mockDocs = [
        {
          id: "2025-01-15",
          data: () => ({
            date: "2025-01-15",
            content: "Entry 1",
            photos: [],
            authorId: "user123",
            authorName: "John",
            createdAt: { toDate: () => new Date() },
            updatedAt: { toDate: () => new Date() },
          }),
        },
        {
          id: "2025-01-14",
          data: () => ({
            date: "2025-01-14",
            content: "Entry 2",
            photos: [],
            authorId: "user123",
            authorName: "John",
            createdAt: { toDate: () => new Date() },
            updatedAt: { toDate: () => new Date() },
          }),
        },
      ];
      mockedGetDocs.mockResolvedValue({
        docs: mockDocs,
      } as any);

      const results = await getRecentEntries(2);

      expect(results).toHaveLength(2);
      expect(results[0].date).toBe("2025-01-15");
      expect(results[1].date).toBe("2025-01-14");
      expect(query).toHaveBeenCalled();
      expect(orderBy).toHaveBeenCalledWith("date", "desc");
      expect(limit).toHaveBeenCalledWith(2);
    });

    it("should return empty array when no entries exist", async () => {
      mockedGetDocs.mockResolvedValue({
        docs: [],
      } as any);

      const results = await getRecentEntries();

      expect(results).toEqual([]);
    });

    it("should default to 6 entries", async () => {
      mockedGetDocs.mockResolvedValue({ docs: [] } as any);

      await getRecentEntries();

      expect(limit).toHaveBeenCalledWith(6);
    });

    it("should cap count at 100", async () => {
      mockedGetDocs.mockResolvedValue({ docs: [] } as any);

      await getRecentEntries(200);

      expect(limit).toHaveBeenCalledWith(100);
    });

    it("should enforce minimum count of 1", async () => {
      mockedGetDocs.mockResolvedValue({ docs: [] } as any);

      await getRecentEntries(0);

      expect(limit).toHaveBeenCalledWith(1);
    });
  });

  // ── getAllEntries ──

  describe("getAllEntries", () => {
    it("should return all entries ordered by date desc", async () => {
      const mockDocs = [
        {
          id: "2025-01-15",
          data: () => ({
            date: "2025-01-15",
            content: "Entry 1",
            photos: [],
            authorId: "user123",
            authorName: "John",
            createdAt: { toDate: () => new Date() },
            updatedAt: { toDate: () => new Date() },
          }),
        },
      ];
      mockedGetDocs.mockResolvedValue({ docs: mockDocs } as any);

      const results = await getAllEntries();

      expect(results).toHaveLength(1);
      expect(results[0].content).toBe("Entry 1");
      expect(orderBy).toHaveBeenCalledWith("date", "desc");
    });
  });

  // ── createEntry ──

  describe("createEntry", () => {
    it("should create an entry with Timestamp auto-added", async () => {
      const mockNow = { toDate: () => new Date("2025-01-15T12:00:00Z") };
      mockedTimestamp.now.mockReturnValue(mockNow as any);
      mockedSetDoc.mockResolvedValue(undefined);

      await createEntry({
        date: "2025-01-15",
        content: "My diary entry",
        photos: [],
        authorId: "user123",
        authorName: "John",
      });

      expect(setDoc).toHaveBeenCalled();
      const callArgs = (setDoc as jest.Mock).mock.calls[0];
      expect(callArgs[1]).toEqual(
        expect.objectContaining({
          content: "My diary entry",
          createdAt: mockNow,
          updatedAt: mockNow,
        })
      );
    });

    it("should trim content", async () => {
      mockedSetDoc.mockResolvedValue(undefined);

      await createEntry({
        date: "2025-01-15",
        content: "  Some content  ",
        photos: [],
        authorId: "user123",
        authorName: "John",
      });

      expect(setDoc).toHaveBeenCalled();
      const callArgs = (setDoc as jest.Mock).mock.calls[0];
      expect(callArgs[1]).toEqual(
        expect.objectContaining({
          content: "Some content",
        })
      );
    });

    it("should throw for invalid date format", async () => {
      await expect(
        createEntry({
          date: "20250115",
          content: "Content",
          photos: [],
          authorId: "user123",
          authorName: "John",
        })
      ).rejects.toThrow("잘못된 날짜 형식");
    });

    it("should throw for empty content", async () => {
      await expect(
        createEntry({
          date: "2025-01-15",
          content: "",
          photos: [],
          authorId: "user123",
          authorName: "John",
        })
      ).rejects.toThrow("일기 내용을 입력해주세요");
    });

    it("should throw for whitespace-only content", async () => {
      await expect(
        createEntry({
          date: "2025-01-15",
          content: "   ",
          photos: [],
          authorId: "user123",
          authorName: "John",
        })
      ).rejects.toThrow("일기 내용을 입력해주세요");
    });

    it("should throw for missing authorId", async () => {
      await expect(
        createEntry({
          date: "2025-01-15",
          content: "Content",
          photos: [],
          authorId: "",
          authorName: "John",
        })
      ).rejects.toThrow("작성자 정보가 없습니다");
    });

    it("should normalize photos to array if not already", async () => {
      mockedSetDoc.mockResolvedValue(undefined);

      await createEntry({
        date: "2025-01-15",
        content: "Content",
        photos: undefined as any,
        authorId: "user123",
        authorName: "John",
      });

      expect(setDoc).toHaveBeenCalled();
      const callArgs = (setDoc as jest.Mock).mock.calls[0];
      expect(callArgs[1]).toEqual(
        expect.objectContaining({
          photos: [],
        })
      );
    });
  });

  // ── updateEntry ──

  describe("updateEntry", () => {
    it("should update an entry with updatedAt auto-set", async () => {
      const mockNow = { toDate: () => new Date("2025-01-15T14:00:00Z") };
      mockedTimestamp.now.mockReturnValue(mockNow as any);
      mockedUpdateDoc.mockResolvedValue(undefined);

      await updateEntry("2025-01-15", { content: "Updated content" });

      expect(updateDoc).toHaveBeenCalled();
      const callArgs = (updateDoc as jest.Mock).mock.calls[0];
      expect(callArgs[1]).toEqual(
        expect.objectContaining({
          content: "Updated content",
          updatedAt: mockNow,
        })
      );
    });

    it("should throw for invalid date format", async () => {
      await expect(
        updateEntry("invalid-date", { content: "Updated" })
      ).rejects.toThrow("잘못된 날짜 형식");
    });

    it("should strip date field from update data to prevent ID changes", async () => {
      mockedUpdateDoc.mockResolvedValue(undefined);

      await updateEntry("2025-01-15", {
        date: "2025-01-16",
        content: "Updated",
      } as any);

      // date should be removed from the update call
      const updateCall = (updateDoc as jest.Mock).mock.calls[0][1];
      expect(updateCall).not.toHaveProperty("date");
      expect(updateCall).toHaveProperty("content", "Updated");
    });
  });

  // ── deleteEntry ──

  describe("deleteEntry", () => {
    it("should delete an entry by date", async () => {
      mockedDeleteDoc.mockResolvedValue(undefined);

      await deleteEntry("2025-01-15");

      expect(deleteDoc).toHaveBeenCalled();
      expect(doc).toHaveBeenCalled();
    });

    it("should throw for invalid date format", async () => {
      await expect(deleteEntry("bad-date")).rejects.toThrow("잘못된 날짜 형식");
    });
  });

  // ── getEntriesInRange ──

  describe("getEntriesInRange", () => {
    it("should query entries within date range", async () => {
      const mockDocs = [
        {
          id: "2025-01-10",
          data: () => ({
            date: "2025-01-10",
            content: "Entry in range",
            photos: [],
            authorId: "user123",
            authorName: "John",
            createdAt: { toDate: () => new Date() },
            updatedAt: { toDate: () => new Date() },
          }),
        },
      ];
      mockedGetDocs.mockResolvedValue({ docs: mockDocs } as any);

      const results = await getEntriesInRange("2025-01-01", "2025-01-31");

      expect(results).toHaveLength(1);
      expect(results[0].date).toBe("2025-01-10");
      expect(where).toHaveBeenCalledWith("date", ">=", "2025-01-01");
      expect(where).toHaveBeenCalledWith("date", "<=", "2025-01-31");
      expect(orderBy).toHaveBeenCalledWith("date", "asc");
    });

    it("should throw if startDate > endDate", async () => {
      await expect(
        getEntriesInRange("2025-01-31", "2025-01-01")
      ).rejects.toThrow("시작 날짜가 종료 날짜보다 클 수 없습니다");
    });

    it("should throw for invalid startDate format", async () => {
      await expect(
        getEntriesInRange("2025/01/01", "2025-01-31")
      ).rejects.toThrow("잘못된 날짜 형식");
    });

    it("should throw for invalid endDate format", async () => {
      await expect(
        getEntriesInRange("2025-01-01", "bad-date")
      ).rejects.toThrow("잘못된 날짜 형식");
    });

    it("should return empty array when no entries in range", async () => {
      mockedGetDocs.mockResolvedValue({ docs: [] } as any);

      const results = await getEntriesInRange("2025-06-01", "2025-06-30");

      expect(results).toEqual([]);
    });
  });
});
