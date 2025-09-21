//ts-check
import {test} from '../../fixtures/myFixtures'
import {expect} from '@playwright/test'

test.describe('test signUp and login functionalities', ()=> {
    const urls_titles = {
        initial_url: '/login',
        initial_title: 'Automation Exercise - Signup / Login',
        url_after_signup: '/signup',
        title_after_signup: 'Automation Exercise - Signup',
        url_after_login: null,
        title_after_login: null
    }
    test.beforeEach(async({basePage})=> {
        await basePage.openSingUp_Login_Page()
    })
    test.describe('test signup', ()=> {
        let newEmail = (Math.random() + 1).toString(36).substring(5)+'@gmail.com'
        test('test url, title', async({signUpLoginPage})=> {
            //verify url, title before sign up
            await expect.soft(signUpLoginPage.page, 'Test1: we have the correct initial URL').toHaveURL(urls_titles.initial_url)
            await expect.soft(signUpLoginPage.page, 'Test2: we have the correct initial title').toHaveTitle(urls_titles.initial_title)
            await signUpLoginPage.newUserSignUp('v1', 'v14356rfty@gmail.com')
            await expect.soft(signUpLoginPage.page, 'Test3: we have the correct URL after sign up').toHaveURL(urls_titles.url_after_signup)
            await expect.soft(signUpLoginPage.page, 'test4: we have the correct title after sign up').toHaveTitle(urls_titles.title_after_signup)
        })
        test('test name, email and mandatory fields', async({signUpLoginPage})=> {
            const initial_name = 'albert'
            const initial_email = 'albert345rf@gmail.com'
            const password = '123'
            await signUpLoginPage.newUserSignUp(initial_name, initial_email)
            expect.soft(await signUpLoginPage.signUpAccountInformation.name.inputValue(), 'Test1: the name entered initially is used in the next steps').toBe(initial_name)
            expect.soft(await signUpLoginPage.signUpAccountInformation.email.inputValue(), 'Test2: the email address entered initially is used in the next steps').toBe(initial_email)
            //try to create account without filling all mandatory fields
            await signUpLoginPage.signUpAddressInformation.createAccountButton.click()
            //the field first name is not focused
            await expect.soft(signUpLoginPage.signUpAddressInformation.firstName, 'Test3: the field "First Name" is not focused').not.toBeFocused()
            //the field password is focused
            await expect.soft(signUpLoginPage.signUpAccountInformation.password, 'Test4: the field "Password" is focused').toBeFocused()
            //fill the password field and againd try to create account
            await signUpLoginPage.signUpAccountInformation.password.fill(password)
            await signUpLoginPage.signUpAddressInformation.createAccountButton.click()
            //verify if the focus is set for next field, in our case is first name
            await expect.soft(signUpLoginPage.signUpAddressInformation.firstName, 'Test5: the field "First Name" is focused').toBeFocused()
        });
        [
            {
                iteration: 1,
                name:'hust',
                email:newEmail,
                dataSet:{
                    password:'123',
                    firstName: 'Vrerti',
                    lastName:'Vvasdd',
                    address: 'Street1',
                    state: 'US',
                    city: 'NYC',
                    zipCode: '123V',
                    mobileNumber: '12341234'
                }
            },
            {
                iteration: 2,
                name:'hust',
                email:'4cl2c6u@gmail.com',//existing email
                dataSet:{
                    password:'123',
                    firstName: 'Vrerti',
                    lastName:'Vvasdd',
                    address: 'Street1',
                    state: 'US',
                    city: 'NYC',
                    zipCode: '123V',
                    mobileNumber: '12341234'
                }
            }
        ].forEach(({iteration, name, email, dataSet})=> {
            test(`test successfuly account creating ${iteration}`, {tag:'@signup'}, async({signUpLoginPage})=> {
                await signUpLoginPage.newUserSignUp(name, email)
                if (iteration === 1) {
                    //fill mandatory fields from sign up form
                    await signUpLoginPage.fullyFillSignUpForm(dataSet)
                    //verify successfuly account creating
                    await expect.soft(signUpLoginPage.page, 'Test1: after sign up we are redirected to right url').toHaveURL('/account_created')
                    await expect.soft(signUpLoginPage.page, 'Test2: after sign up we have right page title').toHaveTitle('Automation Exercise - Account Created')
                    await expect.soft(signUpLoginPage.account_creted_page.confirmationMessage, 'Test3: after sign up we see Account Created message').toBeVisible()
                }
                else {
                    //Register User with existing email
                    //test will fail
                    await expect.soft(signUpLoginPage.page, 'Test4: after repeat sign up with already existing email we are redirected to right url').toHaveURL(urls_titles.initial_url)
                    //test will pass
                    await expect.soft(signUpLoginPage.page, 'Test5: after repeat sign up with already existing email we have right page title').toHaveTitle(urls_titles.initial_title)
                    //test will pass
                    await expect.soft(signUpLoginPage.signUpForm.emailAlreadyExistMesage, 'Test6: after repeat sign up with already existing email we see corresponding message').toBeVisible()
                }
            })
        })
    })
    test.describe('test login', ()=> {
        test('verify mandatory fields', async({signUpLoginPage})=> {
            //try to login without email and pasword
            await signUpLoginPage.loginToYourAccount("", "")
            await expect.soft(signUpLoginPage.loginForm.loginPassword, 'Test1: the focus is not set on the second field').not.toBeFocused()
            await expect.soft(signUpLoginPage.loginForm.loginEmailAdress, 'Test2: the focus is set to the first field').toBeFocused()
            //fill first field and try to login with empty password
            await signUpLoginPage.loginToYourAccount("vcityu1@gmail.com", "")
            await expect.soft(signUpLoginPage.loginForm.loginPassword, 'Test3: the focus is set to the next mandatory field').toBeFocused()

        })
        test('test login with unexisting email', async({signUpLoginPage})=> {
            //try to login with unexisting email
            await signUpLoginPage.loginToYourAccount('vrtyi@gmail.com', '123')
            await expect.soft(signUpLoginPage.page, 'Test1: when we try to login with unexisting email the url is not changed').toHaveURL(urls_titles.initial_url)
            await expect.soft(signUpLoginPage.page, 'Test2: when we try to login with unexisting email the title is not changed').toHaveTitle(urls_titles.initial_title)
            await expect.soft(signUpLoginPage.loginForm.wrongEmailOrPasswordMessage, 'Test3: when we try to login with unexisting email is diplayed the corresponding message').toBeVisible()
        })
        test('test successully login', async({signUpLoginPage, basePage})=> {
            await signUpLoginPage.loginToYourAccount('34yjgqyf@gmail.com', '123')
            await expect.soft(basePage.logoutButton, 'Test1: after login we see logout button on the navigation bar').toBeVisible()
            await expect.soft(basePage.deleteAccountButton, 'Tst2: after login we see delte account button on the navigation bar').toBeVisible()
        })
    })
})