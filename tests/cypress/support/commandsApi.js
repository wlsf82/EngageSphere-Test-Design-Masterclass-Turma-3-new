
Cypress.Commands.add('getCustomers', () => {
    cy.request({
        method: 'GET',
        url: `http://localhost:3001/customers?page=1&limit=10&size=All&industry=All`,
    })
})

Cypress.Commands.add('getMediumRetailsAmount', () => {
    cy.request({
        method: 'GET',
        url: `http://localhost:3001/customers?page=1&limit=10&size=Medium&industry=Retail`,
    }).then((response) => {
        // Check if the request was successfull
        expect(response.status).to.equal(200);
        // Return the length of the list
        return response.body.pageInfo.totalCustomers;
      });
})
