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
    // Filter the companies
    cy.clock()
    cy.get('[data-testid="size-filter"]').select('Medium').should('have.value', 'Medium')
    cy.get('[data-testid="industry-filter"]').select('Retail').should('have.value', 'Retail')
    cy.tick(10000)
    // Get on API the amount of retails
    cy.getMediumRetailsAmount().then((totalCustomers) => {
      // Check the table lenght
      cy.get('table.Table_container__I-Qpa tbody tr').should('have.length', totalCustomers);
      // Open the details page
      cy.get('[aria-label="View company: Kilback Co"]').click()
      cy.contains("Company ID").should('be.visible')
      // Back to companies list
      cy.contains("Back").click()
      cy.get('[data-testid="size-filter"]').select('Medium').should('be.visible')
      // Check the table lenght
      cy.get('table.Table_container__I-Qpa tbody tr').should('have.length', totalCustomers);
    });
  })

  it('Back to clients list', () => {
    // Open the details page
    cy.get('[aria-label="View company: Lowe Co"]').click()
    cy.contains("Lowe Co").should('be.visible')
    // Back to companies list
    cy.contains("Back").click()
    cy.contains("Hi there!").should('be.visible')
  })

  it('Check footer texts and links', () => {
    // Check Hotmart attributes
    cy.contains('Hotmart')
      .should('have.attr', 'href')
      .and('include', 'https://hotmart.com/');
    // Check Udemy attributes
    cy.contains('Udemy')
      .should('have.attr', 'href')
      .and('eq', 'https://udemy.com/user/walmyr');
    // Check Blog attributes
    cy.contains('Blog')
      .should('have.attr', 'href')
      .and('eq', 'https://talkingabouttesting.com');
    // Check Youtube attributes
    cy.contains('YouTube')
      .should('have.attr', 'href')
      .and('eq', 'https://youtube.com/@talkingabouttesting');
  })

  it('Check welcome message', () => {
    cy.contains("Hi there!").should('be.visible')
    // Type a name
    cy.get('[data-testid="name"]').type('Cicero Henrique')
    cy.contains("Hi Cicero Henrique!").should('be.visible')
  })

  it('Header should have title, theme modifier and input', () => {
    // Check header elements
    cy.get('.Header_container__2fKL4').then(($header) => {
      cy.wrap($header).find('h1').should('have.text', 'EngageSphere');
      cy.wrap($header).find('input[type="text"]').should('exist');
      cy.wrap($header).find('button[class="ThemeToggle_button__kDYIH"]').should('exist');
    });
  })

  it('Open and close the messenger', () => {
    // Open messenger
    cy.get('[aria-label="Open messenger"]').should('be.visible')
    cy.get('[aria-label="Open messenger"]').click()
    // Close messenger
    cy.get('[aria-label="Close messenger"]').should('be.visible')
    cy.get('[aria-label="Close messenger"]').click()
  })

  it('Show and hid alert of sent message', () => {
    cy.clock()
    // Open messenger
    cy.get('[aria-label="Open messenger"]').should('be.visible')
    cy.get('[aria-label="Open messenger"]').click()
    cy.writeMessage()
    // Send message
    cy.get('.Messenger_sendButton__17Bo4').click()
    cy.contains('Your message has been sent.').should('be.visible')
    cy.tick(10000)
    cy.contains('Your message has been sent.').should('not.exist')
  })

  it('Clear and close message form', () => {
    // Open messenger
    cy.get('[aria-label="Open messenger"]').should('be.visible')
    cy.get('[aria-label="Open messenger"]').click()
    cy.writeMessage()
    // Close messenger
    cy.get('[aria-label="Close messenger"]').click()
    // Open messenger
    cy.get('[aria-label="Open messenger"]').should('be.visible')
    cy.get('[aria-label="Open messenger"]').click()
    // Check if the form is empty
    cy.get('#messenger-name').should('have.value', '');
    cy.get('#email').should('have.value', '');
    cy.get('#message').should('have.value', '');
  })
})
