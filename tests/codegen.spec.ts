import {test, expect} from '@playwright/test'


test('test', async ({ page }) => {
  await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-basic');
  await page.getByTestId('single-click-btn').click();
  await expect(page.getByText('Single click completed.')).toBeVisible();
  await page.pause()
  await page.getByTestId('double-click-btn').dblclick();
  await expect(page.getByTestId('double-click-status')).toContainText('Double click completed.');
  await page.getByTestId('name-input').click();
  await page.getByTestId('name-input').fill('playwright');
  await page.getByTestId('email-input').click();
  await page.getByTestId('email-input').fill('playwright@gmail.com');
  await page.getByTestId('track-select').selectOption('Playwright Core');
  await page.getByTestId('remember-checkbox').check();
  await page.getByTestId('submit-form-btn').click();
  await expect(page.getByText('playwright submitted (')).toBeVisible();
  //await page.waitForTimeout(10000)
});

// debugging

// console.log()

// npx playwright test tests/codegen.spec.ts --debug

// page.pause()

// npx playwright show-trace