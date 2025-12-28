class ContactUsPage {
    /**
     * @param {import ('playwright').Page} page 
     */
    constructor(page) {
        this.page = page
    }
    //getters
    //contact form
    get contactFormName() {
        return this.page.getByRole('textbox', { name: 'Name' })
    }
    get contactFormEmail() {
        return this.page.getByRole('textbox', { name: 'Email', exact: true })
    }
    get contactFormSubject() {
        return this.page.getByRole('textbox', { name: 'Subject' })
    }
    get contactFormMessage() {
        return this.page.getByRole('textbox', { name: 'Your Message Here' })
    }
    get contactFormChooseFile() {
        return this.page.getByRole('button', { name: 'Choose File' })
    }
    get contactFormSubmitButton() {
        return this.page.getByRole('button', {name:'Submit'})
    }
    //other
    get successMessage() {
        return this.page.locator('#contact-page').getByText('Success! Your details have')
    }
    get homePageButton() {
        return this.page.locator('#form-section').getByRole('link', { name: 'Home' })
    }
    //methods
    async fillNameFromContactForm(userName){
        await this.contactFormName.fill(userName)
    }
    async fillEmailFromContactForm(userEmail){
        await this.contactFormEmail.fill(userEmail)
    }
    async fillSubjectFromContactForm(userSubject){
        await this.contactFormSubject.fill(userSubject)
    }
    async fillMessageFromContactForm(userMessage){
        await this.contactFormMessage.fill(userMessage)
    }
    async fillChooseFileFromContactForm(file) {
        await this.contactFormChooseFile.fill(file)
    }
    async submitTheForm() {
        await this.contactFormSubmitButton.click()
    }

    async fillContactForm(dataSet) {
        await this.fillNameFromContactForm(dataSet.userName)
        await this.fillEmailFromContactForm(dataSet.userEmail)
        await this.fillSubjectFromContactForm(dataSet.userSubject)
        await this.fillMessageFromContactForm(dataSet.userMessage)
        //await this.fillChooseFileFromContactForm(dataSet.userFile)
        await this.submitTheForm()
    }
}
export {ContactUsPage}