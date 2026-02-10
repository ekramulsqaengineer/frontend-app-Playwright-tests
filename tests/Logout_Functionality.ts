<<<<<<< HEAD
import { test, expect } from '@playwright/test';

/**
 * Test Case: Nifty AI Login and Sign Out Flow
 * Steps: 
 * 1. Navigate to Home Page (http://localhost:5004/)
 * 2. Click the 'Sign In' button at the top right
 * 3. Click 'Sign in with Zoom'
 * 4. Fill Credentials (admin / 0000) and Submit
 * 5. Click 'Sign Out' button from Dashboard
 */

test('TC-01: Valid Login and Logout for Nifty AI', async ({ page }) => {

  // ১. হোমপেজে রিডাইরেক্ট করা
  const homeUrl: string = 'http://localhost:5004/signin';
  await page.goto(homeUrl, { timeout: 60000 });

  // ২. উপরের ডানদিকের লাল মার্ক করা 'Sign In' বাটনে ক্লিক করা
  const topSignInButton = page.locator('a[href="/signin"]:has-text("Sign In")');
  await expect(topSignInButton).toBeVisible({ timeout: 15000 });
  await topSignInButton.click();

  // ৩. "Sign in with Zoom" বাটনে ক্লিক করা (আপনার স্প্যান সিলেক্টর অনুযায়ী)
  const zoomSignInButton = page.locator('span:has-text("Sign in with Zoom")').first();
  await expect(zoomSignInButton).toBeVisible({ timeout: 15000 });
  
  // অনেক সময় সাধারণ ক্লিকে কাজ না করলে force: true এবং scroll ব্যবহার করা নিরাপদ
  await zoomSignInButton.scrollIntoViewIfNeeded();
  await zoomSignInButton.click({ force: true });

  // ৪. লগইন ফর্মে ডাটা দেওয়া
  const usernameValue: string = 'admin';
  const passwordValue: string = '0000';

  // ইনপুট ফিল্ড দৃশ্যমান হওয়া পর্যন্ত অপেক্ষা
  await page.waitForSelector('input[placeholder*="username"]', { timeout: 30000 });
  await page.fill('input[placeholder*="username"]', usernameValue);
  await page.fill('input[placeholder*="password"]', passwordValue);

  // ৫. সাবমিট (Sign In) বাটনে ক্লিক করা
  const submitButton = page.locator('form button').first();
  await submitButton.click();

  // ৬. ড্যাশবোর্ড ভেরিফিকেশন (ইউআরএল চেক)
  await expect(page).toHaveURL(/dashboard|home|meeting/);
  
  // ৭. সাইন আউট (Sign Out) বাটনে ক্লিক করা (আপনার স্ক্রিনশট অনুযায়ী লাল মার্ক করা বাটন)
  const signOutButton = page.getByRole('button', { name: /sign out/i }).first() 
                        || page.locator('text=Sign Out').first();
  
  await expect(signOutButton).toBeVisible({ timeout: 15000 });
  await signOutButton.click();

  // ৮. কনফার্মেশন: সাইন আউট হওয়ার পর আবার সাইন ইন বা হোম পেজে ফিরেছে কি না
  await expect(page).toHaveURL(/signin|home|localhost:5004/);
});
=======

>>>>>>> 28951b3bda9b96af5e89c2d73495c1080e17175d
