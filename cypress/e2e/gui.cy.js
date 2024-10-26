/// <reference types = "cypress" />

describe('EngageSphere gui test cases', () => {
  beforeEach(() => {
    Cypress.on('window:before:load', window => {
      window.document.cookie = 'cookieConsent=accepted'
    })
    cy.visit('/')
})

    it('Keeps the filters when coming back from the customer details view ', () => {
      cy.get('select[data-testid="size-filter"]')
       .should('be.visible')
       .select('Medium')

      cy.contains('button', "View")
       .click()
      cy.contains('button', "Back")
       .click()
      
       cy.get('select[data-testid="size-filter"]')
       .should('have.value', 'Medium')
    })

    it('Goes back to the customers list when clicking the "Back" button *', () => {
      cy.contains('button', "View")
       .click()
      
       cy.contains('button', "Back")	
       .click()
      
       cy.contains('p', "Below is our customer list.")
       .should('be.visible')
    })

    it('Renders the footer with the right text and links *', () => {
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
    })

    it('Renders the "Hi there" greeting when no name is provided *', () => {
      cy.contains('h2', 'Hi there')
       .should('be.visible')
    })

    it('Renders the "Hi Joe" greeting when name is provided *', () => {
      cy.get('input[id=name]')
       .type('Joe')
       cy.contains('h2', 'Hi Joe')
       .should('be.visible')
    })

    it('Renders the header with a heading, theme`s toggle, and a text input field', () => {
      cy.get('h1')
       .should('be.visible')
       .contains('EngageSphere')
      cy.get('button[class^=ThemeToggle_button]')
       .should('be.visible')
      cy.get('#name')
       .should('be.visible')
    })

    it('Opens and closes the messenger', () => {
      cy.get('button[class^="Messenger_openCloseButton"')
       .click()
      
       cy.get('div[class^="Messenger_form"')
       .should('be.visible')
      
       cy.get('button[class^="Messenger_openCloseButton"')
       .click()
      
       cy.get('div[class^="Messenger_form"')
       .should('not.exist')
    })

    it('Makes sure all messenger`s fields are mandatory and the first one is focused', () => {
      cy.get('button[class^="Messenger_openCloseButton"')
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
    })

    it('Shows and hides a success message when successfully submitting the messenger form', () => {
      cy.get('button[class^="Messenger_openCloseButton"')
       .click()
      
      cy.get('input[id="messenger-name"]')
       .type('Joe')
      cy.get('input[id="email"]')
       .type('email@test.com')
      cy.get('textarea[id="message"]')
       .type('Hello there!')
      cy.get('button[type="submit"]').click()
      
      cy.get('div[class*="Messenger_success"]')
       .should('exist')
       .and('have.text', 'Your message has been sent.')
      cy.get('div[class*="Messenger_success"]')
       .should('not.exist')
    })

    it('Clears all the messenger`s form fields when filling them, closing the messenger, and opening it again', () => {
      cy.get('button[class*="Messenger_openCloseButton"')
       .click()
      
      cy.get('div[class*="Messenger_form"')
       .should('be.visible')
      
      cy.get('input[id="messenger-name"]')
       .type('Joe')
      cy.get('input[id="email"]')
       .type('email@test.com') 
      cy.get('textarea[id="message"]')
       .type('Hello there!')
      cy.get('button[class*="Messenger_openCloseButton"')
       .click()
      cy.get('button[class*="Messenger_openCloseButton"')
       .click()
      
      cy.get('input[id="messenger-name"]')
       .should('have.value', '')
      cy.get('input[id="email"]')
       .should('have.value', '')
      cy.get('textarea[id="message"]')
       .should('have.value', '')
    })

    it('Shows the Company name and Action columns and hides the ID, Industry, Number of Employees, and Size columns in a mobile viewport', () => {
      cy.viewport('iphone-6')
      
      cy.get('th')
      .contains('Company name').should('be.visible')
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
