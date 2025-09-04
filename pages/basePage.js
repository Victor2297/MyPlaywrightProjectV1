class BasePage{
    /**
     * @param {import('playwright').Page} page 
     */
    constructor(page) {
        this.page = page
        this.automationExerciseLogo = page.locator('.col-sm-4').first()
        this.pages = {
            homePageLink:  page.getByRole('link', { name: ' Home' }),
            productsPageLink: page.getByRole('link', { name: ' Products' }),
            cartPageLink: page.getByRole('link', { name: ' Cart' }),
            singUp_Login_PageLink: page.getByRole('link', { name: ' Signup / Login'})
        }
    }
    async goToAutomationExercisePage() {
        await this.page.goto('/', {waitUntil:'domcontentloaded'})
    }
    async openHomePage() {
        await this.pages.homePageLink.click()
    }
    async openProductsPage(){
        await this.pages.productsPageLink.click()
    }
    async openCartPage() {
        await this.pages.cartPageLink.click()
    }
    async openSingUp_Login_Page() {
        await this.pages.singUp_Login_PageLink.click()
    }
}
export {BasePage}