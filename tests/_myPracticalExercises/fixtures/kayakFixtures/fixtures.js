import {test as base} from '@playwright/test'
import { KayakFlightsHomePage } from '../../pages/kayakPages/kayakFlightsHomePage'
import { KayakFlightsResultPage } from '../../pages/kayakPages/kayakFlightsResultPage'

export const test = base.extend({
    kayakFlightsHomePage: async({page}, use)=> {
        const kayakFlightsHomePage = new KayakFlightsHomePage(page)
        await kayakFlightsHomePage.goToKayakFlightHomePage()
        await kayakFlightsHomePage.rejectAllCookies()
        await kayakFlightsHomePage.removePreselectedOrigin()
        await use(kayakFlightsHomePage)
    },
    resultPage: async({page, context, kayakFlightsHomePage}, use)=> {
        const newPagePromise = context.waitForEvent('page')
        const samePagePromise = page.locator('//*[@aria-label="Result item 0"]').waitFor({state:'visible'})

        await kayakFlightsHomePage.executeASearch()

        const resultPage = await Promise.race([
            newPagePromise.then(p=>p),
            samePagePromise.then(()=>page)
        ])
        await resultPage.waitForLoadState()
        await use(resultPage)
    },
    kayakFlightsResultPage: async({resultPage}, use)=> {
        const kayakFlightsResultPage = new KayakFlightsResultPage(resultPage)
        await use(kayakFlightsResultPage)
    },
})
export {expect} from '@playwright/test'