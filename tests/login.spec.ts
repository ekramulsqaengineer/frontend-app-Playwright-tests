import { test, expect } from '@playwright/test';

test('TC-01: Valid Login', async ({ page }) => {

  await page.goto('http://localhost:5004/');

  const username = page.locator('input[placeholder="Enter username"]');
  const password = page.locator('input[placeholder="Enter password"]');
  const signInBtn = page.locator('button:has-text("Sign In")');

  await username.fill('admin');
  await password.fill('0000');
  await signInBtn.click();

  await expect(page).toHaveURL(/dashboard|home/);
});
