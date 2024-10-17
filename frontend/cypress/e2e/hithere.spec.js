describe('Exibe a saudação "Hi, there!" quando nenhum nome é fornecido', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
    });
  
    it('deve exibir "Hi, there!" com a data correta quando nenhum nome é fornecido', () => {
      cy.get('input[data-testid="name"]').clear();
  
      cy.get('[data-testid="table"] h2').should('contain', 'Hi there!');
    });
});  