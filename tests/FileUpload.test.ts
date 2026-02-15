import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

test('TC-03: File Upload Functional Test (TXT Only)', async ({ page }) => {

  // ===============================
  // 1️⃣ LOGIN FLOW
  // ===============================
  await page.goto('http://localhost:5004/signin', {
    waitUntil: 'domcontentloaded'
  });

  await page.waitForSelector('input[placeholder*="username"]', { timeout: 30000 });

  await page.fill('input[placeholder*="username"]', 'admin');
  await page.fill('input[placeholder*="password"]', '0000');

  await page.locator('button[type="submit"]').click();

  await page.waitForURL(/dashboard|home/);
  await expect(page).toHaveURL(/dashboard|home/);

  // ===============================
  // 2️⃣ CLICK UPLOAD CARD
  // ===============================
  const uploadCard = page.locator('div.border-dashed', {
    hasText: 'Upload Transcript File'
  });

  await expect(uploadCard).toBeVisible();
  await uploadCard.click();

  // ===============================
  // 3️⃣ TXT FILE CREATE & UPLOAD
  // ===============================
  const fileName = 'sample_upload_test.txt';
  const filePath = path.resolve(__dirname, '../', fileName);

  // যদি file না থাকে তাহলে create করবে
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(
      filePath,
      'This is a sample transcript file for Playwright TXT upload testing.'
    );
  }

  const fileInput = page.locator('input[type="file"]');
  await expect(fileInput).toBeAttached();

  await fileInput.setInputFiles(filePath);

  // ===============================
  // 4️⃣ VERIFY FILE APPEARS
  // ===============================
  const uploadedFile = page
    .locator('div:has-text("Uploaded Files")')
    .locator(`p[title="${fileName}"]`)
    .first();   // strict safe

  await expect(uploadedFile).toBeVisible({ timeout: 30000 });

  // ===============================
  // 5️⃣ VERIFY STATUS BADGE
  // ===============================
  const statusBadge = page
    .locator('div:has-text("Uploaded Files")')
    .locator('text=/Uploaded|Processing|Completed|Success/i')
    .first();

  await expect(statusBadge).toBeVisible({ timeout: 30000 });

  console.log('✅ TXT File Upload Functional Test Passed!');
});
