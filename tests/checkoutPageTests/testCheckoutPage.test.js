//ts-check
import {test} from '../../fixtures/myFixtures'
import {expect} from '@playwright/test'

test.describe('test the payment for products', ()=> {
    test.setTimeout(50*1000)
    const urls_titles_breadcrumbs = {
        cartPageUrl: '/view_cart',
        cartPageTitle: 'Automation Exercise - Checkout',
        cartPageBreadcrumb: 'Shopping Cart',

        checkoutPageUrl: '/checkout',
        checkoutPageTitle: 'Automation Exercise - Checkout',
        checkoutPageBreadcrumb: 'Checkout',

        paymentPageUrl: '/payment',
        paymentPageTitle: 'Automation Exercise - Payment',
        paymentPageBreadcrumb: 'Payment',

        paymentDonePageUrl: '/payment_done/',
        paymentDonePageTitle: 'Automation Exercise - Order Placed'
    }
    const account_with_products_in_cart = {
        email: 'albert234456787@gmail.com',
        password: '123'
    }
    //payment data set
    const dataSet = {
        nameOnCard: 'Albert Vivaat',
        cardNumber: '12345678901234',
        cvc: '572',
        expirationMonth: '11',
        expirationYear: '2029'
    }

    test.beforeEach(async({basePage, signUpLoginPage})=> {
        //go to login page
        await test.step('Step1: go to login page', async()=> {
            await basePage.openSingUp_Login_Page()
        })
        //login with account with products in cart page
        await test.step('Step2: login with account with products in cart page', async()=> {
            await signUpLoginPage.loginToYourAccount(account_with_products_in_cart.email, account_with_products_in_cart.password)
        })
        
    })
    test('test the full flow of payment', async({basePage, page, cartPage, checkoutPage, paymentPage})=> {
        //go to cart page
        await test.step('Step3: go to cart page', async()=> {
            await basePage.openCartPage()
            test.fixme(await cartPage.noProductsMessage.isVisible(), 'no products in the cart, add products and repeat the test')
        })
        //verify page url, title, breadcrumb
        await test.step('Step4: verify page url, title, breadcrumb', async()=> {
            await expect.soft(page, 'Test1: verify the url from cart page').toHaveURL(urls_titles_breadcrumbs.cartPageUrl)
            await expect.soft(page, 'Test2: verify the title from cart page').toHaveTitle(urls_titles_breadcrumbs.cartPageTitle)
            await expect.soft(cartPage.breadcrumb, 'Test3: verify the breadcrumb from cart page').toHaveText(urls_titles_breadcrumbs.cartPageBreadcrumb)
        })
        var cartPageProductInformation = []
        //go through all products and collect price, quantity, total price
        await test.step('Step5: go through all products from cart page and collect price, quantity, total price', async()=> {
            cartPageProductInformation = await getProductInformation(cartPage.allProductsAddedInCart)
        })
        
        //go to checkout page
        await test.step('Step6: go to checkout page', async()=> {
            await cartPage.proceedToCheckout()
        })
        
        //verify page url, title, breadcrumb
        await test.step('Step7: verify the page url, title and breadcrumb from checkout page', async()=> {
            await expect.soft(page, 'Test4: verify the url from checkout page').toHaveURL(urls_titles_breadcrumbs.checkoutPageUrl)
            await expect.soft(page, 'Test5: verify the title from checkout page').toHaveTitle(urls_titles_breadcrumbs.checkoutPageTitle)
            await expect.soft(checkoutPage.breadcrumb, 'Test6: verify the breadcrumb from checkout page').toHaveText(urls_titles_breadcrumbs.checkoutPageBreadcrumb)
        })
        var totalAmount
        await test.step('Step8: collect the total amount from checkout page', async()=> {
            const amount = await checkoutPage.totalAmountPerAllProducts.innerText()
            totalAmount = amount.replace(/\D/g, '')
        })
        
        var checkoutPageProductInformation = []
        //go through all products from checkout page
        await test.step('Step9: go through all products from checkout page and collect price, quantity, total price', async()=> {
            checkoutPageProductInformation = await getProductInformation(checkoutPage.allProductsFromCheckoutPage)
            //verify if all products from previous page are displayed on current page
            await test.step('Step9.1: verify if all products from previous page are displayed on current page', async()=> {
                expect.soft(cartPageProductInformation, 'Test7: verify if all products from cart page are displayed on the checkout page').toEqual(checkoutPageProductInformation)
            })
        })
        //go to payment page
        await test.step('Step10: go to payment page', async()=> {
            await checkoutPage.placeOrder()
        })
        
        //verify page url, title, breadcrumb
        await test.step('Step11: verify page url, title, breadcrumb from payment page', async()=> {
            await expect.soft(page, 'Test8: verify the url from payment page').toHaveURL(urls_titles_breadcrumbs.paymentPageUrl)
            await expect.soft(page, 'Test9: verify the title from payment page').toHaveTitle(urls_titles_breadcrumbs.paymentPageTitle)
            await expect.soft(paymentPage.breadcrumb, 'Test10: verify the bredcrumb from payment page').toHaveText(urls_titles_breadcrumbs.paymentPageBreadcrumb)
        })
        
        //fill all mandatory fields from payment form
        await test.step('Step12: fill all mandatory fields from payment form and pay and confirm the order', async()=> {
            fillPaymentForm(paymentPage, dataSet)
        })
        
        //verify page url, title
        await test.step('Step13: verify page url, title after order confirmation', async()=> {
            await expect.soft(page, 'Test11: verify the url from payment done page').toHaveURL(urls_titles_breadcrumbs.paymentDonePageUrl + totalAmount)
            await expect.soft(page, 'Test12: verify the title from paymnt done page').toHaveTitle(urls_titles_breadcrumbs.paymentDonePageTitle)
            await expect.soft(paymentPage.orderPlaceMessage, 'Test13: verify the order place message from payment done page').toHaveText('Order Placed!')
            await expect.soft(paymentPage.confirmationMessage, 'Test14: verify if the confirmation message is visible on payment done page').toBeVisible()
            await expect.soft(paymentPage.confirmationMessage, 'Test15: verify if the confirmation message from payment done page contains corresponding text').toHaveText('Congratulations! Your order has been confirmed!')
        })
        //go to cart page and verify if it is empty
        await test.step('Step14: go to cart page and verify if it is empty', async()=> {
            await basePage.openCartPage()
            await expect.soft(cartPage.cartPageIsEmptyMessage, 'Test16: after payment the cart page is empty').toBeVisible()
        })
        
    })
})

async function getProductInformation(productListLocator) {
    var productInformation = []
    var iteration = 0
    //go through all products and collect price, quantity, total price
    for(const product of await productListLocator.all()) {
            var productDescription = await product.locator('//*[@class="cart_description"]/h4').innerText()
            var productPrice = await product.locator('//*[@class="cart_price"]').innerText()
            var productQuantity = await product.locator('//*[@class="cart_quantity"]').innerText()
            var productTotalPrice = await product.locator('//*[@class="cart_total_price"]').innerText()
            //collect the information
            productInformation.push({
                iteration:iteration,
                productDescription: productDescription,
                productPrice: productPrice,
                productQuantity: productQuantity,
                productTotalPrice: productTotalPrice
            })
            iteration+=1
        }
        return productInformation
}
async function fillPaymentForm(classObject, dataSet) {
    await classObject.payAndConfirmOrderButton.click()
    //verify if the focus is set to name on cart field
    await expect.soft(classObject.nameOnCard, 'verification 1: when try to submit empty form the focus is set to firt field').toBeFocused()
    await classObject.nameOnCard.fill(dataSet.nameOnCard)
    await classObject.payAndConfirmOrderButton.click()
    //verify if the focus is set to second field
    await expect.soft(classObject.cardNumber, 'verification 2: after fill only first field and try to submit the form the focus is set to second field').toBeFocused()
    await classObject.cardNumber.fill(dataSet.cardNumber)
    await classObject.payAndConfirmOrderButton.click()
    //verify if the focus is set to third field
    await expect.soft(classObject.cvc, 'verification 3: after fill only first and second fields and try to submit the form the focus is set to second field').toBeFocused()
    await classObject.cvc.fill(dataSet.cvc)
    await classObject.payAndConfirmOrderButton.click()
    //verify if the focus is set to next field 
    await expect.soft(classObject.expirationMonth, 'verification 4: verify if the focus is set to expiration month field').toBeFocused()
    await classObject.expirationMonth.fill(dataSet.expirationMonth)
    await classObject.payAndConfirmOrderButton.click()
    //verify if the focus is set to next field
    await expect.soft(classObject.expirationYear, 'verification 5: verify if the focus is set to expiration year field').toBeFocused()
    await classObject.expirationYear.fill(dataSet.expirationYear)
    await classObject.payAndConfirmOrderButton.click()
}