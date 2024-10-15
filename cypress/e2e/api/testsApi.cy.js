describe('Validate the API requests', () => {
  const CUSTOMERS_API_URL = `${Cypress.env('API_URL')}/customers`
  it('Get customers successfully', () => {
    cy.request({
      method: 'GET',
      url: `${CUSTOMERS_API_URL}?**?page=1&limit=10&size=All&industry=All`,
    }).then(response => {
      expect(response.status).to.equal(200)
    })
  })
})
