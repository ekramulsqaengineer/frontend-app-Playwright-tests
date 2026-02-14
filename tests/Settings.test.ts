import { test, expect } from '@playwright/test';

test('TC-08: User Settings Update Test', async ({ page }) => {
  // লগইন
  await page.goto('https://example.com/login');
  await page.fill('#username', 'user_01');
  await page.fill('#password', 'pass_01');
  await page.click('#login-button');

  // সেটিংস পেজে প্রোফাইল আপডেট করা
  await page.click('#settings-icon');
  await page.fill('#display-name', 'New Name');
  await page.click('#save-settings');

  // কনফার্মেশন মেসেজ চেক করা
  await expect(page.locator('.toast-message')).toContainText('Settings updated');
});