//ts-check

class CartPage{
    /** 
     * @param {import('playwright').Page} page
     */
    constructor(page) {
        this.page = page
        this.breadcrumb = page.getByText('Shopping Cart')
        this.allProductsAddedInCart = page.locator('//*[contains(@id,"product")]')
        this.proceedToCheckoutButton = page.locator('//*[@class="btn btn-default check_out"]')
        this.cartPageIsEmptyMessage = page.locator('//*[@id="empty_cart"]')
    }
    async proceedToCheckout() {
        await this.proceedToCheckoutButton.click()
    }
}

export {CartPage}