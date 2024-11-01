describe('Greeting Message with Name', () => {
    it('Exibindo "Hi, Joe" quando o nome é fornecido', () => {
      cy.visit('/');
  
      cy.get('[data-testid="name"]').type('Joe');
  
      cy.get('[data-testid="table"] h2').should('contain', 'Hi Joe!');
    });
});  