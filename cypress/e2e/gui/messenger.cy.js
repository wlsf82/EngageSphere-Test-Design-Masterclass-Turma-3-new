describe('Messenger', () => {

  beforeEach(() => {
    cy.startSession()
  })

  it('Open and close the messenger', () => {
    cy.get('button[class*="Messenger_openCloseButton"]')
      .click();
    cy.contains('h2', 'How can we help you?')
      .should('be.visible')
    cy.get('button[class*="Messenger_openCloseButton"]')
      .click()
  })

  it.only('Ensures that all messenger fields are required and that the first one is focused', () => {

    cy.get('button[class*="Messenger_openCloseButton"]')
      .click();
    cy.contains('h2', 'How can we help you?')
      .should('be.visible')

    cy.get('button[class*="Messenger_sendButton"]').click()

    cy.get('#messenger-name').should('have.attr', 'required')
    cy.get('#email').should('have.attr', 'required')
    cy.get('#message').should('have.attr', 'required')
    cy.get('#messenger-name').should('be.focused')
  })

  it('Garante que o primeiro campo está focado', () => {
    cy.get('input#messenger-name').should('be.focused')
  });

  it('Shows and hides a success message when successfully submitting the messenger form', () => {
    cy.fillFormFromMessangerAndSend();
    cy.contains('div', 'Your message has been sent.').should('not.exist')
  })

  it('Clears all messenger form fields when you fill them in, close the messenger and open it again', () => {
    cy.fillFormMessangerAndClearInformations()
  })
})