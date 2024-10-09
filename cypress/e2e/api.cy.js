/// <reference types = "cypress" />


describe('API Test Suite', () => {
 
    it('should return status 200 for POST request', () => {
      cy.api({
      method: 'GET',
      url: 'http://localhost:3001/customers?page=1&limit=10&size=All&industry=All',
      }).should((response) => {
      expect(response.status).to.eq(200);
      });
    });
});
