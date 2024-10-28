const path = require("path");
const API_URL = Cypress.env('API_URL');
const CUSTOMERS_URL = `${API_URL}/customers`;

describe('Home Page -', () => {
  beforeEach(() => {
    cy.setCookie('cookieConsent', 'accepted');
    cy.visit('/')
  })

  it('See welcome message with entered name', () => {
    cy.get('#name').type('Pedro')
    cy.get('h2').contains('Hi Pedro!').should('be.visible')
  })

  context('Customer Details', () => {
    it('It shows and hides the customer address', () => {
      cy.contains('button', 'View').click()
      cy.contains('h2', 'Customer Details').should('be.visible')
      cy.get('button[class*="CustomerDetails_showAddressBtn"]').click()
      cy.contains('h3', 'Address').should('be.visible')
      cy.get('button[class*="CustomerDetails_hideAddressBtn"]').click()
    })

    it('It renders the contact details of a customer', () => {
      cy.get('#sizeFilter').select('Enterprise') 
      cy.contains('button', 'View').click()
      cy.contains('p', 'Brando').should('be.visible')
      cy.contains('p', 'Brando_Kozey48@gmail.com').should('be.visible')
    })
  })

  context('It filters by all sizes (Small, Medium, Enterprise, Large Enterprise, Very Large Enterprise)', () => {
    it('filters by small size', () => {
      cy.intercept(
        'GET',
        `${CUSTOMERS_URL}?page=1&limit=10&size=Small&industry=All`, {
          fixture: 'customers/small',
      }).as('getSmallCustomers');
      cy.get('#sizeFilter').select('Small');
      cy.wait('@getSmallCustomers');
      cy.get('tbody tr').should('have.length', 4);
    })

    it('filters by medium size', () => {
      cy.intercept(
        'GET',
        `${CUSTOMERS_URL}?page=1&limit=10&size=Medium&industry=All`, {
          fixture: 'customers/medium',
      }).as('getMediumCustomers');
      cy.get('#sizeFilter').select('Medium');
      cy.wait('@getMediumCustomers');
      cy.get('tbody tr').should('have.length', 5);
    })

    it('filters by enterprise size', () => {
      cy.intercept(
        'GET',
        `${CUSTOMERS_URL}?page=1&limit=10&size=Enterprise&industry=All`, {
          fixture: 'customers/enterprise',
        }
      ).as('getLargeCustomers');
      cy.get('#sizeFilter').select('Enterprise');
      cy.wait('@getLargeCustomers');
      cy.get('tbody tr').should('have.length', 3);
    })

    it('filters by large enterprise size', () => {
      cy.intercept(
        'GET',
        `${CUSTOMERS_URL}?page=1&limit=10&size=Large%20Enterprise&industry=All`, {
          fixture: 'customers/largeEnterprise',
        }
      ).as('getLargeEnterpriseCustomers');
      cy.get('#sizeFilter').select('Large Enterprise');
      cy.wait('@getLargeEnterpriseCustomers');
      cy.get('tbody tr').should('have.length', 2);
    })

    it('filters by very large enterprise size', () => {
      cy.intercept(
        'GET',
        `${CUSTOMERS_URL}?page=1&limit=10&size=Very%20Large%20Enterprise&industry=All`, {
          fixture: 'customers/veryLargeEnterprise',
        }
      ).as('getVeryLargeEnterpriseCustomers');
      cy.get('#sizeFilter').select('Very Large Enterprise');
      cy.wait('@getVeryLargeEnterpriseCustomers');
      cy.get('tbody tr').should('have.length', 1);
    })
  })

  context('No Customers', () => {
    beforeEach(() => {
      cy.intercept('GET', `${CUSTOMERS_URL}?page=1&limit=10&size=All&industry=All`, {
        fixture: 'customers/empty',
      }).as('getEmptyCustomers');
      cy.setCookie('cookieConsent', 'accepted');
      cy.visit('/');
      cy.wait('@getEmptyCustomers');
    })

    it('disables the name text input field when there are no customers in the database', () => {
      cy.get('#name').should('be.disabled');
    })

    it('shows the image of an empty box and the text "No customers available." when there are no customers in the database', () => {
      cy.get('svg[title="image of an empty box"]').should('be.visible');
      cy.contains('div[class*="EmptyState_noCustomersAvailableText"] > span', 'No customers available.').should('be.visible');
    })
  })

  context('Download CSV', () => {
    beforeEach(() => {
      cy.setCookie('cookieConsent', 'accepted');
      cy.visit('/')
    })

    it('It correctly downloads a list of customers as a CSV file', () => {
      const downloadsFolder = Cypress.config("downloadsFolder");
      cy.readFile(path.join(downloadsFolder, "customers.csv")).should("exist");
    })
  })

})
