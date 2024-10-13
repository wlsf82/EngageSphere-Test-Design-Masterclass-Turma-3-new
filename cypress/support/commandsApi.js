
const CUSTOMERS_API_URL = `${Cypress.env('API_URL')}/customers`

Cypress.Commands.add('getCustomers', () => {
    cy.request({
        method: 'GET',
        url: `${CUSTOMERS_API_URL}?**?page=1&limit=10&size=All&industry=All`,
    })
})

Cypress.Commands.add('getMediumRetailsAmount', () => {
    cy.request({
        method: 'GET',
        url: `${CUSTOMERS_API_URL}?page=1&limit=10&size=Medium&industry=Retail`,
    }).then((response) => {
        // Check if the request was successfull
        expect(response.status).to.equal(200);
        // Return the length of the list
        return response.body.pageInfo.totalCustomers;
      });
})
