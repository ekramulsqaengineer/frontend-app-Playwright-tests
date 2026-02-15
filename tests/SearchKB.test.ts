import { test, expect } from '@playwright/test';

test('TC-05: Knowledge Base Search Test', async ({ page }) => {
  // ১. সাইন-ইন পেজে যাওয়া
  await page.goto('http://localhost:5004/signin', { waitUntil: 'domcontentloaded' });

  // ২. লগইন ইনপুট এবং সাবমিট
  const usernameInput = page.locator('input[placeholder*="username"]');
  const passwordInput = page.locator('input[placeholder*="password"]');
  const loginButton = page.locator('button[type="submit"]');

  await usernameInput.fill('admin');
  await passwordInput.fill('0000');
  await loginButton.click();

  // ৩. *** লগইন সাকসেস হয়েছে কি না তা নিশ্চিত করা ***
  // এটি সার্চ করার আগে ড্যাশবোর্ড বা হোম পেজে রিডাইরেক্ট হওয়া পর্যন্ত অপেক্ষা করবে
  await expect(page).toHaveURL(/.*dashboard|home|knowledge-base/, { timeout: 15000 });

  // ৪. নলেজ বেস সার্চ বারে কীওয়ার্ড দেওয়া
  const searchInput = page.locator('#kb-search-input');
  
  // বাটন বা ইনপুট ফিল্ড দৃশ্যমান হওয়া পর্যন্ত অপেক্ষা
  await expect(searchInput).toBeVisible({ timeout: 10000 });
  await searchInput.fill('Playwright');
  await page.keyboard.press('Enter');

  // ৫. সার্চ রেজাল্ট যাচাই করা
  const results = page.locator('.search-results');
  
  // রেজাল্ট লোড হওয়ার জন্য অপেক্ষা এবং টেক্সট চেক
  await expect(results).toBeVisible({ timeout: 10000 });
  await expect(results).toContainText('Playwright', { ignoreCase: true });
});