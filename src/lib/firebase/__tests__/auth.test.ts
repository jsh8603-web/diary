/**
 * Tests for src/lib/firebase/auth.ts
 * - signInWithGoogle, signInWithEmail
 * - signUpWithEmail, logout
 */

import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
} from "firebase/auth";

jest.mock("firebase/auth", () => {
  const MockGoogleAuthProvider = jest.fn();
  return {
    GoogleAuthProvider: MockGoogleAuthProvider,
    signInWithPopup: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
    updateProfile: jest.fn(),
  };
});

jest.mock("../config", () => ({
  db: {},
  auth: { currentUser: null },
  storage: {},
}));

import {
  signInWithGoogle,
  signInWithEmail,
  signUpWithEmail,
  logout,
} from "../auth";

const mockedSignInWithPopup = signInWithPopup as jest.MockedFunction<typeof signInWithPopup>;
const mockedSignInWithEmailAndPassword = signInWithEmailAndPassword as jest.MockedFunction<typeof signInWithEmailAndPassword>;
const mockedCreateUserWithEmailAndPassword = createUserWithEmailAndPassword as jest.MockedFunction<typeof createUserWithEmailAndPassword>;
const mockedSignOut = signOut as jest.MockedFunction<typeof signOut>;
const mockedUpdateProfile = updateProfile as jest.MockedFunction<typeof updateProfile>;

describe("auth service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ── signInWithGoogle ──

  describe("signInWithGoogle", () => {
    it("should sign in with Google popup and return result", async () => {
      const mockResult = {
        user: { uid: "google-uid-123", email: "user@gmail.com" },
      };
      mockedSignInWithPopup.mockResolvedValue(mockResult as any);

      const result = await signInWithGoogle();

      expect(result).toEqual(mockResult);
      expect(signInWithPopup).toHaveBeenCalled();
    });

    it("should return null when user closes popup", async () => {
      const popupError = { code: "auth/popup-closed-by-user" };
      mockedSignInWithPopup.mockRejectedValue(popupError);

      const result = await signInWithGoogle();

      expect(result).toBeNull();
    });

    it("should throw translated Korean error for other auth errors", async () => {
      const authError = { code: "auth/network-request-failed", message: "Network error" };
      mockedSignInWithPopup.mockRejectedValue(authError);

      await expect(signInWithGoogle()).rejects.toThrow("네트워크 오류가 발생했습니다.");
    });

    it("should throw translated Korean error for popup-blocked", async () => {
      const authError = { code: "auth/popup-blocked" };
      mockedSignInWithPopup.mockRejectedValue(authError);

      await expect(signInWithGoogle()).rejects.toThrow("팝업이 차단되었습니다.");
    });

    it("should throw generic Korean error for unknown auth errors", async () => {
      const authError = { code: "auth/unknown-error", message: "Firebase: Error (auth/unknown-error)" };
      mockedSignInWithPopup.mockRejectedValue(authError);

      await expect(signInWithGoogle()).rejects.toThrow("로그인에 실패했습니다. 다시 시도해주세요.");
    });
  });

  // ── signInWithEmail ──

  describe("signInWithEmail", () => {
    it("should sign in with email and password", async () => {
      const mockResult = {
        user: { uid: "email-uid-123", email: "test@test.com" },
      };
      mockedSignInWithEmailAndPassword.mockResolvedValue(mockResult as any);

      const result = await signInWithEmail("test@test.com", "password123");

      expect(result).toEqual(mockResult);
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        "test@test.com",
        "password123"
      );
    });

    it("should trim the email before signing in", async () => {
      const mockResult = {
        user: { uid: "uid", email: "test@test.com" },
      };
      mockedSignInWithEmailAndPassword.mockResolvedValue(mockResult as any);

      await signInWithEmail("  test@test.com  ", "password123");

      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        "test@test.com",
        "password123"
      );
    });

    it("should throw for empty email", async () => {
      await expect(signInWithEmail("", "password123")).rejects.toThrow(
        "이메일과 비밀번호를 입력해주세요"
      );
    });

    it("should throw for empty password", async () => {
      await expect(signInWithEmail("test@test.com", "")).rejects.toThrow(
        "이메일과 비밀번호를 입력해주세요"
      );
    });

    it("should throw for whitespace-only email", async () => {
      await expect(signInWithEmail("   ", "password123")).rejects.toThrow(
        "이메일과 비밀번호를 입력해주세요"
      );
    });

    it("should throw translated Korean error for invalid-credential", async () => {
      const authError = { code: "auth/invalid-credential", message: "Firebase: Error (auth/invalid-credential)" };
      mockedSignInWithEmailAndPassword.mockRejectedValue(authError);

      await expect(signInWithEmail("test@test.com", "wrongpass")).rejects.toThrow(
        "이메일 또는 비밀번호가 올바르지 않습니다."
      );
    });

    it("should throw translated Korean error for too-many-requests", async () => {
      const authError = { code: "auth/too-many-requests" };
      mockedSignInWithEmailAndPassword.mockRejectedValue(authError);

      await expect(signInWithEmail("test@test.com", "password123")).rejects.toThrow(
        "로그인 시도가 너무 많습니다. 잠시 후 다시 시도해주세요."
      );
    });
  });

  // ── signUpWithEmail ──

  describe("signUpWithEmail", () => {
    it("should create user and set displayName", async () => {
      const mockUser = { uid: "new-uid", email: "new@test.com" };
      const mockResult = { user: mockUser };
      mockedCreateUserWithEmailAndPassword.mockResolvedValue(mockResult as any);
      mockedUpdateProfile.mockResolvedValue(undefined);

      const result = await signUpWithEmail(
        "new@test.com",
        "password123",
        "Test User"
      );

      expect(result).toEqual(mockResult);
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        "new@test.com",
        "password123"
      );
      expect(updateProfile).toHaveBeenCalledWith(mockUser, {
        displayName: "Test User",
      });
    });

    it("should trim email and displayName", async () => {
      const mockResult = {
        user: { uid: "uid", email: "new@test.com" },
      };
      mockedCreateUserWithEmailAndPassword.mockResolvedValue(mockResult as any);
      mockedUpdateProfile.mockResolvedValue(undefined);

      await signUpWithEmail("  new@test.com  ", "password123", "  Test User  ");

      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        "new@test.com",
        "password123"
      );
      expect(updateProfile).toHaveBeenCalledWith(expect.anything(), {
        displayName: "Test User",
      });
    });

    it("should throw for empty email", async () => {
      await expect(
        signUpWithEmail("", "password123", "Name")
      ).rejects.toThrow("이메일과 비밀번호를 입력해주세요");
    });

    it("should throw for empty password", async () => {
      await expect(
        signUpWithEmail("test@test.com", "", "Name")
      ).rejects.toThrow("이메일과 비밀번호를 입력해주세요");
    });

    it("should throw for empty displayName", async () => {
      await expect(
        signUpWithEmail("test@test.com", "password123", "")
      ).rejects.toThrow("이름을 입력해주세요");
    });

    it("should throw for whitespace-only displayName", async () => {
      await expect(
        signUpWithEmail("test@test.com", "password123", "   ")
      ).rejects.toThrow("이름을 입력해주세요");
    });

    it("should throw for password shorter than 6 characters", async () => {
      await expect(
        signUpWithEmail("test@test.com", "12345", "Name")
      ).rejects.toThrow("비밀번호는 6자 이상이어야 합니다");
    });

    it("should accept password of exactly 6 characters", async () => {
      const mockResult = {
        user: { uid: "uid", email: "test@test.com" },
      };
      mockedCreateUserWithEmailAndPassword.mockResolvedValue(mockResult as any);
      mockedUpdateProfile.mockResolvedValue(undefined);

      const result = await signUpWithEmail("test@test.com", "123456", "Name");

      expect(result).toEqual(mockResult);
    });

    it("should throw translated Korean error for email-already-in-use", async () => {
      const mockUser = { uid: "uid" };
      mockedCreateUserWithEmailAndPassword.mockRejectedValue({ code: "auth/email-already-in-use" });

      await expect(
        signUpWithEmail("existing@test.com", "password123", "Name")
      ).rejects.toThrow("이미 사용 중인 이메일입니다.");
    });
  });

  // ── logout ──

  describe("logout", () => {
    it("should call signOut", async () => {
      mockedSignOut.mockResolvedValue(undefined);

      await logout();

      expect(signOut).toHaveBeenCalled();
    });
  });
});
