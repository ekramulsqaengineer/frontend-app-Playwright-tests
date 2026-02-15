import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

test('TC-01: Valid Login and File Upload for Nifty AI', async ({ page }) => {

  // ===============================
  // 1️⃣ LOGIN FLOW
  // ===============================
  await page.goto('http://localhost:5004/signin', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await page.waitForSelector('input[placeholder*="username"]', { timeout: 30000 });

  await page.fill('input[placeholder*="username"]', 'admin');
  await page.fill('input[placeholder*="password"]', '0000');

  await page.locator('button[type="submit"]').click();

  await page.waitForURL(/dashboard|home/, { timeout: 30000 });
  await expect(page).toHaveURL(/dashboard|home/);

  // ===============================
  // 2️⃣ CLICK UPLOAD CARD
  // ===============================
  const uploadCard = page.locator('div.border-dashed', {
    hasText: 'Upload Transcript File'
  });

  await expect(uploadCard).toBeVisible({ timeout: 20000 });
  await uploadCard.click();

  // ===============================
  // 3️⃣ HANDLE FILE UPLOAD
  // ===============================
  const fileName = 'deepseek_text_20251025_d38b67.txt';
  const filePath = path.join(process.cwd(), 'tests', fileName);

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(
      filePath,
      'This is a sample transcript for Playwright automation testing.'
    );
  }

  const fileInput = page.locator('input[type="file"]');
  await expect(fileInput).toBeAttached({ timeout: 20000 });

  await fileInput.setInputFiles(filePath);

  // ===============================
  // 4️⃣ VERIFY FILE APPEARS (STRICT MODE SAFE)
  // ===============================

  // Uploaded Files section specific locator
  const uploadedFile = page
    .locator('div:has-text("Uploaded Files")')
    .locator(`p[title="${fileName}"]`)
    .first();

  await expect(uploadedFile).toBeVisible({ timeout: 30000 });

  // ===============================
  // 5️⃣ VERIFY STATUS BADGE
  // ===============================
  const statusBadge = page
    .locator('div:has-text("Uploaded Files")')
    .locator('text=/Uploaded|Processing|Completed|Success/i')
    .first();

  await expect(statusBadge).toBeVisible({ timeout: 30000 });

  console.log('✅ Login and File Upload Test Passed Successfully!');
});
