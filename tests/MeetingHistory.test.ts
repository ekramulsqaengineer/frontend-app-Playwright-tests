import { test, expect } from '@playwright/test';

test('TC-06: Meeting History Log Verification', async ({ page }) => {
  // ১. লগইন ফ্লো
  await page.goto('http://localhost:5004/signin', { waitUntil: 'domcontentloaded' });
  
  // Login steps - Locator ব্যবহার করা ভালো
  await page.locator('input[placeholder*="username"]').fill('admin');
  await page.locator('input[placeholder*="password"]').fill('0000');
  await page.locator('button[type="submit"]').click();

  // ২. হিস্ট্রি পেজে যাওয়া (নিশ্চিত করা যে পেজ লোড হয়েছে)
  const historyLink = page.locator('#meeting-history-link');
  await expect(historyLink).toBeVisible({ timeout: 10000 });
  await historyLink.click();

  // ৩. হিস্ট্রি টেবিল ভেরিফিকেশন
  // সরাসরি প্রথম রো বা নির্দিষ্ট একটি ডাটা সেলের জন্য অপেক্ষা করা বুদ্ধিমানের কাজ
  const tableRows = page.locator('.history-table tbody tr');

  /** * প্রফেশনাল অ্যাপ্রোচ: 
   * এখানে .toBeVisible() বা .not.toHaveCount(0) ব্যবহার করলে Playwright 
   * অটোমেটিক অপেক্ষা করবে টেবিলটি ডাটা দিয়ে পপুলেট হওয়া পর্যন্ত।
   */
  
  // অন্তত একটি রেকর্ড আছে কি না তা নিশ্চিত করা
  await expect(tableRows.first()).toBeVisible({ timeout: 15000 });

  // যদি আপনি নির্দিষ্ট সংখ্যা চেক করতে চান:
  const rowCount = await tableRows.count();
  console.log(`Total meetings found: ${rowCount}`);
  expect(rowCount).toBeGreaterThan(0);

  // বোনাস: টেবিলের ভেতরে নির্দিষ্ট কোনো টেক্সট আছে কি না চেক করা
  // await expect(page.locator('.history-table')).toContainText('Completed');
});