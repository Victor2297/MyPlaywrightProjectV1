import {expect} from '@playwright/test'

class PaymentPage {
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
    get nameOnCard() {
        return this.page.locator('//*[@name="name_on_card"]')
    }
    get cardNumber() {
        return this.page.locator('//*[@name="card_number"]')
    }
    get cvc() {
        return this.page.locator('//*[@data-qa="cvc"]')
    }
    get expirationMonth() {
        return this.page.locator('//*[@data-qa="expiry-month"]')
    }
    get expirationYear() {
        return this.page.locator('//*[@data-qa="expiry-year"]')
    }
    get payAndConfirmOrderButton() {
        return this.page.locator('#submit')
    }
    get orderPlaceMessage() {
        return this.page.locator('//*[@class="title text-center"]/b')
    }
    get confirmationMessage() {
        return this.page.locator('//*[@class="col-sm-9 col-sm-offset-1"]/p')
    }
}
export {PaymentPage}