
describe('Filters - Search Clients by size and by industry', () => {

  beforeEach(() => {
    cy.startSession()
  });

  it('Maintains filters when returning from customer details view', () => {
    cy.contains('button', 'Next').should('be.enabled').click()
    cy.get('span').invoke('text', 'Page 2 of 5').should('be.visible')
    cy.contains('button', 'Prev').should('be.enabled')
    cy.contains('button', 'View').click()
    cy.contains('h2', 'Customer Details').should('be.visible')
    cy.contains('button', 'Back').should('be.visible').click()
    cy.get('span').invoke('text', 'Page 2 of 5').should('be.visible')
  })

  it('Filter by each size (Small, Medium, Enterprise, Large Enterprise, Very LargeEnterprise)', () => {

    cy.get('#sizeFilter').find('option').then($options => {

      const optionCount = $options.length
      for (let i = 0; i < optionCount; i++) {

        cy.get('#sizeFilter').select($options[i].value)
        cy.get('#sizeFilter').should('have.value', $options[i].value)
      }
    })
  })

  it('Filter by each industry (Logistics, Retail, Technology, HR, Finance)', () => {
    cy.get('#industryFilter').find('option').then($options => {

      const optionCount = $options.length
      for (let i = 0; i < optionCount; i++) {

        cy.get('#industryFilter').select($options[i].value)
        cy.get('#industryFilter').should('have.value', $options[i].value)
      }
    })
  })
})

