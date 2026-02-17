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

export async function signInWithGoogle() {
  try {
    return await signInWithPopup(auth, googleProvider);
  } catch (error: unknown) {
    const code = (error as { code?: string })?.code;
    if (code === "auth/popup-closed-by-user") {
      return null;
    }
    throw error;
  }
}

export async function signInWithEmail(email: string, password: string) {
  const trimmedEmail = email.trim();
  if (!trimmedEmail || !password) {
    throw new Error("이메일과 비밀번호를 입력해주세요.");
  }
  return signInWithEmailAndPassword(auth, trimmedEmail, password);
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
  const result = await createUserWithEmailAndPassword(auth, trimmedEmail, password);
  await updateProfile(result.user, { displayName: trimmedName });
  return result;
}

export async function logout() {
  return signOut(auth);
}
