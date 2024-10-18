describe('Tabela de Clientes - Exibição de colunas em viewport móvel', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
  
      // Simula viewport do Galaxy S20 Ultra
      cy.viewport(412, 915);
    });
  
    it('Mostra as colunas "Nome da Empresa" e "Ação" e oculta as outras colunas', () => {
      cy.get('th').contains('Company name').should('be.visible');
      cy.get('th').contains('Action').should('be.visible');
  
      cy.get('th').contains('ID').should('not.be.visible');
      cy.get('th').contains('Industry').should('not.be.visible');
      cy.get('th').contains('Number of employees ').should('not.be.visible');
      cy.get('th').contains('Size').should('not.be.visible');
    });
});  