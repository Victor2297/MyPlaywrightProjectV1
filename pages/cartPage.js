//ts-check

class CartPage{
    /** 
     * @param {import('playwright').Page} page
     */
    constructor(page) {
        this.page = page
        this.breadcrumb = page.getByText('Shopping Cart')
        this.allProductsAddedInCart = page.locator('//*[contains(@id,"product")]')
    }
}

export {CartPage}