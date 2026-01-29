//ts-check
import {test} from '../_myPracticalExercises/fixtures/momondoFixtures/fixtures'
import {expect} from '@playwright/test'

test.describe('test momondocars page', ()=> {
    test.beforeEach(async ({ momondoCarsPage })=> {
    })
    test('test page url and title', async ({ page })=> {
        test.setTimeout(50*1000)
        await expect.soft(page).toHaveURL('https://www.momondo.com/cars/JFK-a15830/2025-11-22/2025-11-28?ucs=1yzn0ld&sort=rank_a')
        await expect.soft(page).toHaveTitle('New York (JFK), 11/22 – 11/28')
    });
    [
        {currencyTitle:'EUR', currencySymbol:'€'},
        {currencyTitle:'united states', currencySymbol:'$'},
        {currencyTitle:'canadian dollar', currencySymbol:'C$'}
    ].forEach(({currencyTitle, currencySymbol})=> {
        test(`test the change currency functionality for ${currencySymbol}`,{tag:'@currency'}, async({momondoCarsPage})=> {
            test.setTimeout(80*1000)
            await momondoCarsPage.rejectAllCookies()
            //verify if currency is changed
            await momondoCarsPage.selectTheCurrency(currencyTitle)
            for(const price of await momondoCarsPage.allTotalPrices) {
                await expect.soft(price, 'price is displayd in searched currency').toContainText(currencySymbol)
            }
        })
    });
    test('test the sorting', async({momondoCarsPage})=> {
        test.setTimeout(80*1000)
        await momondoCarsPage.rejectAllCookies()
        //test the sorting by cheapest
        await momondoCarsPage.sortByCheapest()
        await expect(momondoCarsPage.firstResult).toBeVisible()
        var previousPrice = 0
        for(const price of await momondoCarsPage.allTotalPrices) {
            const myPrice = await price.innerText()
            const newPrice = parseInt(myPrice.replace(/\D/g, ''))
            expect.soft(newPrice, `Test: previous price: ${previousPrice} <= new price: ${newPrice}`).toBeGreaterThanOrEqual(previousPrice)
            previousPrice = newPrice
        }
    });
    const rentalAgencies = [
        {agencyName: 'Ace', id:0},
        {agencyName: 'Alamo', id:1},
        {agencyName: 'Avis', id:2},
        {agencyName: 'Budget', id:3},
        {agencyName: 'Dollar', id:4},
        {agencyName: 'Drivo Rent A Car', id:5},
        {agencyName: 'Empire Rent A Car', id:6},
        {agencyName: 'Enterprise Rent-A-Car', id:7},
        {agencyName: 'Hertz', id:8},
        {agencyName: 'National', id:9},
        {agencyName: 'Payless', id:10},
        {agencyName: "Provider's pick", id:11},
        {agencyName: 'Sixt', id:12},
        {agencyName: 'Thrifty', id:13},
        {agencyName: 'Turo', id:14}
    ];
    rentalAgencies.forEach(({agencyName, id})=> {
        test(`test the rental agency filter: ${agencyName}`, {tag:'@rental_agency'}, async({momondoCarsPage})=> {
            test.setTimeout(120*1000)
            await momondoCarsPage.rejectAllCookies()
            //sort by cheapest
            await momondoCarsPage.sortByCheapest()
            //test the rental agency filter
            await momondoCarsPage.openRentalAgencyFilter()
            //get the start price for the agency
            var agencyStartPrice = await momondoCarsPage.getStartingPrice(id)
            await momondoCarsPage.selectTheRentalAgency(agencyName)
            //show results for each agency
            await momondoCarsPage.showAllResultsForSelectedRentalAgency()
            //wait for items to load
            await expect(momondoCarsPage.firstResult).toBeVisible()
            //verify if each agency has the same starting price as in the filter rental agency
            for(const price of await momondoCarsPage.allTotalPrices) {
                await expect.soft(price, `Test1:for agency ${agencyName} starting price from filter correspond with cheapest price from result`).toHaveText(agencyStartPrice)
                break
            }
            //create results count
            var iteration = 1
            //verify the agency for each result
            for(const a of await momondoCarsPage.allAgenciesFromFilteredResults) {
                await expect.soft(a.locator('.mR2O-agency-logo'), `Test2.${iteration}: the result number ${iteration} has car agency ${agencyName}`).toHaveAttribute('alt', `Car agency: ${agencyName}`)
                iteration++
            }    
    })
})
})