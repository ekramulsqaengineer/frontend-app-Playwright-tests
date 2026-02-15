import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

test('TC-01: Valid Login and Upload in Knowledge Base', async ({ page }) => {

  const homeUrl = 'http://localhost:5004/signin';
  await page.goto(homeUrl, { waitUntil: 'domcontentloaded' });

  // ===============================
  // 1️⃣ LOGIN
  // ===============================
  await page.fill('input[placeholder*="username"]', 'admin');
  await page.fill('input[placeholder*="password"]', '0000');
  await page.locator('button[type="submit"]').click();

  // ===============================
  // 2️⃣ GO TO KNOWLEDGE BASE
  // ===============================
  const knowledgeBaseMenu = page.getByRole('link', { name: /Knowledge Base/i });
  await expect(knowledgeBaseMenu).toBeVisible();
  await knowledgeBaseMenu.click();

  await expect(page).toHaveURL(/knowledge-base/);

  // ===============================
  // 3️⃣ PREPARE TXT FILE
  // ===============================
  const fileName = 'sample-file.txt';
  const filePath = path.join(process.cwd(), fileName);

  // যদি file না থাকে তাহলে create করবে
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(
      filePath,
      'This is a sample file for Knowledge Base upload test.'
    );
  }

  // ===============================
  // 4️⃣ UPLOAD FILE (NO filechooser)
  // ===============================
  const fileInput = page.locator('input[type="file"]');
  await expect(fileInput).toBeAttached({ timeout: 20000 });

  await fileInput.setInputFiles(filePath);

  // ===============================
  // 5️⃣ VERIFY UPLOAD SUCCESS
  // ===============================
  const uploadedFileItem = page
    .locator('text=' + fileName)
    .first(); // strict safe

  await expect(uploadedFileItem).toBeVisible({ timeout: 20000 });

  console.log("✅ File uploaded successfully to Knowledge Base!");
});
