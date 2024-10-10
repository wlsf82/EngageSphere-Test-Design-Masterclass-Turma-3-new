it('Recupera clientes com sucesso', () => {
    cy.request('http://localhost:3001/customers?page=1&limit=5&size=All&industry=All')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('customers').and.to.be.an('array');
      });
});