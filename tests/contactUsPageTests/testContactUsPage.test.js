//ts-check

import {test} from '../../fixtures/myFixtures'
import {expect} from '@playwright/test'

test.describe('test contact us page', ()=> {
    const urls_titles = {
        url: '/contact_us',
        title: 'Automation Exercise - Contact Us'
    }
    const dataSet = {
        userName: 'Have',
        userEmail: 'have@gmail.com',
        userSubject: 'products',
        userMessage: 'the products are displayed in wrong category',
        userFile: ''
    }
    test.beforeEach(async({basePage})=> {
        await basePage.openContactUsPage()
    })
    test('test page title and url', async({page})=> {
        await test.step('Step1: verify page url', async()=> {
            await expect.soft(page, 'Test1: we have right page url').toHaveURL(urls_titles.url)
        })
        await test.step('Step2: verify page title', async()=> {
            await expect.soft(page, 'Test2: we have right page title').toHaveTitle(urls_titles.title)
        })
    })
    test('test successfully sending of contact us form', async({contactUsPage, page})=> {
        //accept alert
        await test.step('Step2: accept the alert dialog', async()=> {
            page.on('dialog', (dialog)=> {
                dialog.accept()
            })
        })
        
        await test.step('Step1: fill the contact form', async()=> {
            await contactUsPage.fillContactForm(dataSet)
        })
        await test.step('Step3: verify if the success mssage is visible after submit the data', async()=> {
            await expect.soft(contactUsPage.successMessage, 'Test1: success message is visible after submit form').toBeVisible()
        })
        await test.step('Step4: verify if the home button is visible after submit form', async()=> {
            await expect.soft(contactUsPage.homePageButton, 'Test2: home button is visible after submit form').toBeVisible()
        })
    })
})