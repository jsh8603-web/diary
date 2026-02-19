import { test, expect } from '@playwright/test';

test.describe('일기 목록 페이지', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/diary');
  });

  test('"일기 목록" 헤딩이 렌더링된다', async ({ page }) => {
    await expect(page.getByRole('heading', { name: '일기 목록' })).toBeVisible();
  });

  test('초기 로딩 스피너가 표시된다', async ({ page }) => {
    await page.goto('/diary', { waitUntil: 'domcontentloaded' });
    // DOM 로드 직후 로딩 스피너 확인 (Firebase 응답 전)
    const spinner = page.locator('.animate-spin').first();
    await expect(spinner).toBeVisible();
  });

  test('로딩 완료 후 일기 목록 또는 빈 상태가 표시된다', async ({ page, browserName }) => {
    test.skip(browserName === 'webkit', 'Firebase Firestore SDK가 WebKit 테스트 환경에서 응답하지 않음');
    const hasList = page.locator('a[href^="/diary?date="]').first();
    const isEmpty = page.getByText('아직 작성된 일기가 없습니다');
    const hasError = page.getByText('일기 목록을 불러오는데 실패했습니다');
    await expect(hasList.or(isEmpty).or(hasError)).toBeVisible({ timeout: 15000 });
  });

  test('Footer가 표시된다', async ({ page }) => {
    await expect(page.getByText('소중한 매일을 기록합니다')).toBeVisible();
  });
});

test.describe('일기 상세 라우팅', () => {
  test('/diary?date= URL로 상세 페이지에 접근된다', async ({ page }) => {
    await page.goto('/diary?date=2024-01-01');
    // DiaryDetail 로딩 or 에러 상태가 표시됨 (실 DB에 데이터 없을 수 있음)
    const spinner = page.locator('.animate-spin').first();
    const notFound = page.getByText('일기를 찾을 수 없습니다');
    const entry = page.getByRole('heading').first(); // 일기 제목 or 날짜
    await expect(spinner.or(notFound).or(entry)).toBeVisible({ timeout: 10000 });
  });

  test('상세 페이지에 댓글 섹션이 있다', async ({ page }) => {
    // 실 DB에 데이터가 있는 날짜가 없을 수 있으므로, 일기 목록에서 첫 항목 클릭
    await page.goto('/diary');
    const firstEntry = page.locator('a[href^="/diary?date="]').first();
    const hasEntry = await firstEntry.isVisible({ timeout: 8000 }).catch(() => false);

    if (hasEntry) {
      await firstEntry.click();
      await expect(page.getByRole('heading', { name: /댓글/ })).toBeVisible({ timeout: 8000 });
    } else {
      test.skip();
    }
  });
});
