//ts-check
import {test as base, expect} from '@playwright/test'

//here I studied how parameterize works in playwright
const test = base.extend({
    description: ['default description', {option: true}]
});


[
    {subdirectory: '/domains'},
    {subdirectory: '/protocols'},
    {subdirectory: '/numbers'},
    {subdirectory: '/about'},
].forEach(({subdirectory})=> {
    test.describe('test parameterize', ()=> {
        test.beforeEach(async({page, description})=> {
            await page.goto('https://www.iana.org'+subdirectory)
            console.log(description)
        })
        test(`test page url ${subdirectory}`, async({page})=> {
            await expect(page).toHaveURL('https://www.iana.org'+subdirectory)
        })
    })
})