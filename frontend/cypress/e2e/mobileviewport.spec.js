describe('Tabela de Clientes - Exibição de colunas em viewport móvel', () => {
  beforeEach(() => {
    cy.visit('/');

    // Simula viewport do Galaxy S20 Ultra
    cy.viewport(412, 915);
  });

  it('Mostra as colunas "Nome da Empresa" e "Ação" e oculta as outras colunas', () => {
    cy.contains('th', 'Company name').should('be.visible');
    cy.contains('th', 'Action').should('be.visible');

    cy.contains('th', 'ID').should('not.be.visible');
    cy.contains('th', 'Industry').should('not.be.visible');
    cy.contains('th', 'Number of employees').should('not.be.visible');
    cy.contains('th', 'Size').should('not.be.visible');
  });
});
