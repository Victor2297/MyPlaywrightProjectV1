import {expect} from '@playwright/test'

class MomondoCarsPage {
    /**
     * @param {import('playwright').Page} page 
     */
    constructor(page) {
        this.page = page
    }
    get rejectAllCookiesButton() {
        return this.page.getByRole('button', {name: 'Reject all'})
    }
    get currencyButton() {
        return this.page.locator('//*[@class="cycn-symbol cycn-mod-full-width"]')
    }
    get currencyModal() {
        return this.page.locator('//*[@class="c-ulo-content"]').last()
    }
    get currencyModalCloseButton() {
        return this.currencyModal.locator('//*[@aria-label="Close"]')
    }
    get searchCurrencyField() {
        return this.currencyModal.getByPlaceholder('Search for a currency')
    }
    get searchedCurrency() {
        return this.currencyModal.locator('//*[contains(@class,"KmfS KmfS-mod-variant-pill")]')
    }
    get currencySecondModal() {
        return this.page.locator('//*[@class="c-ulo-content"]').last()
    }
    get currencySecondModalCloseButton() {
        return this.currencySecondModal.getByRole('button', {name:'Close'})
    }
    get allTotalPrices() {
        return this.page.locator('//*[@class="c4nz8 c4nz8-mod-desktop"]').all()
    }
    get sortByButton() {
        return this.page.getByRole('combobox', { name: 'Sort by:' }).locator('div').first()
    }
    get cheapestSortingOption() {
        return this.page.getByText('Cheapest').nth(1)
    }
    get firstResult() {
        return this.page.locator('//*[@class="jo6g-content"]').first()
    }
    //rental agency locators
    get rentalAgencyButton() {
        return this.page.getByRole('button', { name: 'Rental agency' })
    }
    get rentalAgencyMenu() {
        return this.page.getByText('Rental agencySelect AllClear')
    }
    get clearAllButtonFromRentalAgencyMenu() {
        return this.rentalAgencyMenu.getByRole('button', {name:'Clear all'})
    }
    get allOptionsFromRentalAgencyMenu() {
        return this.rentalAgencyMenu.locator('//*[@class="SJHM SJHM-mod-theme-responsive SJHM-responsive SJHM-mod-variant-no-heading"]').all()
    }
    get rentalAgencyMenuFooter() {
        return this.page.locator('//*[@class="f_V- f_V--mod-stretch"]')
    }
    get rentalAgencyResetButton() {
        return this.rentalAgencyMenuFooter.getByRole('button', { name: 'Reset' })
    }
    get rentalAgencyShowResultsButton() {
        return this.rentalAgencyMenuFooter.getByText('Show')
    }
    get allAgenciesFromFilteredResults() {
        return this.page.locator('.QYm5-agency > .qQvr-wrapper > .mR2O-agency-image.mR2O-mod-desktop-responsive').all()
    }


    async goToMomondoCarPage() {
        await this.page.goto('https://www.momondo.com/cars/JFK-a15830/2025-11-22/2025-11-28?ucs=1yzn0ld&sort=rank_a',{waitUntil:'domcontentloaded'})
    }
    async selectTheCurrency(currency) {
        //open the currency modal
        await this.currencyButton.click()
        //search the currency
        await this.searchCurrencyField.fill(currency)
        //select the searched currency
        await this.searchedCurrency.click()
        //cose the second currency modal
        await this.currencySecondModalCloseButton.click()
    }
    async sortByCheapest() {
        await this.sortByButton.click()
        await this.cheapestSortingOption.click()
    }
    async openRentalAgencyFilter() {
        await this.rentalAgencyButton.click()
    }
    async resetTheSearchedRentalAgencyFilter() {
        await this.rentalAgencyResetButton.click()
    }
    async showAllResultsForSelectedRentalAgency() {
        await this.rentalAgencyShowResultsButton.click()
    }
    async clearAllFromRentalAgencyMenu() {
        await this.clearAllButtonFromRentalAgencyMenu.click() 
    }
    async selectTheRentalAgency(agencyName) {
        const agency = this.rentalAgencyMenu.getByRole('checkbox', { name: agencyName })
        await agency.click()
        await expect(agency).toHaveAttribute('aria-checked', 'true')
    }
    async getStartingPrice(agencyId) {
        return await this.rentalAgencyMenu.locator('.SJHM-price').nth(agencyId).innerText()
    }
    async rejectAllCookies() {
        await this.page.addLocatorHandler(this.page.locator('.c-ulo-content').last(), async()=> {
            await this.rejectAllCookiesButton.click()
        })
    }
}
export {MomondoCarsPage}