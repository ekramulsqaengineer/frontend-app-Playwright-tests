import { test, expect } from '@playwright/test';

/**
 * Test Case: Logout Functionality for Nifty AI
 * Steps:
 * 1. Perform Login first (to maintain session)
 * 2. Locate and Click the Logout/Profile button
 * 3. Verify that the user is redirected back to the Login page
 */

test.describe('Nifty AI Logout Flow', () => {

  // Each logout test requires the user to be logged in first
  test.beforeEach(async ({ page }) => {
    // Timeout increased to work on slow networks
    await page.goto('http://localhost:5004/signin', { waitUntil: 'networkidle', timeout: 60000 });
    
    // Login steps
    await page.fill('input[placeholder*="username"]', 'admin');
    await page.fill('input[placeholder*="password"]', '0000');
    await page.click('button[type="submit"]');
    
    // Wait until the dashboard is fully loaded
    // 'networkidle' is used to ensure all data has loaded
    await page.waitForURL(/dashboard|home|meeting/, { timeout: 30000 });
  });

  test('TC-02: Should logout successfully from dashboard', async ({ page }) => {
    
    // 1. Click on the profile menu or icon (Logout button is usually in a dropdown)
    // Selector made more specific as timeout was occurring here
    const profileMenu = page.locator('button[aria-haspopup="menu"], .profile-icon, img[alt*="avatar"], .user-profile').first();
    
    // Wait for the profile menu to be visible
    await expect(profileMenu).toBeVisible({ timeout: 15000 });
    await profileMenu.click();

    // 2. Locate and click the Logout button
    // After the menu opens, the Logout text should appear
    const logoutButton = page.locator('text=/logout/i').first();
    await expect(logoutButton).toBeVisible({ timeout: 10000 });
    await logoutButton.click();

    // 3. Verification: Has the user returned to the sign-in page?
    await expect(page).toHaveURL(/signin/, { timeout: 15000 });

    // 4. Confirm that elements on the sign-in page are visible
    const signInHeader = page.locator('text=/sign in/i').first();
    await expect(signInHeader).toBeVisible();
  });

});
