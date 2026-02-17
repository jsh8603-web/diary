"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { logout } from "@/lib/firebase/auth";
import { useState, useEffect } from "react";

export default function Header() {
  const { user, isAdminUser } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // 라우트 변경 시 모바일 메뉴 닫기
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="bg-baby-white/80 backdrop-blur-sm border-b border-baby-border sticky top-0 z-50">
      <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-serif text-xl text-baby-taupe font-semibold">
          우리 아기 일기
        </Link>

        {/* 데스크톱 네비게이션 */}
        <nav className="hidden sm:flex items-center gap-4 text-sm">
          <Link href="/diary" className="text-baby-text-light hover:text-baby-taupe transition-colors">
            일기 목록
          </Link>
          {isAdminUser && (
            <>
              <Link href="/write" className="text-baby-text-light hover:text-baby-taupe transition-colors">
                글쓰기
              </Link>
              <Link href="/export" className="text-baby-text-light hover:text-baby-taupe transition-colors">
                내보내기
              </Link>
            </>
          )}
          {user ? (
            <button
              onClick={() => logout()}
              className="text-baby-text-light hover:text-baby-taupe transition-colors"
            >
              로그아웃
            </button>
          ) : (
            <Link href="/login" className="text-baby-taupe font-medium">
              로그인
            </Link>
          )}
        </nav>

        {/* 모바일 메뉴 버튼 */}
        <button
          className="sm:hidden p-2 text-baby-taupe"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={menuOpen}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {/* 모바일 메뉴 backdrop + menu */}
      {menuOpen && (
        <>
          {/* Backdrop: 메뉴 바깥 클릭 시 닫기 */}
          <div
            className="sm:hidden fixed inset-0 top-14 bg-black/20 z-40"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          <nav className="sm:hidden border-t border-baby-border bg-baby-white px-4 py-3 space-y-3 relative z-50">
            <Link
              href="/diary"
              className="block text-baby-text-light hover:text-baby-taupe"
              onClick={() => setMenuOpen(false)}
            >
              일기 목록
            </Link>
            {isAdminUser && (
              <>
                <Link
                  href="/write"
                  className="block text-baby-text-light hover:text-baby-taupe"
                  onClick={() => setMenuOpen(false)}
                >
                  글쓰기
                </Link>
                <Link
                  href="/export"
                  className="block text-baby-text-light hover:text-baby-taupe"
                  onClick={() => setMenuOpen(false)}
                >
                  내보내기
                </Link>
              </>
            )}
            {user ? (
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="block text-baby-text-light hover:text-baby-taupe"
              >
                로그아웃
              </button>
            ) : (
              <Link
                href="/login"
                className="block text-baby-taupe font-medium"
                onClick={() => setMenuOpen(false)}
              >
                로그인
              </Link>
            )}
          </nav>
        </>
      )}
    </header>
  );
}
