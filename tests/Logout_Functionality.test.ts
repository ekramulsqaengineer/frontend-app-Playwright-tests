import { test, expect } from '@playwright/test';

test('TC-01: Valid Login and Sign Out for Nifty AI', async ({ page }) => {

  const homeUrl = 'http://localhost:5004/signin';
  await page.goto(homeUrl, { timeout: 60000 });

  // লগইন প্রসেস
  await page.fill('input[placeholder*="username"]', 'admin');
  await page.fill('input[placeholder*="password"]', '0000');
  await page.click('button[type="submit"], form button');

  // ড্যাশবোর্ড ভেরিফিকেশন
  await expect(page).toHaveURL(/dashboard/);

  /**
   * সাইন আউট প্রসেস (স্ক্রিনশট অনুযায়ী)
   */

  // ১. মেইন নেভিবার থেকে 'Sign Out' বাটনে ক্লিক (যদি অলরেডি ক্লিক করা না থাকে)
  // যদি আপনি অলরেডি মোডালটি দেখতে পান, তবে এই স্টেপটি স্কিপ হবে।
  const navSignOut = page.locator('button:has-text("Sign Out"), .nav-link:has-text("Sign Out")').first();
  if (await navSignOut.isVisible()) {
      await navSignOut.click();
  }

  // ২. পপ-আপ মোডাল থেকে 'Sign Out' বাটনে ক্লিক (আপনার লাল মার্ক করা বাটন)
  // এখানে আমরা selector হিসেবে বাটনটি নিশ্চিত করছি যা মোডালের ভেতরে আছে
  const modalSignOutButton = page.locator('div[role="dialog"] button:has-text("Sign Out"), .modal button:has-text("Sign Out")').last();
  
  // বাটনের জন্য অপেক্ষা করা এবং ক্লিক করা
  await expect(modalSignOutButton).toBeVisible({ timeout: 10000 });
  await modalSignOutButton.click();

  // ৩. ফাইনাল ভেরিফিকেশন: সাইন ইন পেজে ফিরেছে কি না
  await expect(page).toHaveURL(/signin/);
  console.log("Successfully signed out!");
});