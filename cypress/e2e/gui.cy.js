/// <reference types = "cypress" />

describe('EngageSphere gui test cases', () => {
  beforeEach(() => {
      cy.visit('/')
      cy.get('button')
      .contains('Accept')
      .click()
  });
    it('Keeps the filters when coming back from the customer details view ', () => {
      cy.get('select[data-testid="size-filter"]')
      .should('be.visible')
      .select('Medium')
      .should('have.value', 'Medium')
      cy.get('button')
      .eq(5)
      .click();
      cy.get('button')
      .contains('Back')
      .click();
      cy.get('select[data-testid="size-filter"]')
      .should('have.value', 'Medium')
    });
    it('It goes back to the customers list when clicking the "Back" button *', () => {
      cy.get('button')
      .eq(5)
      .click();
      cy.get('button')
      .contains('Back')
      .click();
      cy.get('p').eq(0)
      .should('have.text', 'Below is our customer list.')
      .and('be.visible')
    });
    it('It renders the footer with the right text and links *', () => {
      cy.get('footer')
      .should('be.visible')
      .contains('Copyright 2024 - Talking About Testing')
      cy.get('a[href="https://hotmart.com/pt-br/club/cypress-playground-ate-a-nuvem"]')
      .should('have.text', 'Hotmart')
      cy.get('a[href="https://udemy.com/user/walmyr" ]')
      .should('have.text', 'Udemy')
      cy.get('a[href="https://talkingabouttesting.com" ]')
      .should('have.text', 'Blog')
      cy.get('a[href="https://youtube.com/@talkingabouttesting" ]')
      .should('have.text', 'YouTube')
    });
    it('It renders the "Hi there" greeting when no name is provided *', () => {
      cy.get('input[id=name]')
      .should('have.value', '')
      cy.get('h2')
      .should('contain', 'Hi there!')
    });
    it('It renders the "Hi Joe" greeting when name is provided *', () => {
      cy.get('input[id=name]')
      .type('Joe')
      .should('have.value', 'Joe')
      cy.get('h2')
      .should('contain', 'Hi Joe!')
    });
    it('It renders the header with a heading, theme`s toggle, and a text input field', () => {
      cy.get('.Header_container__7BmbC')
      .should('be.visible')
      .contains('EngageSphere')
      cy.get('.ThemeToggle_container__d5Yr2')
      .should('be.visible')
      cy.get('input[id=name]')
      .should('be.visible')
    });
    it('It opens and closes the messenger', () => {
      cy.get('button[class="Messenger_openCloseButton__Kb07C"')
      .click()
      cy.get('div[class="Messenger_form__UbId4"')
      .should('be.visible')
      cy.get('button[class="Messenger_openCloseButton__Kb07C"')
      .click()
      cy.get('div[class="Messenger_form__UbId4"')
      .should('not.exist')
      
    });
    it('It makes sure all messenger`s fields are mandatory and the first one is focused', () => {
      cy.get('button[class="Messenger_openCloseButton__Kb07C"')
      .click()
      cy.get('input[id="messenger-name"]')
      .should('have.focus')
      .and('have.prop', 'required', true)
      cy.get('input[id="email"]')
      .should('be.visible')
      .and('have.prop', 'required', true)
      cy.get('textarea[id="message"]')
      .should('be.visible')
      .and('have.prop', 'required', true)
    });
    it('It shows and hides a success message when successfully submitting the messenger form', () => {
      cy.get('button[class="Messenger_openCloseButton__Kb07C"')
      .click()
      cy.get('input[id="messenger-name"]')
      .type('Joe')
      cy.get('input[id="email"]')
      .type('email@test.com')
      cy.get('textarea[id="message"]')
      .type('Hello there!')
      cy.get('button[type="submit"]').click()
      cy.get('.Messenger_success__Zcwtj')
      .should('exist')
      .and('have.text', 'Your message has been sent.')
    });
    it('It clears all the messenger`s form fields when filling them, closing the messenger, and opening it again', () => {
      cy.get('button[class="Messenger_openCloseButton__Kb07C"')
      .click()
      cy.get('div[class="Messenger_form__UbId4"')
      .should('be.visible')
      cy.get('input[id="messenger-name"]')
      .type('Joe')
      .clear()
      .should('have.value', '')
      cy.get('input[id="email"]')
      .type('email@test.com')
      .clear()
      .should('have.value', '') 
      cy.get('textarea[id="message"]')
      .type('Hello there!')
      .clear()
      .should('have.value', '')
      cy.get('button[class="Messenger_openCloseButton__Kb07C"')
      .click()
      cy.get('div[class="Messenger_form__UbId4"')
      .should('not.exist')
      cy.get('button[class="Messenger_openCloseButton__Kb07C"')
      .should('be.visible')
      .click()
      cy.get('div[class="Messenger_form__UbId4"')
      .should('be.visible')
      
    });
    it('It shows the Company name and Action columns and hides the ID, Industry, Number of Employees, and Size columns in a mobile viewport', () => {
      cy.viewport('iphone-6')
      cy.get('th').
      contains('Company name').should('be.visible')
      cy.get('th')
      .contains('Action').should('be.visible')
      cy.get('th')
      .contains('ID').should('not.be.visible')
      cy.get('th')
      .contains('Industry').should('not.be.visible')
      cy.get('th')
      .contains('Number of employees').should('not.be.visible')
      cy.get('th')
      .contains('Size').should('not.be.visible')
    });    
  });
