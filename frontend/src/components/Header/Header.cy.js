import { mount } from 'cypress/react18';
import Header from '.';

describe('Header', () => {
  beforeEach(() => {
    mount(<Header />);
  });

  it(`renders the header with a heading, theme's toggle, and a text input field`, () => {
    cy.contains('h1', 'EngageSphere').should('be.visible');
    cy.getByClassStartsWith('ThemeToggle_button').should('be.visible');
    cy.findByTestId('name').should('be.visible');
  });
});
