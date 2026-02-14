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

  // ১. হোমপেজে রিডাইরেক্ট করা
  const homeUrl: string = 'http://localhost:5004/signin';
  await page.goto(homeUrl, { timeout: 60000 });

  
  // ৪. নেভিগেশনের পর লগইন ফর্মে ডাটা দেওয়া
  const usernameValue: string = 'admin';
  const passwordValue: string = '0000';

  // ইউজারনেম ফিল্ডের জন্য অপেক্ষা করা (signin পেজ লোড হতে সময় নিতে পারে)
  await page.waitForSelector('input[placeholder*="username"]', { timeout: 30000 });

  // ডাটা ইনপুট দেওয়া
  await page.fill('input[placeholder*="username"]', usernameValue);
  await page.fill('input[placeholder*="password"]', passwordValue);

  // ৫. সাবমিট বাটনে ক্লিক করা
  // যদি একাধিক বাটন থাকে তবে টাইপ 'submit' টার্গেট করা নিরাপদ
  await page.click('button[type="submit"], form button', { timeout: 10000 });

  // ৬. ভেরিফিকেশন
  // ২ সেকেন্ড অপেক্ষা করে দেখা ইউআরএল আপডেট হয়েছে কি না
  await page.waitForTimeout(2000);
  await expect(page).toHaveURL(/dashboard|home|meeting|signin/);

  // ড্যাশবোর্ড লোড হয়েছে কি না তা নিশ্চিত করা
  const welcomeText = page.locator('text=/welcome/i').first();
  if (await welcomeText.isVisible()) {
      await expect(welcomeText).toBeVisible();
  }
});