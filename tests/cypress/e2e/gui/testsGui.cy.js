describe('Validate the GUI', () => {
  beforeEach(() => {
    cy.intercept({
      method: 'GET',
      url: 'http://localhost:3001/customers?**',
    }).as('getCustomers');
    cy.openEngageSphere()
    cy.visit('/')
  })

  it('Keep filters when returning from the customer details view', () => {
    cy.get('[data-testid="size-filter"]').select('Medium').should('have.value', 'Medium')
    cy.get('[data-testid="industry-filter"]').select('Retail').should('have.value', 'Retail')
    cy.get('table.Table_container__I-Qpa tbody tr').should('have.length', 2);
    cy.get('[aria-label="View company: Kilback Co"]').click()
    cy.contains("Company ID").should('be.visible')
    cy.contains("Back").click()
    cy.get('[data-testid="size-filter"]').select('Medium').should('be.visible')
    cy.get('table.Table_container__I-Qpa tbody tr').should('have.length', 2);
  })

  it('Back to clients list', () => {
    cy.get('[aria-label="View company: Lowe Co"]').click()
    cy.contains("Lowe Co").should('be.visible')
    cy.contains("Back").click()
    cy.contains("Hi there!").should('be.visible')
  })

  it('Check footer texts and links', () => {
    cy.contains('Hotmart')
      .should('have.attr', 'href')
      .and('include', 'https://hotmart.com/');
    cy.contains('Udemy')
      .should('have.attr', 'href')
      .and('eq', 'https://udemy.com/user/walmyr');
    cy.contains('Blog')
      .should('have.attr', 'href')
      .and('eq', 'https://talkingabouttesting.com');
    cy.contains('YouTube')
      .should('have.attr', 'href')
      .and('eq', 'https://youtube.com/@talkingabouttesting');
  })

  it('Check welcome message', () => {
    cy.contains("Hi there!").should('be.visible')
    cy.get('[data-testid="name"]').type('Cicero Henrique')
    cy.contains("Hi Cicero Henrique!").should('be.visible')
  })

  it('Header should have title, theme modifier and input', () => {
    it('should contain an h1 and an input element', () => {
      cy.get('.Header_container__2fKL4').then(($header) => {
        cy.wrap($header).find('h1').should('have.text', 'EngageSphere');
        cy.wrap($header).find('input[type="text"]').should('exist');
        cy.wrap($header).find('button[class="ThemeToggle_button__kDYIH"]').should('exist');
      });
    });
  })

  it('Open and close the messenger', () => {
    cy.get('[aria-label="Open messenger"]').should('be.visible')
    cy.get('[aria-label="Open messenger"]').click()
    cy.get('[aria-label="Close messenger"]').should('be.visible')
    cy.get('[aria-label="Close messenger"]').click()
  })

  it('Show and hid alert of sent message', () => {
    cy.get('[aria-label="Open messenger"]').should('be.visible')
    cy.get('[aria-label="Open messenger"]').click()
    cy.sendMessage()
    cy.get('.Messenger_sendButton__17Bo4').click()
    cy.contains('Your message has been sent.').should('be.visible')
    cy.contains('Your message has been sent.').should('not.exist')
  })

  it('Clear and close message form', () => {
    cy.get('[aria-label="Open messenger"]').should('be.visible')
    cy.get('[aria-label="Open messenger"]').click()
    cy.sendMessage()
    cy.get('[aria-label="Close messenger"]').click()
    cy.get('[aria-label="Open messenger"]').should('be.visible')
    cy.get('[aria-label="Open messenger"]').click()
    cy.get('#messenger-name').should('have.value', '');
    cy.get('#email').should('have.value', '');
    cy.get('#message').should('have.value', '');
  })

})