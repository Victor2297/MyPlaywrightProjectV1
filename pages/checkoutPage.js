class CheckoutPage {
    /**
     * @param {import('playwright').Page} page 
     */
    constructor(page) {
        this.page = page
    }
    //getters
    get breadcrumb() {
        return this.page.locator('//*[@class="active"]')
    }
    get allProductsFromCheckoutPage() {
        return this.page.locator('//*[contains(@id, "product")]')
    }
    get totalAmountPerAllProducts() {
        return this.page.locator('//*[@class="cart_total_price"]').last()
    }
    get placeOrderButton() {
        return this.page.locator('//*[@class="btn btn-default check_out"]')
    }
    //methods
    async placeOrder() {
        await this.placeOrderButton.click()
    }
}

export {CheckoutPage}