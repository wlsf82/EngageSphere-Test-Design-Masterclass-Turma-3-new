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
    cy.get('button[aria-label="Open messenger"]').click();
    
    cy.get('#messenger-name').should('be.focused');

    cy.get('button[type="submit"]').click();
    
    cy.get('#messenger-name').then(($input) => {
      expect($input[0].validity.valid).to.be.false;
    });
    cy.get('#email').then(($input) => {
      expect($input[0].validity.valid).to.be.false;
    });
    cy.get('#message').then(($input) => {
      expect($input[0].validity.valid).to.be.false;
    });
    cy.get('input:invalid, textarea:invalid').should('have.length', 3);
  });

  it('Preenche os campos, apaga, fecha e reabre o messenger', () => {
    cy.get('button[aria-label="Open messenger"]').click();
  
    cy.get('#messenger-name').type('John Doe');
    cy.get('#email').type('johndoe@example.com');
    cy.get('#message').type('This is a test message.');
  
    cy.get('#messenger-name').clear();
    cy.get('#email').clear();
    cy.get('#message').clear();
  
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
