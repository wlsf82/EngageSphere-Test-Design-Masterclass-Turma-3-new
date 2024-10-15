/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * intercepts GET requests to any URL starting with /customers (including query parameters) and mocks the response using data from the customer.json fixture. 
     *
     * @example cy.mockCustomers()
     */
    mockCustomers(): void | Cypress.Chainable<null>
  }
}
