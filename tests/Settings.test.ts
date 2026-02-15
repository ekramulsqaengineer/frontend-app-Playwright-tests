import { test, expect } from '@playwright/test';

test('TC-08: User Settings Update Test', async ({ page }) => {
  // ১. সাইন-ইন পেজে যাওয়া
  await page.goto('http://localhost:5004/signin', { waitUntil: 'domcontentloaded' });

  // ২. লগইন প্রসেস
  const usernameInput = page.locator('input[placeholder*="username"]');
  const passwordInput = page.locator('input[placeholder*="password"]');
  const loginButton = page.locator('button[type="submit"]');

  await usernameInput.fill('admin');
  await passwordInput.fill('0000');
  await loginButton.click();

  // ৩. ড্যাশবোর্ড লোড হওয়া পর্যন্ত অপেক্ষা (এটি না করলে পরের স্টেপ ফেইল করবে)
  await expect(page).toHaveURL(/.*dashboard|home/, { timeout: 15000 });

  // ৪. সেটিংস আইকনে ক্লিক করা
  const settingsIcon = page.locator('#settings-icon');
  await expect(settingsIcon).toBeVisible();
  await settingsIcon.click();

  // ৫. প্রোফাইল আপডেট করা
  const nameInput = page.locator('#display-name');
  await expect(nameInput).toBeVisible();
  
  // আগের নাম মুছে নতুন নাম লেখা নিশ্চিত করতে clear() ব্যবহার করা ভালো
  await nameInput.clear(); 
  await nameInput.fill('New Name');

  // ৬. সেভ বাটনে ক্লিক
  const saveButton = page.locator('#save-settings');
  await expect(saveButton).toBeEnabled();
  await saveButton.click();

  // ৭. কনফার্মেশন মেসেজ (Toast Notification) যাচাই করা
  const toast = page.locator('.toast-message');
  
  // টোস্ট মেসেজ অনেক সময় দ্রুত চলে যায়, তাই timeout বাড়িয়ে দেওয়া নিরাপদ
  await expect(toast).toBeVisible({ timeout: 10000 });
  await expect(toast).toContainText('Settings updated');

  // ৮. ডাটা আসলেই সেভ হয়েছে কি না তা নিশ্চিত করতে পেজ রিফ্রেশ করে চেক করা (Best Practice)
  await page.reload();
  await expect(nameInput).toHaveValue('New Name');
});