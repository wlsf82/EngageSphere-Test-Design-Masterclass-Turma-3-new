Cypress.Commands.add('getByClassThatStartsWith', (classPrefix) => {
  return cy.get(`[class^="${classPrefix}"]`);
});
