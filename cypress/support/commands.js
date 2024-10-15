/// <reference path="./commands.d.ts" />

Cypress.Commands.add('mockCustomers', () => {
  cy.intercept({
    method: 'GET',
    url: `${Cypress.env('apiUrl')}/customers*`
  },
  {
    fixture: 'customer.json'
  }
  )
})
