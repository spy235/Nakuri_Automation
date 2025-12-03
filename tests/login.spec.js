// tests/login.spec.js
import { test, expect } from "@playwright/test";

test.describe("Naukri Login", () => {
  test("should successfully login with valid credentials", async ({ page }) => {
    await page.goto("https://www.naukri.com/nlogin/login");

    await page.waitForTimeout(2000);

    const emailInput = await page.locator('input[placeholder*="Email"]');
    await emailInput.fill(process.env.EMAIL);

    const passwordInput = page.locator('input[type="Password"]');
    await passwordInput.fill(process.env.PASSWORD);
    const loginButton = page.locator('button:has-text("Login")').first();

    await Promise.all([
      page.waitForLoadState("networkidle"),
      loginButton.click(),
    ]);

    await loginButton.click();

    const profileLink = page.locator("//a[@href='/mnjuser/profile']");
    await profileLink.waitFor({ state: "visible", timeout: 20000 });
    await profileLink.click();
    await page
      .locator("//span[text()='Resume headline']/..//span[@class='edit icon']")
      .click();
    const headlines = [
      "Software Test Engineer | Specialist in Manual & Automation Testing | Skilled with Playwright, Selenium, Cypress, Rest Assured, and Burp Suite",
      "QA/Test Engineer | Manual & Automation Testing Expert | Experienced in Playwright, Selenium, Cypress, Rest Assured, & Burp Suite",
      "Software QA Engineer | Proficient in Manual + Automated Testing | Tools: Playwright, Selenium, Cypress, Rest Assured, Burp Suite",
      "Quality Assurance Engineer | Strong Manual & Automation Testing Background | Playwright, Selenium, Cypress, Rest Assured & Burp Suite Expertise",
      "Test Automation Engineer | Manual & Automated Testing Professional | Hands-on with Playwright, Selenium, Cypress, Rest Assured, and Burp Suite",
    ];

    // Pick a random headline
    const randomHeadline =
      headlines[Math.floor(Math.random() * headlines.length)];
    // Fill it in
    await page.locator("#resumeHeadline").fill(randomHeadline);
    await page
      .locator("//form[@name='resumeHeadlineForm']//button[text()='Save']")
      .first()
      .click();
  });
});
