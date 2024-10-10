const API_URL = Cypress.env('API_URL');
const CUSTOMERS_URL = `${API_URL}/customers`;

describe('Customers', () => {
  describe('View', () => {
    beforeEach(() => {
      cy.setCookie('cookieConsent', 'accepted');     
      cy.visit('/');
    });

    it('It goes back to the customers list when clicking the "Back" button', () => {
      cy.get('button[aria-label^="View company:"]').first().click();
      cy.contains('button', 'Back').click();

      cy.contains('p', 'Below is our customer list.').should('be.visible');
    });
  });

  describe('Empty State', () => {
    beforeEach(() => {
      cy.setCookie('cookieConsent', 'accepted');     
      cy.visit('/');
      cy.intercept('GET', `${CUSTOMERS_URL}?page=1&limit=10&size=All&industry=All`, { fixture: 'customers/emptyCustomers' }).as('getEmptyCustomers');
      cy.get('[data-testid="size-filter"]').select('All');
      cy.wait('@getEmptyCustomers');
    });

    it('It shows the image of an empty box and the text "No customers available." when there are no customers in the database', () => {
      cy.get('svg[title="image of an empty box"]').should('be.visible');
      cy.contains('span', 'No customers available.').should('be.visible');
    });

    it('It disables the name text input field when there are no customers in the database', () => {
      cy.get('#name').should('be.disabled');
    })
  });

});