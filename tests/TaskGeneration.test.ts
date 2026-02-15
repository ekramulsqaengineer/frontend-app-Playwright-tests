import { test, expect } from '@playwright/test';

test('TC-04: Task Generation Logic Test', async ({ page }) => {
  // ১. সাইন-ইন পেজে নেভিগেট করা
  await page.goto('http://localhost:5004/signin', { waitUntil: 'domcontentloaded' });

  // ২. লগইন প্রসেস
  const usernameInput = page.locator('input[placeholder*="username"]');
  const passwordInput = page.locator('input[placeholder*="password"]');
  const loginButton = page.locator('button[type="submit"]');

  await usernameInput.fill('admin');
  await passwordInput.fill('0000');
  await loginButton.click();

  // ৩. ড্যাশবোর্ড লোড হওয়া পর্যন্ত অপেক্ষা করা (অত্যন্ত জরুরি)
  await expect(page).toHaveURL(/.*dashboard|home/, { timeout: 15000 });

  // ৪. নতুন টাস্ক তৈরি করা
  const newTaskBtn = page.locator('#new-task-btn');
  await expect(newTaskBtn).toBeVisible(); // বাটনটি দৃশ্যমান হওয়া পর্যন্ত ওয়েট করবে
  await newTaskBtn.click();

  // ৫. টাস্ক ইনফরমেশন ইনপুট দেওয়া
  const taskTitle = page.locator('#task-title');
  const taskDesc = page.locator('#task-desc');
  const saveBtn = page.locator('#save-task');

  await taskTitle.fill('Automation Task');
  await taskDesc.fill('Testing task generation flow');
  
  // ৬. সেভ বাটনে ক্লিক এবং নেটওয়ার্ক রিকোয়েস্টের জন্য অপেক্ষা
  await saveBtn.click();

  // ৭. টাস্কটি লিস্টে আছে কি না যাচাই করা
  const taskList = page.locator('.task-list');
  
  // Playwright অটোমেটিক টেক্সটটি না পাওয়া পর্যন্ত কয়েক সেকেন্ড রিট্রাই করবে
  await expect(taskList).toBeVisible({ timeout: 10000 });
  await expect(taskList).toContainText('Automation Task');

  // বোনাস: টাস্কটি লিস্টের একদম উপরে বা শেষে যুক্ত হয়েছে কি না তা সুনির্দিষ্টভাবে চেক করা
  const lastTask = taskList.locator('.task-item').last();
  await expect(lastTask).toContainText('Automation Task');
});