class BasePage{
    /**
     * @param {import('playwright').Page} page 
     */
    constructor(page) {
        this.page = page
    }
    //getters
    //links to pages
    get homePageLink() {
        return this.page.getByRole('link', { name: ' Home' })
    }
    get productsPageLink() {
        return this.page.getByRole('link', { name: ' Products' })
    }
    get cartPageLink() {
        return this.page.getByRole('link', { name: ' Cart' })
    }
    get singUp_Login_PageLink() {
        return this.page.getByRole('link', { name: ' Signup / Login'})
    }
    get contactUsPageLink() {
        return this.page.getByRole('link', {name: 'Contact us'})
    }
    //other locators
    get automationExerciseLogo() {
        return this.page.locator('.col-sm-4').first()
    }
    get logoutButton() {
        return this.page.locator('//*[text()=" Logout"]')
    }
    get deleteAccountButton() {
        return this.page.locator('//*[text()=" Delete Account"]')
    }
    //methods
    async goToAutomationExercisePage() {
        await this.page.goto('/', {waitUntil:'domcontentloaded'})
    }
    async openHomePage() {
        await this.homePageLink.click()
    }
    async openProductsPage(){
        await this.productsPageLink.click()
    }
    async openCartPage() {
        await this.cartPageLink.click()
    }
    async openSingUp_Login_Page() {
        await this.singUp_Login_PageLink.click()
    }
    async logoutFromCurrentAccount() {
        await this.logoutButton.click()
    }
    async deleteCurrentAccount() {
        await this.deleteAccountButton.click()
    }
    async openContactUsPage() {
        await this.contactUsPageLink.click()
    }
}
export {BasePage}