import { test, expect } from '@playwright/test';

test.describe('홈 페이지', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Hero 섹션이 렌더링된다', async ({ page }) => {
    await expect(page.getByRole('heading', { name: '우리 아기 일기' })).toBeVisible();
    await expect(page.getByText('소중한 매일의 순간을 기록합니다')).toBeVisible();
    await expect(page.getByRole('link', { name: '일기 보러가기' })).toBeVisible();
  });

  test('아기 이미지가 로드된다', async ({ page }) => {
    const img = page.getByAltText('우리 아기');
    await expect(img).toBeVisible();
    await expect(img).toHaveAttribute('src', '/hero-baby.jpeg');
  });

  test('최근 일기 섹션이 표시된다', async ({ page }) => {
    await expect(page.getByRole('heading', { name: '최근 일기' })).toBeVisible();
  });

  test('"일기 보러가기" 버튼이 /diary로 이동한다', async ({ page }) => {
    await page.getByRole('link', { name: '일기 보러가기' }).click();
    await expect(page).toHaveURL('/diary');
  });

  test('페이지 타이틀이 "우리 아기 일기"다', async ({ page }) => {
    await expect(page).toHaveTitle('우리 아기 일기');
  });

  test('Footer가 표시된다', async ({ page }) => {
    await expect(page.getByText('소중한 매일을 기록합니다')).toBeVisible();
  });
});
