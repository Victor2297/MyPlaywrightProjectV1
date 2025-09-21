class ContactUsPage {
    /**
     * @param {import ('playwright').Page} page 
     */
    constructor(page) {
        this.page = page
        this.contactForm = {
            name: page.getByRole('textbox', { name: 'Name' }),
            email: page.getByRole('textbox', { name: 'Email', exact: true }),
            subject: page.getByRole('textbox', { name: 'Subject' }),
            message: page.getByRole('textbox', { name: 'Your Message Here' }),
            chooseFile: page.getByRole('button', { name: 'Choose File' }),
            submitButton: page.getByRole('button', {name:'Submit'})
        }
        this.successMessage = page.locator('#contact-page').getByText('Success! Your details have')
        this.homePageButton = page.locator('#form-section').getByRole('link', { name: 'Home' })
    }

    async fillNameFromContactForm(userName){
        await this.contactForm.name.fill(userName)
    }
    async fillEmailFromContactForm(userEmail){
        await this.contactForm.email.fill(userEmail)
    }
    async fillSubjectFromContactForm(userSubject){
        await this.contactForm.subject.fill(userSubject)
    }
    async fillMessageFromContactForm(userMessage){
        await this.contactForm.message.fill(userMessage)
    }
    async fillChooseFileFromContactForm(file) {
        await this.contactForm.chooseFile.fill(file)
    }
    async submitTheForm() {
        await this.contactForm.submitButton.click()
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