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
    test('test page title and url', async({contactUsPage})=> {
        await expect.soft(contactUsPage.page, 'Test1: we have right page url').toHaveURL(urls_titles.url)
        await expect.soft(contactUsPage.page, 'Test2: we have right page title').toHaveTitle(urls_titles.title)
    })
    test('test successfully sending of contact us form', async({contactUsPage})=> {
        //accept alert
        contactUsPage.page.on('dialog', (dialog)=> {
            dialog.accept()
        })
        await contactUsPage.fillContactForm(dataSet)
        await expect.soft(contactUsPage.successMessage, 'Test1: success message is visible after submit form').toBeVisible()
        await expect.soft(contactUsPage.homePageButton, 'Test2: home button is visible after submit form').toBeVisible()
    })
})