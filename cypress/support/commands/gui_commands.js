Cypress.Commands.add('gui_filterClients', ({size = "All", industry = "All"}) => {
  cy.get('[data-testid="size-filter"]').select(size);
  cy.get('[data-testid="industry-filter"]').select(industry);
});

Cypress.Commands.add('gui_submitMessenger', ({name = "Matheus", email = "matheus@ggmail.com", message = "Hello!"}) => {
  cy.get('button[class^="Messenger_openCloseButton"]').click();
  cy.get('#messenger-name').type(name);
  cy.get('#email').type(email);
  cy.get('#message').type(message);
  cy.get('button[class^="Messenger_sendButton"]').click();
});