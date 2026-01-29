//ts-check
import {expect} from '@playwright/test'

class KayakFlightsHomePage {
    /**
     * 
     * @param {import('playwright').Page} page 
     */
    constructor(page) {
        this.page = page
    }
    //getters
    get removePreselectedOriginButton() {
        return this.page.getByLabel('Remove value')
    }
    get cookiesWindow() {
        return this.page.locator('//*[@class="c-ulo-content"]').last()
    }
    get rejectAllCookiesButton() {
        return this.page.getByRole('button', {name:'Reject All'})
    }
    get originLocationField() {
        return this.page.getByRole('combobox', { name: 'Origin location' })
    }
    get destinationLocationField() {
        return this.page.getByRole('combobox', { name: 'Destination location' })
    }
    // get departureDate() {
    //     return this.page.getByRole('button', { name: 'February 22, 2026 Prices on' })
    // }
    // get arrivalDate() {
    //     return this.page.getByRole('button', { name: 'February 28, 2026 Prices on' })
    // }
    get searchButton() {
        return this.page.getByRole('button', { name: 'Search' })
    }
    //methods
    async goToKayakFlightHomePage() {
        await this.page.goto('https://www.kayak.com/flights')
    }
    async removePreselectedOrigin() {
        await this.removePreselectedOriginButton.click()
    }
    async rejectAllCookies() {
        //await this.page.addLocatorHandler(this.cookiesWindow, async()=> {
            await this.rejectAllCookiesButton.click()
        //})
    }
    async chooseOriginLocation(origin) {
        await this.originLocationField.fill(origin)
        await this.page.getByRole('option', { name: origin }).first().click()
    }
    async chooseDestinationLocation(destination) {
        await this.destinationLocationField.fill(destination)
        await this.page.getByRole('option', { name: destination }).first().click()
    }
    async setDepartureArrivalDates(departure_month_day, arrival_month_day) {
        await this.page.getByRole('button', { name: `${departure_month_day}, 2026 Prices on` }).click()
        await this.page.getByRole('button', { name: `${arrival_month_day}, 2026 Prices on` }).click()
    }
    async executeASearch() {
        await this.searchButton.click()
    }
}
export {KayakFlightsHomePage}