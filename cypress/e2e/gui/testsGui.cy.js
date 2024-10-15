describe('Validate the GUI', () => {
  beforeEach(() => {
    const BASE_URL = `${Cypress.env('BASE_URL')}`
    const CUSTOMERS_API_URL = `${Cypress.env('API_URL')}/customers`
    cy.intercept({
      method: 'GET',
      url: `${CUSTOMERS_API_URL}?**`,
    }).as('getCustomers');
    cy.visitPageAndAcceptCookies()
    cy.visit(BASE_URL)
  })

  it('Apply a filter, go to a customer page, return to the list page, and check if the previous filters are selected', () => {
    // Filter the companies
    cy.get('[data-testid="size-filter"]').select('Medium')
    cy.get('[data-testid="industry-filter"]').select('Retail')
    cy.wait('@getCustomers')
    cy.get('[aria-label="View company: Kilback Co"]').click()
    cy.contains("Company ID").should('be.visible')
    // Back to companies list
    cy.contains("Back").click()

    cy.get('[data-testid="size-filter"]').should('have.value', 'Medium')
    cy.get('[data-testid="industry-filter"]').should('have.value', 'Retail')
  })

  it('Move to custmer page and return to clients list', () => {
    // Open the details page
    cy.get('button[aria-label^="View company:"]').first().click()
    cy.contains("Customer Details").should('be.visible')
    // Back to companies list
    cy.contains("Back").click()

    cy.contains("Hi there!").should('be.visible')
  })

  it('Check footer texts and links', () => {
    // Check Hotmart attributes
    cy.contains('a', 'Hotmart')
      .should('be.visible')
      .and('have.attr', 'href', 'https://hotmart.com/pt-br/club/cypress-playground-ate-a-nuvem')

    // Check Udemy attributes
    cy.contains('a', 'Udemy')
      .should('be.visible')
      .and('have.attr', 'href', 'https://udemy.com/user/walmyr')

    // Check Blog attributes
    cy.contains('a', 'Blog')
      .should('be.visible')
      .and('have.attr', 'href', 'https://talkingabouttesting.com')

    // Check Youtube attributes
    cy.contains('a', 'YouTube')
      .should('be.visible')
      .and('have.attr', 'href', 'https://youtube.com/@talkingabouttesting')

    // Check Copyright attributes
    cy.contains('p', 'Copyright 2024 - Talking About Testing')
      .should('be.visible')
  })

  it('Check welcome message', () => {
    cy.contains("Hi there!").should('be.visible')
    cy.get('[data-testid="name"]').type('Cicero Henrique')

    cy.contains("Hi Cicero Henrique!").should('be.visible')
  })

  it('Header should have title, theme modifier and input', () => {
    cy.contains('h1', 'EngageSphere').should('be.visible')
    cy.get('[class^="ThemeToggle_button"]').should('be.visible')
    cy.get('input[type="text"]').should('be.visible')
  })

  it('Open and close the messenger', () => {
    // Open messenger
    cy.get('[aria-label="Open messenger"]').should('be.visible').click()
    // Close messenger
    cy.get('[aria-label="Close messenger"]').should('be.visible').click()

    cy.get('[aria-label="Open messenger"]').should('be.visible')
  })

  it('Show and hide alert of sent message', () => {
    cy.clock()
    // Open messenger
    cy.get('[aria-label="Open messenger"]').should('be.visible').click()
    cy.get('#messenger-name').type('test');
    cy.get('#email').type('test@test.com');
    cy.get('#message').type('Message test');
    // Send message
    cy.get('[class^="Messenger_sendButton"]').click()
    cy.contains('Your message has been sent.').should('be.visible')
    cy.tick(3000)

    cy.contains('Your message has been sent.').should('not.exist')
  })

  it('Clear and close message form', () => {
    // Open messenger
    cy.get('[aria-label="Open messenger"]').should('be.visible').click()
    cy.get('#messenger-name').type('test');
    cy.get('#email').type('test@test.com');
    cy.get('#message').type('Message test');
    // Close messenger
    cy.get('[aria-label="Close messenger"]').click()
    // Open messenger
    cy.get('[aria-label="Open messenger"]').should('be.visible').click()

    // Check if the form is empty
    cy.get('#messenger-name').should('have.value', '');
    cy.get('#email').should('have.value', '');
    cy.get('#message').should('have.value', '');
  })
})