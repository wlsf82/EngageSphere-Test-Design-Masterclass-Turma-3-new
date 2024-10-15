describe('EngageSphere', () => {
  beforeEach(() => {
    cy.mockCustomers().as('getCustomer')

    cy.visit('/')

    cy.wait('@getCustomer')
  })

  it('keeps the filters when coming back from the customer details view', () => {
    cy.get('[data-testid="size-filter"]').select('Small')
    cy.get('[data-testid="industry-filter"]').select('Technology')
    cy.contains('button', 'View').click()
    cy.contains('h2', 'Customer Details').should('be.visible')

    cy.contains('button', 'Back').click()

    cy.contains('h1', 'EngageSphere').should('be.visible')
    cy.get('[data-testid="size-filter"]').should('have.value', 'Small')
    cy.get('[data-testid="industry-filter"]').should('have.value', 'Technology')
  })

  it('goes back to the customers list when clicking the "Back" button', () => {
    cy.contains('button', 'View').click()
    cy.contains('h2', 'Customer Details').should('be.visible')

    cy.contains('button', 'Back').click()

    cy.get('[data-testid="table"]').should('be.visible')
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
