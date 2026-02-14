import { test, expect } from '@playwright/test';

test('TC-06: Meeting History Log Verification', async ({ page }) => {
  // লগইন
  await page.goto('https://example.com/login');
  await page.fill('#username', 'user_01');
  await page.fill('#password', 'pass_01');
  await page.click('#login-button');

  // হিস্ট্রি পেজে যাওয়া
  await page.click('#meeting-history-link');

  // অন্তত একটি মিটিং রেকর্ড আছে কি না চেক করা
  const historyTable = page.locator('.history-table');
  await expect(historyTable.locator('tr')).count().then(c => expect(c).toBeGreaterThan(0));
});