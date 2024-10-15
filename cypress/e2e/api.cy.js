const API_URL = Cypress.env('API_URL')
const CUSTOMERS_API_URL = `${Cypress.env('API_URL')}/customers`

describe('API Test', () => {
  it('Verifica o código de status 200', () => {
    cy.request(CUSTOMERS_API_URL)
      .its('status')
      .should('eq', 200)
  })
});
