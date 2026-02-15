import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

/**
 * টেস্ট কেস: Nifty AI লগইন এবং ট্রান্সক্রিপ্ট ফাইল আপলোড
 * ১. সঠিক ক্রেডেনশিয়াল দিয়ে লগইন করা।
 * ২. 'Upload Transcript File' কার্ডে ক্লিক করা।
 * ৩. লোকাল ডিরেক্টরি থেকে ফাইল সিলেক্ট এবং আপলোড করা।
 * ৪. ফাইলটি তালিকায় 'Uploaded' স্ট্যাটাসে আছে কি না নিশ্চিত করা।
 */

test('TC-01: Valid Login and File Upload for Nifty AI', async ({ page }) => {

  // ১. লগইন প্রক্রিয়া (Login Flow)
  const loginUrl: string = 'http://localhost:5004/signin';
  await page.goto(loginUrl, { waitUntil: 'networkidle', timeout: 60000 });

  // ইউজারনেম এবং পাসওয়ার্ড প্রদান
  await page.fill('input[placeholder*="username"]', 'admin');
  await page.fill('input[placeholder*="password"]', '0000');
  await page.click('button[type="submit"]');

  // ড্যাশবোর্ড লোড হওয়া পর্যন্ত অপেক্ষা করা এবং ইউআরএল চেক করা (Assertion 1)
  await page.waitForURL(/dashboard|home/, { timeout: 30000 });
  await expect(page, 'লগইন সফল হয়নি কারণ ইউআরএল ড্যাশবোর্ডে রিডাইরেক্ট হয়নি।').toHaveURL(/dashboard|home/);

  // ২. 'Upload Transcript File' কার্ডে ক্লিক করা (image_b8a82c.png অনুযায়ী)
  const uploadCard = page.locator('div.border-dashed').filter({ hasText: 'Upload Transcript File' });
  await expect(uploadCard, 'আপলোড কার্ডটি ড্যাশবোর্ডে দেখা যাচ্ছে না।').toBeVisible({ timeout: 15000 });
  await uploadCard.click();

  // ৩. ফাইল আপলোড মডাল চেক করা (Assertion 2)
  const uploadModalText = page.locator('text=/Drag and drop a transcript file here/i');
  await expect(uploadModalText, 'ফাইল আপলোড মডালটি ওপেন হয়নি।').toBeVisible();

  // ৪. ফাইল হ্যান্ডলিং এবং এরর ফিক্সিং
  const fileName = 'deepseek_text_20251025_d38b67.txt';
  
  // ফাইলটি প্রজেক্টের রুট ফোল্ডারে বা tests ফোল্ডারে আছে কি না তা নিশ্চিত করা
  const filePath = path.join(process.cwd(), 'tests', fileName);

  // ডিবাগিং: যদি ফাইলটি পিসিতে না থাকে তবে একটি ডামি ফাইল তৈরি করা
  if (!fs.existsSync(filePath)) {
    console.log(`File not found at ${filePath}. Creating a temporary file for testing.`);
    fs.writeFileSync(filePath, 'This is a sample transcript for automated testing purposes.');
  }
  
  // ফাইল আপলোড ইনপুট লিসেনার সেট করা
  const fileInput = page.locator('input[type="file"]');
  await fileInput.setInputFiles(filePath);

  // ৫. আপলোড সাকসেস ভেরিফিকেশন (তালিকা চেক করা - Assertion 3)
  // ফাইলটি আপলোড হওয়ার পর তালিকায় নাম দেখা যাচ্ছে কি না
  const uploadedFileRow = page.locator('.uploaded-files-list').filter({ hasText: 'deepseek_text' }).first();
  await expect(uploadedFileRow, 'আপলোড করার পর ফাইলটি তালিকায় খুঁজে পাওয়া যায়নি।').toBeVisible({ timeout: 30000 });

  // স্ট্যাটাস 'Uploaded' কি না তা যাচাই করা (Final Assertion)
  const successBadge = uploadedFileRow.locator('span:has-text("Uploaded")');
  await expect(successBadge, 'ফাইল আপলোড হয়েছে কিন্তু "Uploaded" স্ট্যাটাস দেখায়নি।').toBeVisible();

  console.log('Login and File Upload completed successfully!');
});