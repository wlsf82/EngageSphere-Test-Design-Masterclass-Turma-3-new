
Cypress.Commands.add('writeMessage', (locator) => {
  cy.get('#messenger-name').type('test');
  cy.get('#email').type('test@test.com');
  cy.get('#message').type('Message test');
})

Cypress.Commands.add('visitPageAndAcceptCookies', () => {
  const BASE_URL = `${Cypress.env('BASE_URL')}`
  cy.session([], () => {
    cy.visit(BASE_URL);
    cy.contains('button', 'Accept').click()
    cy.get('.CookieConsent_content__y4iEy').should('not.exist')
  });
});
