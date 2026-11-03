import {test, expect} from '@playwright/test'
import testData from '../testData.json'
import fs from 'fs'
import { parse } from 'csv-parse/sync'
import XLSX from 'xlsx'

const {user1, user2} = testData

test.describe('Data Driven Tests', () => {


test('read data from JSON', async()=> {


// console.log(user1.userName)
// console.log(user2.password)

// await login(user1.userName, user1.password)

const data = fs.readFileSync('testData.json', 'utf-8')

console.log(data)


})



test('read data from csv file', async()=> {

    const csvData = fs.readFileSync('uploads/practice-data.csv', 'utf-8')

    const data: Array<{id: string, name: string}> = parse(csvData, {
        columns: true
    })

  for(const row of data) {
    console.log(row.name)
  }

})



test.only('read data from excel file', async()=> {


    const file = XLSX.readFile('Book1.xlsx')

    const sheet = file.Sheets['Sheet1']

    const data = XLSX.utils.sheet_to_json(sheet, {
        range: 'A2:D2',
        header: 1
    })

    console.log(data)

    // const cellValue = sheet['D5'].v

    // console.log(cellValue)



})



})