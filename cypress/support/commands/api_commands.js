const API_URL = Cypress.env('API_URL');

Cypress.Commands.add('api_getCustomers', () => {
  cy.request({
    method: 'GET',
    url: `${API_URL}/customers`,
  });
});
