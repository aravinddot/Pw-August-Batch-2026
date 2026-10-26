import { test, expect, chromium, firefox, webkit } from '@playwright/test'



test('conditional Handling - isChecked, isEditable', async ({ page }) => {


    await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-basic')

    await page.getByTestId('remember-checkbox').check()

    const isCheckedState = await page.getByTestId('remember-checkbox').isChecked()

    console.log("isCheckedState==>" + isCheckedState)

    if (isCheckedState == false) {
        console.log('inside if')
        await page.getByTestId('remember-checkbox').check()

    }

    const isEditableState = await page.getByTestId('name-input').isEditable()

    console.log("isEditableState==>" + isEditableState)

})


test('Conditional Handling - isVisible, isHidden, isDisabled', async ({ page }) => {

    await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

    const isDisabledState = await page.getByTestId('dynamic-option-select').isDisabled()

    console.log("isDisabledState==>" + isDisabledState)


    const isHiddenState = await page.getByTestId('hidden-dropdown-select').isHidden()
    console.log("isHiddenState==>" + isHiddenState)


    const isVisibleState = await page.getByTestId('hidden-dropdown-select').isVisible()
    console.log("isVisibleState==>" + isVisibleState)

})



test('Dynamic Dropdown, Hidden Dropdown and Bootstrap Dropdown', async ({ page }) => {

    await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

    // await page.getByTestId('dynamic-group-select').selectOption('Locators')

    // await page.getByTestId('dynamic-option-select').selectOption('getByRole + name')

    // await expect(page.getByText('Dynamic dropdown selected: getByRole + name.')).toBeVisible()


    // const isHiddenDropdownVisible = await page.locator('[data-testid="hidden-dropdown-select"]').isVisible()

    // if(isHiddenDropdownVisible == false) {
    //     await page.getByTestId('hidden-dropdown-toggle-btn').click()
    //     await page.locator('[data-testid="hidden-dropdown-select"]').selectOption('Hidden - Core')
    //     await expect(page.getByText('Hidden dropdown selected: Hidden - Core.')).toBeVisible()
    // }


    await page.getByTestId('bootstrap-dropdown-trigger').click()

    await page.getByText('Weekday Batch').click()

    await expect(page.getByText('Bootstrap dropdown selected: Weekday Batch.')).toBeVisible()


})





test('Handling Alert popup', async ({ page }) => {

    await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')


    // page.on('dialog', async dia=> {
    //     console.log(dia.message())
    //     dia.accept()
    // })

    // await page.getByTestId('alert-btn').click()

    // await expect(page.getByText('Alert handled.')).toBeVisible()


    // page.on('dialog', async dialog=> {
    //     console.log(dialog.message())
    //     dialog.dismiss()
    // })


    // await page.getByTestId('confirm-btn').click()

    // await expect(page.getByText('Confirm dismissed.')).toBeVisible()


    page.on('dialog', async dialog => {
        console.log(dialog.message())
        dialog.accept('playwright')
    })


    await page.getByTestId('prompt-btn').click()

    await expect(page.getByText('Prompt value: playwright')).toBeVisible()

})




test.only('handling new tab', async ({ }) => {

    const browser = await chromium.launch()

    const context = await browser.newContext()

    const page = await context.newPage()


    await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')


    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        page.getByTestId('popup-link').click()
    ])

    await expect(newPage.getByText('Popup Opened Successfully')).toBeVisible()

    const title = await newPage.title()

    expect(title).toBe('Practice Popup')

    await expect(newPage).toHaveTitle('Practice Popup')

    await newPage.waitForTimeout(3000)

    //await expect(page.getByTestId('alert-btn')).toBeVisible()

    await page.bringToFront()

    await page.waitForTimeout(3000)


    // pageone -> pageTwo -> pageThree

})



test('Open popup tab (right click only)', async () => {

    const browser = await chromium.launch()

    const context = await browser.newContext()

    const page = await context.newPage()


    await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')


    await page.getByTestId('popup-right-click-link').click()

    await expect(page.getByText('Direct click blocked. Use right click -> Open link in new tab.')).toBeVisible()


    const url = await page.getByTestId('popup-right-click-link').getAttribute('href')

    console.log(url)

    const pageTwo = await context.newPage()

    await pageTwo.goto(`https://playwright-mastery-academy-app.vercel.app${url}`)

    await expect(pageTwo.getByText('Popup Opened Successfully')).toBeVisible()



})




test('Isolated context', async () => {

    test.setTimeout(180000)

    const browser = await chromium.launch()

    const context = await browser.newContext()

    const page = await context.newPage()


    await page.goto('https://testcms.reco-claims.ca/Login')

    await page.locator('[name="Username"]').fill('info+programmanager@xlgclaims.com')

    await page.locator('[name="Password"]').fill('XlgTest-2026!')

    await page.locator('[type="submit"]').click()

    await page.locator('locator').waitFor({state: 'detached'})

    // await page.waitForTimeout(15000)

    //------------------------------------------------------------------------------------------


    const contextTwo = await browser.newContext()

    const pageTwo = await contextTwo.newPage()


    await pageTwo.goto('https://testcms.reco-claims.ca/Login')

    await pageTwo.locator('[name="Username"]').fill('info+programmanager@xlgclaims.com')

    await pageTwo.locator('[name="Password"]').fill('XlgTest-2026!')

    await pageTwo.locator('[type="submit"]').click()

    await page.locator('locator').waitFor({state: 'detached'})

    // await pageTwo.waitForTimeout(15000)


    const cookie = await context.cookies()

    const cookieTwo = await contextTwo.cookies()


    console.log("cookie value==> " + JSON.stringify(cookie))
    console.log("cookieTwo value==> " + JSON.stringify(cookieTwo))


})



test('drag and drop', async ({ page }) => {

    await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

    await page.getByTestId('drag-source').dragTo(await page.getByTestId('drop-target'))

    await expect(page.getByText('Drop completed successfully.')).toBeVisible()


})


test('File uploads', async ({ page }) => {

    await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

    await page.getByTestId('file-upload-input').setInputFiles('uploads/practice-report.pdf')

    await expect(page.getByText('practice-report.pdf uploaded successfully.')).toBeVisible()


    await page.getByTestId('multi-file-upload-input').setInputFiles(['uploads/practice-report.pdf', 'uploads/practice-data.csv', 'uploads/practice-data.xml'])

    await expect(page.getByText('3 files uploaded')).toBeVisible()


})



test('downloads', async ({ page }) => {


    await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

    await page.getByTestId('download-pdf-btn').click()

    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.getByTestId('download-csv-btn').click()

    ])
    const fileName = download.suggestedFilename()

    download.saveAs(`downloads/${fileName}`)


})





test('iframe', async ({ page }) => {


    await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

    const iframe = await page.frameLocator('[id="practice-iframe"]')

    await iframe.locator('[id="frame-input"]').fill('playwright')

    await iframe.locator('[id="frame-save"]').click()


    await expect(iframe.locator('[id="frame-result"]')).toHaveText('Result: playwright saved')



})



test('shadow dom', async ({ page }) => {


    await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

    const shadow = await page.getByTestId('shadow-host')

    await shadow.locator('[id="shadow-input"]').fill('playwright')

    await shadow.locator('#shadow-save').click()

    await expect(shadow.locator('#shadow-result')).toHaveText('Result: playwright saved')


})



test('practice date', async ({ page }) => {

    await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

    // await page.getByTestId('practice-date-picker').type('01-11-1993')

    // await expect(page.getByText('Practice Date Selected: 1993-11-01')).toBeVisible()


    await page.getByTestId('practice-date-picker').fill('1993-11-01')

    await expect(page.getByText('Practice Date Selected: 1993-11-01')).toBeVisible()

})



test('interview date', async ({ page }) => {

    await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

    const interviewDate = await page.getByTestId('interview-date-picker')

    interviewDate.evaluate((dom, val)=> {

        const html = dom as HTMLInputElement

        html.value = val as string

        html.dispatchEvent(new Event('input'))
        html.dispatchEvent(new Event('change'))

    }, '1993-11-01')


    await expect(page.getByText('Interview Date Selected: 1993-11-01')).toBeVisible()

})




test('Advanced wait commands', async({page})=> {


await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

// await page.getByTestId('wait-navigation-link').click()

// await page.waitForURL('https://playwright-mastery-academy-app.vercel.app/practice/popup?source=waitfornavigation')

// await expect(page.getByText('Popup Opened Successfully')).toBeVisible()


// await page.getByTestId('wait-response-btn').click()

// await page.waitForResponse('https://playwright-mastery-academy-app.vercel.app/api/practice/waits-status')

// await expect(page.getByText('Trigger API Response Completed')).toBeVisible()




// await page.getByTestId('wait-response-btn').click()

// await page.getByText('Trigger API Response Completed').waitFor({ state: 'visible' })


// // visible = element should be visible in UI, exists in DOM

// // hidden = locator should not be visible in UI, but exists in DOM

// // attached = DOM exists, may or may not be visible in UI

// // detached = DOM does not exist, element is removed from the UI and DOM


// await expect(page.getByText('Trigger API Response Completed')).toBeVisible()














})








