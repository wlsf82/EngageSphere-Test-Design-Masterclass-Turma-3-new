/// <reference types = "cypress" />

const API_URL = Cypress.env('API_URL')
const CUSTOMERS_API_URL = `${Cypress.env('API_URL')}/customers`

describe('API Test Suite', () => {
  it('Should return status 200 for GET request', () => {
    cy.api('CUSTOMERS_API_URL')
      .its('status')
      .should('equal', 200);
    })
})
