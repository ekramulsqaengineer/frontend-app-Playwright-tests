import { test, expect } from '@playwright/test';

test('TC-01: Valid Login Flow', async ({ page }) => {
  await page.goto('http://localhost:5004/signin', { waitUntil: 'networkidle' });
  await page.fill('input[placeholder*="username"]', 'admin');
  await page.fill('input[placeholder*="password"]', '0000');
  await page.click('button[type="submit"]');
  
  await expect(page).toHaveURL(/dashboard|home|meeting/);
  await expect(page.locator('button:has-text("Sign Out")')).toBeVisible();
});