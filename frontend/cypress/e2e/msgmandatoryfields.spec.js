describe('Messenger Component', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
  
      cy.get('p:contains("We use")').then(($msg) => {
        if ($msg.is(':visible')) {
          $msg.remove();
        }
      });
    });
  
    it('Garante que todos os campos do messenger são obrigatórios e que o primeiro está focado', () => {
      cy.get('button[aria-label="Open messenger"]').click({ force: true });
  
      cy.get('#messenger-name').should('be.focused');
  
      cy.get('button[type="submit"]').click({ force: true });
  
      cy.get('#messenger-name').then(($input) => {
        expect($input[0].validity.valid).to.be.false;
      });
  
      cy.get('#email').then(($input) => {
        expect($input[0].validity.valid).to.be.false;
      });
  
      cy.get('#message').then(($input) => {
        expect($input[0].validity.valid).to.be.false;
      });
  
      cy.get('input:invalid, textarea:invalid').should('have.length', 3);
    });
});  