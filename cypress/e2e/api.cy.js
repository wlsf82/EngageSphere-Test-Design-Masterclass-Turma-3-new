/// <reference types = "cypress" />

const API_URL = Cypress.env('API_URL');

describe('API Test Suite', () => {
  it('should return status 200 for GET request', () => {
    cy.api('GET','API_URL')
      .then((status) => {
        expect(status).to.eq(200)
      });
    });
});
