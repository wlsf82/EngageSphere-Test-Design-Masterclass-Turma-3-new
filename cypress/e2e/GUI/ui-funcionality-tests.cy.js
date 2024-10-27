describe('EngageSphere', () => {
  beforeEach(() => {
    Cypress.on('window:before:load', window => {
      window.document.cookie = 'cookieConsent=accepted'
    })
    cy.visit('/');
  });

  it('Should maintain filters when returning from customer details', () => {
    cy.get('[data-testid="size-filter"]')
      .select('Small');
    cy.contains('button', 'View')
      .click()
    cy.get('[class^="CustomerDetail"] h2')
      .should('be.visible');
      cy.contains('button', 'Back')
      .click();
    cy.get('[data-testid="size-filter"]')
      .should('have.value', 'Small');
  });

  it('Should return to the customer list after clicking back', () => {
    cy.contains('button', 'View')
      .click()
    cy.get('[class^="CustomerDetail"] h2')
      .should('be.visible');
    cy.contains('button', 'Back')
      .click();
    cy.get('[data-testid="table"]')
      .should('be.visible');
  });

  it('Should display the footer with the correct text and links', () => {
    cy.contains('p', 'Copyright 2024 - Talking About Testing')
    .should('be.visible');
  cy.contains('a', 'Hotmart')
    .should('be.visible')
    .and('have.attr', 'href', 'https://hotmart.com/pt-br/club/cypress-playground-ate-a-nuvem');
  cy.contains('a', 'Udemy')
    .should('be.visible')
    .and('have.attr', 'href', 'https://udemy.com/user/walmyr');
  cy.contains('a', 'Blog')
    .should('be.visible')
    .and('have.attr', 'href', 'https://talkingabouttesting.com');
  cy.contains('a', 'YouTube')
    .should('be.visible')
    .and('have.attr', 'href', 'https://youtube.com/@talkingabouttesting');
  });

  it('Should displays the greeting "Hi, there" when no name is given', () => {
    cy.contains('h2', 'Hi there!')
      .should('be.visible');
  });

  it('Should displays the greeting "Hi, Joe" when the name Joe is given', () => {
    cy.get('input[type="text"]')
      .type('Joe');
    cy.contains('h2', 'Hi Joe!')
      .should('be.visible');
  });

  it('Should display title, theme switcher and input field', () => {
    cy.contains('h1', 'EngageSphere')
      .should('be.visible');
    cy.get('[class^="ThemeToggle_button"]')
      .should('be.visible');
    cy.get('input[type="text"]')
      .should('be.visible');
  });

  it('Should open and close the messenger', () => {
    cy.get('[aria-label="Open messenger"]')
      .click();
    cy.contains('h2', 'How can we help you?')
      .should('be.visible');
    cy.get('[aria-label="Close messenger"]')
      .click();
    cy.get('[class^="Messenger_header"]')
      .should('not.exist');
  });

  it('Should ensures that all messenger fields are mandatory and that the first one is focused', () => {
    cy.get('[aria-label="Open messenger"]').click();
    cy.getByClassStartsWith('Messenger_form')
      .find('input[type="text"]')
      .should('be.focused')
      .and('have.attr', 'required');
    cy.getByClassStartsWith('Messenger_form')
      .find('input[type="email"]')
      .should('have.attr', 'required');
    cy.getByClassStartsWith('Messenger_form')
      .find('textarea')
      .should('have.attr', 'required');
  });

  it('Should show and hide a success message upon successfully sending the messenger form', () => {
    cy.clock();
    cy.get('[aria-label="Open messenger"]')
      .click();
    cy.get('#messenger-name')
      .type('Eduardo Effting');
    cy.get('#email')
      .type('eduardoeffs@gmail.com');
    cy.get('#message')
      .type('Test message');
    cy.get('button[type="submit"]')
      .click();
    cy.contains('[role="alert"]', 'Your message has been sent.')
      .should('be.visible');
    cy.tick(3000);
    cy.get('[role="alert"]')
      .should('not.exist');
  });

  it('Should clears all messenger form fields when you fill them in, close the messenger, and open it again', () => {
    cy.get('[aria-label="Open messenger"]')
      .click();
    cy.get('#messenger-name')
      .type('Eduardo Effting');
    cy.get('#email')
      .type('eduardoeffs@gmail.com');
    cy.get('#message')
      .type('Test message');
    cy.get('[aria-label="Close messenger"]')
      .click();
    cy.get('[aria-label="Open messenger"]')
      .click();
    cy.getByClassStartsWith('Messenger_form')
      .find('input[type="text"]')
      .should('be.focused')
      .and('have.value', '');
    cy.getByClassStartsWith('Messenger_form')
      .find('input[type="email"]')
      .should('have.value', '');
    cy.getByClassStartsWith('Messenger_form')
      .find('textarea')
      .should('have.value', '');
  });

  it('Should display "Company name" and "Action" columns and hide "ID", "Industry", "Number of employees", and "Size" columns', () => {
    cy.viewport('iphone-6');
    cy.contains('th', 'Company name')
      .should('be.visible');
    cy.contains('th', 'Action')
      .should('be.visible');
    cy.contains('th', 'ID')
      .should('not.be.visible');
    cy.contains('th', 'Industry')
      .should('not.be.visible');
    cy.contains('th', 'Number of employees')
      .should('not.be.visible');
    cy.contains('th', 'Size')
      .should('not.be.visible');
  });
});
