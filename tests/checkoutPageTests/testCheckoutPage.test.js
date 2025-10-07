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
        await basePage.openSingUp_Login_Page()
        //login with account with products in cart page
        await signUpLoginPage.loginToYourAccount('albert234456787@gmail.com', '123')
    })
    test('test the full flow of payment', async({basePage, page, cartPage, checkoutPage, paymentPage})=> {
        //go to cart page
        await basePage.openCartPage()
        //verify page url, title, bredcrumb
        await expect.soft(page, 'Test1: verify the url from cart page').toHaveURL(urls_titles_breadcrumbs.cartPageUrl)
        await expect.soft(page, 'Test2: verify the title from cart page').toHaveTitle(urls_titles_breadcrumbs.cartPageTitle)
        await expect.soft(cartPage.breadcrumb, 'Test3: verify the breadcrumb from cart page').toHaveText(urls_titles_breadcrumbs.cartPageBreadcrumb)

        //go through all products and collect price, quantity, total price
        var cartPageProductInformation = await getProductInformation(cartPage.allProductsAddedInCart)
        //go to checkout page
        await cartPage.proceedToCheckout()
        //verify page url, title, breadcrumb 
        await expect.soft(page, 'Test4: verify the url from checkout page').toHaveURL(urls_titles_breadcrumbs.checkoutPageUrl)
        await expect.soft(page, 'Test5: verify the title from checkout page').toHaveTitle(urls_titles_breadcrumbs.checkoutPageTitle)
        await expect.soft(checkoutPage.breadcrumb, 'Test6: verify the breadcrumb from checkout page').toHaveText(urls_titles_breadcrumbs.checkoutPageBreadcrumb)
        const amount = await checkoutPage.totalAmountPerAllProducts.innerText()
        const totalAmount = amount.replace(/\D/g, '')
        //go through all products
        var checkoutPageProductInformation = await getProductInformation(checkoutPage.allProductsFromCheckoutPage)
        //verify if all products from previous page are displayed on current page
        expect.soft(cartPageProductInformation, 'Test7: verify if all products from cart page are displayed on the checkout page').toEqual(checkoutPageProductInformation)
        //go to payment page
        await checkoutPage.placeOrder()
        //verify page url, title, breadcrumb
        await expect.soft(page, 'Test8: verify the url from payment page').toHaveURL(urls_titles_breadcrumbs.paymentPageUrl)
        await expect.soft(page, 'Test9: verify the title from payment page').toHaveTitle(urls_titles_breadcrumbs.paymentPageTitle)
        await expect.soft(paymentPage.breadcrumb, 'Test10: verify the bredcrumb from payment page').toHaveText(urls_titles_breadcrumbs.paymentPageBreadcrumb)
        //fill all mandatory fields from payment form
        await paymentPage.fillPaymentForm(dataSet)
        //verify page url, title
        await expect.soft(page, 'Test11: verify the url from payment done page').toHaveURL(urls_titles_breadcrumbs.paymentDonePageUrl + totalAmount)
        await expect.soft(page, 'Test12: verify the title from paymnt done page').toHaveTitle(urls_titles_breadcrumbs.paymentDonePageTitle)
        await expect.soft(paymentPage.orderPlaceMessage, 'Test13: verify the order place message from payment done page').toHaveText('Order Placed!')
        await expect.soft(paymentPage.confirmationMessage, 'Test14: verify if the confirmation message is visible on payment done page').toBeVisible()
        await expect.soft(paymentPage.confirmationMessage, 'Test15: verify if the confirmation message from payment done page contains corresponding text').toHaveText('Congratulations! Your order has been confirmed!')
        await basePage.openCartPage()
        //go to cart page and verify if it is empty
        await expect.soft(cartPage.cartPageIsEmptyMessage, 'Test16: after payment the cart page is empty').toBeVisible()
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