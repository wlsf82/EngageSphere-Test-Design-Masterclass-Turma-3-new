const API_URL = Cypress.env('API_URL');

describe('Get Customers', () => {
  it('returns the correct status and body structure', () => {
    cy.request({
      method: 'GET',
      url: `${API_URL}/customers`,
    }).then(({ status, body }) => {
      expect(status).to.eq(200);
      const customers = body.customers;
      customers.forEach((customer) => {
        expect(customer).to.have.property('id');
        expect(customer).to.have.property('name');
        expect(customer).to.have.property('employees');
        expect(customer).to.have.property('size');
        expect(customer).to.have.property('industry');
        expect(customer).to.have.property('contactInfo');
        expect(customer).to.have.property('address');
      });
    });
  });
});
