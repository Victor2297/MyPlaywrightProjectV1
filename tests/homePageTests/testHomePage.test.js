//ts-check

import {expect} from '@playwright/test'
import {test} from '../../fixtures/myFixtures'

test.describe('test home page', ()=> {
    
    test.beforeEach(async({basePage})=> {
        await test.step('Step1: open the home page', async ()=>{
            await basePage.openHomePage()
        })
    });

    test('T1: verify welcome text, page url and title', async({basePage, homePage, page})=>{
        await test.step('Step2: verify the logo from the home page', async()=> {
            await expect.soft(basePage.automationExerciseLogo,  'Test1: Site logo is visible on home page').toBeVisible()
        })
        //test first slide
        await test.step('Step3: test first slide from home page', async()=>{
            await expect.soft(homePage.sliderCarouselFirstTextBlockAllText, 'Test2: First full text block is visible').toBeVisible()
            await expect.soft(homePage.sliderCarouselFirstImage, 'Test3: First image is visible').toBeVisible()
            await homePage.goToNextSlide()
        })
        //test second slide
        await test.step('Step4: test second slide from home page', async()=> {
            await expect.soft(homePage.sliderCarouselSecondTextBlockAllText, 'Test4: Second full text block is visible').toBeVisible()
            await expect.soft(homePage.sliderCarouselSecondImage, 'Test5: Second image is visible').toBeVisible()
            await expect.soft(page, 'Test6: Test the url').toHaveURL('https://www.automationexercise.com/')
            await expect.soft(page, 'Test7: Test the title').toHaveTitle('Automation Exercise')
        })
    });
    test('T2: verify filters, items', async({homePage, page})=> {
        await test.step('Step2: verify the category filter', async()=> {
            await expect.soft(homePage.mainContainerCategoryFilter, 'Test1: category filter exists and is visible').toBeVisible()
        })
        await test.step('Step3: verify the brands filter', async()=> {
            await expect.soft(homePage.mainContainerBrandsFilter, 'Test2: brands filter exists and is visible').toBeVisible()
        })
        //this test will fail
        await test.step('Step4: check the title text for products', async()=> {
            await expect.soft(homePage.mainContainerFeaturesItemsText, 'Test3: we have right features items text').toHaveText('Features Items1')
        })
        await test.step('Step5: verify if features items block exist on home page', async()=> {
            await expect.soft(homePage.mainContainerFeaturesItemsBlock, 'Test4: the features items block with all products exist on the home page').toBeAttached()
        })
        
        //we scroll down to the element
        //is not necessary for test
        //it is needed for debugging
        await homePage.mainContainerRecommendedItemsCarouselSlider.scrollIntoViewIfNeeded()
        //this test will fail
        await test.step('Step6: verify the id of slider carousel', async()=> {
            await expect.soft(homePage.mainContainerRecommendedItemsCarouselSlider, 'Test5: slider carousel has id idFail').toHaveId('idFail')
        })
    })

})