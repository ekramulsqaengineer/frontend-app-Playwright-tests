import { test, expect } from '@playwright/test';

/**
 * Test Case: Logout Functionality for Nifty AI
 * Steps:
 * 1. Perform Login first (Session maintain korar jonno)
 * 2. Locate and Click the Logout/Profile button
 * 3. Verify that the user is redirected back to the Login page
 */

test.describe('Nifty AI Logout Flow', () => {

  // Protiti logout test-er age login thaka proyojon
  test.beforeEach(async ({ page }) => {
    // Timeout barano hoyeche jate slow network-e kaj kore
    await page.goto('http://localhost:5004/signin', { waitUntil: 'networkidle', timeout: 60000 });
    
    // Login steps
    await page.fill('input[placeholder*="username"]', 'admin');
    await page.fill('input[placeholder*="password"]', '0000');
    await page.click('button[type="submit"]');
    
    // Dashboard load howar porjonto wait kora
    // 'networkidle' use kora hoyeche jate shob data load hoye jay
    await page.waitForURL(/dashboard|home|meeting/, { timeout: 30000 });
  });

  test('TC-02: Should logout successfully from dashboard', async ({ page }) => {
    
    // ১. প্রোফাইল মেনু বা আইকনে ক্লিক করা (Logout বাটন সাধারণত ড্রপডাউনে থাকে)
    // Image-e dekhha jachhe timeout ekhane hochhe, tai selector aro specific kora holo
    const profileMenu = page.locator('button[aria-haspopup="menu"], .profile-icon, img[alt*="avatar"], .user-profile').first();
    
    // Profile menu visible howar jonno wait kora
    await expect(profileMenu).toBeVisible({ timeout: 15000 });
    await profileMenu.click();

    // ২. Logout বাটন খুঁজে বের করা এবং ক্লিক করা
    // Menu open howar por Logout lekha bhashbe
    const logoutButton = page.locator('text=/logout/i').first();
    await expect(logoutButton).toBeVisible({ timeout: 10000 });
    await logoutButton.click();

    // ৩. ভেরিফিকেশন: ইউজার কি সাইন-ইন পেজে ফিরে গেছে?
    await expect(page).toHaveURL(/signin/, { timeout: 15000 });

    // ৪. কনফার্ম করা যে সাইন ইন পেজের এলিমেন্ট দেখা যাচ্ছে
    const signInHeader = page.locator('text=/sign in/i').first();
    await expect(signInHeader).toBeVisible();
  });

});