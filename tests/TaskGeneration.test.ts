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
  // 1. Navigate to the sign-in page
  await page.goto('http://localhost:5004/signin', { waitUntil: 'domcontentloaded' });

  // 2. Login process
  const usernameInput = page.locator('input[placeholder*="username"]');
  const passwordInput = page.locator('input[placeholder*="password"]');
  const loginButton = page.locator('button[type="submit"]');

  await usernameInput.fill('admin');
  await passwordInput.fill('0000');
  await loginButton.click();

  // 3. Wait until the dashboard is loaded
  await expect(page).toHaveURL(/.*dashboard|home/, { timeout: 15000 });

  // 4. Create a new task (if the option exists on the dashboard)
  const newTaskBtn = page.locator('#new-task-btn');
  if (await newTaskBtn.isVisible()) {
    await newTaskBtn.click();
    await page.locator('#task-title').fill('Automation Task');
    await page.locator('#task-desc').fill('Testing task generation flow');
    await page.locator('#save-task').click();
  }

  // 5. Click on the Tasks menu (top menu according to your screenshot)
  const tasksMenuLink = page.getByRole('link', { name: /Tasks/i });
  await expect(tasksMenuLink).toBeVisible();
  await tasksMenuLink.click();

  // 6. Confirm that the Tasks page is loaded
  await expect(page).toHaveURL(/.*tasks/);
  await expect(page.locator('h1, h2')).toContainText('Tasks');

  // 7. Expand the task card (red-marked arrow button in your screenshot)
  // Usually located on the right side of the card
  const expandArrow = page.locator('button').filter({ hasText: '' }).last(); 
  await expect(expandArrow).toBeVisible({ timeout: 10000 });
  await expandArrow.click();

});
