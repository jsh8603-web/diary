import { render, screen, act } from "@testing-library/react";
import { AuthProvider, useAuth } from "../AuthProvider";
import { onAuthStateChanged } from "firebase/auth";

// Mock isAdmin
jest.mock("@/lib/types", () => ({
  isAdmin: jest.fn((email: string | null | undefined) => {
    return email === "admin@test.com";
  }),
  ADMIN_EMAILS: ["admin@test.com"],
}));

const mockedOnAuthStateChanged = onAuthStateChanged as jest.Mock;

function TestConsumer() {
  const { user, loading, isAdminUser } = useAuth();
  return (
    <div>
      <span data-testid="loading">{String(loading)}</span>
      <span data-testid="user">{user ? user.email : "null"}</span>
      <span data-testid="isAdmin">{String(isAdminUser)}</span>
    </div>
  );
}

describe("AuthProvider", () => {
  let authCallback: (user: unknown) => void;

  beforeEach(() => {
    jest.clearAllMocks();
    mockedOnAuthStateChanged.mockImplementation((_auth, callback) => {
      authCallback = callback;
      return jest.fn(); // unsubscribe
    });
  });

  it("provides initial loading state as true", () => {
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );
    expect(screen.getByTestId("loading").textContent).toBe("true");
    expect(screen.getByTestId("user").textContent).toBe("null");
    expect(screen.getByTestId("isAdmin").textContent).toBe("false");
  });

  it("updates user state when onAuthStateChanged fires with a user", () => {
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    act(() => {
      authCallback({ email: "admin@test.com", uid: "123" });
    });

    expect(screen.getByTestId("loading").textContent).toBe("false");
    expect(screen.getByTestId("user").textContent).toBe("admin@test.com");
    expect(screen.getByTestId("isAdmin").textContent).toBe("true");
  });

  it("sets isAdminUser to false for non-admin users", () => {
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    act(() => {
      authCallback({ email: "user@test.com", uid: "456" });
    });

    expect(screen.getByTestId("loading").textContent).toBe("false");
    expect(screen.getByTestId("user").textContent).toBe("user@test.com");
    expect(screen.getByTestId("isAdmin").textContent).toBe("false");
  });

  it("sets user to null when onAuthStateChanged fires with null", () => {
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    act(() => {
      authCallback(null);
    });

    expect(screen.getByTestId("loading").textContent).toBe("false");
    expect(screen.getByTestId("user").textContent).toBe("null");
    expect(screen.getByTestId("isAdmin").textContent).toBe("false");
  });

  it("unsubscribes from auth state on unmount", () => {
    const mockUnsubscribe = jest.fn();
    mockedOnAuthStateChanged.mockImplementation((_auth, callback) => {
      authCallback = callback;
      return mockUnsubscribe;
    });

    const { unmount } = render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    unmount();
    expect(mockUnsubscribe).toHaveBeenCalledTimes(1);
  });
});
