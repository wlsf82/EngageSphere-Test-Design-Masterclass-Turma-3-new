
Cypress.Commands.add('visitPageAndAcceptCookies', () => {
  const BASE_URL = `${Cypress.env('BASE_URL')}`
  cy.session([], () => {
    Cypress.on('window:before:load', window => {
      window.document.cookie = 'cookieConsent=accepted'
    })
    cy.visit(BASE_URL);
  });
});
