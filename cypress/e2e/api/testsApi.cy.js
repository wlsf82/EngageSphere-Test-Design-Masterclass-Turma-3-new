describe('Validate the API requests', () => {
  const CUSTOMERS_API_URL = `${Cypress.env('API_URL')}/customers`
  it('Get customers successfully', () => {
    cy.request({
      method: 'GET',
      url: `${CUSTOMERS_API_URL}?page=1&limit=10&size=All&industry=All`,
    }).then(response => {
      expect(response.status).to.equal(200)
    })
  })

  it('Change the page and check the first customers', () => {
    let firstCustomerId = '';
    cy.request({
      method: 'GET',
      url: `${CUSTOMERS_API_URL}?page=1&limit=10&size=All&industry=All`,
    }).then(response => {

      expect(response.status).to.equal(200)
      firstCustomerId = response.body.customers[0].id;
    })

    cy.request({
      method: 'GET',
      url: `${CUSTOMERS_API_URL}?page=2&limit=10&size=All&industry=All`,
    }).then(response => {

      expect(response.status).to.equal(200);
      expect(response.body.customers[0].id).to.not.equal(firstCustomerId)
    })
  })

  it('Change the limits of customers per page', () => {
    cy.request({
      method: 'GET',
      url: `${CUSTOMERS_API_URL}?page=1&limit=10&size=All&industry=All`,
    }).then(response => {

      expect(response.status).to.equal(200);
      expect(response.body.pageInfo.totalPages).to.equal(5);
    })

    cy.request({
      method: 'GET',
      url: `${CUSTOMERS_API_URL}?page=1&limit=20&size=All&industry=All`,
    }).then(response => {

      expect(response.status).to.equal(200);
      expect(response.body.pageInfo.totalPages).to.equal(3);
    })
  })
})
