class CheckoutPage {
    /**
     * @param {import('playwright').Page} page 
     */
    constructor(page) {
        this.page = page
        this.breadcrumb = page.locator('//*[@class="active"]')
        this.allProductsFromCheckoutPage = page.locator('//*[contains(@id, "product")]')
        this.totalAmountPerAllProducts = page.locator('//*[@class="cart_total_price"]').last()
        this.placeOrderButton = page.locator('//*[@class="btn btn-default check_out"]')
    }
    async placeOrder() {
        await this.placeOrderButton.click()
    }
}

export {CheckoutPage}