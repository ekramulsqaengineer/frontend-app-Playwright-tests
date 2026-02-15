import { test, expect, devices } from '@playwright/test';

test('TC-09: Mobile Responsive Menu Test', async ({ page }) => {
  // ১. সরাসরি ভিউপোর্ট সেট করার বদলে Playwright-এর বিল্ট-ইন ডিভাইস ইমুলেশন ব্যবহার করা ভালো
  const iPhone12 = devices['iPhone 12'];
  await page.setViewportSize(iPhone12.viewport);

  await page.goto('http://localhost:5004/signin', { waitUntil: 'domcontentloaded' });

    // Login steps - Locator ব্যবহার করা ভালো
  await page.locator('input[placeholder*="username"]').fill('admin');
  await page.locator('input[placeholder*="password"]').fill('0000');
  await page.locator('button[type="submit"]').click();

  // ২. হ্যামবার্গার মেনু বা টগল বাটনটি লোড হওয়া পর্যন্ত অপেক্ষা এবং ভেরিফিকেশন
  const mobileMenuToggle = page.locator('#mobile-menu-toggle');
  
  // Assertion: চেক করা বাটনটি কি দৃশ্যমান এবং ক্লিকযোগ্য?
  await expect(mobileMenuToggle).toBeVisible({ timeout: 10000 });
  await expect(mobileMenuToggle).toBeEnabled();

  // ৩. মেনু ওপেন করার জন্য ক্লিক করা
  await mobileMenuToggle.click();

  // ৪. মেনু ওপেন হওয়ার পর আইটেমগুলো দেখা যাচ্ছে কি না তা চেক করা
  // ধরা যাক আপনার মেনুর আইডি '#mobile-nav-container'
  const navContainer = page.locator('#mobile-nav-container'); 
  await expect(navContainer).toBeVisible();

  // ৫. নির্দিষ্ট একটি মেনু আইটেম (যেমন: 'Dashboard') চেক করা
  const dashboardLink = page.getByRole('link', { name: /dashboard/i });
  await expect(dashboardLink).toBeVisible();
  
  // ৬. চেক করা যে ডেস্কটপ মেনু এই অবস্থায় হাইড (Hidden) আছে কি না
  const desktopMenu = page.locator('#desktop-menu');
  if (await desktopMenu.count() > 0) {
      await expect(desktopMenu).not.toBeVisible();
  }

  console.log("Mobile responsive menu is working correctly!");
});