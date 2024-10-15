describe('EngageSphere', () => {
  beforeEach(() => {
    cy.mockCustomers().as('getCustomer')

    cy.visit('/')
    cy.injectAxe()
  })

  it('It finds no a11y issues in light mode in the customer table', () => {
    cy.checkA11y()
  })

  it('It finds no a11y issues in dark mode in the customer table', () => {
    cy.get('[aria-label*="theme"]').click()

    cy.checkA11y()
  })

  it('It finds on a11y issues with the messenger\'s bubble button in dark mode', () => {
    cy.get('[aria-label*="theme"]').click()

    cy.checkA11y('[aria-label*="messenger"]')
  })

  context('Customer View page', () => {
    beforeEach(() => {
      cy.wait('@getCustomer')

      cy.contains('button', 'View').click()
      cy.contains('button', 'Show address').click()
    })

    it('It finds no a11y issues in light mode in the customer details and address view', () => {
      cy.checkA11y()
    })

    it('It finds no a11y issues in dark mode in the customer details and address view', () => {
      cy.get('[aria-label*="theme"]').click()

      cy.checkA11y()
    })
  })
})
