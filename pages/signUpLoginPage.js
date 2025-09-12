class SignUpLoginPage {
    /**
     * @param {import('playwright').Page} page 
     */
    constructor(page) {
        this.page = page
        //login form from /login
        this.loginForm = {
            loginEmailAdress: page.locator('//*[@data-qa="login-email"]'),
            loginPassword: page.locator('//*[@data-qa="login-password"]'),
            loginButton: page.locator('//*[@data-qa="login-button"]')
        }
        //singUp form from /login
        this.signUpForm = {
            name: page.locator('//*[@data-qa="signup-name"]'),
            signUpEmail: page.locator('//*[@data-qa="signup-email"]'),
            signUpButton: page.locator('//*[@data-qa="signup-button"]'),
            emailAlreadyExistMesage: page.getByText('Email Address already exist!')   
        }
        //signUp form from /signup
        this.signUpAccountInformation = {
            titleMr: page.getByRole('radio', { name: 'Mr.' }),
            titleMrs: page.getByRole('radio', { name: 'Mrs.' }),
            name: page.getByRole('textbox', { name: 'Name *', exact: true }),
            email: page.getByRole('textbox', { name: 'Email *'}),
            password: page.getByRole('textbox', { name: 'Password *' }),
            days: page.locator('#days'),
            months: page.locator('#months'),
            years: page.locator('#years'),
            newsletterCheckbox: page.getByRole('checkbox', { name: 'Sign up for our newsletter!' }),
            specialOfferChckbox: page.getByRole('checkbox', { name: 'Receive special offers from' })
        }
        //signUp form from /signup
        this.signUpAddressInformation = {
            firstName: page.getByRole('textbox', { name: 'First name *' }),
            lastName: page.getByRole('textbox', { name: 'Last name *' }),
            company: page.getByRole('textbox', { name: 'Company', exact: true }),
            address: page.getByRole('textbox', { name: 'Address * (Street address, P.' }),
            address2: page.getByRole('textbox', { name: 'Address 2' }),
            country: page.getByLabel('Country *'),
            state: page.getByRole('textbox', { name: 'State *' }),
            city: page.getByRole('textbox', { name: 'City * Zipcode *' }),
            zipCode: page.locator('#zipcode'),
            mobileNumber: page.getByRole('textbox', { name: 'Mobile Number *' }),
            createAccountButton: page.getByRole('button', { name: 'Create Account' })
        }
        //elements from account created page
        this.account_creted_page = {
            confirmationMessage: page.locator('//*[text()="Account Created!"]')
        }
    }
    //login
    async fillLoginEmailAdress(email) {
        await this.loginForm.loginEmailAdress.fill(email)
    }
    async fillLoginPassword(password) {
        await this.loginForm.loginPassword.fill(password)
    }
    async login() {
        await this.loginForm.loginButton.click()
    }

    async loginToYourAccount(email, password) {
        await this.fillLoginEmailAdress(email)
        await this.fillLoginPassword(password)
        await this.login()
    }
    //signup
    async fillSignUpName(name) {
        await this.signUpForm.name.fill(name)
    }
    async fillSignUpEmailAddress(email) {
        await this.signUpForm.signUpEmail.fill(email)
    }
    async signup() {
        await this.signUpForm.signUpButton.click()
    }

    async newUserSignUp(name, email) {
        await this.fillSignUpName(name)
        await this.fillSignUpEmailAddress(email)
        await this.signup()
    }
    //fill the full form from /signup
    //fill only mandatory fields
    async fullyFillSignUpForm(dataSet) {
        await this.signUpAccountInformation.password.fill(dataSet.password)
        await this.signUpAddressInformation.firstName.fill(dataSet.firstName)
        await this.signUpAddressInformation.lastName.fill(dataSet.lastName)
        await this.signUpAddressInformation.address.fill(dataSet.address)
        await this.signUpAddressInformation.state.fill(dataSet.state)
        await this.signUpAddressInformation.city.fill(dataSet.city)
        await this.signUpAddressInformation.zipCode.fill(dataSet.zipCode)
        await this.signUpAddressInformation.mobileNumber.fill(dataSet.mobileNumber)
        await this.signUpAddressInformation.createAccountButton.click()
    }
}
export {SignUpLoginPage}