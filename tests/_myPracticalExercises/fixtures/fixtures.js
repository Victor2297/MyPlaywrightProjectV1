import {test as base} from '@playwright/test'
import {MomondoCarsPage} from '../../_myPracticalExercises/pages/momondoCarsPage'

const test = base.extend({
    momondoCarsPage: async({page}, use)=> {
        const momondoCarsPage = new MomondoCarsPage(page)
        await momondoCarsPage.goToMomondoCarPage()
        await use(momondoCarsPage)
    }
})

export {test}