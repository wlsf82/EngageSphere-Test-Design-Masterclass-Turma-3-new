describe('GUI Tests', () => {
  beforeEach(() => {
    Cypress.on('window:before:load', window => {
      window.document.cookie = 'cookieConsent=accepted'
    })
    cy.visit('/');
  });

  it('Should maintain filters when returning from customer details', () => {
    cy.get('[data-testid="size-filter"]')
      .select('Small');
    cy.get('button[aria-label^="View company:"]')
      .first()
      .click()
    cy.get('[class^="CustomerDetail"] h2')
      .should('be.visible');
    cy.get('button')
      .contains('Back')
      .click();
    cy.get('[data-testid="size-filter"]')
      .should('have.value', 'Small');
  });

  it('Should return to the customer list after clicking back', () => {
    cy.get('button[aria-label^="View company:"]')
      .first()
      .click();
    cy.get('[class^="CustomerDetail"] h2')
      .should('be.visible');
    cy.get('button')
      .contains('Back')
      .click();
    cy.get('[data-testid="table"]').should('be.visible')
  });

  it.only('Should display the footer with the correct text and links', () => {
    cy.contains('p', 'Copyright 2024 - Talking About Testing')
    .should('be.visible')
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
  });

  it('Should displays the greeting "Hi, there" when no name is given', () => {
    cy.get('input[type="text"]').should('have.value', '');
    cy.get('[data-testid="table"] h2').should('contain.text', 'Hi there!');
  });

  it('Should displays the greeting "Hi, Joe" when the name Joe is given', () => {
    cy.get('input[type="text"]').type('Joe');
    cy.get('[data-testid="table"] h2').should('contain.text', 'Hi Joe!');
  });

  it('Should display title, theme switcher and input fielda', () => {
    cy.get('h1').should('contain.text', 'EngageSphere');
    cy.get('.ThemeToggle_button__dKJr0').should('be.visible')
    cy.get('input[type="text"]').should('be.visible');
  });

  it('Should open and close the messenger', () => {
    cy.get('[aria-label="Open messenger"]').click();
    cy.get('.Messenger_header__7JITT').should('contain.text', 'How can we help you?');
    cy.get('[aria-label="Close messenger"]').click();
  });

  it('Should ensures that all messenger fields are mandatory and that the first one is focused', () => {
    cy.get('[aria-label="Open messenger"]').click();
    cy.get('.Messenger_input__xCorb, textarea').each(($el) => {
      cy.wrap($el).should('have.attr', 'required');
    });
    cy.get('.Messenger_input__xCorb').first().should('have.focus');
  });

  it('Should show and hide a success message upon successfully sending the messenger form', () => {
    cy.get('[aria-label="Open messenger"]').click();
    cy.get('#messenger-name').type('Eduardo Effting');
    cy.get('#email').type('eduardoeffs@gmail.com');
    cy.get('#message').type('Test message');
    cy.get('button[type="submit"]').click();
    cy.get('[role="alert"]').should('be.visible').and('contain', 'Your message has been sent.');
    cy.wait(3000);
    cy.get('[role="alert"]').should('not.exist');
  });

  it('Should clears all messenger form fields when you fill them in, close the messenger, and open it again', () => {
    cy.get('[aria-label="Open messenger"]').click();
    cy.get('#messenger-name').type('Eduardo Effting');
    cy.get('#email').type('eduardoeffs@gmail.com');
    cy.get('#message').type('Test message');
    cy.get('button[type="submit"]').click();
    cy.get('.Messenger_input__xCorb, textarea').each(($el) => {
      cy.wrap($el).should('have.value', '');
    });
    cy.get('[aria-label="Close messenger"]').click();
    cy.get('[aria-label="Open messenger"]').click();
    cy.get('.Messenger_input__xCorb, textarea').each(($el) => {
      cy.wrap($el).should('have.value', '');
    });
  });

  it('Should display "Company name" and "Action" columns and hide "ID", "Industry", "Number of employees", and "Size" columns', () => {
    cy.viewport('iphone-6');
    cy.get('table')
      .contains('Company name')
      .should('be.visible');
    cy.get('table')
      .contains('Action')
      .should('be.visible');
    cy.get('table')
      .contains('ID')
      .should('not.be.visible');
    cy.get('table')
      .contains('Industry')
      .should('not.be.visible');
    cy.get('table')
      .contains('Number of employees')
      .should('not.be.visible');
    cy.get('table')
      .contains('Size')
      .should('not.be.visible');
  });
});