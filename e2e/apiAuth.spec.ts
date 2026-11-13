// import {test, expect} from '@playwright/test'





// test('Basic Auth', async({request})=> {

//    const response = await request.get('https://postman-echo.com/basic-auth', {
//         headers: {
//             Authorization: `Basic ${Buffer.from('postman:password').toString('base64')}`
//         }
//     })

//     console.log(await response.json())

// })




// test('Bearer Token', async({request})=> {

//     const response = await request.get('https://api.github.com/user/repos', {
//         headers: {
//             Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
//         }
//     })

//     console.log(await response.json());
    
// })

// // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}



// test('API KEY', async({request})=> {

//     const response = await request.get('https://api.openweathermap.org/data/2.5/weather', {
//         params: {
//             q: 'delhi',
//             appid: 'a579bb5506b2901754de95ab86b5ad3d'
//         }
//     })

//     console.log(await response.json());
    
    



// })
