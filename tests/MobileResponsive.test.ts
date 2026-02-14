
import { test, expect, devices } from '@playwright/test';

test('TC-09: Mobile Responsive Menu Test', async ({ page }) => {
  // মোবাইল ভিউপোর্ট সেট করা (iPhone 12 এর মতো)
  await page.setViewportSize({ width: 390, height: 844 });

  await page.goto('https://example.com/login');
  
  // চেক করা যে হ্যামবার্গার মেনু দৃশ্যমান কি না
  const mobileMenu = page.locator('#mobile-menu-toggle');
  await expect(mobileMenu).toBeVisible();
});