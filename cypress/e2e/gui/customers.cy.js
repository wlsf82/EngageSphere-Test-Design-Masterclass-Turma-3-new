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

  describe('Messenger Form', () => {
    beforeEach(() => {
      cy.setCookie('cookieConsent', 'accepted');     
      cy.visit('/');
    });
    
    it('It shows and hides a success message when successfully submitting the messenger form', () => {
      const messengerData = {
        name: 'Matheus',
        email: 'matheus@gmail.com',
        message: 'Hello, I need help with something.',
      };
      cy.gui_submitMessenger(messengerData);

      cy.get('[class^="Messenger_success"]').should('be.visible').and('have.text', 'Your message has been sent.');
      cy.get('[class^="Messenger_success"]').should('not.exist');
    });
  });

  describe('Filters', () => {
    beforeEach(() => {
      cy.setCookie('cookieConsent', 'accepted');     
      cy.visit('/');
    });
  
    it('It keeps the filters when coming back from the customer details view', () => {
      const clientFilterData = {
        size: 'Small',
        industry: 'Technology',
      };
      cy.gui_filterClients(clientFilterData);
      cy.get('button[aria-label^="View company:"]').first().click();
      cy.contains('button', 'Back').click();

      cy.findByTestId('size-filter').should('have.value', clientFilterData.size);
      cy.findByTestId('industry-filter').should('have.value', clientFilterData.industry);
    });

    it('It persists the limit of items per page in the local storage when changing the limit', () => {
      const paginationLimit = '20';
      cy.get('[name="pagination-limit"]').select(paginationLimit);

      cy.window().then((win) => {
        expect(win.localStorage.getItem('paginationLimit')).to.eq(paginationLimit);
      });
    });

    describe('Filter by size', () => {
      it('It filters the customers by small size', () => {
        cy.intercept('GET', `${CUSTOMERS_URL}?page=1&limit=10&size=Small&industry=All`, { fixture: 'customers/smallCustomers' }).as('getSmallCustomers');
        cy.get('[data-testid="size-filter"]').select('Small');
        cy.wait('@getSmallCustomers');

        cy.get('tbody tr').should('have.length', 4);
      });

      it('It filters the customers by medium size', () => {
        cy.intercept('GET', `${CUSTOMERS_URL}?page=1&limit=10&size=Medium&industry=All`, { fixture: 'customers/mediumCustomers' }).as('getMediumCustomers');
        cy.get('[data-testid="size-filter"]').select('Medium');
        cy.wait('@getMediumCustomers');

        cy.get('tbody tr').should('have.length', 5);
      });

      it('It filters the customers by enterprise size', () => {
        cy.intercept('GET', `${CUSTOMERS_URL}?page=1&limit=10&size=Enterprise&industry=All`, { fixture: 'customers/enterpriseCustomers' }).as('getLargeCustomers');
        cy.get('[data-testid="size-filter"]').select('Enterprise');
        cy.wait('@getLargeCustomers');

        cy.get('tbody tr').should('have.length', 3);
      });

      it('It filters the customers by large enterprise size', () => {
        cy.intercept('GET', `${CUSTOMERS_URL}?page=1&limit=10&size=Large%20Enterprise&industry=All`, { fixture: 'customers/largeEnterpriseCustomers' }).as('getLargeEnterpriseCustomers');
        cy.get('[data-testid="size-filter"]').select('Large Enterprise');
        cy.wait('@getLargeEnterpriseCustomers');

        cy.get('tbody tr').should('have.length', 2);
      });
      
      it('It filters the customers by very large enterprise size', () => {
        cy.intercept('GET', `${CUSTOMERS_URL}?page=1&limit=10&size=Very%20Large%20Enterprise&industry=All`, { fixture: 'customers/veryLargeEnterpriseCustomers' }).as('getVeryLargeEnterpriseCustomers');
        cy.get('[data-testid="size-filter"]').select('Very Large Enterprise');
        cy.wait('@getVeryLargeEnterpriseCustomers');

        cy.get('tbody tr').should('have.length', 1);
      });

      it('It filters the customers by all sizes', () => {
        cy.get('[data-testid="size-filter"]').select('Enterprise');
        cy.intercept('GET', `${CUSTOMERS_URL}?page=1&limit=10&size=All&industry=All`, { fixture: 'customers/allCustomers' }).as('getAllCustomers');
        cy.get('[data-testid="size-filter"]').select('All');
        cy.wait('@getAllCustomers');

        cy.get('tbody tr').should('have.length', 9);
      });
    });

    describe('Filter by industry', () => {
      it('It filters the customers by logistics industry', () => {
        cy.intercept('GET', `${CUSTOMERS_URL}?page=1&limit=10&size=All&industry=Logistics`, { fixture: 'customers/logisticsCustomers' }).as('getLogisticsCustomers');
        cy.get('[data-testid="industry-filter"]').select('Logistics');
        cy.wait('@getLogisticsCustomers');

        cy.get('tbody tr').should('have.length', 1);
      });

      it('It filters the customers by retail industry', () => {
        cy.intercept('GET', `${CUSTOMERS_URL}?page=1&limit=10&size=All&industry=Retail`, { fixture: 'customers/retailCustomers' }).as('getRetailCustomers');
        cy.get('[data-testid="industry-filter"]').select('Retail');
        cy.wait('@getRetailCustomers');

        cy.get('tbody tr').should('have.length', 1);
      });

      it('It filters the customers by technology industry', () => {
        cy.intercept('GET', `${CUSTOMERS_URL}?page=1&limit=10&size=All&industry=Technology`, { fixture: 'customers/technologyCustomers' }).as('getTechnologyCustomers');
        cy.get('[data-testid="industry-filter"]').select('Technology');
        cy.wait('@getTechnologyCustomers');

        cy.get('tbody tr').should('have.length', 3);
      });

      it('It filters the customers by HR industry', () => {
        cy.intercept('GET', `${CUSTOMERS_URL}?page=1&limit=10&size=All&industry=HR`, { fixture: 'customers/HRCustomers' }).as('getHRCustomers');
        cy.get('[data-testid="industry-filter"]').select('HR');
        cy.wait('@getHRCustomers');

        cy.get('tbody tr').should('have.length', 4);
      });

      it('It filters the customers by finance industry', () => {
        cy.intercept('GET', `${CUSTOMERS_URL}?page=1&limit=10&size=All&industry=Finance`, { fixture: 'customers/financeCustomers' }).as('getFinanceCustomers');
        cy.get('[data-testid="industry-filter"]').select('Finance');
        cy.wait('@getFinanceCustomers');

        cy.get('tbody tr').should('have.length', 6);
      });

      it('It filters the customers by all industries', () => {
        cy.get('[data-testid="industry-filter"]').select('Technology');
        cy.intercept('GET', `${CUSTOMERS_URL}?page=1&limit=10&size=All&industry=All`, { fixture: 'customers/allCustomers' }).as('getAllCustomers');
        cy.get('[data-testid="industry-filter"]').select('All');
        cy.wait('@getAllCustomers');

        cy.get('tbody tr').should('have.length', 9);
      });
    });
  });
});