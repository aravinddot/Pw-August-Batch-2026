import { test, expect } from '@playwright/test';
import fs from 'fs'



test('Handling Tables and pagination', async ({ page }) => {

    test.setTimeout(120000)

    await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/table-pagination')

    await expect(page.getByRole('heading', { name: 'Filter Controls' })).toBeVisible()

    await page.getByTestId('page-size-select').selectOption('100')

    const rowCount = await page.locator('tbody tr').count()

    console.log("rowCount===>" + rowCount)

    expect(rowCount).toBe(100)

    const pageCount = await page.getByTestId('pagination-current').innerText()

    console.log("pageCount===>" + pageCount)

    const splittedValue = pageCount.split(' ')

    console.log("splittedValue===>" + splittedValue)

    const pageNumber = splittedValue[3]

    console.log("pageNumber===>" + pageNumber)

    const obj: {[key: string]: string[]} = {}

    for (let i = 1; i <= Number(pageNumber); i++) {


        for(let j = 0; j < rowCount; j++) {

           const row = await page.locator('tbody tr').nth(j).locator('td').allInnerTexts()

            const objKey = row[0]

            obj[objKey] = row
        }


        if (i != Number(pageNumber)) {
            await page.getByTestId('pagination-next').click()
        }


    }

    //console.log(obj)
    fs.writeFileSync('tables.json', JSON.stringify(obj))


})