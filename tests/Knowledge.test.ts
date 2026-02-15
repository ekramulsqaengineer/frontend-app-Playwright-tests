import { test, expect, devices } from '@playwright/test';
import path from 'path';
import fs from 'fs';

/**
 * Test Case: TC-01 - Valid Login and Sign Out for Nifty AI
 */
test('TC-01: Valid Login and Sign Out for Nifty AI', async ({ page }) => {
  const homeUrl = 'http://localhost:5004/signin';
  await page.goto(homeUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });

  // 1. Login Process
  const usernameInput = page.locator('input[placeholder*="username"]');
  const passwordInput = page.locator('input[placeholder*="password"]');
  const loginButton = page.locator('button[type="submit"]');

  await usernameInput.fill('admin');
  await passwordInput.fill('0000');
  await loginButton.click();

  // 2. Dashboard Verification
  await expect(page).toHaveURL(/.*dashboard|home/, { timeout: 15000 });

  // 3. Click 'Sign Out' from the main navigation bar
  const navSignOutButton = page.locator('button:has-text("Sign Out"), .nav-link:has-text("Sign Out")').first();
  await expect(navSignOutButton).toBeVisible();
  await navSignOutButton.click();

  // 4. Confirm 'Sign Out' from the popup modal
  const modalSignOutConfirm = page.locator('div[role="dialog"] button:has-text("Sign Out"), .modal-content button:has-text("Sign Out")').last();
  await expect(modalSignOutConfirm).toBeVisible({ timeout: 10000 });
  await modalSignOutConfirm.click();

  // 5. Final Verification: Check if redirected to the sign-in page
  await expect(page).toHaveURL(/.*signin/);
  console.log("Successfully signed out through confirmation modal!");
});

/**
 * Test Case: TC-10 - Knowledge Base File Upload Verification
 */
test('TC-10: Knowledge Base File Upload Verification', async ({ page }) => {
  // 1. Login Flow
  await page.goto('http://localhost:5004/signin', { waitUntil: 'domcontentloaded' });
  await page.locator('input[placeholder*="username"]').fill('admin');
  await page.locator('input[placeholder*="password"]').fill('0000');
  await page.locator('button[type="submit"]').click();

  // 2. Click 'Knowledge Base' menu from the dashboard
  const knowledgeBaseMenu = page.getByRole('link', { name: /Knowledge Base/i });
  await expect(knowledgeBaseMenu).toBeVisible();
  await knowledgeBaseMenu.click();

  // 3. Wait until the Knowledge Base page loads
  await expect(page).toHaveURL(/.*knowledge-base/);
  
  // 4. Prepare TXT File for upload
  const fileName = 'sample-file.txt';
  const filePath = path.join(process.cwd(), fileName);

  // Create file if it doesn't exist
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(
      filePath,
      'This is a sample file for Knowledge Base upload test.'
    );
  }

  // 5. Upload File using hidden file input
  const fileInput = page.locator('input[type="file"]');
  await expect(fileInput).toBeAttached({ timeout: 20000 });
  await fileInput.setInputFiles(filePath);

  // 6. Verify Upload Success
  const uploadedFileItem = page.locator('text=' + fileName).first();
  await expect(uploadedFileItem).toBeVisible({ timeout: 20000 });

  console.log("File uploaded successfully to Knowledge Base!");
});

/**
 * Test Case: TC-06 - Meeting History Log and Refresh Verification
 */
test('TC-06: Meeting History Log and Refresh Verification', async ({ page }) => {
  // 1. Login Flow
  await page.goto('http://localhost:5004/signin', { waitUntil: 'domcontentloaded' });
  await page.locator('input[placeholder*="username"]').fill('admin');
  await page.locator('input[placeholder*="password"]').fill('0000');
  await page.locator('button[type="submit"]').click();

  // 2. Navigate to History Page
  const historyMenuLink = page.getByRole('link', { name: /History/i });
  await expect(historyMenuLink).toBeVisible();
  await historyMenuLink.click();

  // 3. Click the Refresh Button
  const refreshButton = page.getByRole('button', { name: /Refresh/i });
  await expect(refreshButton).toBeVisible();
  await refreshButton.click();

  // 4. Verify that records are visible
  const meetingCards = page.locator('.grid > div, .card, text=/Internal/i');
  await expect(meetingCards.first()).toBeVisible({ timeout: 15000 });
});