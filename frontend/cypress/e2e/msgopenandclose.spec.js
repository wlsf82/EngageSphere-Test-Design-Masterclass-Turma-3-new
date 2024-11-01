describe('Messenger Component - Preenche, apaga e reabre o messenger', () => {
    beforeEach(() => {
      cy.visit('/');
      
      cy.get('div[class*="CookieConsent"]').then(($banner) => {
        if ($banner.is(':visible')) {
          $banner.remove();
        }
      });
    });
  
    it('Preenche os campos, apaga, fecha e reabre o messenger', () => {
      cy.get('button[aria-label="Open messenger"]').click({ force: true });
  
      cy.get('#messenger-name').type('John Doe', { force: true });
  
      cy.get('#email').type('johndoe@example.com', { force: true });
  
      cy.get('#message').type('This is a test message.', { force: true });
  
      cy.get('#messenger-name').clear({ force: true });
      cy.get('#email').clear({ force: true });
      cy.get('#message').clear({ force: true });
  
      cy.get('button[aria-label="Close messenger"]').click({ force: true });
  
      cy.get('h2').should('not.exist');
  
      cy.get('button[aria-label="Open messenger"]').click({ force: true });
  
      cy.get('#messenger-name').should('have.value', '');
      cy.get('#email').should('have.value', '');
      cy.get('#message').should('have.value', '');
    });
});  