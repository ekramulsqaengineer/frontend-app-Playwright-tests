import { test, expect } from '@playwright/test';

test('TC-01: Valid Login for Nifty AI', async ({ page }) => {

  const homeUrl = 'http://localhost:5004/signin';
  const usernameValue = 'admin';
  const passwordValue = '0000';

  // 1. Navigate to the page
  await page.goto(homeUrl, { waitUntil: 'domcontentloaded' });

  // 2. Check input fields and enter data
  const usernameInput = page.locator('input[placeholder*="username"]');
  const passwordInput = page.locator('input[placeholder*="password"]');

  // Assertion: Ensure the fields are visible
  await expect(usernameInput).toBeVisible();
  await expect(passwordInput).toBeVisible();

  await usernameInput.fill(usernameValue);
  await passwordInput.fill(passwordValue);

  // 3. Click the submit button
  const submitButton = page.locator('button[type="submit"], form button');
  await expect(submitButton).toBeEnabled(); // Assertion: Ensure the button is clickable
  await submitButton.click();

  // 4. Navigation verification (most important assertion)
  // We expect that after successful login, the URL no longer contains 'signin'
  await expect(page).not.toHaveURL(/.*signin/, { timeout: 10000 });
  
  // Check if redirected to dashboard or home
  await expect(page).toHaveURL(/.*dashboard|home|meeting/);

  // 5. UI element verification
  // Some specific text or element that only appears after login
  const welcomeText = page.locator('text=/welcome|dashboard/i').first();
  await expect(welcomeText).toBeVisible({ timeout: 10000 });

  // Optional: Check if user profile icon is visible
  // await expect(page.locator('.user-profile-icon')).toBeVisible();
});
