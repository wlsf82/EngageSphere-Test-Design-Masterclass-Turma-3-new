describe('EngageSphere', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('opens and closes the messenger', () => {
    cy.get('[aria-label*="messenger"]').click()
    cy.contains('h2', 'How can we help you?').should('be.visible')

    cy.get('[aria-label*="messenger"]').click()
    cy.contains('h2', 'How can we help you?').should('not.exist')
  })

  it('makes sure all messenger\'s fields are mandatory and the first one is focused', () => {
    cy.get('[aria-label*="messenger"]').click()
    cy.get('#messenger-name').should('be.focused').and('have.attr', 'required')
    cy.get('#email').should('have.attr', 'required')
    cy.get('#message').should('have.attr', 'required')
  })

  it('shows and hides a success message when successfully submitting the messenger form', () => {
    cy.clock()
    cy.get('[aria-label*="messenger"]').click()

    cy.get('#messenger-name').type('Eduardo')
    cy.get('#email').type('eduardo@example.com')
    cy.get('#message').type('example message!')

    cy.contains('button', 'Send').click()

    cy.contains('div', 'Your message has been sent.').should('be.visible')
    cy.tick(3000)
    cy.contains('div', 'Your message has been sent.').should('not.exist')
  })

  it('clears all the messenger\'s form fields when filling them, closing the messenger, and opening it again', () => {
    cy.get('[aria-label*="messenger"]').click()

    cy.get('#messenger-name').type('Eduardo')
    cy.get('#email').type('eduardo@example.com')
    cy.get('#message').type('example message!')

    cy.get('[aria-label*="messenger"]').click()
    cy.get('[aria-label*="messenger"]').click()

    cy.get('#messenger-name').should('be.empty')
    cy.get('#email').should('be.empty')
    cy.get('#message').should('be.empty')
  })
})
