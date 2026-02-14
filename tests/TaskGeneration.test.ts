import { test, expect } from '@playwright/test';

test('TC-04: Task Generation Logic Test', async ({ page }) => {
  // লগইন
  await page.goto('https://example.com/login');
  await page.fill('#username', 'user_01');
  await page.fill('#password', 'pass_01');
  await page.click('#login-button');

  // নতুন টাস্ক তৈরি করা
  await page.click('#new-task-btn');
  await page.fill('#task-title', 'Automation Task');
  await page.fill('#task-desc', 'Testing task generation flow');
  await page.click('#save-task');

  // টাস্কটি লিস্টে আছে কি না যাচাই করা
  await expect(page.locator('.task-list')).toContainText('Automation Task');
});