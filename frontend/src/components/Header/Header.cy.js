import Header from '.';

describe('Header', () => {
  beforeEach(() => {
    cy.mount(<Header />);
  });

  it(`renders the header with a heading, theme's toggle, and a text input field`, () => {
    cy.contains('h1', 'EngageSphere').should('be.visible');
    cy.getByClassThatStartsWith('ThemeToggle_button').should('be.visible');
    cy.findByTestId('name').should('be.visible');
  });
});
