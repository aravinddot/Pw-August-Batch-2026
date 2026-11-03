import {test, expect} from '@playwright/test'


test.describe('Multiple Input Tests', () => {


    const users = [
        {userName: 'standard_user', password: 'secret_sauce', expectedText: 'Sauce Labs Backpack'},
        {userName: 'problem_user', password: 'secret_sauce', expectedText: 'Sauce Labs Bike Light'}

    ]

for(const user of users) {

    test(`Handling Multiple Inputs ${user.userName}`, async ({page}) => {

        await page.goto('https://www.saucedemo.com/')

        await page.getByPlaceholder('Username').fill(user.userName)

        await page.getByPlaceholder('Password').fill(user.password)

        await page.locator('#login-button').click()

        await expect(page.getByText(user.expectedText)).toBeVisible()

    })

}


})