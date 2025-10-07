import {expect} from '@playwright/test'

class PaymentPage {
    /**
     * @param {import('playwright').Page} page 
     */
    constructor(page) {
        this.page = page
        this.breadcrumb = page.locator('//*[@class="active"]')
        this.nameOnCard = page.locator('//*[@name="name_on_card"]')
        this.cardNumber = page.locator('//*[@name="card_number"]')
        this.cvc = page.locator('//*[@data-qa="cvc"]')
        this.expirationMonth = page.locator('//*[@data-qa="expiry-month"]')
        this.expirationYear = page.locator('//*[@data-qa="expiry-year"]')
        this.payAndConfirmOrderButton = page.locator('#submit')
        this.orderPlaceMessage = page.locator('//*[@class="title text-center"]/b')
        this.confirmationMessage = page.locator('//*[@class="col-sm-9 col-sm-offset-1"]/p')
    }
    async fillPaymentForm(dataSet) {
        await this.payAndConfirmOrderButton.click()
        //verify if the focus is set to name on cart field
        await expect.soft(this.nameOnCard, 'verification 1: when try to submit empty form the focus is set to firt field').toBeFocused()
        await this.nameOnCard.fill(dataSet.nameOnCard)
        await this.payAndConfirmOrderButton.click()
        //verify if the focus is set to second field
        await expect.soft(this.cardNumber, 'verification 2: after fill only first field and try to submit the form the focus is set to second field').toBeFocused()
        await this.cardNumber.fill(dataSet.cardNumber)
        await this.payAndConfirmOrderButton.click()
        //verify if the focus is set to third field
        await expect.soft(this.cvc, 'verification 3: after fill only first and second fields and try to submit the form the focus is set to second field').toBeFocused()
        await this.cvc.fill(dataSet.cvc)
        await this.payAndConfirmOrderButton.click()
        //verify if the focus is set to next field 
        await expect.soft(this.expirationMonth, 'verification 4: verify if the focus is set to expiration month field').toBeFocused()
        await this.expirationMonth.fill(dataSet.expirationMonth)
        await this.payAndConfirmOrderButton.click()
        //verify if the focus is set to next field
        await expect.soft(this.expirationYear, 'verification 5: verify if the focus is set to expiration year field').toBeFocused()
        await this.expirationYear.fill(dataSet.expirationYear)
        await this.payAndConfirmOrderButton.click()
    }
}
export {PaymentPage}