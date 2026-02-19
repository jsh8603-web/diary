import { test, expect } from '@playwright/test';

test.describe('헤더 네비게이션', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('로고가 표시된다', async ({ page }) => {
    const logo = page.getByRole('link', { name: '우리 아기 일기' }).first();
    await expect(logo).toBeVisible();
  });

  test('로고 클릭 시 홈으로 이동한다', async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('link', { name: '우리 아기 일기' }).first().click();
    await expect(page).toHaveURL('/');
  });

  test('데스크톱: 일기 목록 링크가 표시된다', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    const nav = page.locator('nav.hidden.sm\\:flex');
    await expect(nav.getByRole('link', { name: '일기 목록' })).toBeVisible();
  });

  test('데스크톱: 로그인 링크가 표시된다 (비로그인 시)', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    const nav = page.locator('nav.hidden.sm\\:flex');
    await expect(nav.getByRole('link', { name: '로그인' })).toBeVisible();
  });

  test('모바일: 햄버거 버튼이 표시된다', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const menuBtn = page.getByRole('button', { name: '메뉴 열기' });
    await expect(menuBtn).toBeVisible();
  });

  test('모바일: 햄버거 버튼 클릭 시 메뉴가 열린다', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.getByRole('button', { name: '메뉴 열기' }).click();
    await expect(page.getByRole('button', { name: '메뉴 닫기' })).toBeVisible();
    await expect(page.getByRole('link', { name: '일기 목록' }).last()).toBeVisible();
  });

  test('모바일: 백드롭 클릭 시 메뉴가 닫힌다', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.getByRole('button', { name: '메뉴 열기' }).click();
    await expect(page.getByRole('button', { name: '메뉴 닫기' })).toBeVisible();
    // 백드롭은 nav(z-50) 뒤에 있어 일반 클릭 불가 → dispatchEvent로 React onClick 트리거
    await page.locator('div.fixed.inset-0[aria-hidden="true"]').dispatchEvent('click');
    await expect(page.getByRole('button', { name: '메뉴 열기' })).toBeVisible();
  });

  test('데스크톱: "일기 목록" 클릭 시 /diary로 이동한다', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    const nav = page.locator('nav.hidden.sm\\:flex');
    await nav.getByRole('link', { name: '일기 목록' }).click();
    await expect(page).toHaveURL('/diary');
  });
});
