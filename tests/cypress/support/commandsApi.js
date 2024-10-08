
Cypress.Commands.add('getCustomers', () => {
    cy.request({
        method: 'GET',
        url: `http://localhost:3001/customers?page=1&limit=10&size=All&industry=All`,
    })
})