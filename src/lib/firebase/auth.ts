"use client";

import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "./config";

const googleProvider = new GoogleAuthProvider();

const AUTH_ERROR_MAP: Record<string, string | null> = {
  "auth/invalid-credential":     "이메일 또는 비밀번호가 올바르지 않습니다.",
  "auth/user-not-found":         "등록되지 않은 이메일입니다.",
  "auth/wrong-password":         "비밀번호가 올바르지 않습니다.",
  "auth/invalid-email":          "올바른 이메일 형식이 아닙니다.",
  "auth/user-disabled":          "비활성화된 계정입니다.",
  "auth/email-already-in-use":   "이미 사용 중인 이메일입니다.",
  "auth/too-many-requests":      "로그인 시도가 너무 많습니다. 잠시 후 다시 시도해주세요.",
  "auth/network-request-failed": "네트워크 오류가 발생했습니다.",
  "auth/popup-blocked":          "팝업이 차단되었습니다. 브라우저 설정을 확인해주세요.",
  "auth/popup-closed-by-user":   null,
  "auth/weak-password":          "비밀번호는 6자 이상이어야 합니다.",
};

function translateAuthError(error: unknown): string {
  const code = (error as { code?: string })?.code;
  if (code && code in AUTH_ERROR_MAP) {
    return AUTH_ERROR_MAP[code] ?? "";
  }
  if (error instanceof Error && !error.message.startsWith("Firebase:")) {
    return error.message;
  }
  return "로그인에 실패했습니다. 다시 시도해주세요.";
}

export async function signInWithGoogle() {
  try {
    return await signInWithPopup(auth, googleProvider);
  } catch (error: unknown) {
    const msg = translateAuthError(error);
    if (!msg) return null;
    throw new Error(msg);
  }
}

export async function signInWithEmail(email: string, password: string) {
  const trimmedEmail = email.trim();
  if (!trimmedEmail || !password) {
    throw new Error("이메일과 비밀번호를 입력해주세요.");
  }
  try {
    return await signInWithEmailAndPassword(auth, trimmedEmail, password);
  } catch (error) {
    throw new Error(translateAuthError(error));
  }
}

export async function signUpWithEmail(
  email: string,
  password: string,
  displayName: string
) {
  const trimmedEmail = email.trim();
  const trimmedName = displayName.trim();
  if (!trimmedEmail || !password) {
    throw new Error("이메일과 비밀번호를 입력해주세요.");
  }
  if (!trimmedName) {
    throw new Error("이름을 입력해주세요.");
  }
  if (password.length < 6) {
    throw new Error("비밀번호는 6자 이상이어야 합니다.");
  }
  try {
    const result = await createUserWithEmailAndPassword(auth, trimmedEmail, password);
    await updateProfile(result.user, { displayName: trimmedName });
    return result;
  } catch (error) {
    throw new Error(translateAuthError(error));
  }
}

export async function logout() {
  return signOut(auth);
}
