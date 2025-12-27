//ts-check

class CartPage{
    /** 
     * @param {import('playwright').Page} page
     */
    constructor(page) {
        this.page = page
    }
    //getters
    get breadcrumb() {
        return this.page.getByText('Shopping Cart')
    }
    get allProductsAddedInCart() {
        return this.page.locator('//*[contains(@id,"product")]')
    }
    get proceedToCheckoutButton() {
        return this.page.locator('//*[@class="btn btn-default check_out"]')
    }
    get cartPageIsEmptyMessage() {
        return this.page.locator('//*[@id="empty_cart"]')
    }
    //methods
    async proceedToCheckout() {
        await this.proceedToCheckoutButton.click()
    }
}

export {CartPage}