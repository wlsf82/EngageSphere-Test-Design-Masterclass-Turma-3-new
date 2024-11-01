describe('Header Component', () => {
    it('Exibe o cabeçalho com título, alternador de tema e campo de entrada de texto', () => {
      cy.visit('/');
  
      cy.contains('h1', 'EngageSphere').should('be.visible');
  
      cy.get('[class^="ThemeToggle_button"]').should('exist');
  
      cy.get('[data-testid="name"]').should('exist');
    });
});  