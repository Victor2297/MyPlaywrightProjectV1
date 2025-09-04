class HomePage{
    /**
     * @param {import('playwright').Page} page 
     */
    constructor(page) {
        this.page = page
        this.sliderCarousel = {
            //first slide
            firstTextBlockHeading1: page.getByRole('heading', { name: 'AutomationExercise' }),
            firstTextBlockHeading2: page.getByRole('heading', { name: 'Full-Fledged practice website' }),
            firstTextBlockParagrph: page.getByRole('paragraph').filter({ hasText: 'All QA engineers can use this' }),
            firstTextBlockAllText:  page.getByText('AutomationExercise Full-').first(),
            firstImage: page.getByRole('img', { name: 'demo website for practice' }),
            nextSlideButton: page.locator('#slider-carousel').getByRole('link', { name: '' }),
            //second slide
            secondTextBlockHeading1: page.getByRole('heading', { name: 'AutomationExercise' }).nth(1),
            secondTextBlockHeading2: page.getByRole('heading', { name: 'Full-Fledged practice website' }).nth(1),
            secondTextBlockParagrph: page.getByText('All QA engineers can use this').nth(1),
            secondTextBlockAllText:  page.getByText('AutomationExercise Full-').nth(1),
            secondImage: page.getByRole('img', { name: 'demo website for practice' }).nth(1)
        }
        this.mainContainerElements = {
            //filters, feature item, reccommended items
            categoryFilter: page.getByRole('heading', { name: 'Category' }),
            brandsFilter: page.getByRole('heading', { name: 'Brands' }),
            featuresItemsText: page.getByRole('heading', { name: 'Features Items' }),
            featuresItemsBlock: page.locator('//*[@class="features_items"]'),
            recommendedItemsCarouselSlider: page.locator('//*[@id="recommended-item-carousel"]')
        }
        
    }
    async goToNextSlide() {
        await this.sliderCarousel.nextSlideButton.click()
    }
}
export {HomePage}