describe('API Test - Return customers', () => {
  it('Should return a list of customers', () => {
    cy.request('GET', 'http://localhost:3001/customers')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('customers');
        expect(response.body.customers).to.be.an('array');
        expect(response.body.customers.length).to.be.greaterThan(0);
      });
  });
});