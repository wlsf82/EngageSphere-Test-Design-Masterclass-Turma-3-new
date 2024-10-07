describe('API Test', () => {

  it('Verifica o código de status 200', () => {

    cy.request({
      method: 'GET',
      url: 'http://localhost:3001/customers'
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

});