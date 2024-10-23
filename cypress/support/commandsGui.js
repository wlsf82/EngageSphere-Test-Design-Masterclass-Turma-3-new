
Cypress.Commands.add('visitPageAndAcceptCookies', () => {
  cy.session([], () => {
    Cypress.on('window:before:load', window => {
      window.document.cookie = 'cookieConsent=accepted'
    })
    cy.visit('/');
  });
});
