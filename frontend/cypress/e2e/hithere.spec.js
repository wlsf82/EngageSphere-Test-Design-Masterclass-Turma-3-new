describe('Exibe a saudação "Hi, there!" quando nenhum nome é fornecido', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('deve exibir "Hi, there!" com a data correta quando nenhum nome é fornecido', () => {
      cy.get('input[data-testid="name"]').clear();
  
      cy.contains('h2', 'Hi there!').should('be.visible');
    });
});  