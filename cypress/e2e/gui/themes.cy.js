describe('Light and Dark mode', () => {
  it('CT26 - Switches to dark mode and then back to light mode ', () => {
    cy.startSession()
    cy.get('button').should('have.attr', 'aria-label', 'theme light activated')
    cy.get('.ThemeToggle_container__5t74S .ThemeToggle_button__X4DlE').click()
    cy.get('button').should('have.attr', 'aria-label', 'theme dark activated')
    cy.get('.ThemeToggle_container__5t74S .ThemeToggle_button__X4DlE').click()
    cy.get('button').should('have.attr', 'aria-label', 'theme light activated')
  })
})

