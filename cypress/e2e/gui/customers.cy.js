const API_URL = Cypress.env('API_URL');
const CUSTOMERS_URL = `${API_URL}/customers`;

describe('Customers', () => {
  beforeEach(() => {
    cy.setCookie('cookieConsent', 'accepted');
    cy.visit('/');
  });

  context('View', () => {
    it('goes back to the customers list when clicking the "Back" button', () => {
      cy.contains('button', 'View').click();
      cy.contains('button', 'Back').click();

      cy.contains('p', 'Below is our customer list.').should('be.visible');
    });

    it('shows a Loading... fallback element before the initial customers fetch', () => {
      cy.intercept(
        'GET',
        `${CUSTOMERS_URL}?page=1&limit=10&size=All&industry=All`,
        (req) => {
          req.reply((res) => {
            res.setDelay(4000);
          });
        }
      ).as('getDelayedCustomers');
      cy.visit('/');
      cy.wait('@getDelayedCustomers');
      cy.contains('p', 'Loading...').should('be.visible');
    });

    context('Empty State', () => {
      beforeEach(() => {
        cy.intercept('GET', `${CUSTOMERS_URL}?page=1&limit=10&size=All&industry=All`, {
          fixture: 'customers/emptyCustomers',
        }).as('getEmptyCustomers');
        cy.visit('/');
        cy.wait('@getEmptyCustomers');
      });

      it('shows the image of an empty box and the text "No customers available." when there are no customers in the database', () => {
        cy.get('svg[title="image of an empty box"]').should('be.visible');
        cy.contains('span', 'No customers available.').should('be.visible');
      });

      it('disables the name text input field when there are no customers in the database', () => {
        cy.get('#name').should('be.disabled');
      });
    });
  });

  context('Messenger Form', () => {
    it('shows and hides a success message when successfully submitting the messenger form', () => {
      const messengerData = {
        name: 'Matheus',
        email: 'matheus@gmail.com',
        message: 'Hello, I need help with something.',
      };

      cy.getByClassStartsWith('Messenger_openCloseButton').click();
      cy.get('#messenger-name').type(messengerData.name);
      cy.get('#email').type(messengerData.email);
      cy.get('#message').type(messengerData.message);
      cy.clock();
      cy.getByClassStartsWith('Messenger_sendButton').click();

      cy.getByClassStartsWith('Messenger_success')
        .should('be.visible')
        .and('have.text', 'Your message has been sent.');
      cy.tick(3000);
      cy.getByClassStartsWith('Messenger_success').should('not.exist');
    });
  });

  context('Filters', () => {
    it('keeps the filters when coming back from the customer details view', () => {
      const clientFilterData = {
        size: 'Small',
        industry: 'Technology',
      };

      cy.intercept(
        'GET',
        `${CUSTOMERS_URL}?page=1&limit=10&size=${clientFilterData.size}&industry=${clientFilterData.industry}`,
        { fixture: 'customers/smallTechnologyCustomers' }
      ).as('getSmallTechnologyCustomers');
      cy.findByTestId('size-filter').select(clientFilterData.size);
      cy.findByTestId('industry-filter').select(clientFilterData.industry);
      cy.contains('button', 'View').click();
      cy.contains('button', 'Back').click();

      cy.findByTestId('size-filter').should('have.value', clientFilterData.size);
      cy.findByTestId('industry-filter').should('have.value', clientFilterData.industry);
    });

    it('persists the limit of items per page in the local storage when changing the limit', () => {
      cy.get('[name="pagination-limit"]').select('20');

      cy.window().then((win) => {
        expect(win.localStorage.getItem('paginationLimit')).to.eq('20');
      });
    });

    context('Filter by size', () => {
      it('filters the customers by small size', () => {
        cy.intercept('GET', `${CUSTOMERS_URL}?page=1&limit=10&size=Small&industry=All`, {
          fixture: 'customers/smallCustomers',
        }).as('getSmallCustomers');
        cy.findByTestId('size-filter').select('Small');
        cy.wait('@getSmallCustomers');

        cy.get('tbody tr').should('have.length', 4);
      });

      it('filters the customers by medium size', () => {
        cy.intercept('GET', `${CUSTOMERS_URL}?page=1&limit=10&size=Medium&industry=All`, {
          fixture: 'customers/mediumCustomers',
        }).as('getMediumCustomers');
        cy.findByTestId('size-filter').select('Medium');
        cy.wait('@getMediumCustomers');

        cy.get('tbody tr').should('have.length', 5);
      });

      it('filters the customers by enterprise size', () => {
        cy.intercept(
          'GET',
          `${CUSTOMERS_URL}?page=1&limit=10&size=Enterprise&industry=All`,
          {
            fixture: 'customers/enterpriseCustomers',
          }
        ).as('getLargeCustomers');
        cy.findByTestId('size-filter').select('Enterprise');
        cy.wait('@getLargeCustomers');

        cy.get('tbody tr').should('have.length', 3);
      });

      it('filters the customers by large enterprise size', () => {
        cy.intercept(
          'GET',
          `${CUSTOMERS_URL}?page=1&limit=10&size=Large%20Enterprise&industry=All`,
          {
            fixture: 'customers/largeEnterpriseCustomers',
          }
        ).as('getLargeEnterpriseCustomers');
        cy.findByTestId('size-filter').select('Large Enterprise');
        cy.wait('@getLargeEnterpriseCustomers');

        cy.get('tbody tr').should('have.length', 2);
      });

      it('filters the customers by very large enterprise size', () => {
        cy.intercept(
          'GET',
          `${CUSTOMERS_URL}?page=1&limit=10&size=Very%20Large%20Enterprise&industry=All`,
          {
            fixture: 'customers/veryLargeEnterpriseCustomers',
          }
        ).as('getVeryLargeEnterpriseCustomers');
        cy.findByTestId('size-filter').select('Very Large Enterprise');
        cy.wait('@getVeryLargeEnterpriseCustomers');

        cy.get('tbody tr').should('have.length', 1);
      });

      it('filters the customers by all sizes', () => {
        cy.findByTestId('size-filter').select('Small');
        cy.intercept('GET', `${CUSTOMERS_URL}?page=1&limit=10&size=All&industry=All`, {
          fixture: 'customers/allCustomers',
        }).as('getAllCustomers');
        cy.findByTestId('size-filter').select('All');
        cy.wait('@getAllCustomers');

        cy.get('tbody tr').should('have.length', 9);
      });
    });

    context('Filter by industry', () => {
      it('filters the customers by logistics industry', () => {
        cy.intercept(
          'GET',
          `${CUSTOMERS_URL}?page=1&limit=10&size=All&industry=Logistics`,
          {
            fixture: 'customers/logisticsCustomers',
          }
        ).as('getLogisticsCustomers');
        cy.findByTestId('industry-filter').select('Logistics');
        cy.wait('@getLogisticsCustomers');

        cy.get('tbody tr').should('have.length', 1);
      });

      it('filters the customers by retail industry', () => {
        cy.intercept('GET', `${CUSTOMERS_URL}?page=1&limit=10&size=All&industry=Retail`, {
          fixture: 'customers/retailCustomers',
        }).as('getRetailCustomers');
        cy.findByTestId('industry-filter').select('Retail');
        cy.wait('@getRetailCustomers');

        cy.get('tbody tr').should('have.length', 1);
      });

      it('filters the customers by technology industry', () => {
        cy.intercept(
          'GET',
          `${CUSTOMERS_URL}?page=1&limit=10&size=All&industry=Technology`,
          {
            fixture: 'customers/technologyCustomers',
          }
        ).as('getTechnologyCustomers');
        cy.findByTestId('industry-filter').select('Technology');
        cy.wait('@getTechnologyCustomers');

        cy.get('tbody tr').should('have.length', 3);
      });

      it('filters the customers by HR industry', () => {
        cy.intercept('GET', `${CUSTOMERS_URL}?page=1&limit=10&size=All&industry=HR`, {
          fixture: 'customers/HRCustomers',
        }).as('getHRCustomers');
        cy.findByTestId('industry-filter').select('HR');
        cy.wait('@getHRCustomers');

        cy.get('tbody tr').should('have.length', 4);
      });

      it('filters the customers by finance industry', () => {
        cy.intercept(
          'GET',
          `${CUSTOMERS_URL}?page=1&limit=10&size=All&industry=Finance`,
          {
            fixture: 'customers/financeCustomers',
          }
        ).as('getFinanceCustomers');
        cy.findByTestId('industry-filter').select('Finance');
        cy.wait('@getFinanceCustomers');

        cy.get('tbody tr').should('have.length', 6);
      });

      it('filters the customers by all industries', () => {
        cy.findByTestId('industry-filter').select('Technology');
        cy.intercept('GET', `${CUSTOMERS_URL}?page=1&limit=10&size=All&industry=All`, {
          fixture: 'customers/allCustomers',
        }).as('getAllCustomers');
        cy.findByTestId('industry-filter').select('All');
        cy.wait('@getAllCustomers');

        cy.get('tbody tr').should('have.length', 9);
      });
    });
  });
});

describe('Accessibility', () => {
  beforeEach(() => {
    cy.setCookie('cookieConsent', 'accepted');
    cy.visit('/');
    cy.injectAxe();
  });

  context('Light Mode', () => {
    it('finds no a11y issues in light mode in the customer table', () => {
      cy.checkA11y();
    });

    it('finds no a11y issues in the customer details and address view', () => {
      cy.get('button').contains('View').click();
      cy.checkA11y();
    });

    it('finds no a11y issues in the messenger form', () => {
      cy.getByClassStartsWith('Messenger_openCloseButton').click();
      cy.checkA11y();
    });
  });

  context('Dark Mode', () => {
    beforeEach(() => {
      cy.getByClassStartsWith('ThemeToggle_button').click();
    });

    it('finds no a11y issues in dark mode in the customer table', () => {
      cy.checkA11y();
    });

    it('It finds no a11y issues in dark mode in the customer details and address view', () => {
      cy.get('button').contains('View').click();
      cy.checkA11y();
    });

    it('finds no a11y issues in the messenger form', () => {
      cy.getByClassStartsWith('Messenger_openCloseButton').click();
      cy.checkA11y();
    });
  });
});
