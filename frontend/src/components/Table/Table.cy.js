import { mount } from 'cypress/react18';
import Table from '.';

const customers = [
    {
      id: 1,
      name: 'Company 1',
      industry: 'Technology',
      employees: 100,
      size: 'Small',
    },
    {
      id: 2,
      name: 'Company 2',
      industry: 'Health',
      employees: 200,
      size: 'Medium',
    },
    {
      id: 3,
      name: 'Company 3',
      industry: 'Finance',
      employees: 300,
      size: 'Enterprise',
    },
];

describe('Table', () => {
  beforeEach(() => {
    mount(<Table customers={customers} />);
  });

  it('It shows the Company name and Action columns and hides the ID, Industry, Number of Employees, and Size columns in a mobile viewport', () => {
    cy.viewport('iphone-x');
    
    cy.contains('th', 'Company name').should('be.visible');
    cy.contains('th', 'Action').should('be.visible');
    cy.contains('th', 'ID').should('not.be.visible');
    cy.contains('th', 'Industry').should('not.be.visible');
    cy.contains('th', 'Number of employees').should('not.be.visible');
  });
})