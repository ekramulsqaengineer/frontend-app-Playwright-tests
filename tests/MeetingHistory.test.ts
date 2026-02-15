import { test, expect, devices } from '@playwright/test';

/**
 * Test Case: TC-06 - Meeting History Log and Refresh Verification
 * Steps:
 * 1. Login to Nifty AI
 * 2. Navigate to History page
 * 3. Click the Refresh button
 * 4. Verify the logs are visible
 */

test('TC-06: Meeting History Log and Refresh Verification', async ({ page }) => {
  // ১. সাইন-ইন পেজে নেভিগেট করা
  await page.goto('http://localhost:5004/signin', { waitUntil: 'domcontentloaded' });

  // ২. লগইন প্রসেস
  const usernameInput = page.locator('input[placeholder*="username"]');
  const passwordInput = page.locator('input[placeholder*="password"]');
  const loginButton = page.locator('button[type="submit"]');

  await usernameInput.fill('admin');
  await passwordInput.fill('0000');
  await loginButton.click();

  // ৩. ড্যাশবোর্ড লোড হওয়া পর্যন্ত অপেক্ষা করা
  await expect(page).toHaveURL(/.*dashboard|home/, { timeout: 15000 });

  // ৪. হিস্ট্রি মেনুতে ক্লিক করা (আপনার স্ক্রিনশট অনুযায়ী ওপরের নেভিগেশন বার)
  const historyMenuLink = page.getByRole('link', { name: /History/i });
  await expect(historyMenuLink).toBeVisible();
  await historyMenuLink.click();

  // ৫. হিস্ট্রি পেজে যাওয়ার পর কনফার্ম করা
  await expect(page).toHaveURL(/.*history/);

  // ৬. রিফ্রেশ (Refresh) বাটনে ক্লিক করা (আপনার স্ক্রিনশটের লাল মার্ক করা বাটন)
  const refreshButton = page.getByRole('button', { name: /Refresh/i });
  await expect(refreshButton).toBeVisible({ timeout: 10000 });
  await refreshButton.click();

  // ৭. হিস্ট্রি ডাটা লোড হয়েছে কি না তা নিশ্চিত করা
  // স্ক্রিনশট অনুযায়ী এখানে অনেকগুলো 'Internal' মিটিং কার্ড দেখা যাচ্ছে
  const meetingCards = page.locator('.grid > div, .card, text=/Internal/i');
  
  // অন্তত একটি মিটিং রেকর্ড দৃশ্যমান হওয়া পর্যন্ত অপেক্ষা
  await expect(meetingCards.first()).toBeVisible({ timeout: 15000 });

  // ৮. কনফার্মেশন মেসেজ বা কাউন্ট চেক করা
  const cardCount = await meetingCards.count();
  console.log(`Total meeting history records found: ${cardCount}`);
  expect(cardCount).toBeGreaterThan(0);

  console.log("Successfully navigated to History and clicked Refresh!");
});

/**
 * Test Case: TC-09 - Mobile Responsive Menu and Scroll Test
 */
test('TC-09: Mobile Responsive Menu and Scroll Test', async ({ page }) => {
  const iPhone12 = devices['iPhone 12'];
  await page.setViewportSize(iPhone12.viewport);

  await page.goto('http://localhost:5004/signin', { waitUntil: 'domcontentloaded' });

  await page.locator('input[placeholder*="username"]').fill('admin');
  await page.locator('input[placeholder*="password"]').fill('0000');
  await page.locator('button[type="submit"]').click();

  await expect(page).toHaveURL(/.*dashboard|home/, { timeout: 15000 });

  const mobileMenuToggle = page.locator('#mobile-menu-toggle, button:has-text("Menu"), .navbar-toggler').first();
  await expect(mobileMenuToggle).toBeVisible({ timeout: 10000 });
  await mobileMenuToggle.click();

  const navContainer = page.locator('#mobile-nav-container, .mobile-menu').first(); 
  await expect(navContainer).toBeVisible();

  const settingsLink = page.getByRole('link', { name: /settings/i });
  await settingsLink.scrollIntoViewIfNeeded();
  await expect(settingsLink).toBeVisible();

  const desktopMenu = page.locator('#desktop-menu, .nav-desktop');
  if (await desktopMenu.count() > 0) {
      await expect(desktopMenu).not.toBeVisible();
  }

  console.log("Mobile responsive menu and scroll verification completed!");
});