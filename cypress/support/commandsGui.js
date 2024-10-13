
Cypress.Commands.add('writeMessage', (locator) => {
  cy.get('#messenger-name').type('test');
  cy.get('#email').type('test@test.com');
  cy.get('#message').type('Message test');
})

Cypress.Commands.add('openEngageSphere', () => {
  cy.session([], () => {
    cy.visit('/');
    cy.contains('button', 'Accept').click()
    cy.get('.CookieConsent_content__y4iEy').should('not.exist')
  });
});
