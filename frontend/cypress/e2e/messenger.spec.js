describe('Messenger Component', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.removeCookieConsentBanner();
  });

  it('Abre e fecha o messenger', () => {
    cy.contains('How can we help you?').should('not.exist');

    cy.get('button[aria-label="Open messenger"]').click();
    cy.contains('How can we help you?').should('be.visible');

    cy.get('button[aria-label="Close messenger"]').click();
    cy.contains('How can we help you?').should('not.exist');
  });

  it('Garante que todos os campos do messenger são obrigatórios e que o primeiro está focado', () => {
    it('makes sure all fields are mandatory and the first one is focused', () => {
      cy.getByClassThatStartsWith('Messenger_form')
        .find('input[type="text"]')
        .should('be.focused')
        .and('have.attr', 'required')
      cy.getByClassThatStartsWith('Messenger_form')
        .find('input[type="email"]')
        .should('have.attr', 'required')
      cy.getByClassThatStartsWith('Messenger_form')
        .find('textarea')
        .should('have.attr', 'required')
    })
  });

  it('Preenche os campos, fecha e reabre o messenger, verificando que os campos estão limpos', () => {
    cy.get('button[aria-label="Open messenger"]').click();
  
    cy.get('#messenger-name').type('John Doe');
    cy.get('#email').type('johndoe@example.com');
    cy.get('#message').type('This is a test message.');
  
    cy.get('button[aria-label="Close messenger"]').click();
  
    cy.get('[class^="Messenger_header"]').should('not.exist');

    cy.get('button[aria-label="Open messenger"]').click();
  
    cy.get('#messenger-name').should('have.value', '');
    cy.get('#email').should('have.value', '');
    cy.get('#message').should('have.value', '');
  });

  it('Preenche corretamente os campos e exibe a mensagem de sucesso ao enviar', () => {
    cy.get('button[aria-label="Open messenger"]').click();

    cy.get('#messenger-name').type('John Doe');
    cy.get('#email').type('johndoe@example.com');
    cy.get('#message').type('This is a test message.');

    cy.get('button[type="submit"]').click();
    
    cy.get('div[role="alert"]').should('be.visible').and('contain.text', 'Your message has been sent.');
    cy.get('div[role="alert"]').should('not.exist');
  });
});
