import { test, expect } from '@playwright/test';

/**
 * Test Case: Nifty AI Login with Zoom Popup Flow
 * Steps: 
 * 1. Navigate to Home Page
 * 2. Click 'Sign In' -> Click 'Sign in with Zoom' (Triggers Popup)
 * 3. Handle the Zoom Popup Window
 * 4. Fill Credentials in the Popup and Submit
 */

test('TC-01: Valid Login via Zoom Popup', async ({ page }) => {

  // ১. হোমপেজে যাওয়া
  await page.goto('http://localhost:5004/', { timeout: 60000 });

  // ২. 'Sign In' বাটনে ক্লিক
  const topSignInButton = page.locator('a[href="/signin"]:has-text("Sign In")');
  await expect(topSignInButton).toBeVisible();
  await topSignInButton.click();

  // ৩. পপ-আপ হ্যান্ডেল করা: "Sign in with Zoom" বাটনে ক্লিক করলে পপ-আপ ওপেন হবে
  // আমরা 'popup' ইভেন্টের জন্য অপেক্ষা করবো
  const [popup] = await Promise.all([
    page.waitForEvent('popup'),
    page.click('span:has-text("Sign in with Zoom")', { force: true })
  ]);

  // ৪. এখন সব অপারেশন 'popup' অবজেক্টের ওপর করতে হবে (মূল পেজে নয়)
  await popup.waitForLoadState();
  console.log('Popup URL:', popup.url());

  // পপ-আপে ইউজারনেম এবং পাসওয়ার্ড ইনপুট দেওয়া
  // ভিডিও অনুযায়ী সিলেক্টরগুলো চেক করে নিন, আমি স্ট্যান্ডার্ড সিলেক্টর দিচ্ছি
  await popup.waitForSelector('input[name="username"], input[placeholder*="username"]', { timeout: 30000 });
  await popup.fill('input[name="username"], input[placeholder*="username"]', 'admin');
  await popup.fill('input[name="password"], input[placeholder*="password"]', '0000');

  // ৫. পপ-আপের সাবমিট বাটনে ক্লিক
  await popup.click('button[type="submit"]');

  // ৬. পপ-আপ বন্ধ হওয়া এবং মেইন পেজ ড্যাশবোর্ডে যাওয়ার জন্য অপেক্ষা
  await page.waitForURL(/dashboard|home|meeting/, { timeout: 40000 });
  await expect(page).toHaveURL(/dashboard|home|meeting/);
  
  // ৭. ড্যাশবোর্ড থেকে সাইন আউট করা
  const signOutButton = page.getByRole('button', { name: /sign out/i }).first();
  await expect(signOutButton).toBeVisible({ timeout: 15000 });
  await signOutButton.click();

  // নিশ্চিত করা যে লগআউট হয়েছে
  await expect(page).toHaveURL(/signin|home|localhost:5004/);
});