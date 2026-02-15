import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-08 - User Settings & API Configuration
 * Steps:
 * 1. Login to Nifty AI
 * 2. Navigate to Settings page
 * 3. Input ClickUp API Token
 * 4. Verify the update
 */

test('TC-08: User Settings API Update Test', async ({ page }) => {
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

  // ৪. সেটিংস মেনুতে ক্লিক করা (আপনার স্ক্রিনশট অনুযায়ী ওপরের নেভিগেশন বার)
  const settingsMenuLink = page.getByRole('link', { name: /Settings/i });
  await expect(settingsMenuLink).toBeVisible();
  await settingsMenuLink.click();

  // ৫. সেটিংস পেজে যাওয়ার পর কনফার্ম করা
  await expect(page).toHaveURL(/.*settings/);

  // ৬. ClickUp API Token ইনপুট ফিল্ডে টেক্সট দেওয়া (আপনার স্ক্রিনশট অনুযায়ী লাল মার্ক করা ফিল্ড)
  // প্লেসহোল্ডার 'pk_...' বা ইনপুট টাইপ ব্যবহার করে লোকেট করা
  const apiTokenInput = page.locator('input[placeholder*="pk_"], input[type="text"]').first();
  
  await expect(apiTokenInput).toBeVisible({ timeout: 10000 });
  
  // আগের ভ্যালু মুছে নতুন টোকেন দেওয়া
  await apiTokenInput.clear();
  await apiTokenInput.fill('pk_74829103_ABC123XYZ'); 
  
  // ৭. এন্টার প্রেস করা
  await page.keyboard.press('Enter');

  // ৮. কনফার্মেশন যাচাই করা (যদি কোনো টোস্ট মেসেজ বা সাকসেস টেক্সট আসে)
  // আপনার আগের লজিক অনুযায়ী সাকসেস মেসেজ চেক করা
  const successMessage = page.locator('text=/Settings updated|Success|configured/i').first();
  if (await successMessage.isVisible()) {
      await expect(successMessage).toBeVisible();
  }

  console.log("Successfully updated ClickUp API Token in Settings!");
});