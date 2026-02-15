import { test, expect } from '@playwright/test';

test('TC-06: Meeting History Log Verification', async ({ page }) => {
  // ১. লগইন ফ্লো
 await page.goto('http://localhost:5004/signin', { waitUntil: 'networkidle', timeout: 60000 });
    
    // Login steps
    await page.fill('input[placeholder*="username"]', 'admin');
    await page.fill('input[placeholder*="password"]', '0000');
    await page.click('button[type="submit"]');

  // ২. হিস্ট্রি পেজে যাওয়া
  await page.click('#meeting-history-link');

  // ৩. অন্তত একটি মিটিং রেকর্ড আছে কি না চেক করা
  const rows = page.locator('.history-table tr');
  
  // সমাধান: প্রথমে কাউন্টটি আলাদাভাবে await করে নিতে হবে
  const rowCount = await rows.count();
  
  // এরপর সাধারণ expect ব্যবহার করে ভ্যালু চেক করতে হবে
  expect(rowCount).toBeGreaterThan(0);
  
  // প্রফেশনাল টিপ: আপনি চাইলে সরাসরি নিচের লাইনটিও ব্যবহার করতে পারেন যা আরও সহজ:
  // await expect(rows.first()).toBeVisible();
});