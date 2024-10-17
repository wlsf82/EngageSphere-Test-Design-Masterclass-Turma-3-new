describe('Filtro de Clientes - Mantém Filtros ao Voltar dos Detalhes', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
  
      cy.get('[data-testid="size-filter"]').select('Medium');
      cy.get('[data-testid="industry-filter"]').select('Technology');
  
      cy.get('[data-testid="table"]').should('exist');
      cy.get('tbody tr').should('have.length.greaterThan', 0);
    });
  
    it('deve manter os filtros aplicados após voltar da página de detalhes do cliente', () => {
      cy.get('tbody tr').first().find('button[aria-label^="View company"]').click();
  
      cy.get('h2').contains('Customer Details');
      
      cy.contains('button', 'Back').click({ force: true });
  
      cy.get('[data-testid="size-filter"]').should('have.value', 'Medium');
      cy.get('[data-testid="industry-filter"]').should('have.value', 'Technology');
  
      cy.get('tbody tr').should('have.length.greaterThan', 0);
    });
});  