import { test, expect, devices } from '@playwright/test';

test('TC-01: Valid Login and Sign Out for Nifty AI', async ({ page }) => {
  const homeUrl = 'http://localhost:5004/signin';
  await page.goto(homeUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });

  // 1. Login process
  const usernameInput = page.locator('input[placeholder*="username"]');
  const passwordInput = page.locator('input[placeholder*="password"]');
  const loginButton = page.locator('button[type="submit"]');

  await usernameInput.fill('admin');
  await passwordInput.fill('0000');
  await loginButton.click();

  // 2. Dashboard verification
  await expect(page).toHaveURL(/.*dashboard|home/, { timeout: 300000 });

  // 3. Click the 'Sign Out' button from the navigation bar
  const navSignOutButton = page.locator('button:has-text("Sign Out"), .nav-link:has-text("Sign Out")').first();
  await expect(navSignOutButton).toBeVisible();
  await navSignOutButton.click();

  // 4. Confirm 'Sign Out' from the pop-up modal
  const modalSignOutConfirm = page.locator('div[role="dialog"] button:has-text("Sign Out"), .modal-content button:has-text("Sign Out")').last();
  
  await expect(modalSignOutConfirm).toBeVisible({ timeout: 10000 });
  await modalSignOutConfirm.click();

  // 5. Final verification: Check if redirected back to the sign-in page
  await expect(page).toHaveURL(/.*signin/);
  console.log("Successfully signed out through confirmation modal!");
});
