//ts-check

import {test} from '../../fixtures/myFixtures'
import {expect} from '@playwright/test'

test.describe('test products page', ()=> {
    test.beforeEach(async({basePage})=> {
        await basePage.openProductsPage()
    })
    test("test page's welcome image, url, title", async({productsPage, page})=>{
        await expect.soft(productsPage.specialOfferImage, 'Test1: special offer image is visible on products page').toBeVisible()
        await expect.soft(productsPage.page, 'Test2: page url contains products subdirectory').toHaveURL('products')
        await expect.soft(productsPage.page, 'Test3: page has right title').toHaveTitle('Automation Exercise - All Products')
    });
    test("test page's search field/functionality - with valid data", async({productsPage, context}, testInfo)=>{
        test.setTimeout(50000)
        const searchedText = 'shirt'
        //execute a search
        await productsPage.searchProduct(searchedText)
        //get all paragraphs and urls of products remained after search
        const paragraphs_urls = await getAllParagraphsAndUrls(productsPage.page, testInfo.project.use.baseURL)
        
        const urls = Object.values(paragraphs_urls)
        const paragraphs = Object.keys(paragraphs_urls)
        for (const paragraph of paragraphs) {
            //verify if paragraph contains searched text
            const paragraphContainsSearchedText = verifyIfStringContainsSubstring(searchedText, paragraph)
            //first verification
            //first check - check if each paragraph from card contains searched word
            if(paragraphContainsSearchedText === true) {
                expect.soft(paragraphContainsSearchedText, 'Verification 1: Paragraph contains searched word').toBeTruthy()
            }
            //second verification
            //second check - check if for each opened link/card/page category contains the searched word
            else {
                const newPromise = context.waitForEvent('page')
                //open new tab
                const page = await context.newPage()
                const newPage = await newPromise
                //go to url
                await newPage.goto(paragraphs_urls[paragraph])
                //get category text
                //example Category: Men >  Tshirts
                const categoryText = await newPage.locator('//*[@class="product-information"]/p').first().innerText()
                const categoryContainsSearchedText = verifyIfStringContainsSubstring(searchedText, categoryText)
                //verify if category text contains searched word
                //test passed
                if(categoryContainsSearchedText === true) {
                    expect.soft(categoryContainsSearchedText, 'Verification2: Category contains the searched word').toBeTruthy()
                }
                //test failed
                else {
                    expect.soft(categoryContainsSearchedText, 'Verification3: Category does not contains the searched word', categoryText).toBeTruthy()
                }
            }
        }
    });
    test("test page's search field/functionality - with invalid data", async({productsPage})=> {
        const initialProductsCount = await productsPage.page.locator('//*[@class="single-products"]').count()
        const initialTitleText = await productsPage.productsTitle.innerText()
        //#1 search with empty spaces
        let searchedText = '      '
        await productsPage.searchProduct(searchedText)
        //verify page url
        await expect.soft(productsPage.page, 'Test1: url has right structure').toHaveURL('products?search=')
        //verify products count
        expect.soft(await productsPage.page.locator('//*[@class="single-products"]').count(), 'Test2: number of products is same before and after search with empty spaces').toEqual(initialProductsCount)
        //verify title text after search
        expect.soft(await productsPage.productsTitle.innerText(), 'Test3: after search with empty spaces the title text is same as initial title text').toEqual(initialTitleText)

        //#2 search with unexisting data, example verttyuetrytuyhi22
        searchedText = '23422vi'
        await productsPage.searchProduct(searchedText)
        //verify page url
        await expect.soft(productsPage.page, 'Test4: page url contains searched text').toHaveURL(`products?search=${searchedText}`)
        //verify title text after search
        await expect.soft(await productsPage.productsTitle.innerText(), 'Test5: products title was changed from all products in searched products').toEqual('SEARCHED PRODUCTS')
    });
    test.describe("test page's category filters", ()=>{
        test('test women filter', async({productsPage})=> {
            //open women filter
            await productsPage.open_close_womenFilter()
            //verify if women filters list is visible
            await expect.soft(productsPage.womenFiltersList, 'Test1: all three women filters are visible').toBeVisible()
            //close women filter
            await productsPage.open_close_womenFilter()
            //verify if women filters list is hidden
            await expect.soft(productsPage.womenFiltersList, 'Test2: all three women filters are hidden').toBeHidden()
            //again open women filters and interact with them
            await productsPage.open_close_womenFilter()

            //all constants are stored in array
            const womenFiltersTextLinks = [
                {text: 'Dress', link: '/category_products/22'}, //this is a wrong data
                {text: 'TOPS', link: '/category_products/2'},
                {text: 'SAREE', link: '/category_products/7'}
            ]
            //iteration
            var item = 0
            for(const filter of await productsPage.allSubFiltersFromWomenFilterList.all()) {
                const filterText = await filter.innerText()
                const filterLink = await filter.getAttribute('href')
                //verify subfilter order, subfilter text and subfilter link
                if (item === 0 && filterText.trim() === womenFiltersTextLinks[item].text && filterLink === womenFiltersTextLinks[item].link) {
                    expect.soft(true, `Test3: ${filterText} filter includes all the necessary conditions`).toBeTruthy()
                }
                else if (item === 1 && filterText.trim() ===  womenFiltersTextLinks[item].text && filterLink === womenFiltersTextLinks[item].link) {
                    expect.soft(true, `Test4: ${filterText} filter includes all the necessary conditions`).toBeTruthy()
                }
                else if (item === 2 && filterText.trim() ===  womenFiltersTextLinks[item].text && filterLink === womenFiltersTextLinks[item].link) {
                    expect.soft(true, `Test5: ${filterText} filter includes all the necessary conditions`).toBeTruthy()
                }
                else {
                    expect.soft(false, `Test6: ${filterText} filter does not includes all the necessary conditions`).toBeTruthy()
                    //console.log(item, filterText, womenFiltersTextLinks[item].text, filterLink, womenFiltersTextLinks[item].link)
                }
                item+=1
            }
        });
        test('test men filter', async({productsPage})=> {
            //same as for women filter
        });
        test('test kids filter', async({productsPage})=> {
            //same as for women filter
        })
    });
    test("test page's brands filter", async({productsPage})=>{
        test.setTimeout(50000)
        var brandName = ''
        var brandCount = 0
        //all titles and urls of brands
        const brands_titles_urls = [
                {
                    title: 'Automation Exercise - Polo Products',
                    url: '/brand_products/Polo'
                },
                {
                    title: 'Automation Exercise - H&M Products',
                    url: '/brand_products/H&M'
                },
                {
                    title: 'Automation Exercise - Madame Products',
                    url: '/brand_products/Madame'
                },
                {
                    title: 'Automation Exercise - Mast & Harbour Products',
                    url: '/brand_products/Mast%20&%20Harbour'
                },
                {
                    title: 'Automation Exercise - Babyhug Products',
                    url: '/brand_products/Babyhug'
                },
                {
                    title: 'Automation Exercise - Allen Solly Junior Products',
                    url: '/brand_products/Allen%20Solly%20Junior'
                },
                {
                    title: 'Automation Exercise - Kookie Kids Products',
                    url: '/brand_products/Kookie%20Kids'
                },
                {
                    title: 'Automation Exercise - Biba Products',
                    url: '/brand_products/Biba'
                }
            ]
        //iteration
        var i = 0
        //go through all the brands
        //and work with each in part
        for(const brand of await productsPage.allBrands.all()) {
            //brand name and count
            //example POLO (5)
            brandName = await getTextFromParentElement(brand)
            brandCount = await extractIntFromString(brand.locator('span'))
            //open brand
            await brand.click()
            //verify page title for each opened brand
            await expect.soft(productsPage.page, `Test1.${i}: the brand "${brandName}" has corresponing title`).toHaveTitle(brands_titles_urls[i].title)
            //verify page url for each opened brand
            await expect.soft(productsPage.page, `Test2.${i}: the brand "${brandName}" has corresponding url `).toHaveURL(brands_titles_urls[i].url)
            //verify if products title (from the center of the page) contains selected brand
            expect.soft(verifyIfStringContainsSubstring(brandName, await productsPage.productsTitle.innerText()), `Test3.${i}: the product's title contains the selected brand`).toBeTruthy()
            //checks if the corresponding breadcrumb is displayed on the page after selecting the brand
            await expect.soft(productsPage.breadcrumb, `Test4.${i}: on the page is diplayd the corrsponding breadcrumb`).toHaveText(brandName.trim())
            //select brand and verify if the number of products from page corresponds to number from brand filter
            await expect.soft(productsPage.allProductCarts, `Test5.${i}: the brand count correspond to product cards number on the page`).toHaveCount(brandCount)
            i++
        }
    });
    test("test add to cart functionality", async({productsPage, cartPage})=> {
        test.setTimeout(50000)
        const searchText = 'men'
        //execute a search
        await productsPage.searchProduct(searchText)
        var cart_price_description = []
        var cartNumber = 0
        var iterationCount = 0
        //work with each cart
        for(const cart of await productsPage.allProductCarts.all()) {
            const price = await extractIntFromString(cart.locator('h2'))
            const description = await cart.locator('p').innerText()
            var obj = {cartNumber:cartNumber, price:price, description:description}
            cart_price_description.push(obj)
            await cart.hover()
            //add product to card
            await productsPage.page.locator('.overlay-content > .btn').nth(cartNumber).click()
            //verify if actual iteration is last iteration
            if((cartNumber+1) === await productsPage.allProductCarts.count()) {
                //see all added products in cart
                await productsPage.openViewCart()
                await expect.soft(cartPage.page, 'Test1: the opened page has corresponing url').toHaveURL('/view_cart')
                await expect.soft(cartPage.page, 'Test2: the opened page has corrsponding title').toHaveTitle('Automation Exercise - Checkout')
                await expect.soft(cartPage.breadcrumb, 'Test3: the opened page has corresponding bredcrumb').toHaveText('Shopping Cart')
                //go through the entire list of items
                for(const item of await cartPage.allProductsAddedInCart.all()) {
                    const itemDescription = await item.locator('//*[contains(@href,"/product_details/")]').innerText()
                    const itemPrice = await extractIntFromString(item.locator('//*[@class="cart_price"]'))
                    expect.soft(itemDescription, `Test4.${iterationCount}: the inital description and the description from item correspond`).toEqual(cart_price_description[iterationCount].description)
                    expect.soft(itemPrice, `Test5.${iterationCount}: the inital price and the price from item correspond`).toEqual(cart_price_description[iterationCount].price)
                    iterationCount+=1
                }
            }
            else {
                //continue shoping
                await productsPage.closeConfirmationModal()
            }

            cartNumber+=1
        }
        console.log(cart_price_description)
    })
})

async function getAllParagraphsAndUrls(page, pageUrl) {
    let category_paragraph_url = {}
    //go through all remaining products card
    for(const product of await page.locator('//*[@class="product-image-wrapper"]').all()) {
        //first - get the paragraph text for each product
        let paragraph = await product.locator('//*[@class="productinfo text-center"]/p').innerText()
        //second - get link of each view product button
        let viewProductLink = await product.getByRole('link', { name: ' View Product' }).getAttribute('href')
        category_paragraph_url[`${paragraph}`] = pageUrl+viewProductLink
    }
    return category_paragraph_url
}
function verifyIfStringContainsSubstring(subString, fullString) {
    const regex = new RegExp(subString, 'i'); // 'i' flag for case-insensitive
    const fullStringContainsSubString = regex.test(fullString);
    return fullStringContainsSubString
}

async function getTextFromParentElement(locator) {
    const text = await locator
        .evaluate(el => [...el.childNodes]
        .filter(e => e.nodeType === Node.TEXT_NODE)
        .map(e => e.textContent)
        .join('')
    );
    return text
}

async function extractIntFromString(locator) {
    //remove all symbols that are not of type int
    var brandCount = ''
    brandCount = await locator.innerText()
    brandCount = brandCount.match(/\d+/).join("")
    return parseInt(brandCount)
}