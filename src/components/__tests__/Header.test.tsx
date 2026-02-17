import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../Header";

// Mock useAuth
const mockUseAuth = jest.fn();
jest.mock("../AuthProvider", () => ({
  useAuth: () => mockUseAuth(),
}));

// Mock logout
const mockLogout = jest.fn();
jest.mock("@/lib/firebase/auth", () => ({
  logout: () => mockLogout(),
}));

// Mock next/navigation
jest.mock("next/navigation", () => ({
  usePathname: () => "/",
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

describe("Header", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders logo and diary list navigation link", () => {
    mockUseAuth.mockReturnValue({ user: null, isAdminUser: false });

    render(<Header />);

    expect(screen.getByText("우리 아기 일기")).toBeInTheDocument();
    // Check for diary list link (there may be multiple because of desktop and mobile nav)
    const diaryLinks = screen.getAllByText("일기 목록");
    expect(diaryLinks.length).toBeGreaterThanOrEqual(1);
  });

  it("shows login link when user is not logged in", () => {
    mockUseAuth.mockReturnValue({ user: null, isAdminUser: false });

    render(<Header />);

    const loginLinks = screen.getAllByText("로그인");
    expect(loginLinks.length).toBeGreaterThanOrEqual(1);
    expect(screen.queryByText("로그아웃")).not.toBeInTheDocument();
  });

  it("shows logout button when user is logged in", () => {
    mockUseAuth.mockReturnValue({
      user: { email: "user@test.com", uid: "123" },
      isAdminUser: false,
    });

    render(<Header />);

    const logoutButtons = screen.getAllByText("로그아웃");
    expect(logoutButtons.length).toBeGreaterThanOrEqual(1);
    expect(screen.queryByText("로그인")).not.toBeInTheDocument();
  });

  it("shows admin menus (write, export) for admin user", () => {
    mockUseAuth.mockReturnValue({
      user: { email: "admin@test.com", uid: "123" },
      isAdminUser: true,
    });

    render(<Header />);

    const writeLinks = screen.getAllByText("글쓰기");
    expect(writeLinks.length).toBeGreaterThanOrEqual(1);
    const exportLinks = screen.getAllByText("내보내기");
    expect(exportLinks.length).toBeGreaterThanOrEqual(1);
  });

  it("hides admin menus for non-admin user", () => {
    mockUseAuth.mockReturnValue({
      user: { email: "user@test.com", uid: "123" },
      isAdminUser: false,
    });

    render(<Header />);

    expect(screen.queryByText("글쓰기")).not.toBeInTheDocument();
    expect(screen.queryByText("내보내기")).not.toBeInTheDocument();
  });

  it("toggles mobile menu on button click", () => {
    mockUseAuth.mockReturnValue({ user: null, isAdminUser: false });

    render(<Header />);

    const menuButton = screen.getByLabelText("메뉴 열기");
    expect(menuButton).toBeInTheDocument();

    // Initially mobile nav should not be visible (it only appears when menuOpen is true)
    // The desktop nav always renders but is hidden via CSS
    // Mobile nav is conditionally rendered
    const mobileNavs = document.querySelectorAll("nav.sm\\:hidden");
    expect(mobileNavs.length).toBe(0);

    // Click to open menu
    fireEvent.click(menuButton);

    // Now the mobile nav should be rendered
    const openMenuButton = screen.getByLabelText("메뉴 닫기");
    expect(openMenuButton).toBeInTheDocument();

    // Click to close menu
    fireEvent.click(openMenuButton);
    expect(screen.getByLabelText("메뉴 열기")).toBeInTheDocument();
  });

  it("calls logout when logout button is clicked", () => {
    mockUseAuth.mockReturnValue({
      user: { email: "user@test.com", uid: "123" },
      isAdminUser: false,
    });

    render(<Header />);

    const logoutButtons = screen.getAllByText("로그아웃");
    fireEvent.click(logoutButtons[0]);

    expect(mockLogout).toHaveBeenCalled();
  });
});
