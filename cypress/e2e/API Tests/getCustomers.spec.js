const API_URL = Cypress.env('API_URL')
const CUSTOMERS_API_URL = `${Cypress.env('API_URL')}/customers`

describe('API Test - Return customers', () => {
  it('Should return a list of customers', () => {
    cy.request('GET', CUSTOMERS_API_URL)
      .then(({status, body}) => {
        expect(status).to.eq(200);
        expect(body).to.have.property('customers');
        expect(body.customers).to.be.an('array');
        expect(body.customers.length).to.be.greaterThan(0);
      });
  });
});
