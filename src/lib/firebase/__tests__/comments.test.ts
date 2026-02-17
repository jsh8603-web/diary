/**
 * Tests for src/lib/firebase/comments.ts
 * - addComment, getCommentsByEntry, subscribeToComments
 * - getRecentComments, deleteComment
 * - Input validation
 */

import {
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  collection,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  onSnapshot,
} from "firebase/firestore";

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
  addComment,
  getCommentsByEntry,
  subscribeToComments,
  getRecentComments,
  deleteComment,
} from "../comments";

const mockedAddDoc = addDoc as jest.MockedFunction<typeof addDoc>;
const mockedGetDocs = getDocs as jest.MockedFunction<typeof getDocs>;
const mockedDeleteDoc = deleteDoc as jest.MockedFunction<typeof deleteDoc>;
const mockedOnSnapshot = onSnapshot as jest.MockedFunction<typeof onSnapshot>;

describe("comments service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ── addComment ──

  describe("addComment", () => {
    it("should add a comment with createdAt auto-added", async () => {
      const mockNow = { toDate: () => new Date("2025-01-15T12:00:00Z") };
      (Timestamp.now as jest.Mock).mockReturnValue(mockNow);
      mockedAddDoc.mockResolvedValue({ id: "comment1" } as any);

      await addComment({
        entryDate: "2025-01-15",
        userId: "user123",
        userName: "John",
        content: "Great entry!",
      });

      expect(addDoc).toHaveBeenCalled();
      const callArgs = (addDoc as jest.Mock).mock.calls[0];
      expect(callArgs[1]).toEqual(
        expect.objectContaining({
          content: "Great entry!",
          createdAt: mockNow,
          userId: "user123",
          userName: "John",
          entryDate: "2025-01-15",
        })
      );
    });

    it("should sanitize HTML in content", async () => {
      mockedAddDoc.mockResolvedValue({ id: "comment1" } as any);

      await addComment({
        entryDate: "2025-01-15",
        userId: "user123",
        userName: "John",
        content: '<script>alert("xss")</script>',
      });

      const savedData = (addDoc as jest.Mock).mock.calls[0][1];
      expect(savedData.content).not.toContain("<script>");
      expect(savedData.content).toContain("&lt;script&gt;");
    });

    it("should use default userName when empty", async () => {
      mockedAddDoc.mockResolvedValue({ id: "comment1" } as any);

      await addComment({
        entryDate: "2025-01-15",
        userId: "user123",
        userName: "",
        content: "Comment content",
      });

      const savedData = (addDoc as jest.Mock).mock.calls[0][1];
      expect(savedData.userName).toBe("익명");
    });

    it("should throw for empty content", async () => {
      await expect(
        addComment({
          entryDate: "2025-01-15",
          userId: "user123",
          userName: "John",
          content: "",
        })
      ).rejects.toThrow("댓글 내용을 입력해주세요");
    });

    it("should throw for whitespace-only content", async () => {
      await expect(
        addComment({
          entryDate: "2025-01-15",
          userId: "user123",
          userName: "John",
          content: "   ",
        })
      ).rejects.toThrow("댓글 내용을 입력해주세요");
    });

    it("should throw for content exceeding max length", async () => {
      const longContent = "a".repeat(2001);
      await expect(
        addComment({
          entryDate: "2025-01-15",
          userId: "user123",
          userName: "John",
          content: longContent,
        })
      ).rejects.toThrow("2000자 이내로 작성해주세요");
    });

    it("should throw for empty userId", async () => {
      await expect(
        addComment({
          entryDate: "2025-01-15",
          userId: "",
          userName: "John",
          content: "Some comment",
        })
      ).rejects.toThrow("로그인이 필요합니다");
    });

    it("should throw for empty entryDate", async () => {
      await expect(
        addComment({
          entryDate: "",
          userId: "user123",
          userName: "John",
          content: "Some comment",
        })
      ).rejects.toThrow("일기 날짜 정보가 없습니다");
    });
  });

  // ── getCommentsByEntry ──

  describe("getCommentsByEntry", () => {
    it("should return comments for a specific entry", async () => {
      const mockDocs = [
        {
          id: "comment1",
          data: () => ({
            entryDate: "2025-01-15",
            userId: "user123",
            userName: "John",
            content: "First comment",
            createdAt: { toDate: () => new Date() },
          }),
        },
        {
          id: "comment2",
          data: () => ({
            entryDate: "2025-01-15",
            userId: "user456",
            userName: "Jane",
            content: "Second comment",
            createdAt: { toDate: () => new Date() },
          }),
        },
      ];
      mockedGetDocs.mockResolvedValue({ docs: mockDocs } as any);

      const results = await getCommentsByEntry("2025-01-15");

      expect(results).toHaveLength(2);
      expect(results[0].id).toBe("comment1");
      expect(results[1].id).toBe("comment2");
      expect(where).toHaveBeenCalledWith("entryDate", "==", "2025-01-15");
      expect(orderBy).toHaveBeenCalledWith("createdAt", "asc");
    });

    it("should return empty array for empty entryDate", async () => {
      const results = await getCommentsByEntry("");

      expect(results).toEqual([]);
      expect(getDocs).not.toHaveBeenCalled();
    });

    it("should return empty array when no comments found", async () => {
      mockedGetDocs.mockResolvedValue({ docs: [] } as any);

      const results = await getCommentsByEntry("2025-01-15");

      expect(results).toEqual([]);
    });
  });

  // ── subscribeToComments ──

  describe("subscribeToComments", () => {
    it("should set up a real-time subscription and invoke callback with comments", () => {
      const mockUnsubscribe = jest.fn();
      mockedOnSnapshot.mockImplementation((q: any, onNext: any, onError?: any) => {
        // Simulate snapshot with comments
        const mockSnap = {
          docs: [
            {
              id: "c1",
              data: () => ({
                entryDate: "2025-01-15",
                userId: "user1",
                userName: "Alice",
                content: "Hello",
                createdAt: { toDate: () => new Date() },
              }),
            },
          ],
        };
        onNext(mockSnap);
        return mockUnsubscribe;
      });

      const callback = jest.fn();
      const unsubscribe = subscribeToComments("2025-01-15", callback);

      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            id: "c1",
            content: "Hello",
          }),
        ])
      );
      expect(typeof unsubscribe).toBe("function");
    });

    it("should call callback with empty array for empty entryDate", () => {
      const callback = jest.fn();
      const unsubscribe = subscribeToComments("", callback);

      expect(callback).toHaveBeenCalledWith([]);
      expect(typeof unsubscribe).toBe("function");
      // onSnapshot should NOT have been called
      expect(onSnapshot).not.toHaveBeenCalled();
    });

    it("should call onError callback when snapshot errors", () => {
      const consoleSpy = jest.spyOn(console, "error").mockImplementation();
      const mockError = new Error("Firestore error");
      mockedOnSnapshot.mockImplementation((q: any, onNext: any, onError: any) => {
        onError(mockError);
        return jest.fn();
      });

      const callback = jest.fn();
      const onError = jest.fn();
      subscribeToComments("2025-01-15", callback, onError);

      expect(onError).toHaveBeenCalledWith(mockError);
      consoleSpy.mockRestore();
    });

    it("should return unsubscribe function from onSnapshot", () => {
      const mockUnsubscribe = jest.fn();
      mockedOnSnapshot.mockReturnValue(mockUnsubscribe as any);

      const callback = jest.fn();
      const unsubscribe = subscribeToComments("2025-01-15", callback);

      expect(unsubscribe).toBe(mockUnsubscribe);
    });
  });

  // ── getRecentComments ──

  describe("getRecentComments", () => {
    it("should return recent comments ordered by createdAt desc", async () => {
      const mockDocs = [
        {
          id: "c1",
          data: () => ({
            entryDate: "2025-01-15",
            userId: "user1",
            userName: "Alice",
            content: "Recent comment",
            createdAt: { toDate: () => new Date() },
          }),
        },
      ];
      mockedGetDocs.mockResolvedValue({ docs: mockDocs } as any);

      const results = await getRecentComments(5);

      expect(results).toHaveLength(1);
      expect(results[0].id).toBe("c1");
      expect(orderBy).toHaveBeenCalledWith("createdAt", "desc");
      expect(limit).toHaveBeenCalledWith(5);
    });

    it("should default to 10 comments", async () => {
      mockedGetDocs.mockResolvedValue({ docs: [] } as any);

      await getRecentComments();

      expect(limit).toHaveBeenCalledWith(10);
    });

    it("should cap count at 100", async () => {
      mockedGetDocs.mockResolvedValue({ docs: [] } as any);

      await getRecentComments(200);

      expect(limit).toHaveBeenCalledWith(100);
    });

    it("should enforce minimum count of 1", async () => {
      mockedGetDocs.mockResolvedValue({ docs: [] } as any);

      await getRecentComments(0);

      expect(limit).toHaveBeenCalledWith(1);
    });
  });

  // ── deleteComment ──

  describe("deleteComment", () => {
    it("should delete a comment by ID", async () => {
      mockedDeleteDoc.mockResolvedValue(undefined);

      await deleteComment("comment123");

      expect(deleteDoc).toHaveBeenCalled();
      expect(doc).toHaveBeenCalled();
    });

    it("should throw for empty commentId", async () => {
      await expect(deleteComment("")).rejects.toThrow("댓글 ID가 없습니다");
    });
  });
});
