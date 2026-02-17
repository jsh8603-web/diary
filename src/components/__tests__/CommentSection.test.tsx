import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CommentSection from "../CommentSection";
import { subscribeToComments, addComment, deleteComment } from "@/lib/firebase/comments";
import type { Comment } from "@/lib/types";

// Mock useAuth
const mockUseAuth = jest.fn();
jest.mock("../AuthProvider", () => ({
  useAuth: () => mockUseAuth(),
}));

// Mock useToast
const mockShowToast = jest.fn();
jest.mock("../Toast", () => ({
  useToast: () => ({ showToast: mockShowToast }),
}));

// Mock comments module
jest.mock("@/lib/firebase/comments", () => ({
  subscribeToComments: jest.fn(),
  addComment: jest.fn(),
  deleteComment: jest.fn(),
}));

// Mock date-fns format
jest.mock("date-fns", () => ({
  format: jest.fn((date: Date, formatStr: string) => "2025.01.15 10:30"),
}));

// Mock next/link
jest.mock("next/link", () => {
  const React = require("react");
  return {
    __esModule: true,
    default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => {
      return React.createElement("a", { href, ...props }, children);
    },
  };
});

const mockedSubscribeToComments = subscribeToComments as jest.Mock;
const mockedAddComment = addComment as jest.Mock;
const mockedDeleteComment = deleteComment as jest.Mock;

const mockComments: Comment[] = [
  {
    id: "comment1",
    entryDate: "2025-01-15",
    userId: "user1",
    userName: "Alice",
    content: "First comment",
    createdAt: { toDate: () => new Date("2025-01-15T10:30:00") } as any,
  },
  {
    id: "comment2",
    entryDate: "2025-01-15",
    userId: "user2",
    userName: "Bob",
    userPhoto: "https://example.com/bob.jpg",
    content: "Second comment",
    createdAt: { toDate: () => new Date("2025-01-15T11:00:00") } as any,
  },
];

describe("CommentSection", () => {
  let subscribeCallback: (comments: Comment[]) => void;

  beforeEach(() => {
    jest.clearAllMocks();
    mockedSubscribeToComments.mockImplementation((_entryDate, callback) => {
      subscribeCallback = callback;
      // Initially call with empty
      callback([]);
      return jest.fn(); // unsubscribe
    });
    mockedAddComment.mockResolvedValue({ id: "newComment" });
    mockedDeleteComment.mockResolvedValue(undefined);
  });

  it("renders empty comments message when no comments", () => {
    mockUseAuth.mockReturnValue({ user: null, isAdminUser: false });

    render(<CommentSection entryDate="2025-01-15" />);

    expect(screen.getByText("첫 번째 댓글을 남겨주세요")).toBeInTheDocument();
  });

  it("renders comment list", () => {
    mockUseAuth.mockReturnValue({ user: null, isAdminUser: false });

    mockedSubscribeToComments.mockImplementation((_entryDate, callback) => {
      callback(mockComments);
      return jest.fn();
    });

    render(<CommentSection entryDate="2025-01-15" />);

    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("First comment")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("Second comment")).toBeInTheDocument();
  });

  it("shows comment count in header when comments exist", () => {
    mockUseAuth.mockReturnValue({ user: null, isAdminUser: false });

    mockedSubscribeToComments.mockImplementation((_entryDate, callback) => {
      callback(mockComments);
      return jest.fn();
    });

    render(<CommentSection entryDate="2025-01-15" />);

    expect(screen.getByText(/\(2\)/)).toBeInTheDocument();
  });

  it("shows login prompt when user is not logged in", () => {
    mockUseAuth.mockReturnValue({ user: null, isAdminUser: false });

    render(<CommentSection entryDate="2025-01-15" />);

    expect(screen.getByText("로그인하고 댓글을 남겨보세요")).toBeInTheDocument();
    expect(screen.queryByLabelText("댓글 입력")).not.toBeInTheDocument();
  });

  it("shows comment input form when user is logged in", () => {
    mockUseAuth.mockReturnValue({
      user: { uid: "user1", email: "user@test.com", displayName: "User" },
      isAdminUser: false,
    });

    render(<CommentSection entryDate="2025-01-15" />);

    expect(screen.getByLabelText("댓글 입력")).toBeInTheDocument();
    expect(screen.getByText("작성")).toBeInTheDocument();
    expect(screen.queryByText("로그인하고 댓글을 남겨보세요")).not.toBeInTheDocument();
  });

  it("submits a comment when form is submitted", async () => {
    mockUseAuth.mockReturnValue({
      user: { uid: "user1", email: "user@test.com", displayName: "User", photoURL: null },
      isAdminUser: false,
    });

    render(<CommentSection entryDate="2025-01-15" />);

    const input = screen.getByLabelText("댓글 입력");
    const submitButton = screen.getByText("작성");

    fireEvent.change(input, { target: { value: "New comment" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockedAddComment).toHaveBeenCalledWith({
        entryDate: "2025-01-15",
        userId: "user1",
        userName: "User",
        content: "New comment",
      });
    });
  });

  it("clears input after successful submission", async () => {
    mockUseAuth.mockReturnValue({
      user: { uid: "user1", email: "user@test.com", displayName: "User", photoURL: null },
      isAdminUser: false,
    });

    render(<CommentSection entryDate="2025-01-15" />);

    const input = screen.getByLabelText("댓글 입력") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "New comment" } });
    fireEvent.click(screen.getByText("작성"));

    await waitFor(() => {
      expect(input.value).toBe("");
    });
  });

  it("shows delete button for admin user on all comments", () => {
    mockUseAuth.mockReturnValue({
      user: { uid: "admin1", email: "admin@test.com" },
      isAdminUser: true,
    });

    mockedSubscribeToComments.mockImplementation((_entryDate, callback) => {
      callback(mockComments);
      return jest.fn();
    });

    render(<CommentSection entryDate="2025-01-15" />);

    const deleteButtons = screen.getAllByText("삭제");
    expect(deleteButtons.length).toBe(2);
  });

  it("shows delete button for comment owner", () => {
    mockUseAuth.mockReturnValue({
      user: { uid: "user1", email: "user1@test.com" },
      isAdminUser: false,
    });

    mockedSubscribeToComments.mockImplementation((_entryDate, callback) => {
      callback(mockComments);
      return jest.fn();
    });

    render(<CommentSection entryDate="2025-01-15" />);

    // user1 owns comment1, so only one delete button
    const deleteButtons = screen.getAllByText("삭제");
    expect(deleteButtons.length).toBe(1);
  });

  it("calls deleteComment when delete button is clicked and confirmed", async () => {
    window.confirm = jest.fn(() => true);

    mockUseAuth.mockReturnValue({
      user: { uid: "admin1", email: "admin@test.com" },
      isAdminUser: true,
    });

    mockedSubscribeToComments.mockImplementation((_entryDate, callback) => {
      callback(mockComments);
      return jest.fn();
    });

    render(<CommentSection entryDate="2025-01-15" />);

    const deleteButtons = screen.getAllByText("삭제");
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(mockedDeleteComment).toHaveBeenCalledWith("comment1");
    });
  });

  it("does not delete comment when confirm is cancelled", () => {
    window.confirm = jest.fn(() => false);

    mockUseAuth.mockReturnValue({
      user: { uid: "admin1", email: "admin@test.com" },
      isAdminUser: true,
    });

    mockedSubscribeToComments.mockImplementation((_entryDate, callback) => {
      callback(mockComments);
      return jest.fn();
    });

    render(<CommentSection entryDate="2025-01-15" />);

    const deleteButtons = screen.getAllByText("삭제");
    fireEvent.click(deleteButtons[0]);

    expect(mockedDeleteComment).not.toHaveBeenCalled();
  });
});
