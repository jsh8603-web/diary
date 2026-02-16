"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import {
  signInWithGoogle,
  signInWithEmail,
  signUpWithEmail,
} from "@/lib/firebase/auth";

export default function LoginPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  if (user) {
    return null;
  }

  async function handleGoogle() {
    setError("");
    setLoading(true);
    try {
      await signInWithGoogle();
      router.push("/");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "로그인에 실패했습니다";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isSignUp) {
        await signUpWithEmail(email, password, name);
      } else {
        await signInWithEmail(email, password);
      }
      router.push("/");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "로그인에 실패했습니다";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl text-baby-taupe font-bold mb-2">
            로그인
          </h1>
          <p className="text-baby-text-light text-sm">
            댓글을 남기려면 로그인이 필요합니다
          </p>
        </div>

        <div className="bg-baby-white rounded-2xl p-6 border border-baby-border space-y-4">
          {/* Google 로그인 */}
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path
                fill="#4285F4"
                d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
              />
              <path
                fill="#34A853"
                d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"
              />
              <path
                fill="#FBBC05"
                d="M3.964 10.706A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.038l3.007-2.332z"
              />
              <path
                fill="#EA4335"
                d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z"
              />
            </svg>
            Google로 로그인
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-baby-border" />
            <span className="text-xs text-baby-text-light">또는</span>
            <div className="flex-1 h-px bg-baby-border" />
          </div>

          {/* 이메일 로그인 */}
          <form onSubmit={handleEmailSubmit} className="space-y-3">
            {isSignUp && (
              <input
                type="text"
                placeholder="이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={isSignUp}
                className="w-full px-4 py-3 rounded-xl border border-baby-border bg-baby-cream text-sm focus:outline-none focus:border-baby-taupe transition-colors"
              />
            )}
            <input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-baby-border bg-baby-cream text-sm focus:outline-none focus:border-baby-taupe transition-colors"
            />
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-3 rounded-xl border border-baby-border bg-baby-cream text-sm focus:outline-none focus:border-baby-taupe transition-colors"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-baby-taupe text-white rounded-xl px-4 py-3 text-sm font-medium hover:bg-baby-taupe-dark transition-colors disabled:opacity-50"
            >
              {loading ? "처리 중..." : isSignUp ? "회원가입" : "로그인"}
            </button>
          </form>

          {error && (
            <p className="text-red-500 text-xs text-center">{error}</p>
          )}

          <p className="text-center text-xs text-baby-text-light">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError("");
              }}
              className="text-baby-taupe underline"
            >
              {isSignUp
                ? "이미 계정이 있나요? 로그인"
                : "계정이 없나요? 회원가입"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
