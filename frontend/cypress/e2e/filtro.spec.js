describe('Filtro de Clientes - Mantém Filtros ao Voltar dos Detalhes', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/customers*', {
      statusCode: 200,
      body: {
        customers: [
          { id: 1, name: 'Customer 1', industry: 'Technology', size: 'Medium' },
          { id: 2, name: 'Customer 2', industry: 'Technology', size: 'Medium' }
        ],
        pageInfo: { currentPage: 1, totalPages: 1, totalCustomers: 2 }
      }
    }).as('getFilteredCustomers');
    
    cy.visit('/');
    
    cy.get('[data-testid="size-filter"]').select('Medium');
    cy.get('[data-testid="industry-filter"]').select('Technology');
    
    cy.wait('@getFilteredCustomers');
    
    cy.get('[data-testid="table"]').should('exist');
    cy.get('tbody tr').should('have.length', 2);
  });

  it('deve manter os filtros aplicados após voltar da página de detalhes do cliente', () => {
    cy.contains('button', 'View').click();
    
    cy.get('h2').contains('Customer Details');
    
    cy.contains('button', 'Back').click({ force: true });
    
    cy.get('[data-testid="size-filter"]').should('have.value', 'Medium');
    cy.get('[data-testid="industry-filter"]').should('have.value', 'Technology');
    
    cy.get('tbody tr').should('have.length', 2);
  });
});