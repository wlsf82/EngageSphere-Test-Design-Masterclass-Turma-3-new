describe('EngageSphere GUI Tests', () => {
  beforeEach(() => {
    Cypress.on('window:before:load', window => {
      window.document.cookie = 'cookieConsent=accepted'
    })
    cy.visit('/')
  })

  context('Header and Footer', () => {
    it('renders the footer with the right text and links', () => {
      cy.contains('a', 'Hotmart')
        .should('be.visible')
        .and('have.attr', 'href', 'https://hotmart.com/pt-br/club/cypress-playground-ate-a-nuvem')
      cy.contains('a', 'Udemy')
        .should('be.visible')
        .and('have.attr', 'href', 'https://udemy.com/user/walmyr')
      cy.contains('a', 'Blog')
        .should('be.visible')
        .and('have.attr', 'href', 'https://talkingabouttesting.com')
      cy.contains('a', 'YouTube')
        .should('be.visible')
        .and('have.attr', 'href', 'https://youtube.com/@talkingabouttesting')
      cy.contains('p', 'Copyright 2024 - Talking About Testing')
        .should('be.visible')
    })

    it('renders the header with a heading, theme\'s toggle, and a text input field', () => {
      cy.contains('h1', 'EngageSphere').should('be.visible')
      cy.get('[aria-label*="theme"]').should('be.visible')
      cy.get('[data-testid="name"]').should('be.visible')
    })
  })

  context('Customer View', () => {
    it('keeps the filters when coming back from the customer details view', () => {
      cy.get('[data-testid="size-filter"]').select('Small')
      cy.get('[data-testid="industry-filter"]').select('Finance')
      cy.contains('button', 'View').click()
      cy.contains('h2', 'Customer Details').should('be.visible')

      cy.contains('button', 'Back').click()

      cy.contains('h1', 'EngageSphere').should('be.visible')
      cy.get('[data-testid="size-filter"]').should('have.value', 'Small')
      cy.get('[data-testid="industry-filter"]').should('have.value', 'Finance')
    })

    it('goes back to the customers list when clicking the "Back" button', () => {
      cy.contains('button', 'View').click()
      cy.contains('h2', 'Customer Details').should('be.visible')

      cy.contains('button', 'Back').click()

      cy.get('[data-testid="table"]').should('be.visible')
    })
  })

  context('Greeting', () => {
    it('renders the "Hi there" greeting when no name is provided', () => {
      cy.contains('h2', 'Hi there!').should('be.visible')
    })

    it('renders the "Hi Joe" greeting when name is provided', () => {
      cy.get('[data-testid="name"]').type('Joe')
      cy.contains('h2', 'Hi Joe!').should('be.visible')
    })
  })

  context('Messenger', () => {
    it('opens and closes the messenger', () => {
      cy.get('[aria-label*="messenger"]').click()
      cy.contains('h2', 'How can we help you?').should('be.visible')

      cy.get('[aria-label*="messenger"]').click()
      cy.contains('h2', 'How can we help you?').should('not.exist')
    })

    it('makes sure all messenger\'s fields are mandatory and the first one is focused', () => {
      cy.get('[aria-label*="messenger"]').click()
      cy.get('#messenger-name').should('be.focused').and('have.attr', 'required')
      cy.get('#email').should('have.attr', 'required')
      cy.get('#message').should('have.attr', 'required')
    })

    it('shows and hides a success message when successfully submitting the messenger form', () => {
      cy.clock()
      cy.get('[aria-label*="messenger"]').click()

      cy.get('#messenger-name').type('Eduardo')
      cy.get('#email').type('eduardo@example.com')
      cy.get('#message').type('example message!')

      cy.contains('button', 'Send').click()

      cy.contains('div', 'Your message has been sent.').should('be.visible')
      cy.tick(3000)
      cy.contains('div', 'Your message has been sent.').should('not.exist')
    })

    it('clears all the messenger\'s form fields when filling them, closing the messenger, and opening it again', () => {
      cy.get('[aria-label*="messenger"]').click()

      cy.get('#messenger-name').type('Eduardo')
      cy.get('#email').type('eduardo@example.com')
      cy.get('#message').type('example message!')

      cy.get('[aria-label*="messenger"]').click()
      cy.get('[aria-label*="messenger"]').click()

      cy.get('#messenger-name').should('be.empty')
      cy.get('#email').should('be.empty')
      cy.get('#message').should('be.empty')
    })
  })

  context('Mobile Viewport', { viewportWidth: 468 }, () => {
    it(
      'shows the Company name and Action columns and hides the ID, Industry, Number of Employees, and Size columns',
      () => {
        cy.contains('th', 'ID').should('not.be.visible')
        cy.contains('th', 'Company name').should('be.visible')
        cy.contains('th', 'Industry').should('not.be.visible')
        cy.contains('th', 'Number of employees ').should('not.be.visible')
        cy.contains('th', 'Size').should('not.be.visible')
        cy.contains('th', 'Action').should('be.visible')
      })
  })
})
