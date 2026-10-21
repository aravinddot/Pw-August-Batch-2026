import {test, expect, chromium, firefox, webkit} from '@playwright/test'



test('conditional Handling - isChecked, isEditable', async({page})=> {


    await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-basic')

    await page.getByTestId('remember-checkbox').check()

    const isCheckedState = await page.getByTestId('remember-checkbox').isChecked()

    console.log("isCheckedState==>" + isCheckedState)

    if(isCheckedState == false) {
        console.log('inside if')
        await page.getByTestId('remember-checkbox').check()

    }

    const isEditableState = await page.getByTestId('name-input').isEditable()

    console.log("isEditableState==>" + isEditableState)

})


test('Conditional Handling - isVisible, isHidden, isDisabled', async({page})=> {

    await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

    const isDisabledState = await page.getByTestId('dynamic-option-select').isDisabled()

    console.log("isDisabledState==>" + isDisabledState)


    const isHiddenState = await page.getByTestId('hidden-dropdown-select').isHidden()
    console.log("isHiddenState==>" + isHiddenState)


    const isVisibleState = await page.getByTestId('hidden-dropdown-select').isVisible()
    console.log("isVisibleState==>" + isVisibleState)

})



test('Dynamic Dropdown, Hidden Dropdown and Bootstrap Dropdown', async({page})=> {

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





test('Handling Alert popup', async({page})=> {

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


    page.on('dialog', async dialog=> {
        console.log(dialog.message())
        dialog.accept('playwright')
    })


    await page.getByTestId('prompt-btn').click()

    await expect(page.getByText('Prompt value: playwright')).toBeVisible()

})




test.only('handling new tab', async({})=> {

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



test('Open popup tab (right click only)', async()=> {

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






