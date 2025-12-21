//ts-check

class ProductsPage{
    /**
     * @param {import('playwright').Page} page 
     */
    constructor(page) {
        this.page = page
    }
    //getters
    get specialOfferImage() {
        return this.page.getByRole('img', { name: 'Website for practice' })
    }
    get searchProductField() {
        return this.page.getByRole('textbox', { name: 'Search Product' })
    }
    get searchProductButton() {
        return this.page.getByRole('button', { name: '' })
    }
    //getters
    //categoryFilters
    get categoryFiltersWomenFilter() {
        return this.page.getByRole('link', { name: ' Women' })
    }
    get categoryFiltersMenFilter() {
        return this.page.getByRole('link', { name: ' Men' })
    }
    get categoryFiltersKidsFilter() {
        return this.page.getByRole('link', { name: ' Kids' })
    }
    get womenFiltersList() {
        return this.page.getByText('Dress Tops Saree')
    }
    get allSubFiltersFromWomenFilterList() {
        return this.page.locator('//*[@id="Women"]/div/ul/li/a')
    }
    //other getters
    get productsTitle() {
        return this.page.locator('//*[@class="title text-center"]')
    }
    get allBrands() {
        return this.page.locator('//*[contains(@href, "/brand_products/")]')
    }
    get breadcrumb() {
        return this.page.locator('//*[@class="breadcrumb"]/li').nth(1)
    }
    get allProductCarts() {
        return this.page.locator('//*[@class="productinfo text-center"]')
    }
    get allProductCartsOverlayContent() {
        return this.page.locator('//*[@class="overlay-content"]')
    }
    get continueShopingButton() {
        return this.page.locator('//*[@class="btn btn-success close-modal btn-block"]')
    }
    get viewCartLink() {
        return this.page.locator('//*[@href="/view_cart"]').nth(1)
    }
    //methods
    async searchProduct(productName) {
        await this.searchProductField.fill(productName)
        await this.searchProductButton.click()
    }
    async productsCount() {
        return await this.allProductCarts.count()
    }
    async titleText() {
        return await this.productsTitle.innerText()
    }
    async open_close_womenFilter() {
        this.categoryFiltersWomenFilter.click()
    }
    async closeConfirmationModal() {
        await this.continueShopingButton.click()
    }
    async openViewCart() {
        await this.viewCartLink.click()
    }
}
export {ProductsPage}