//ts-check
import {test, expect} from '../_myPracticalExercises/fixtures/kayakFixtures/fixtures'
import {KayakFlightsResultPage} from '../_myPracticalExercises/pages/kayakPages/kayakFlightsResultPage'

test.describe('test kayak flight page', ()=> {
    [
        {
            origin:'new york',
            iataOrigin:'NYC',
            destination:'vienna',
            iataDestination:'VIE',
            departure_month_day:'February 22',
            dmd:'2/22',
            arrival_month_day:'February 28',
            amd:'2/28'
        },
        {
            origin:'vienna',
            iataOrigin:'VIE',
            destination:'frankfurt',
            iataDestintion:'FRA',
            departure_month_day:'February 10',
            dmd:'2/10',
            arrival_month_day:'February 20',
            amd:'2/20'
        }
    ].forEach(({origin, iataOrigin, destination, iataDestination, departure_month_day, dmd, arrival_month_day, amd})=> {
        test.describe(`test kayak flights page for ${origin}, ${destination}`, ()=> {
            test.beforeEach(async({kayakFlightsHomePage})=> {
                await kayakFlightsHomePage.chooseOriginLocation(origin)
                await kayakFlightsHomePage.chooseDestinationLocation(destination)
                await kayakFlightsHomePage.setDepartureArrivalDates(departure_month_day, arrival_month_day)
            })
            test(`test page title and url after search flights for ${origin}, ${destination}`, async({kayakFlightsResultPage})=> {
                await test.step('Step1: verify if kayak flights result page have right title', async()=> {
                    await expect.soft(kayakFlightsResultPage.page, 'Test1: verify page title').toHaveTitle(RegExp(`${dmd} – ${amd}`))
                })
                await test.step('Step2: verify if kayak flights result page have right url', async()=>{
                    await expect.soft(kayakFlightsResultPage.page, 'Test2: verify page URL' ).toHaveURL(RegExp(`https://www.kayak.com/flights/${iataOrigin}-${iataDestination}`))
                })
                
            })
            test.skip(`test the layover airports filter for the returned flights ${origin}, ${destination}`, async({page})=> {

            })
        })
    })
})