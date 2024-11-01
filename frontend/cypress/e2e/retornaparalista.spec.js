describe('Retorna à lista de clientes ao clicar no botão "Voltar" do Customer Details', () => {
    it('deve retornar à lista de clientes ao clicar no botão "Voltar"', () => {
        cy.visit('/');

        cy.contains('button', 'View').click();

        cy.contains('h2', 'Customer Details').should('be.visible');
    
        cy.contains('button', 'Back').click({ force: true });
    
        cy.get('[data-testid="table"]').should('exist');
        cy.get('tbody tr').should('have.length.greaterThan', 0);
    });
});  