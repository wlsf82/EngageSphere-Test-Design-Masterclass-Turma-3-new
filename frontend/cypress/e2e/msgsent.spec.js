describe('Messenger Component - Envio de mensagem com sucesso', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
      
      cy.get('div[class*="CookieConsent"]').then(($banner) => {
        if ($banner.is(':visible')) {
          $banner.remove();
        }
      });
    });
  
    it('Preenche corretamente os campos e exibe a mensagem de sucesso ao enviar', () => {
      cy.get('button[aria-label="Open messenger"]').click({ force: true });
  
      cy.get('#messenger-name').type('John Doe', { force: true });

      cy.get('#email').type('johndoe@example.com', { force: true });

      cy.get('#message').type('This is a test message.', { force: true });
  
      cy.get('button[type="submit"]').click({ force: true });
  
      cy.get('div[role="alert"]').should('be.visible').and('contain.text', 'Your message has been sent.');
      cy.wait(5000);
      cy.get('div[role="alert"]').should('not.exist');
    });
});  