describe('Validate the API requests', () => {
  it('Get customers successfully', () => {
    cy.getCustomers().then(response => {
      expect(response.status).to.equal(200)
    })
  })
})
