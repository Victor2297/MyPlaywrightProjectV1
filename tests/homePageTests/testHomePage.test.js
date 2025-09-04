//ts-check

import {expect} from '@playwright/test'
import {test} from '../../fixtures/myFixtures'

test.describe('test home page', ()=> {
    
    test.beforeEach(async({basePage})=> {
        await basePage.openHomePage()
    });

    test('Test1: verify welcome text, page url and title', async({basePage, homePage})=>{
        await expect.soft(basePage.automationExerciseLogo,  'Test1: Site logo is visible on home page').toBeVisible()
        //test first slide
        await expect.soft(homePage.sliderCarousel.firstTextBlockAllText, 'Test2: First full text block is visible').toBeVisible()
        await expect.soft(homePage.sliderCarousel.firstImage, 'Test3: First image is visible').toBeVisible()
        await homePage.goToNextSlide()
        //test second slide
        await expect.soft(homePage.sliderCarousel.secondTextBlockAllText, 'Test4: Second full text block is visible').toBeVisible()
        await expect.soft(homePage.sliderCarousel.secondImage, 'Test5: Second image is visible').toBeVisible()
        await expect.soft(homePage.page, 'Test6: Test the url').toHaveURL('https://www.automationexercise.com/')
        await expect.soft(homePage.page, 'Test7: Test the title').toHaveTitle('Automation Exercise')
    });
    test('Test2: verify filters, categories', async({homePage})=> {
        await expect.soft(homePage.mainContainerElements.categoryFilter, 'Test1: category filter exists and is visible').toBeVisible()
        await expect.soft(homePage.mainContainerElements.brandsFilter, 'Test2: brands filter exists and is visible').toBeVisible()
        //this test will fail
        await expect.soft(homePage.mainContainerElements.featuresItemsText, 'Test3: we have right features items text').toHaveText('Features Items1')

        await expect.soft(homePage.mainContainerElements.featuresItemsBlock, 'Test4: the features items block with all products exist on the home page').toBeAttached()
        
        //we scroll down to the element
        //is not necessary for test
        //it is needed for debugging
        await homePage.mainContainerElements.recommendedItemsCarouselSlider.scrollIntoViewIfNeeded()
        //this test will fail
        await expect.soft(homePage.mainContainerElements.recommendedItemsCarouselSlider, 'Test5: slider carousel has id idV').toHaveId('idFail')
    })

})