import { test, expect } from '@playwright/test';

/**
 * Test Case: TC-04 - Task Generation and Navigation Logic
 * Steps:
 * 1. Login to Nifty AI
 * 2. Generate a new task
 * 3. Navigate to Tasks page
 * 4. Expand task details (Read more)
 */

test('TC-04: Task Generation and Navigation Logic Test', async ({ page }) => {
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

  // ৪. নতুন টাস্ক তৈরি করা (যদি ড্যাশবোর্ডে অপশন থাকে)
  const newTaskBtn = page.locator('#new-task-btn');
  if (await newTaskBtn.isVisible()) {
    await newTaskBtn.click();
    await page.locator('#task-title').fill('Automation Task');
    await page.locator('#task-desc').fill('Testing task generation flow');
    await page.locator('#save-task').click();
  }

  // ৫. টাস্ক মেনুতে ক্লিক করা (আপনার স্ক্রিনশট অনুযায়ী ওপরের মেনু)
  const tasksMenuLink = page.getByRole('link', { name: /Tasks/i });
  await expect(tasksMenuLink).toBeVisible();
  await tasksMenuLink.click();

  // ৬. টাস্ক পেজে যাওয়ার পর কনফার্ম করা
  await expect(page).toHaveURL(/.*tasks/);
  await expect(page.locator('h1, h2')).toContainText('Tasks');

  // ৭. টাস্ক কার্ড এক্সপ্যান্ড করা (আপনার স্ক্রিনশটের লাল মার্ক করা অ্যারো বাটন)
  // এটি সাধারণত কার্ডের ডান পাশে থাকে
  const expandArrow = page.locator('button').filter({ hasText: '' }).last(); 
  await expect(expandArrow).toBeVisible({ timeout: 10000 });
  await expandArrow.click();

});