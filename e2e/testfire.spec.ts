import { test, expect } from '@playwright/test';

// demo.testfire.net - IBM 공개 데모 뱅킹 사이트 (테스트용으로 공개된 사이트)
const BASE = 'https://demo.testfire.net';

test.describe('Testfire 데모 사이트', () => {
  test('홈 페이지가 로드된다', async ({ page }) => {
    await page.goto(BASE);
    await expect(page).toHaveTitle(/Altoro Mutual/i);
    await expect(page.getByRole('link', { name: /Sign In/i })).toBeVisible();
  });

  test('로그인 페이지로 이동된다', async ({ page }) => {
    await page.goto(`${BASE}/bank/login.aspx`);
    await expect(page.locator('#uid')).toBeVisible();
    await expect(page.locator('#passw')).toBeVisible();
    await expect(page.getByRole('button', { name: /Login/i })).toBeVisible();
  });

  test('잘못된 자격증명으로 로그인 실패 메시지가 표시된다', async ({ page }) => {
    await page.goto(`${BASE}/bank/login.aspx`);
    await page.locator('#uid').fill('wronguser');
    await page.locator('#passw').fill('wrongpass');
    await page.getByRole('button', { name: /Login/i }).click();
    // 실제 에러 메시지: "Login Failed: We're sorry, but this username or password was not found..."
    await expect(page.getByText(/Login Failed/i)).toBeVisible({ timeout: 8000 });
  });

  test('올바른 자격증명으로 로그인 성공한다', async ({ page }) => {
    await page.goto(`${BASE}/bank/login.aspx`);
    await page.locator('#uid').fill('admin');
    await page.locator('#passw').fill('admin');
    await page.getByRole('button', { name: /Login/i }).click();
    // 로그인 성공 시 "Hello Admin User" 헤딩이 나타남
    await expect(page.getByRole('heading', { name: /Hello/i })).toBeVisible({ timeout: 8000 });
  });

  test('네비게이션 링크들이 표시된다', async ({ page }) => {
    await page.goto(BASE);
    // 실제 네비게이션: PERSONAL, SMALL BUSINESS, INSIDE ALTORO MUTUAL
    await expect(page.getByRole('link', { name: /PERSONAL/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /SMALL BUSINESS/i }).first()).toBeVisible();
  });

  test('검색 기능이 동작한다', async ({ page }) => {
    await page.goto(BASE);
    const searchInput = page.locator('input[name="query"]').or(page.locator('input[type="text"]')).first();
    if (await searchInput.isVisible()) {
      await searchInput.fill('bank');
      await page.keyboard.press('Enter');
      await expect(page).toHaveURL(/search|query/i, { timeout: 5000 });
    } else {
      test.skip();
    }
  });
});
