Cypress.Commands.add('filterClient', () => {
    cy.get('[data-testid="size-filter"]').select('Medium')
    cy.get('[data-testid="industry-filter"]').select('Technology')
})

Cypress.Commands.add('validateFilter', () => {
    cy.get('[data-testid="size-filter"]').should('have.value', 'Medium')
    cy.get('[data-testid="industry-filter"]').should('have.value', 'Technology')
})

Cypress.Commands.add('fillMessageData', () => {
    cy.get('#messenger-name').type('joao');
    cy.get('#email').type('joao@teste.com');
    cy.get('#message').type('Testando');
})