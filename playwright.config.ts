// const {devices} = require('@playwright/test')

// const config = {
//     timeout: 30000,
//     use: {
//         ignoreHTTPSErrors: true
//     },

//     projects: [
//         {
//             name: "Desktop Chrome",
//             use: {
//                 browserName: "chromium",
//                 viewport: { width: 1280, height: 800 }
//             }
            
//         },
//         {
//             name: "iPad Air",
//             use:{
//                 browserName: 'chromium', 
//                 viewport: { width: 820, height: 1180 }
//             }
//         },
//         {
//             name: 'iPhone XR', 
//             use:{
//                 browserName: 'chromium',
//                 viewport: { width: 414, height: 896 }
//             }
            
//         }
//     ],
//     browsers: ['chromium', 'firefox', 'webkit'],
// }

// module.exports = config


// import { defineConfig } from '@playwright/test';
// export default defineConfig({
//   use: {
//     // All requests we send go to this API endpoint.
//     baseURL: 'https://byabbe.se/on-this-day/1/1/events.json'
//   }
// });