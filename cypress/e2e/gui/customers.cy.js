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
});