import { test, expect } from '@playwright/test';
import path from 'path';

test('TC-03: File Upload Functional Test', async ({ page }) => {
  // লগইন ফ্লো
  await page.goto('https://example.com/login');
  await page.fill('#username', 'user_01');
  await page.fill('#password', 'pass_01');
  await page.click('#login-button');

  // ফাইল আপলোড সেকশনে যাওয়া
  await page.click('#upload-section');
  
  // ফাইল সিলেক্ট এবং আপলোড (উদাহরণস্বরূপ একটি স্যাম্পল ফাইল)
  const filePath = path.resolve(__dirname, '../sample.pdf');
  await page.setInputFiles('input[type="file"]', filePath);
  
  await page.click('#submit-upload');

  // আপলোড সফল হয়েছে কি না চেক করা
  await expect(page.locator('.upload-success')).toBeVisible();
});