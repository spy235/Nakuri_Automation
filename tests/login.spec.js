// tests/login.spec.js
import { test, expect } from "@playwright/test";

test.describe("Naukri Login", () => {
  test("should successfully login with valid credentials", async ({ page }) => {

    await page.addInitScript(() => {
  // Remove Playwright fingerprints
  Object.defineProperty(navigator, "webdriver", { get: () => false });
  window.chrome = { runtime: {} };
  Object.defineProperty(navigator, "plugins", {
    get: () => [1],
  });
  Object.defineProperty(navigator, "language", {
    get: () => "en-US",
  });
});
    // Navigate to Naukri login page
    await page.goto("https://www.naukri.com/nlogin/login");

    // Wait for page to load
    await page.waitForTimeout(2000);

    // Enter Email ID / Username
    const emailInput = await page.locator('input[placeholder*="Email"]');
    await emailInput.fill(process.env.EMAIL);

    // Enter Password
    const passwordInput = page.locator('input[type="Password"]');
    await passwordInput.fill(process.env.PASSWORD);
    // Click Login button
    const loginButton = page.locator('button:has-text("Login")').first();
    await loginButton.click();

    await page.locator("//a[@href='/mnjuser/profile']").click();
    await page.locator("//span[text()='Resume headline']/..//span[@class='edit icon']").click();
    const headlines = [
  "Software Test Engineer | Specialist in Manual & Automation Testing | Skilled with Playwright, Selenium, Cypress, Rest Assured, and Burp Suite",
  "QA/Test Engineer | Manual & Automation Testing Expert | Experienced in Playwright, Selenium, Cypress, Rest Assured, & Burp Suite",
  "Software QA Engineer | Proficient in Manual + Automated Testing | Tools: Playwright, Selenium, Cypress, Rest Assured, Burp Suite",
  "Quality Assurance Engineer | Strong Manual & Automation Testing Background | Playwright, Selenium, Cypress, Rest Assured & Burp Suite Expertise",
  "Test Automation Engineer | Manual & Automated Testing Professional | Hands-on with Playwright, Selenium, Cypress, Rest Assured, and Burp Suite"
];

// Pick a random headline
const randomHeadline = headlines[Math.floor(Math.random() * headlines.length)];
// Fill it in
await page.locator("#resumeHeadline").fill(randomHeadline);
   await page.locator("//form[@name='resumeHeadlineForm']//button[text()='Save']").first().click();

  });
});
