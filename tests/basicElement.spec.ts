import { test, expect } from '@playwright/test'



test.describe('Basic Element Handling', async()=> { // Test suite


    test('Basic Test cases', async({page})=> {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-basic')

        await page.getByTestId('single-click-btn').click()

        await expect(page.getByText('Single click completed')).toBeVisible()

        await page.getByTestId('double-click-btn').dblclick()

        await expect(page.getByText('Double click completed')).toBeVisible()

        await page.getByTestId('hover-btn').hover()

        await expect(page.getByText('Hover triggered successfully.')).toBeVisible()

        await page.getByTestId('tooltip-trigger-btn').hover()

        await expect(page.getByTestId('hover-tooltip')).toContainText('Tooltip verified')

        // await expect(page.getByTestId('hover-tooltip')).toContainText('Tooltip is verified')

        // await expect(page.getByText('Tooltip is verified', {exact: true})).toBeVisible()



    })







})