describe('EngageSphere', () => {
  beforeEach(() => {
    cy.mockCustomers().as('getCustomer')

    cy.visit('/')
    cy.wait('@getCustomer')
  })

  it('renders the "Hi there" greeting when no name is provided', () => {
    cy.contains('h2', 'Hi there!').should('be.visible')
  })

  it('renders the "Hi Joe" greeting when name is provided', () => {
    cy.get('[data-testid="name"]').type('Joe')
    cy.contains('h2', 'Hi Joe!').should('be.visible')
  })
})
