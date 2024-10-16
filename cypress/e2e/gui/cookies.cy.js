describe('Cookies - Accept and Refuse cookies', () => {

  beforeEach('Accept and Refuse Cookies', () => {
    cy.visit('http://localhost:3000/')
  })

  it('CT15 - Accept cookies', () => {
    cy.get('.CookieConsent_banner__wrFsc').should('be.visible')
    cy.contains('button', 'Accept').click();
    cy.get('.CookieConsent_banner__wrFsc').should('not.exist')
  })

  it('CT16 - Refuse cookies', () => {
    cy.get('.CookieConsent_banner__wrFsc').should('be.visible')
    cy.contains('button', 'Decline').click()
    cy.get('.CookieConsent_banner__wrFsc').should('not.exist')
  })
})

