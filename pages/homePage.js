class HomePage{
    /**
     * @param {import('playwright').Page} page 
     */
    constructor(page) {
        this.page = page
    }
    //getters
    //slider carousel first slide
    get sliderCarouselFirstTextBlockHeading1() {
        return this.page.getByRole('heading', { name: 'AutomationExercise' })
    }
    get sliderCarouselFirstTextBlockHeading2() {
        return this.page.getByRole('heading', { name: 'Full-Fledged practice website' })
    }
    get sliderCarouselFirstTextBlockParagrph() {
        return this.page.getByRole('paragraph').filter({ hasText: 'All QA engineers can use this' })
    }
    get sliderCarouselFirstTextBlockAllText() {
        return this.page.getByText('AutomationExercise Full-').first()
    }
    get sliderCarouselFirstImage() {
        return this.page.getByRole('img', { name: 'demo website for practice' })
    }
    get sliderCarouselNextSlideButton() {
        return this.page.locator('#slider-carousel').getByRole('link', { name: '' })
    }
    //slider carousel second slide
    get sliderCarouselSecondTextBlockHeading1() {
        return this.page.getByRole('heading', { name: 'AutomationExercise' }).nth(1)
    }
    get sliderCarouselSecondTextBlockHeading2() {
        return this.page.getByRole('heading', { name: 'Full-Fledged practice website' }).nth(1)
    }
    get sliderCarouselSecondTextBlockParagrph() {
        return this.page.getByText('All QA engineers can use this').nth(1)
    }
    get sliderCarouselSecondTextBlockAllText() {
        return this.page.getByText('AutomationExercise Full-').nth(1)
    }
    get sliderCarouselSecondImage() {
        return this.page.getByRole('img', { name: 'demo website for practice' }).nth(1)
    }
    //main container elements
    //filters, feature item, reccommended items
    get mainContainerCategoryFilter() {
        return this.page.getByRole('heading', { name: 'Category' })
    }
    get mainContainerBrandsFilter() {
        return this.page.getByRole('heading', { name: 'Brands' })
    }
    get mainContainerFeaturesItemsText() {
        return this.page.getByRole('heading', { name: 'Features Items' })
    }
    get mainContainerFeaturesItemsBlock() {
        return this.page.locator('//*[@class="features_items"]')
    }
    get mainContainerRecommendedItemsCarouselSlider() {
        return this.page.locator('//*[@id="recommended-item-carousel"]')
    }
    //methods
    async goToNextSlide() {
        await this.sliderCarouselNextSlideButton.click()
    }
}
export {HomePage}