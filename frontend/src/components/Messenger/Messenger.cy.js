import Messenger from '.';

describe('Messenger', () => {
  beforeEach(() => {
    cy.mount(<Messenger />);
  });

  const openCloseButton = 'Messenger_openCloseButton';

  it('opens and closes the messenger', () => {
    cy.getByClassThatStartsWith(openCloseButton).click();

    cy.contains('h2', 'How can we help you?').should('be.visible');
    
    cy.getByClassThatStartsWith(openCloseButton).click();
    
    cy.getByClassThatStartsWith('Messenger_box').should('not.exist');
  });

  it(`makes sure all messenger's fields are mandatory and the first one is focused`, () => {
    cy.getByClassThatStartsWith(openCloseButton).click();

    cy.get('#messenger-name')
      .should('be.focused')
      .and('have.attr', 'required');
    cy.get('#email').should('have.attr', 'required');
    cy.get('#message').should('have.attr', 'required');
  });

  it(`clears all the messenger's form fields when filling them, closing the messenger, and opening it again`, () => {
    cy.getByClassThatStartsWith(openCloseButton).click();
    cy.get('#messenger-name').type('Matheus');
    cy.get('#email').type('matheus@gmail.com');
    cy.get('#message').type('Hello, I need help with something.');
    cy.get('button[aria-label="Close messenger"]').click();
    cy.getByClassThatStartsWith(openCloseButton).click();

    cy.get('#messenger-name').should('have.value', '');
    cy.get('#email').should('have.value', '');
    cy.get('#message').should('have.value', '');
  });
});
