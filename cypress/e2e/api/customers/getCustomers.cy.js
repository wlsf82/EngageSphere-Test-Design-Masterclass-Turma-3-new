describe('Get Customers', () => {
  it('it returns the correct status and body structure', () => {
    cy.api_getCustomers().then((response) => {
      expect(response.status).to.eq(200);
      const customers = response.body.customers;
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
