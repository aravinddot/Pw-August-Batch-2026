import {test, expect} from '@playwright/test'


test.describe('Hooks Test Suite', () => {

    // before all
    // before each

    // after all
    // after each

    test.beforeAll(()=> {
        console.log('before all executed')
    })

      test.beforeEach(()=> {
        console.log('before each executed')
    })

      test.afterAll(()=> {
        console.log('after all executed')
    })

      test.afterEach(()=> {
        console.log('after each executed')
    })



    test('test 1', async()=> {
        console.log('test 1 executed')
    })

     test('test 2', async()=> {
        console.log('test 2 executed')
    })

      test('test 3', async()=> {
        console.log('test 3 executed')
    })


})


// before all executed
// before each executed
// test 1 executed
// after each executed
// before each executed
// test 2 executed
// after each executed
// before each executed
// test 3 executed
// after each executed
// after all executed