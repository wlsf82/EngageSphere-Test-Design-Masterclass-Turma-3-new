import { mount } from 'cypress/react18';
import Greeting from '.';

describe('Greeting', () => {
  it('It renders the "Hi there" greeting when no name is provided', () => {
    mount(<Greeting />);

    cy.contains('Hi there!').should('be.visible');
  });

  it('It renders the "Hi {name}" greeting when the name is provided', () => {
    mount(<Greeting name='Matheus' />);

    cy.contains('Hi Matheus!').should('be.visible');
  });

  it('It renders the current date', () => {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    mount(<Greeting />);
    
    cy.contains(`It is ${today.toLocaleDateString('en-US', options)}`).should('be.visible');
  });
});