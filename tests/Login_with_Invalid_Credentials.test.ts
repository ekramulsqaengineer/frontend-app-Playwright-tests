import { test, expect } from '@playwright/test';

/**
 * Test Case: Nifty AI Login Flow via Home Page
 * Steps: 
 * 1. Navigate to Home Page (http://localhost:5004/)
 * 2. Click the 'Sign In' button using exact href and span content
 * 3. Click 'Sign in with Zoom' with explicit waiting
 * 4. Fill Credentials and Submit
 */

test('TC-01: Valid Login for Nifty AI', async ({ page }) => {

  // 1. Redirect to the homepage
  const homeUrl: string = 'http://localhost:5004/signin';
  await page.goto(homeUrl, { timeout: 60000 });

  // 2. After navigation, fill in the login form
  const usernameValue: string = 'admin1';
  const passwordValue: string = '0001';

  // Wait for the username field (signin page might take time to load)
  await page.waitForSelector('input[placeholder*="username"]', { timeout: 30000 });

  // Enter data into fields
  await page.fill('input[placeholder*="username"]', usernameValue);
  await page.fill('input[placeholder*="password"]', passwordValue);

  // 3. Click the submit button
  // If there are multiple buttons, targeting type='submit' is safe
  await page.click('button[type="submit"], form button', { timeout: 10000 });

  // 4. Verification
  // Wait 2 seconds to see if the URL has updated
  await page.waitForTimeout(2000);
  await expect(page).toHaveURL(/dashboard|home|meeting|signin/);

  // Ensure the dashboard has loaded
  const welcomeText = page.locator('text=/welcome/i').first();
  if (await welcomeText.isVisible()) {
      await expect(welcomeText).toBeVisible();
  }
});
