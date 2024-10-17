describe('Header Component', () => {
    it('Exibe o cabeçalho com título, alternador de tema e campo de entrada de texto', () => {
      cy.visit('http://localhost:3000');
  
      cy.get('h1').should('contain', 'EngageSphere');
  
      cy.get('.ThemeToggle_button__2Wb3U').should('exist');
  
      cy.get('[data-testid="name"]').should('exist');
    });
});  