import { test, expect } from '@playwright/test';

test.describe('로그인 페이지', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('로그인 페이지가 렌더링된다', async ({ page }) => {
    await expect(page.getByRole('heading', { name: '로그인' })).toBeVisible();
    await expect(page.getByText('댓글을 남기려면 로그인이 필요합니다')).toBeVisible();
  });

  test('Google 로그인 버튼이 표시된다', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Google로 로그인/ })).toBeVisible();
  });

  test('이메일/비밀번호 입력 필드가 표시된다', async ({ page }) => {
    await expect(page.getByRole('textbox', { name: '이메일' })).toBeVisible();
    await expect(page.getByLabel('비밀번호')).toBeVisible();
  });

  test('로그인 버튼이 표시된다', async ({ page }) => {
    await expect(page.getByRole('button', { name: '로그인', exact: true })).toBeVisible();
  });

  test('회원가입 전환 버튼이 동작한다', async ({ page }) => {
    await page.getByRole('button', { name: /계정이 없나요/ }).click();
    await expect(page.getByRole('textbox', { name: '이름' })).toBeVisible();
    await expect(page.getByRole('button', { name: '회원가입' })).toBeVisible();
  });

  test('회원가입 → 로그인으로 다시 전환된다', async ({ page }) => {
    await page.getByRole('button', { name: /계정이 없나요/ }).click();
    await page.getByRole('button', { name: /이미 계정이 있나요/ }).click();
    await expect(page.getByRole('button', { name: '로그인', exact: true })).toBeVisible();
    await expect(page.getByRole('textbox', { name: '이름' })).not.toBeVisible();
  });

  test('빈 폼 제출 시 HTML 유효성 검사가 동작한다', async ({ page }) => {
    await page.getByRole('button', { name: '로그인', exact: true }).click();
    // 이메일 필드가 required 상태이므로 제출되지 않아야 함
    await expect(page).toHaveURL('/login');
  });

  test('잘못된 이메일 형식 입력 시 에러가 표시된다', async ({ page }) => {
    await page.getByLabel('이메일').fill('notanemail');
    await page.getByLabel('비밀번호').fill('123456');
    await page.getByRole('button', { name: '로그인', exact: true }).click();
    // HTML5 이메일 유효성 검사로 인해 제출 안 됨
    await expect(page).toHaveURL('/login');
  });
});
