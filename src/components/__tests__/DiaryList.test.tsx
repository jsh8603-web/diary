import { render, screen, waitFor } from "@testing-library/react";
import DiaryList from "../DiaryList";
import { getEntriesPage } from "@/lib/firebase/diary";
import type { DiaryEntry } from "@/lib/types";

// Mock diary module
jest.mock("@/lib/firebase/diary", () => ({
  getEntriesPage: jest.fn(),
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

// Mock date-fns
jest.mock("date-fns", () => ({
  format: jest.fn((date: Date, formatStr: string, options?: unknown) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    if (formatStr.includes("yyyy년 M월")) {
      return `${year}년 ${month}월`;
    }
    if (formatStr.includes("M월 d일")) {
      return `${month}월 ${day}일 (수요일)`;
    }
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  }),
}));

jest.mock("date-fns/locale", () => ({
  ko: {},
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

const mockedGetEntriesPage = getEntriesPage as jest.Mock;

const mockEntries: DiaryEntry[] = [
  {
    date: "2025-01-15",
    title: "January Entry",
    content: "Content for January",
    photos: [{ url: "https://example.com/jan.jpg", path: "photos/jan.jpg" }],
    authorId: "author1",
    authorName: "Admin",
    createdAt: { toDate: () => new Date("2025-01-15") } as any,
    updatedAt: { toDate: () => new Date("2025-01-15") } as any,
  },
  {
    date: "2025-01-10",
    title: "Another January",
    content: "More January content",
    photos: [],
    authorId: "author1",
    authorName: "Admin",
    createdAt: { toDate: () => new Date("2025-01-10") } as any,
    updatedAt: { toDate: () => new Date("2025-01-10") } as any,
  },
  {
    date: "2024-12-25",
    title: "December Entry",
    content: "Merry Christmas",
    photos: [],
    authorId: "author1",
    authorName: "Admin",
    createdAt: { toDate: () => new Date("2024-12-25") } as any,
    updatedAt: { toDate: () => new Date("2024-12-25") } as any,
  },
];

describe("DiaryList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows loading spinner initially", () => {
    mockedGetEntriesPage.mockReturnValue(new Promise(() => {})); // never resolves

    const { container } = render(<DiaryList />);

    const spinner = container.querySelector(".animate-spin");
    expect(spinner).toBeInTheDocument();
  });

  it("shows empty message when no entries", async () => {
    mockedGetEntriesPage.mockResolvedValue({ entries: [], lastDoc: null });

    render(<DiaryList />);

    await waitFor(() => {
      expect(screen.getByText("아직 작성된 일기가 없습니다")).toBeInTheDocument();
    });
  });

  it("renders entries grouped by month", async () => {
    mockedGetEntriesPage.mockResolvedValue({ entries: mockEntries, lastDoc: null });

    render(<DiaryList />);

    await waitFor(() => {
      expect(screen.getByText("January Entry")).toBeInTheDocument();
    });

    // Check month headers
    expect(screen.getByText("2025년 1월")).toBeInTheDocument();
    expect(screen.getByText("2024년 12월")).toBeInTheDocument();

    // Check all entries are rendered
    expect(screen.getByText("January Entry")).toBeInTheDocument();
    expect(screen.getByText("Another January")).toBeInTheDocument();
    expect(screen.getByText("December Entry")).toBeInTheDocument();
  });

  it("renders correct links for each entry", async () => {
    mockedGetEntriesPage.mockResolvedValue({ entries: mockEntries, lastDoc: null });

    render(<DiaryList />);

    await waitFor(() => {
      expect(screen.getByText("January Entry")).toBeInTheDocument();
    });

    // Check hrefs
    const links = document.querySelectorAll("a[href]");
    const hrefs = Array.from(links).map((link) => link.getAttribute("href"));
    expect(hrefs).toContain("/diary?date=2025-01-15");
    expect(hrefs).toContain("/diary?date=2025-01-10");
    expect(hrefs).toContain("/diary?date=2024-12-25");
  });

  it("renders entry content preview", async () => {
    mockedGetEntriesPage.mockResolvedValue({ entries: mockEntries, lastDoc: null });

    render(<DiaryList />);

    await waitFor(() => {
      expect(screen.getByText("Content for January")).toBeInTheDocument();
    });
    expect(screen.getByText("More January content")).toBeInTheDocument();
    expect(screen.getByText("Merry Christmas")).toBeInTheDocument();
  });

  it("shows thumbnail for entries with photos", async () => {
    mockedGetEntriesPage.mockResolvedValue({ entries: mockEntries, lastDoc: null });

    render(<DiaryList />);

    await waitFor(() => {
      expect(screen.getByText("January Entry")).toBeInTheDocument();
    });

    // Only the first entry has a photo (images have alt="" so they are presentational)
    const images = document.querySelectorAll("img");
    expect(images.length).toBe(1);
    expect(images[0].getAttribute("src")).toBe("https://example.com/jan.jpg");
  });

  it("renders the page title", async () => {
    mockedGetEntriesPage.mockResolvedValue({ entries: [], lastDoc: null });

    render(<DiaryList />);

    expect(screen.getByText("일기 목록")).toBeInTheDocument();
  });
});
