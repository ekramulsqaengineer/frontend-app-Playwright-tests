import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

/**
 * Test Case: Nifty AI Login and Transcript File Upload
 * Steps:
 * 1. Login with Valid Credentials
 * 2. Click on 'Upload Transcript File' card
 * 3. Select file from local directory
 * 4. Verify file upload success
 */

test('TC-01: Valid Login and File Upload for Nifty AI', async ({ page }) => {

  // ১. লগইন প্রক্রিয়া (Login Flow)
  const loginUrl: string = 'http://localhost:5004/signin';
  await page.goto(loginUrl, { waitUntil: 'networkidle', timeout: 60000 });

  await page.fill('input[placeholder*="username"]', 'admin');
  await page.fill('input[placeholder*="password"]', '0000');
  await page.click('button[type="submit"]');

  // ড্যাশবোর্ড লোড হওয়া পর্যন্ত অপেক্ষা করা
  await page.waitForURL(/dashboard|home|meeting/, { timeout: 30000 });

  // ২. 'Upload Transcript File' কার্ডে ক্লিক করা (image_1efb83.png অনুযায়ী)
  const uploadCard = page.locator('text=/Upload Transcript File/i').first();
  await expect(uploadCard).toBeVisible({ timeout: 15000 });
  await uploadCard.click();

  // ৩. ফাইল আপলোড পপআপ চেক করা (image_1efba7.png অনুযায়ী)
  const uploadModal = page.locator('text=/Drag and drop a transcript file here/i').first();
  await expect(uploadModal).toBeVisible();

  // ৪. ফাইল সিলেক্ট করা (Error Fixing)
  // আপনার এরর (image_1f06c5.png) অনুযায়ী ফাইলটি খুঁজে পাচ্ছে না।
  // আমরা এখন সরাসরি প্রজেক্টের রুট ডিরেক্টরি থেকে চেক করছি।
  
  const fileName = 'deepseek_text_20251025_d38b67.txt';
  
  // আপনি চাইলে ফাইলটি সরাসরি 'tests' ফোল্ডারের ভেতরে রেখে এই পাথটি ব্যবহার করতে পারেন:
  const filePath = path.join(process.cwd(), 'tests', fileName);

  // ফাইলটি পিসিতে আছে কি না তা আগে চেক করা (Debug purposes)
  if (!fs.existsSync(filePath)) {
    console.error(`Error: File not found at ${filePath}. Please ensure the file is placed inside the 'tests' folder.`);
    // যদি ফাইল না থাকে, তবে আমরা একটি টেম্পোরারি ফাইল তৈরি করে দিচ্ছি টেস্টটি চালানোর জন্য
    fs.writeFileSync(filePath, 'This is a sample transcript content for testing.');
  }
  
  // ফাইল ইনপুট হ্যান্ডেল করা
  const fileInput = page.locator('input[type="file"]');
  await fileInput.setInputFiles(filePath);

  // ৫. আপলোড সাকসেস ভেরিফিকেশন (image_1efb83.png-এর নিচের তালিকার মতো)
  // ফাইলটি আপলোড হওয়ার পর তালিকায় দেখা যাচ্ছে কি না তা চেক করা
  const uploadedFileRow = page.locator('text=/deepseek_text/i').first();
  await expect(uploadedFileRow).toBeVisible({ timeout: 30000 });

  // 'Uploaded' স্ট্যাটাস চেক করা
  const successLabel = page.locator('text=/Uploaded/i').first();
  await expect(successLabel).toBeVisible();

  console.log('Login and File Upload completed successfully!');
});