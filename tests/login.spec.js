import { test, expect } from "@playwright/test";

test("Naukri Auto Login & Headline Update", async ({ page }) => {

  await page.goto("https://www.naukri.com/nlogin/login", {
    waitUntil: "domcontentloaded",
  });

  // Enter login details
  await page.fill('input[placeholder*="Email"]', process.env.EMAIL);
  await page.fill('input[type="password"]', process.env.PASSWORD);

  // Wait until Login button becomes enabled
  const loginBtn = page.locator("//button[@type='submit'][text()='Login']");
  await loginBtn.waitFor({ state: "visible" });
  await expect(loginBtn).toBeEnabled({ timeout: 20000 });

  await loginBtn.click();

  // OPEN SIDE MENU (this ALWAYS works in CI)
  const menuIcon = page.locator("//div[@class='view-profile-wrapper']//a")
  await menuIcon.waitFor({ state: "visible", timeout: 30000 });
  await menuIcon.click();

  // CLICK EDIT ON RESUME HEADLINE
  const editHeadline = page.locator("//span[text()='Resume headline']/..//span[contains(@class,'edit')]");
  await editHeadline.waitFor({ state: "visible", timeout: 30000 });
  await editHeadline.click();

  // Random headline
  const headlines = [
    "Software Test Engineer | Specialist in Manual & Automation Testing | Skilled with Playwright, Selenium, Cypress, Rest Assured, and Burp Suite",
    "QA/Test Engineer | Manual & Automation Testing Expert | Experienced in Playwright, Selenium, Cypress, Rest Assured, & Burp Suite",
    "Software QA Engineer | Proficient in Manual + Automated Testing | Tools: Playwright, Selenium, Cypress, Rest Assured, Burp Suite",
    "Quality Assurance Engineer | Strong Manual & Automation Testing Background | Playwright, Selenium, Cypress, Rest Assured & Burp Suite Expertise",
    "Test Automation Engineer | Manual & Automated Testing Professional | Hands-on with Playwright, Selenium, Cypress, Rest Assured, and Burp Suite"
  ];

  const randomHeadline = headlines[Math.floor(Math.random() * headlines.length)];

  await page.fill("#resumeHeadline", randomHeadline);

  // Save button
  const saveButton = page.locator("//form//button[text()='Save']");
  await saveButton.waitFor({ state: "visible", timeout: 20000 });
  await saveButton.click();

  await page.waitForTimeout(3000);
});
