import { test, expect } from '@playwright/test'



test.describe('API Tests', () => {


    test('GET Methods', async ({ request }) => {

        const startTime = Date.now()

        const response = await request.get('http://localhost:3000/products')

        const endTime = Date.now()
        const responseTime = endTime - startTime

        const responseHeaders = response.headers()

        expect(responseHeaders['content-type']).toBe('application/json; charset=utf-8')

        expect(responseTime).toBeLessThan(2000)
        expect(response.status()).toBe(200)
        expect(response.statusText()).toBe('OK')

        const body = await response.json()

        delete body[0].name

        expect(body[0].name).toBe('Blue Top')

        expect(body[0].name).toBeDefined()

        expect(body[0].name.length).toBeGreaterThan(0)

        expect(['Blue Top', 'Men Tshirt', 'Sleeveless Dress']).toContain(body[0].name)

        for (const product of body) {
            console.log(product.name)

        }


    })




    test('POST method', async ({ request }) => {

        const response = await request.post('http://localhost:3000/products', {
            data: {
                name: "POST method",
                price: "Rs. 1500",
                brand: "POST Polo",
                category: {
                    usertype: {
                        usertype: "POST METHOD"
                    },
                    category: "POST METHOD"
                }
            }
        })

        expect(response.status()).toBe(201)
        expect(response.statusText()).toBe('Created')

        const body = await response.json()

        expect(body.name).toBe('POST method')


    })



    test('PUT method', async ({ request }) => {

       const response = await request.put('http://localhost:3000/products/3', {
            data: {
                name: "PUT method",
                price: "Rs. 1500",
                brand: "PUT Polo",
                category: {
                    usertype: {
                        usertype: "PUT METHOD"
                    },
                    category: "PUT METHOD"
                },
            }
        })


        expect(response.status()).toBe(200)
        expect(response.statusText()).toBe('OK')
    })



    test('PATCH Method', async({request})=> {

        const response = await request.patch('http://localhost:3000/products/3', {
            data: {
                name: "PATCH Method"
            }
        })

         expect(response.status()).toBe(200)
        expect(response.statusText()).toBe('OK')

    })



    test('DELETE Method', async({request})=> {

        const id = 3

        const response = await request.delete(`http://localhost:3000/products/${id}`)

         expect(response.status()).toBe(200)
        expect(response.statusText()).toBe('OK')

    })



})