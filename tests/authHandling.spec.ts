import { test, expect, chromium, Browser, BrowserContext, Page } from '@playwright/test'

// single user application

test.describe('Authentication Handling', () => {

    let browser: Browser
    let context: BrowserContext
    let page: Page

    test.beforeAll(async () => {
        test.setTimeout(180000)
        browser = await chromium.launch()
        context = await browser.newContext()
        page = await context.newPage()
        await page.goto('https://testcms.reco-claims.ca/Login')
        await page.locator('[name="Username"]').fill('info+programmanager@xlgclaims.com')
        await page.locator('[name="Password"]').fill('XlgTest-2026!')
        await page.locator('[type="submit"]').click()
        await page.locator('locator').waitFor({ state: 'detached' })
        await page.locator('[placeholder="Search"]').waitFor({ state: 'visible' })
        await context.storageState({ path: 'storageState.json' })
        await browser.close()
    })

    test.beforeEach(async () => {
        test.setTimeout(180000)
        browser = await chromium.launch()
        context = await browser.newContext({ storageState: 'storageState.json' })
        page = await context.newPage()
        await page.goto('https://testcms.reco-claims.ca/')

    })

    test.afterEach(async () => {
        await browser.close()
    })


    test('Verify Search button is visible', async () => {
        test.setTimeout(180000)
        await page.locator('[placeholder="Search"]').waitFor({ state: 'visible' })
        await expect(page.locator('[placeholder="Search"]')).toBeVisible()
        await page.waitForTimeout(5000)
    })


    test('Verify the table header is visible', async () => {
        test.setTimeout(180000)
        await page.locator('thead').waitFor({ state: 'visible' })
        await expect(page.locator('thead')).toBeVisible()
        await page.waitForTimeout(5000)
    })


    test('verify claim button is visible', async () => {
        test.setTimeout(180000)
        await page.getByRole('button').getByText('New Claim').waitFor({ state: 'visible' })
        await expect(page.getByRole('button').getByText('New Claim')).toBeVisible()
        await page.waitForTimeout(5000)



    })




})