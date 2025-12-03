# Naukri Automation - Playwright Framework

This is a Playwright JavaScript framework for automating the Naukri login process.

## Project Structure

```
naukri_automation/
├── pages/
│   └── loginPage.js          # Page Object Model for login page
├── tests/
│   ├── login.spec.js         # Basic login test
│   └── login_with_pom.spec.js # Login test using POM pattern
├── playwright.config.js      # Playwright configuration
├── package.json              # Project dependencies
└── README.md                 # This file
```

## Installation

1. Clone or download the project
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

## Configuration

The framework is configured to test against:

- Chromium
- Firefox
- WebKit

Base URL is set to: `https://www.naukri.com`

## Running Tests

### Run all tests

```bash
npm test
```

### Run tests in headed mode (with browser window)

```bash
npm run test:headed
```

### Run tests in debug mode

```bash
npm run test:debug
```

### Run tests in UI mode

```bash
npm run test:ui
```

### Run specific test file

```bash
npx playwright test tests/login.spec.js
```

## Test Files

### login.spec.js

Basic login test that directly uses page locators to:

1. Navigate to the Naukri login page
2. Enter email: `yashasyash1234@gmail.com`
3. Enter password: `Yashas@235@`
4. Click the Login button
5. Verify successful login

### login_with_pom.spec.js

Login test using the Page Object Model (POM) pattern for better maintainability and reusability.

## Page Object Model (POM)

The `LoginPage` class in `pages/loginPage.js` provides methods for:

- `navigate()` - Navigate to the login page
- `fillEmail(email)` - Fill email input
- `fillPassword(password)` - Fill password input
- `clickLogin()` - Click login button
- `login(email, password)` - Complete login flow
- `isLoginSuccessful()` - Verify login was successful

## Test Reports

After running tests, an HTML report is generated in the `playwright-report` directory. To view it:

```bash
npx playwright show-report
```

## Notes

- The framework uses explicit waits for page loads (`networkidle`)
- Element locators are designed to be resilient to HTML changes
- Tests are configured to retry on CI/CD failures
- Traces are automatically collected on first retry for debugging

## Troubleshooting

If tests fail:

1. Check if the Naukri website structure has changed
2. Update locators in `pages/loginPage.js` if needed
3. Use `--debug` flag to step through the test
4. Check the HTML report for detailed failure information

## Requirements

- Node.js (v14 or higher)
- npm or yarn
- Modern browser (Chrome, Firefox, Safari)
