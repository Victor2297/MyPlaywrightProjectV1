//ts-check
import {test as base} from '@playwright/test'

const test = base.extend({
    person: ['Victor', {option: true}]
})
test.describe('my test', {tag:'@smoke'}, ()=> {

    test.beforeEach(async({page, person})=>{
        console.log('before each', person)
    });
    test(`test1`, async({page, person})=> {
        console.log('22222222222', person)
    });
})