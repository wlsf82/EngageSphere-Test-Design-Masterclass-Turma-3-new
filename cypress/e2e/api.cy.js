describe('EngageSphere - API', () => {
  it('returns the correct status and body structure', () => {
    cy.api({
      method: 'GET',
      url: `${Cypress.config('apiUrl')}/customers`
    }).then( response => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('customers')
      expect(response.body).to.have.property('pageInfo')
    })
  })
})