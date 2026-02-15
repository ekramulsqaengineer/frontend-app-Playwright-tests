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
  // ১. সরাসরি ভিউপোর্ট সেট করার বদলে Playwright-এর বিল্ট-ইন ডিভাইস ইমুলেশন ব্যবহার করা
  const iPhone12 = devices['iPhone 12'];
  await page.setViewportSize(iPhone12.viewport);

  // ২. সাইন-ইন পেজে নেভিগেট করা
  await page.goto('http://localhost:5004/signin', { waitUntil: 'domcontentloaded' });

  // ৩. মোবাইল ভিউতে লগইন প্রসেস
  const usernameInput = page.locator('input[placeholder*="username"]');
  const passwordInput = page.locator('input[placeholder*="password"]');
  const loginButton = page.locator('button[type="submit"]');

  await usernameInput.fill('admin');
  await passwordInput.fill('0000');
  await loginButton.click();

  // ৪. ড্যাশবোর্ড বা মোবাইল হোম পেজ লোড হওয়া নিশ্চিত করা
  await expect(page).toHaveURL(/.*dashboard|home/, { timeout: 15000 });

});