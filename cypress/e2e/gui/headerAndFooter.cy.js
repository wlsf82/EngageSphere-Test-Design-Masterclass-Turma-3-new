describe('EngageSphere', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('renders the footer with the right text and links', () => {
    cy.contains('a', 'Hotmart')
      .should('be.visible')
      .and('have.attr', 'href', 'https://hotmart.com/pt-br/club/cypress-playground-ate-a-nuvem')
    cy.contains('a', 'Udemy')
      .should('be.visible')
      .and('have.attr', 'href', 'https://udemy.com/user/walmyr')
    cy.contains('a', 'Blog')
      .should('be.visible')
      .and('have.attr', 'href', 'https://talkingabouttesting.com')
    cy.contains('a', 'YouTube')
      .should('be.visible')
      .and('have.attr', 'href', 'https://youtube.com/@talkingabouttesting')
    cy.contains('p', 'Copyright 2024 - Talking About Testing')
      .should('be.visible')
  })

  it('renders the header with a heading, theme\'s toggle, and a text input field', () => {
    cy.contains('h1', 'EngageSphere').should('be.visible')
    cy.get('[aria-label*="theme"]').should('be.visible')
    cy.get('[data-testid="name"]').should('be.visible')
  })
})
