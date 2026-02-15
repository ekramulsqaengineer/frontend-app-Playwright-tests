import { test, expect, devices } from '@playwright/test';
import path from 'path';

/**
 * Test Case: TC-01 - Valid Login and Sign Out for Nifty AI
 */
test('TC-01: Valid Login and Sign Out for Nifty AI', async ({ page }) => {
  const homeUrl = 'http://localhost:5004/signin';
  await page.goto(homeUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });

  const usernameInput = page.locator('input[placeholder*="username"]');
  const passwordInput = page.locator('input[placeholder*="password"]');
  const loginButton = page.locator('button[type="submit"]');

  await usernameInput.fill('admin');
  await passwordInput.fill('0000');
  await loginButton.click();

  // ২. ড্যাশবোর্ড থেকে 'Knowledge Base' মেনুতে ক্লিক (আপনার স্ক্রিনশট অনুযায়ী)
  const knowledgeBaseMenu = page.getByRole('link', { name: /Knowledge Base/i });
  await expect(knowledgeBaseMenu).toBeVisible();
  await knowledgeBaseMenu.click();

  // ৩. ফাইল আপলোড এরিয়া লোড হওয়া পর্যন্ত অপেক্ষা
  await expect(page).toHaveURL(/.*knowledge-base/);
  
  // ৪. ফাইল ইনপুট হ্যান্ডলিং (ড্র্যাগ-অ্যান্ড-ড্রপ এরিয়া)
  // প্লে-রাইটে ফাইল আপলোড করার জন্য লুকানো ইনপুট ফাইলটি সেট করতে হয়
  const fileChooserPromise = page.waitForEvent('filechooser');
  const uploadArea = page.locator('text=/Drag and drop a file here/i');
  await expect(uploadArea).toBeVisible();
  
  // আপলোড এরিয়াতে ক্লিক করে ফাইল চুজ করা (অথবা সরাসরি setInputFiles ব্যবহার করা)
  await uploadArea.click();
  const fileChooser = await fileChooserPromise;
  
  // আপনার ডিরেক্টরি থেকে একটি স্যাম্পল ফাইল পাঠানো (নিশ্চিত করুন ফাইলটি আপনার প্রজেক্টে আছে)
  await fileChooser.setFiles(path.join(__dirname, 'sample-file.txt'));

  // ৫. আপলোড সাকসেস ভেরিফিকেশন
  // আপনার স্ক্রিনশট অনুযায়ী 'Uploaded Documents' সেকশনে ফাইলটি দেখা যাবে
  const uploadedFileItem = page.locator('.card, .uploaded-doc').filter({ hasText: 'sample-file.txt' }).first();
  await expect(uploadedFileItem).toBeVisible({ timeout: 20000 });

  console.log("File uploaded successfully to Knowledge Base!");
});
