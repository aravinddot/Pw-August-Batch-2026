import {test, expect} from '@playwright/test'



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