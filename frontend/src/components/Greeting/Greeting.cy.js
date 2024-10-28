import Greeting from '.';

const today = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const todayText = `${today.toLocaleDateString('en-US', options)}`;

describe('Greeting', () => {
  it('It renders the "Hi there" greeting when no name is provided', () => {
    cy.mount(<Greeting />);

    cy.findByText(`Hi there! It is ${todayText}`).should('be.visible');
  });

  it('It renders the "Hi {name}" greeting when the name is provided', () => {
    cy.mount(<Greeting name='Matheus' />);

    cy.findByText(`Hi Matheus! It is ${todayText}`).should('be.visible');
  });

  it('It renders the "Hi Squirrel 🐿" greeting when the name is "Squirrel"', () => {
    cy.mount(<Greeting name='Squirrel' />);

    cy.contains(`Hi Squirrel!`).should('be.visible');
    cy.get('.lucide-squirrel').should('be.visible');
  });
});
