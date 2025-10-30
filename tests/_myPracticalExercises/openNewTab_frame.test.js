import {test, expect, chromium} from '@playwright/test'

test('test new tab', async()=> {
    test.setTimeout(50000)
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    //open main page
    await page.goto('https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_link_target')

    //find the frame and the element in it and click
    //is not necessary to switch to frame
    //await page1.locator('iframe[name="iframeResult"]').contentFrame().getByRole('link', { name: 'Visit W3Schools.com!' }).click()

    //or
    //switch to frame / find frame
    const frame = page.frame('iframeResult')

    //Start waiting for new page before clicking
    const pagePromise = context.waitForEvent('page')

    //interact with element from frame
    //this element open new tab
    await frame.locator("//html/body/a[text()='Visit W3Schools.com!']").click()
    const newPage = await pagePromise

    //Interact with the new page normally
    await newPage.getByRole('button', {name:'Certificates'}).click()

    await page.pause()
})



//or do the same thing only with the help of fixtures

// test('test new tab', async({page, context})=> {
//     test.setTimeout(50000)
//     //open main page
//     await page.goto('https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_link_target')

//     //find the frame and the element in it and click
//     //is not necessary to switch to frame
//     //await page1.locator('iframe[name="iframeResult"]').contentFrame().getByRole('link', { name: 'Visit W3Schools.com!' }).click()

//     //or
//     //switch to frame / find frame
//     const frame = page.frame('iframeResult')

//     //Start waiting for new page before clicking
//     const pagePromise = context.waitForEvent('page')

//     //interact with element from frame
//     //this element open new tab
//     await frame.locator("//html/body/a[text()='Visit W3Schools.com!']").click()
//     const newPage = await pagePromise

//     //Interact with the new page normally
//     await newPage.getByRole('button', {name:'Certificates'}).click()

//     await page.pause()
// })