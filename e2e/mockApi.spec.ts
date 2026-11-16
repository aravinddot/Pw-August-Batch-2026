import { test, expect } from '@playwright/test';


test('Mock api response', async ({ page }) => {


    await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/network-mocking')


    await page.route('https://playwright-mastery-academy-app.vercel.app/api/practice/network/flags', async (route) => {

        await route.fulfill({
            body: JSON.stringify({
                source: "Mocked-api",
                delayMs: 1426,
                flags: {
                    betaDashboard: "beta dashboard mocked",
                    aiInsights: false,
                    mcpAssist: "mocked pilot-mode",
                    smartRetries: true
                },
                message: "Feature flags loaded from endpoint."
            })
        })
    })

    await page.getByTestId('net-flags-btn').click()

    await page.waitForTimeout(5000)




})





test('mock api headers', async({page})=> {


    await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/network-mocking')


    await page.route('https://playwright-mastery-academy-app.vercel.app/api/practice/network/profile', async(api)=> {

        const headers = {
            ...api.request().headers(),
            "x-intercept-source": "mocked-header-value"
        }

        await api.continue({headers})
    })

    await page.getByTestId('net-continue-btn').click()

    await page.waitForTimeout(5000)

})



test('Abort api response', async({page})=> {

    await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/network-mocking')

    await page.route('https://playwright-mastery-academy-app.vercel.app/api/practice/network/orders', async(route)=> {
        await route.abort()
    })


    await page.getByTestId('net-orders-btn').click()

    await page.waitForTimeout(5000)



})