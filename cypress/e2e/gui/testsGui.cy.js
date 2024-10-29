describe('Validate the GUI', () => {
  context('Validate the no customers scenarios', () => {
    beforeEach(() => {
      const CUSTOMERS_API_URL = `${Cypress.env('API_URL')}/customers`;
      cy.intercept(
        'GET',
        `${CUSTOMERS_API_URL}?**`,
        {
          'customers': [],
          'pageInfo': {
            'currentPage': 1,
            'totalPages': 1,
            'totalCustomers': 50
          }
        }
      ).as('getNoCustomers');
      cy.setCookie('cookieConsent', 'accepted');
      cy.visit('/');
    });
    it('The empty box image should be visible', () => {
      cy.get('[title="image of an empty box"]').should('be.visible');
    });
    it('The input name should be disabled', () => {
      cy.get('[data-testid="name"]')
        .should('be.visible')
        .and('have.attr', 'disabled');
    });
  });

  context('Validate the customer missing info scenarios', () => {
    beforeEach(() => {
      const CUSTOMERS_API_URL = `${Cypress.env('API_URL')}/customers`;
      cy.intercept(
        'GET',
        `${CUSTOMERS_API_URL}?**`,
        { fixture: 'customerMissingInfo.json' }
      ).as('getCustomer');
      cy.setCookie('cookieConsent', 'accepted');
      cy.visit('/');
      cy.contains('button', 'View').click();
    });
    it('Should not show contact info', () => {
      cy.contains('No contact info available').should('be.visible');
    });
    it('Should not show address', () => {
      cy.contains('Show address').click();
      cy.contains('No address available').should('be.visible');
    });
  });

  context('Validate the cookies scenarios', () => {
    beforeEach(() => {
      const CUSTOMERS_API_URL = `${Cypress.env('API_URL')}/customers`;
      cy.intercept(
        'GET',
        `${CUSTOMERS_API_URL}?**`,
        { fixture: 'customers' }
      ).as('getCustomers');
      cy.visit('/');
    });
    it('Accept the cookies', () => {
      cy.contains('button', 'Accept').click();
      cy.getCookie('cookieConsent').should('have.property', 'value', 'accepted');
    });
    it('Refuse the cookies', () => {
      cy.contains('button', 'Decline').click();
      cy.getCookie('cookieConsent').should('have.property', 'value', 'declined');
    });
  });

  context('Pagination scenarios', () => {
    it('Move to second page and check if the "Prev" and "Next" buttons are enabled', () => {
      cy.setCookie('cookieConsent', 'accepted');
      cy.visit('/');
      cy.contains('button', 'Next').click();

      cy.contains('button', 'Prev')
        .should('be.visible')
        .should('not.have.attr', 'disabled');
      cy.contains('button', 'Next')
        .should('be.visible')
        .should('not.have.attr', 'disabled');
    });
    it('In one page, "Prev" and "Next" buttons should be disabled', () => {
      const CUSTOMERS_API_URL = `${Cypress.env('API_URL')}/customers`;
      cy.intercept(
        'GET',
        `${CUSTOMERS_API_URL}?**`,
        { fixture: 'customers' }
      ).as('getCustomer');
      cy.setCookie('cookieConsent', 'accepted');
      cy.visit('/');

      cy.contains('button', 'Prev')
        .should('be.visible')
        .should('have.attr', 'disabled');
      cy.contains('button', 'Next')
        .should('be.visible')
        .should('have.attr', 'disabled');
    });
    it('Pagination element is rendered when the limit of customer is 50', () => {
      const FIFTY_CUSTOMERS_URL = `${Cypress.env('API_URL')}/customers**limit=50**`;
      cy.intercept(
        'GET',
        `${FIFTY_CUSTOMERS_URL}?**`
      ).as('getCustomers');
      cy.setCookie('cookieConsent', 'accepted');
      cy.visit('/');
      cy.get('[name="pagination-limit"]').select('50');
      cy.wait('@getCustomers');

      cy.get('[data-testid="pagination"]').should('be.visible');
      cy.get('tr').should('have.length', 51);
    });

    context('Two page scenarios', () => {
      beforeEach(() => {
        const CUSTOMERS_API_URL = `${Cypress.env('API_URL')}/customers`;
        cy.intercept(
          'GET',
          `${CUSTOMERS_API_URL}?**`,
          { fixture: 'customerMissingInfo.json' }
        ).as('getCustomer');
        cy.setCookie('cookieConsent', 'accepted');
        cy.visit('/');
      });
      it('In the first page, the "Prev" button is disabled', () => {
        cy.contains('button', 'Prev')
          .should('be.visible')
          .should('have.attr', 'disabled');
      });
      it('In the last page, the "Next" button is disabled', () => {
        cy.contains('button', 'Next').click();
        cy.contains('button', 'Next')
          .should('be.visible')
          .should('have.attr', 'disabled');
      });
    });
  });

  context('Sorting scenarios', () => {
    beforeEach(() => {
      cy.setCookie('cookieConsent', 'accepted');
      cy.visit('/');
    });
    it('Sort by size ascendant', () => {
      cy.contains('button', 'Size').click();
      cy.get('span[aria-label="ordering by size asc"]').should('be.visible');
    });
    it('Sort by size descendant', () => {
      cy.contains('button', 'Size').click().click();
      cy.get('span[aria-label="ordering by size desc"]').should('be.visible');
    });
    it('Sort by number of employees descendant', () => {
      cy.contains('button', 'Number of employees').click();
      cy.get('span[aria-label="ordering by number of employees desc"]').should('be.visible');
    });
    it('Sort by number of employees ascendant', () => {
      cy.contains('button', 'Number of employees').click().click();
      cy.get('span[aria-label="ordering by number of employees asc"]').should('be.visible');
    });
  });

  context('Validate the delay scenario', () => {
    beforeEach(() => {
      const CUSTOMERS_API_URL = `${Cypress.env('API_URL')}/customers`;
      cy.intercept(
        'GET',
        `${CUSTOMERS_API_URL}?**`,
        {
          delay: 1000,
          fixture: 'customers'
        }
      ).as('getCustomers');
      cy.setCookie('cookieConsent', 'accepted');
      cy.visit('/');
    });
    it('Check the load element', () => {
      cy.get('#loading').should('be.visible');
    });
  });

  context('Validate the customer positive scenarios', () => {
    beforeEach(() => {
      const CUSTOMERS_API_URL = `${Cypress.env('API_URL')}/customers`;
      cy.intercept(
        'GET',
        `${CUSTOMERS_API_URL}?**`,
        { fixture: 'customers' }
      ).as('getCustomers');
      cy.setCookie('cookieConsent', 'accepted');
      cy.visit('/');
    });
    context('Theme scenarios', () => {
      it('Change to dark mode', () => {
        cy.get('[aria-label="theme light activated"]').click();

        cy.get('[aria-label="theme dark activated"]').should('be.visible');
      });
      it('Return to light mode', () => {
        cy.get('[aria-label="theme light activated"]').click();
        cy.get('[aria-label="theme dark activated"]').click();

        cy.get('[aria-label="theme light activated"]').should('be.visible');
      });
    });

    it('Check limit on localstorage', () => {
      cy.get('[name="pagination-limit"]').select('50');
      cy.getAllLocalStorage().then((localStorage) => {
        const { paginationLimit } = localStorage['http://localhost:3000'];
        expect(paginationLimit).to.equal('50');
      });
    });

    it('Download CSV', () => {
      cy.contains('button', 'Download CSV').click();
      cy.readFile('cypress/resource/customersReference.csv', 'utf-8').then((csvReference) => {
        cy.readFile('cypress/downloads/customers.csv', 'utf-8').then((csvDownload) => {
          expect(csvDownload).to.equal(csvReference);
        });
      });
    });
    it('Show the customer address', () => {
      cy.contains('button', 'View').click();
      cy.contains('Show address').click();

      cy.contains('14135 Kari Garden Suite 427').should('be.visible');
      cy.contains('Mooreshire').should('be.visible');
      cy.contains('Nevada').should('be.visible');
      cy.contains('64043').should('be.visible');
      cy.contains('United States of America').should('be.visible');
    });
    it('Hide the customer address', () => {
      cy.contains('button', 'View').click();
      cy.contains('Show address').click();

      cy.contains('Hide address').click();
      cy.contains('Show address').should('be.visible');
    });
    it('Apply a filter, go to a customer page, return to the list page, and check if the previous filters are selected', () => {
      cy.get('[data-testid="size-filter"]').select('Medium');
      cy.get('[data-testid="industry-filter"]').select('Retail');
      cy.wait('@getCustomers');
      cy.get('[aria-label="View company: Littel Co"]').click();
      cy.contains('Company ID').should('be.visible');
      cy.contains('Back').click();

      cy.get('[data-testid="size-filter"]').should('have.value', 'Medium');
      cy.get('[data-testid="industry-filter"]').should('have.value', 'Retail');
    });
    it('Move to custmer page and return to clients list', () => {
      cy.contains('button', 'View').click();
      cy.contains('Customer Details').should('be.visible');
      cy.contains('Back').click();

      cy.contains('Hi there!').should('be.visible');
    });
    it('Check footer texts and links', () => {
      cy.contains('a', 'Hotmart')
        .should('be.visible')
        .and('have.attr', 'href', 'https://hotmart.com/pt-br/club/cypress-playground-ate-a-nuvem');

      cy.contains('a', 'Udemy')
        .should('be.visible')
        .and('have.attr', 'href', 'https://udemy.com/user/walmyr');

      cy.contains('a', 'Blog')
        .should('be.visible')
        .and('have.attr', 'href', 'https://talkingabouttesting.com');

      cy.contains('a', 'YouTube')
        .should('be.visible')
        .and('have.attr', 'href', 'https://youtube.com/@talkingabouttesting');

      cy.contains('p', 'Copyright 2024 - Talking About Testing')
        .should('be.visible');
    });
    it('Check welcome message', () => {
      cy.contains('Hi there!').should('be.visible');
      cy.get('[data-testid="name"]').type('Cicero Henrique');

      cy.contains('Hi Cicero Henrique!').should('be.visible');
    });
    it('Header should have title, theme modifier and input', () => {
      cy.contains('h1', 'EngageSphere').should('be.visible');
      cy.get('[class^="ThemeToggle_button"]').should('be.visible');
      cy.get('input[type="text"]').should('be.visible');
    });
    context('Validate the messenger', () => {
      it('Open and close the messenger', () => {
        cy.get('[aria-label="Open messenger"]').should('be.visible').click();
        cy.get('[aria-label="Close messenger"]').should('be.visible').click();

        cy.get('[aria-label="Open messenger"]').should('be.visible');
      });
      it('Show and hide alert of sent message', () => {
        cy.clock();
        cy.get('[aria-label="Open messenger"]').should('be.visible').click();
        cy.get('#messenger-name').type('test');
        cy.get('#email').type('test@test.com');
        cy.get('#message').type('Message test');
        cy.get('[class^="Messenger_sendButton"]').click();
        cy.contains('Your message has been sent.').should('be.visible');
        cy.tick(3000);

        cy.contains('Your message has been sent.').should('not.exist');
      });
      it('Clear and close message form', () => {
        cy.get('[aria-label="Open messenger"]').should('be.visible').click();
        cy.get('#messenger-name').type('test');
        cy.get('#email').type('test@test.com');
        cy.get('#message').type('Message test');
        cy.get('[aria-label="Close messenger"]').click();
        cy.get('[aria-label="Open messenger"]').should('be.visible').click();

        // Check if the form is empty
        cy.get('#messenger-name').should('have.value', '');
        cy.get('#email').should('have.value', '');
        cy.get('#message').should('have.value', '');
      });
    });
  });
  context('Validate the accessibility scenarios', () => {
    beforeEach(() => {
      cy.setCookie('cookieConsent', 'accepted');
      cy.visit('/');
      cy.injectAxe();
    });
    it('Check the accessibility in the customers list on light mode', () => {
      cy.checkA11y();
    });
    it('Check the accessibility in the customers list on dark mode', () => {
      cy.get('[aria-label="theme light activated"]').click();
      cy.get('[data-theme="dark"]').should('exist');
      cy.checkA11y();
    });
    it('Check the accessibility in the messenger button on dark mode', () => {
      cy.get('[aria-label="theme light activated"]').click();
      cy.get('[data-theme="dark"]').should('exist');
      cy.checkA11y('[aria-label="Open messenger"]');
    });
    context('Customers details page', () => {
      beforeEach(() => {
        cy.contains('button', 'View').click();
        cy.contains('Show address').click();
      });
      it('Check the accessibility in the customers details on light mode', () => {
        cy.checkA11y();
      });
      it('Check the accessibility in the customers details on dark mode', () => {
        cy.get('[aria-label="theme light activated"]').click();
        cy.get('[data-theme="dark"]').should('exist');
        cy.checkA11y();
      });
    });
  });
});
