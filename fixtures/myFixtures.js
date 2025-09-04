//ts-check

import {test as base} from '@playwright/test'
import { BasePage } from '../pages/basePage'
import { HomePage } from '../pages/homePage'
import { ProductsPage } from '../pages/productsPage'
import { CartPage } from '../pages/cartPage'

const test = base.extend({
    basePage: async({page}, use)=> {
        const basePage = new BasePage(page)
        await basePage.goToAutomationExercisePage()
        await use(basePage)
    },
    homePage: async({page}, use)=> {
        const homePage = new HomePage(page)
        await use(homePage)
    },
    productsPage: async({page}, use)=> {
        const productsPage = new ProductsPage(page)
        await use(productsPage)
    },
    cartPage: async({page}, use)=> {
        const cartPage = new CartPage(page)
        await use(cartPage)
    }
})

export {test}