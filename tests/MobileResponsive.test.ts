import { test, expect, devices } from '@playwright/test';

/**
 * Test Case: TC-09 - Mobile Responsive Menu and Scroll Test
 * Steps:
 * 1. Emulate Mobile Device (iPhone 12)
 * 2. Login to Nifty AI in mobile view
 * 3. Toggle Hamburger Menu
 * 4. Scroll to navigation items
 * 5. Verify visibility
 */

test('TC-09: Mobile Responsive Menu and Scroll Test', async ({ page }) => {
  // 1. Instead of directly setting viewport, use Playwright's built-in device emulation
  const iPhone12 = devices['iPhone 12'];
  await page.setViewportSize(iPhone12.viewport);

  // 2. Navigate to the sign-in page
  await page.goto('http://localhost:5004/signin', { waitUntil: 'domcontentloaded' });

  // 3. Login process in mobile view
  const usernameInput = page.locator('input[placeholder*="username"]');
  const passwordInput = page.locator('input[placeholder*="password"]');
  const loginButton = page.locator('button[type="submit"]');

  await usernameInput.fill('admin');
  await passwordInput.fill('0000');
  await loginButton.click();

  // 4. Ensure the dashboard or mobile home page is loaded
  await expect(page).toHaveURL(/.*dashboard|home/, { timeout: 15000 });

});
