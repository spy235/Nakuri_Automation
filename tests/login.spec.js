import { test, expect } from "@playwright/test";

test.use({ headless: false });

test("Naukri Auto Login & Headline Update", async ({ page }) => {

  // Remove Playwright fingerprints (important for CI)
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "webdriver", { get: () => false });
    window.chrome = { runtime: {} };
  });

  await page.goto("https://www.naukri.com/nlogin/login", {
    waitUntil: "domcontentloaded",
  });

  // Fill login form
  await page.fill('input[placeholder*="Email"]', process.env.EMAIL);
  await page.waitForTimeout(600);
  await page.fill('input[type="password"]', process.env.PASSWORD);
  await page.waitForTimeout(600);

  // Correct login button
  const loginBtn = page.locator("//button[contains(.,'Login')]").first();
  await loginBtn.waitFor({ state: "visible", timeout: 15000 });

  // Click login + wait for navigation
  await Promise.all([
    page.waitForLoadState("domcontentloaded"),
    loginBtn.click(),
  ]);

  await page.waitForTimeout(3000); // Naukri bot checks

  console.log("URL after login:", page.url());

  // Validate login success (avoids timeout errors)
  if (page.url().includes("access-denied") || page.url().includes("login")) {
    throw new Error("Login failed due to bot detection or wrong credentials.");
  }

  // Wait for profile menu icon
  const menuIcon = page.locator("//div[@class='view-profile-wrapper']//a");
  await menuIcon.waitFor({ state: "visible", timeout: 30000 });
  await menuIcon.click();

  await page.waitForTimeout(2000);

  // Open Edit Headline section
  const editHeadline = page.locator(
    "//span[text()='Resume headline']/..//span[contains(@class,'edit')]"
  );
  await editHeadline.waitFor({ state: "visible", timeout: 30000 });
  await editHeadline.click();

  // Random headline text
  const headlines = [
    "Software Test Engineer | Specialist in Manual & Automation Testing | Skilled with Playwright, Selenium, Cypress, Rest Assured, and Burp Suite",
    "QA/Test Engineer | Manual & Automation Testing Expert | Experienced in Playwright, Selenium, Cypress, Rest Assured, & Burp Suite",
    "Software QA Engineer | Proficient in Manual + Automated Testing | Tools: Playwright, Selenium, Cypress, Rest Assured, Burp Suite",
    "Quality Assurance Engineer | Strong Manual & Automation Testing Background | Playwright, Selenium, Cypress, Rest Assured & Burp Suite Expertise",
    "Test Automation Engineer | Manual & Automated Testing Professional | Hands-on with Playwright, Selenium, Cypress, Rest Assured, and Burp Suite",
  ];

  const randomHeadline =
    headlines[Math.floor(Math.random() * headlines.length)];

  await page.fill("#resumeHeadline", randomHeadline);

  // Save button
  const saveButton = page.locator("//form//button[text()='Save']");
  await saveButton.waitFor({ state: "visible", timeout: 20000 });
  await saveButton.click();

  await page.waitForTimeout(3000);
});
