Cypress.Commands.add('getByClassStartsWith', (classPrefix) => {
  return cy.get(`[class^="${classPrefix}"]`);
});