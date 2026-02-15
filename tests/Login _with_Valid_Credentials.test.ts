import { test, expect } from '@playwright/test';

test('TC-01: Valid Login for Nifty AI', async ({ page }) => {

  const homeUrl = 'http://localhost:5004/signin';
  const usernameValue = 'admin';
  const passwordValue = '0000';

  // ১. পেজে নেভিগেট করা
  await page.goto(homeUrl, { waitUntil: 'domcontentloaded' });

  // ২. ইনপুট ফিল্ড চেক এবং ডাটা এন্ট্রি
  const usernameInput = page.locator('input[placeholder*="username"]');
  const passwordInput = page.locator('input[placeholder*="password"]');

  // Assertion: ফিল্ডগুলো দৃশ্যমান কি না নিশ্চিত করা
  await expect(usernameInput).toBeVisible();
  await expect(passwordInput).toBeVisible();

  await usernameInput.fill(usernameValue);
  await passwordInput.fill(passwordValue);

  // ৩. সাবমিট বাটনে ক্লিক
  const submitButton = page.locator('button[type="submit"], form button');
  await expect(submitButton).toBeEnabled(); // Assertion: বাটনটি ক্লিকযোগ্য কি না
  await submitButton.click();

  // ৪. নেভিগেশন ভেরিফিকেশন (সবচেয়ে গুরুত্বপূর্ণ Assertion)
  // আমরা আশা করছি লগইন সফল হলে ইউআরএল আর 'signin' থাকবে না
  await expect(page).not.toHaveURL(/.*signin/, { timeout: 10000 });
  
  // ড্যাশবোর্ড বা হোমে রিডাইরেক্ট হয়েছে কি না চেক করা
  await expect(page).toHaveURL(/.*dashboard|home|meeting/);

  // ৫. UI এলিমেন্ট ভেরিফিকেশন
  // ড্যাশবোর্ডের কোনো নির্দিষ্ট টেক্সট বা এলিমেন্ট যা শুধু লগইন করলেই দেখা যায়
  const welcomeText = page.locator('text=/welcome|dashboard/i').first();
  await expect(welcomeText).toBeVisible({ timeout: 10000 });

  // অপশনাল: ইউজার প্রোফাইল আইকন দেখা যাচ্ছে কি না
  // await expect(page.locator('.user-profile-icon')).toBeVisible();
});