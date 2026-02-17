import { render, screen } from "@testing-library/react";
import AuthGuard from "../AuthGuard";

// Mock useAuth
const mockUseAuth = jest.fn();
jest.mock("../AuthProvider", () => ({
  useAuth: () => mockUseAuth(),
}));

// Get the mocked push function
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    replace: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
    refresh: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "/",
}));

describe("AuthGuard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows spinner when loading", () => {
    mockUseAuth.mockReturnValue({ user: null, loading: true, isAdminUser: false });

    const { container } = render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    );

    // Spinner has animate-spin class
    const spinner = container.querySelector(".animate-spin");
    expect(spinner).toBeInTheDocument();
    expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
  });

  it("redirects to /login when not logged in", () => {
    mockUseAuth.mockReturnValue({ user: null, loading: false, isAdminUser: false });

    render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    );

    expect(mockPush).toHaveBeenCalledWith("/login");
    expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
  });

  it("redirects to /login when user is not admin", () => {
    mockUseAuth.mockReturnValue({
      user: { email: "user@test.com", uid: "123" },
      loading: false,
      isAdminUser: false,
    });

    render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    );

    expect(mockPush).toHaveBeenCalledWith("/login");
    expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
  });

  it("renders children when user is admin", () => {
    mockUseAuth.mockReturnValue({
      user: { email: "admin@test.com", uid: "123" },
      loading: false,
      isAdminUser: true,
    });

    render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    );

    expect(mockPush).not.toHaveBeenCalled();
    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });
});
