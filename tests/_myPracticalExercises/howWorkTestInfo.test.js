import {test, expect} from '@playwright/test'

test.describe('work with testInfo', {tag:'@testInfo', annotation:{type:'issue1', description:'description1'}}, ()=> {
    test.beforeEach(async({page}, testInfo)=>{
        await page.goto('/')
        testInfo.setTimeout(testInfo.timeout+30000)
    })
    test('test page url', async({page}, testInfo)=>{
        await expect.soft(page).toHaveURL('urltest')
        await page.screenshot({path: 'tests/_myPracticalExercises/screenshots/screenshot1.png'})
        await page.screenshot({path: 'tests/_myPracticalExercises/screenshots/screenshot2.png', fullPage:true, mask:[page.locator('//*[@alt="Website for automation practice"]')]})
        await page.locator('//*[@alt="Website for automation practice"]').screenshot({path: 'tests/_myPracticalExercises/screenshots/screenshot3.png'})
        //attach screenshot to report
        const screenshot = await page.screenshot()
        await testInfo.attach('screenshot', {body:screenshot, contentType:'image/png'})
        //attach file to report
        await testInfo.attach('down', {path:'tests/_myPracticalExercises/testFile.json'})
        console.log('1', testInfo.outputDir)
        console.log('2', testInfo.outputPath())
        console.log('3', testInfo.outputPath('myPath/files', 'test.txt'))
        console.log('timeout', testInfo.timeout)
    })
    test('test page title', {annotation:{type:'issue2', description:'description2'}}, async({page}, testInfo)=> {
        console.log(testInfo.snapshotPath('i1.png'))
        console.log(testInfo.snapshotDir)
        console.log(testInfo.annotations)
        await page.screenshot({path:testInfo.outputPath('screens', 'screen.png')})
        await testInfo.attach('screen', {path:testInfo.outputPath('screens', 'screen.png')})
        console.log(testInfo.attachments)
        await expect(page).toHaveScreenshot()
    })
})