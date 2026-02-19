import { test, expect } from '@playwright/test';

test.describe('인증 보호 페이지 리디렉션', () => {
  test('/write 접근 시 비로그인이면 /login으로 리디렉션된다', async ({ page }) => {
    await page.goto('/write');
    await page.waitForURL('**/login', { timeout: 8000 });
    await expect(page).toHaveURL('/login');
  });

  test('/export 접근 시 비로그인이면 /login으로 리디렉션된다', async ({ page }) => {
    await page.goto('/export');
    await page.waitForURL('**/login', { timeout: 8000 });
    await expect(page).toHaveURL('/login');
  });

  test('/write 리디렉션 후 로그인 페이지가 정상 렌더링된다', async ({ page }) => {
    await page.goto('/write');
    await page.waitForURL('**/login', { timeout: 8000 });
    await expect(page.getByRole('heading', { name: '로그인' })).toBeVisible();
    await expect(page.getByRole('button', { name: /Google로 로그인/ })).toBeVisible();
  });

  test('/export 리디렉션 후 로그인 페이지가 정상 렌더링된다', async ({ page }) => {
    await page.goto('/export');
    await page.waitForURL('**/login', { timeout: 8000 });
    await expect(page.getByRole('heading', { name: '로그인' })).toBeVisible();
    await expect(page.getByRole('button', { name: /Google로 로그인/ })).toBeVisible();
  });
});
