describe('Messenger Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');

    cy.get('p:contains("We use")').then(($msg) => {
      if ($msg.is(':visible')) {
        $msg.hide();
      }
    });
  });

  it('Abre e fecha o messenger', () => {
    cy.contains('How can we help you?').should('not.exist');

    cy.get('button[aria-label="Open messenger"]').click();

    cy.contains('How can we help you?').should('be.visible');

    cy.get('button[aria-label="Close messenger"]').click();

    cy.contains('How can we help you?').should('not.exist');
  });
});