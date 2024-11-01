describe('Exibe o rodapé com o texto e links corretos', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('deve exibir o rodapé com o texto e links corretos', () => {
    cy.get('[data-testid="footer"]').should('be.visible');

    cy.get('[data-testid="footer"]').contains('Copyright 2024 - Talking About Testing');

    cy.get('[data-testid="footer"]')
      .find('a[href="https://hotmart.com/pt-br/club/cypress-playground-ate-a-nuvem"]')
      .should('be.visible')
      .contains('Hotmart');

    cy.get('[data-testid="footer"]')
      .find('a[href="https://udemy.com/user/walmyr"]')
      .should('be.visible')
      .contains('Udemy');

    cy.get('[data-testid="footer"]')
      .find('a[href="https://talkingabouttesting.com"]')
      .should('be.visible')
      .contains('Blog');

    cy.get('[data-testid="footer"]')
      .find('a[href="https://youtube.com/@talkingabouttesting"]')
      .should('be.visible')
      .contains('YouTube');
  });
});
