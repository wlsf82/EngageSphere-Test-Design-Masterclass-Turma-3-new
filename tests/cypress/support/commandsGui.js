// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

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