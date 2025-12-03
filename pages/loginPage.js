// pages/loginPage.js
export class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto("https://www.naukri.com/nlogin/login");
    await this.page.waitForLoadState("networkidle");
  }

  async fillEmail(email) {
    const emailInput = this.page.locator('input[placeholder*="email"]');
    await emailInput.fill(email);
  }

  async fillPassword(password) {
    const passwordInput = this.page.locator('input[type="password"]');
    await passwordInput.fill(password);
  }

  async clickLogin() {
    const loginButton = this.page.locator('button:has-text("Login")');
    await loginButton.click();
  }

  async login(email, password) {
    await this.navigate();
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLogin();
  }

  async isLoginSuccessful() {
    await this.page.waitForNavigation({ waitUntil: "networkidle" });
    return !this.page.url().includes("nlogin");
  }
}
