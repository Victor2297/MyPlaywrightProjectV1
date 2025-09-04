//ts-check

class ProductsPage{
    /**
     * @param {import('playwright').Page} page 
     */
    constructor(page) {
        this.page = page
        this.specialOfferImage = page.getByRole('img', { name: 'Website for practice' })
        this.searchProductField = page.getByRole('textbox', { name: 'Search Product' })
        this.searchProductButton = page.getByRole('button', { name: '' })
        this.categoryFilters = {
            womenFilter: page.getByRole('link', { name: ' Women' }),
            menFilter: page.getByRole('link', { name: ' Men' }),
            kidsFilter: page.getByRole('link', { name: ' Kids' })
        }
        this.womenFiltersList = page.getByText('Dress Tops Saree')
        this.allSubFiltersFromWomenFilterList = page.locator('//*[@id="Women"]/div/ul/li/a')
        //same as for women filters list
        //this.menFiltersList = 1
        //this.kidFiltersList = 1

        this.productsTitle = page.locator('//*[@class="title text-center"]')
        this.allBrands = page.locator('//*[contains(@href, "/brand_products/")]')
        this.breadcrumb = page.locator('//*[@class="breadcrumb"]/li').nth(1)
        this.allProductCarts = page.locator('//*[@class="productinfo text-center"]')
        this.allProductCartsOverlayContent = page.locator('//*[@class="overlay-content"]')
        this.continueShopingButton = page.locator('//*[@class="btn btn-success close-modal btn-block"]')
        this.viewCartLink = page.locator('//*[@href="/view_cart"]').nth(1)
    }
    async searchProduct(productName) {
        await this.searchProductField.fill(productName)
        await this.searchProductButton.click()
    }
    async open_close_womenFilter() {
        this.categoryFilters.womenFilter.click()
    }
    async closeConfirmationModal() {
        await this.continueShopingButton.click()
    }
    async openViewCart() {
        await this.viewCartLink.click()
    }
}
export {ProductsPage}