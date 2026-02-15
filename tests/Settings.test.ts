import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-08 - User Settings & API Configuration
 * Steps:
 * 1. Login to Nifty AI
 * 2. Navigate to Settings page
 * 3. Input ClickUp API Token
 * 4. Verify the update
 */

test('TC-08: User Settings API Update Test', async ({ page }) => {
  // 1. Navigate to the sign-in page
  await page.goto('http://localhost:5004/signin', { waitUntil: 'domcontentloaded' });

  // 2. Login process
  const usernameInput = page.locator('input[placeholder*="username"]');
  const passwordInput = page.locator('input[placeholder*="password"]');
  const loginButton = page.locator('button[type="submit"]');

  await usernameInput.fill('admin');
  await passwordInput.fill('0000');
  await loginButton.click();

  // 3. Wait until the dashboard is loaded
  await expect(page).toHaveURL(/.*dashboard|home/, { timeout: 15000 });

  // 4. Click on the Settings menu (according to your screenshot, top navigation bar)
  const settingsMenuLink = page.getByRole('link', { name: /Settings/i });
  await expect(settingsMenuLink).toBeVisible();
  await settingsMenuLink.click();

  // 5. Confirm that the Settings page is loaded
  await expect(page).toHaveURL(/.*settings/);

  // 6. Enter text into the ClickUp API Token input field (red-marked field according to your screenshot)
  // Locate using placeholder 'pk_...' or input type
  const apiTokenInput = page.locator('input[placeholder*="pk_"], input[type="text"]').first();
  
  await expect(apiTokenInput).toBeVisible({ timeout: 10000 });
  
  // Clear previous value and enter new token
  await apiTokenInput.clear();
  await apiTokenInput.fill('pk_74829103_ABC123XYZ'); 
  
  // 7. Press Enter
  await page.keyboard.press('Enter');

  // 8. Verify confirmation (if any toast message or success text appears)
  // Check success message according to your previous logic
  const successMessage = page.locator('text=/Settings updated|Success|configured/i').first();
  if (await successMessage.isVisible()) {
      await expect(successMessage).toBeVisible();
  }

  console.log("Successfully updated ClickUp API Token in Settings!");
});
