import { test, expect } from '@playwright/test'



test.describe('Basic Element Handling', async()=> { // Test suite


    test('Click, Double Click, Hover, Tooltip', async({page})=> {

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



    test('Inputs, Checkbox, Radio, Dropdown', async({page})=> {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-basic')

        const name = "Playwright"

        const email = "playwright@gmail.com"

        const value = "Playwright Core"

        await page.getByTestId('name-input').fill(name)

        await page.getByTestId('email-input').type(email)

        await page.getByTestId('track-select').selectOption(value)

        await page.getByTestId('remember-checkbox').check() // uncheck()

        await page.getByTestId('mode-api-radio').check()

        await page.getByTestId('submit-form-btn').click()

        await expect(page.getByText(`${name} submitted (${email}) for ${value}`)).toBeVisible()

    })



    test('Static Waits, Keyboard', async({page})=> {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-basic')

        await page.getByTestId('async-load-btn').click()

        await page.waitForTimeout(20000) // Static wait for 20 seconds

        await expect(page.getByText('Async result loaded successfully.')).toBeVisible()

        await page.getByTestId('keyboard-input').fill('Playwright')

        await page.getByTestId('keyboard-input').press('Enter')

        // Tab, Escape, Backspace, Delete, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Space,

        // A to Z, 1 to 0,

        // Control+C, Control+V, Control+X, Control+A

        await expect(page.getByText('Command submitted: playwright')).toBeVisible()


    })



    test('Text and Attribute Extraction', async({page})=> {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-basic')

        const innerText = await page.getByTestId('extract-textcontent-target').innerText()

        console.log("innerText==>" + innerText) // grabs only visible text in UI


        const textContent = await page.getByTestId('extract-textcontent-target').textContent()

        console.log("textContent==>" + textContent) // grabs visible and hidden text in UI


        const value = await page.getByTestId('extract-inputvalue-target').inputValue()

        console.log("value==>" + value) 

        const attribute = await page.getByTestId('extract-attribute-target').getAttribute('class')

        console.log("attribute==>" + attribute)


        const allInnerTexts = await page.getByTestId('extract-list').allInnerTexts()
        
        console.log("allInnerTexts==>" + allInnerTexts)


         const allTextContents = await page.getByTestId('extract-list').allTextContents()
        
        console.log("allTextContents==>" + allTextContents)


        const html = await page.getByTestId('extract-list').innerHTML()

        console.log("html==>" + html)

    })







})