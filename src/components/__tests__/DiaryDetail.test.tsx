import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DiaryDetail from "../DiaryDetail";
import { getEntry, deleteEntry } from "@/lib/firebase/diary";
import { deletePhoto } from "@/lib/firebase/storage";
import type { DiaryEntry } from "@/lib/types";

// Mock useAuth
const mockUseAuth = jest.fn();
jest.mock("@/components/AuthProvider", () => ({
  useAuth: () => mockUseAuth(),
}));

// Mock useToast
const mockShowToast = jest.fn();
jest.mock("@/components/Toast", () => ({
  useToast: () => ({ showToast: mockShowToast }),
}));

// Mock Spinner
jest.mock("@/components/Spinner", () => {
  return {
    __esModule: true,
    default: ({ size }: { size?: string }) => (
      <div className="animate-spin" data-testid="spinner" data-size={size} />
    ),
  };
});

// Mock CommentSection
jest.mock("@/components/CommentSection", () => {
  return {
    __esModule: true,
    default: ({ entryDate }: { entryDate: string }) => (
      <div data-testid="comment-section">Comments for {entryDate}</div>
    ),
  };
});

// Mock diary module
jest.mock("@/lib/firebase/diary", () => ({
  getEntry: jest.fn(),
  deleteEntry: jest.fn(),
}));

// Mock storage module
jest.mock("@/lib/firebase/storage", () => ({
  deletePhoto: jest.fn(),
}));

// Mock date-fns
jest.mock("date-fns", () => ({
  format: jest.fn((date: Date, formatStr: string) => {
    if (formatStr.includes("yyyy년")) {
      return "2025년 1월 15일 (수요일)";
    }
    return "2025.01.15";
  }),
}));

jest.mock("date-fns/locale", () => ({
  ko: {},
}));

// Mock next/navigation
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    replace: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
    refresh: jest.fn(),
  }),
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

const mockedGetEntry = getEntry as jest.Mock;
const mockedDeleteEntry = deleteEntry as jest.Mock;
const mockedDeletePhoto = deletePhoto as jest.Mock;

const mockEntry: DiaryEntry = {
  date: "2025-01-15",
  title: "First Day",
  content: "Today was a wonderful day.",
  photos: [
    { url: "https://example.com/photo1.jpg", path: "photos/2025-01-15/photo1.jpg" },
    { url: "https://example.com/photo2.jpg", path: "photos/2025-01-15/photo2.jpg" },
  ],
  authorId: "author1",
  authorName: "Admin",
  createdAt: { toDate: () => new Date("2025-01-15T10:00:00") } as any,
  updatedAt: { toDate: () => new Date("2025-01-15T10:00:00") } as any,
};

describe("DiaryDetail", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAuth.mockReturnValue({ isAdminUser: false });
  });

  it("shows loading spinner initially", () => {
    mockedGetEntry.mockReturnValue(new Promise(() => {})); // never resolves

    const { container } = render(<DiaryDetail date="2025-01-15" />);

    const spinner = container.querySelector(".animate-spin");
    expect(spinner).toBeInTheDocument();
  });

  it("shows not-found message when entry does not exist", async () => {
    mockedGetEntry.mockResolvedValue(null);

    render(<DiaryDetail date="2025-01-15" />);

    await waitFor(() => {
      expect(screen.getByText("일기를 찾을 수 없습니다")).toBeInTheDocument();
    });
    expect(screen.getByText("목록으로 돌아가기")).toBeInTheDocument();
  });

  it("renders diary content (date, title, body)", async () => {
    mockedGetEntry.mockResolvedValue(mockEntry);

    render(<DiaryDetail date="2025-01-15" />);

    await waitFor(() => {
      expect(screen.getByText("First Day")).toBeInTheDocument();
    });
    expect(screen.getByText("Today was a wonderful day.")).toBeInTheDocument();
    expect(screen.getByText("2025년 1월 15일 (수요일)")).toBeInTheDocument();
  });

  it("renders photos when present", async () => {
    mockedGetEntry.mockResolvedValue(mockEntry);

    render(<DiaryDetail date="2025-01-15" />);

    await waitFor(() => {
      expect(screen.getByText("First Day")).toBeInTheDocument();
    });

    // Images have alt="" so they are presentational; use querySelectorAll
    const images = document.querySelectorAll("img");
    const photoImages = Array.from(images).filter((img) => img.getAttribute("src")?.includes("example.com"));
    expect(photoImages.length).toBe(2);
  });

  it("shows admin buttons (edit/delete) for admin user", async () => {
    mockUseAuth.mockReturnValue({ isAdminUser: true });
    mockedGetEntry.mockResolvedValue(mockEntry);

    render(<DiaryDetail date="2025-01-15" />);

    await waitFor(() => {
      expect(screen.getByText("수정하기")).toBeInTheDocument();
    });
    expect(screen.getByText("삭제하기")).toBeInTheDocument();

    // Edit link should point to correct URL
    const editLink = screen.getByText("수정하기");
    expect(editLink.closest("a")).toHaveAttribute("href", "/write?date=2025-01-15");
  });

  it("hides admin buttons for non-admin user", async () => {
    mockUseAuth.mockReturnValue({ isAdminUser: false });
    mockedGetEntry.mockResolvedValue(mockEntry);

    render(<DiaryDetail date="2025-01-15" />);

    await waitFor(() => {
      expect(screen.getByText("First Day")).toBeInTheDocument();
    });
    expect(screen.queryByText("수정하기")).not.toBeInTheDocument();
    expect(screen.queryByText("삭제하기")).not.toBeInTheDocument();
  });

  it("opens lightbox when photo is clicked", async () => {
    mockedGetEntry.mockResolvedValue(mockEntry);

    render(<DiaryDetail date="2025-01-15" />);

    await waitFor(() => {
      expect(screen.getByText("First Day")).toBeInTheDocument();
    });

    // Click the parent div (cursor-pointer) of the first photo
    const photoDivs = document.querySelectorAll(".cursor-pointer");
    expect(photoDivs.length).toBeGreaterThan(0);
    fireEvent.click(photoDivs[0]);

    // Lightbox should appear with role="dialog"
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();

    // Should have a close button
    expect(screen.getByLabelText("닫기")).toBeInTheDocument();
  });

  it("closes lightbox when close button is clicked", async () => {
    mockedGetEntry.mockResolvedValue(mockEntry);

    render(<DiaryDetail date="2025-01-15" />);

    await waitFor(() => {
      expect(screen.getByText("First Day")).toBeInTheDocument();
    });

    // Open lightbox by clicking the parent div
    const photoDivs = document.querySelectorAll(".cursor-pointer");
    fireEvent.click(photoDivs[0]);

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // Click close button
    fireEvent.click(screen.getByLabelText("닫기"));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders CommentSection with correct entryDate", async () => {
    mockedGetEntry.mockResolvedValue(mockEntry);

    render(<DiaryDetail date="2025-01-15" />);

    await waitFor(() => {
      expect(screen.getByTestId("comment-section")).toBeInTheDocument();
    });
    expect(screen.getByText("Comments for 2025-01-15")).toBeInTheDocument();
  });

  it("calls delete entry when delete button is confirmed", async () => {
    window.confirm = jest.fn(() => true);
    mockUseAuth.mockReturnValue({ isAdminUser: true });
    mockedGetEntry.mockResolvedValue(mockEntry);
    mockedDeletePhoto.mockResolvedValue(undefined);
    mockedDeleteEntry.mockResolvedValue(undefined);

    render(<DiaryDetail date="2025-01-15" />);

    await waitFor(() => {
      expect(screen.getByText("삭제하기")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("삭제하기"));

    await waitFor(() => {
      expect(mockedDeleteEntry).toHaveBeenCalledWith("2025-01-15");
    });
    expect(mockPush).toHaveBeenCalledWith("/diary");
  });
});
