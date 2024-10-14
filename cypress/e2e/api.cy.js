describe('EngageSphere - API', () => {
  it('returns the correct status and body structure', () => {
    cy.api({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/customers`
    }).then(({ status, body }) => {
      expect(status).to.eq(200)
      expect(body).to.have.property('customers')
      expect(body).to.have.property('pageInfo')
    })
  })
})
