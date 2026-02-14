import { test, expect } from '@playwright/test';

test('TC-05: Knowledge Base Search Test', async ({ page }) => {
  // লগইন
  await page.goto('https://example.com/login');
  await page.fill('#username', 'user_01');
  await page.fill('#password', 'pass_01');
  await page.click('#login-button');

  // সার্চ বারে কীওয়ার্ড দেওয়া
  await page.fill('#kb-search-input', 'Playwright');
  await page.keyboard.press('Enter');

  // সার্চ রেজাল্ট যাচাই করা
  const results = page.locator('.search-results');
  await expect(results).toContainText('Playwright');
});