const API_URL = Cypress.env('API_URL');

describe('Get Customers', () => {
  it('returns the correct status and body structure', () => {
    cy.request({
      method: 'GET',
      url: `${API_URL}/customers`,
    }).then(({ status, body }) => {
      expect(status).to.eq(200);
      const customers = body.customers;
      customers.forEach((customer) => {
        expect(customer).to.have.property('id');
        expect(customer).to.have.property('name');
        expect(customer).to.have.property('employees');
        expect(customer).to.have.property('size');
        expect(customer).to.have.property('industry');
        expect(customer).to.have.property('contactInfo');
        expect(customer).to.have.property('address');
      });
    });
  });

  it('paginates the customer list correctly', () => {
    cy.request({
      method: 'GET',
      url: `${API_URL}/customers?page=2&limit=10`,
    }).then(({ status, body }) => {
      expect(status).to.eq(200);
      expect(body.customers.length).to.eq(10);
    });
  });

  it('filters the limt of customers correctly', () => {
    cy.request({
      method: 'GET',
      url: `${API_URL}/customers?limit=20`,
    }).then(({ status, body }) => {
      expect(status).to.eq(200);
      expect(body.customers.length).to.eq(20);
    });
  });

  it('filters customers by size correctly', () => {
    cy.request({
      method: 'GET',
      url: `${API_URL}/customers?size=Small`,
    }).then(({ status, body }) => {
      expect(status).to.eq(200);
      const customers = body.customers;
      customers.forEach((customer) => {
        expect(customer.size).to.eq('Small');
      });
    });
  });

  it('filters customers by industry correctly', () => {
    cy.request({
      method: 'GET',
      url: `${API_URL}/customers?industry=Technology`,
    }).then(({ status, body }) => {
      expect(status).to.eq(200);
      const customers = body.customers;
      customers.forEach((customer) => {
        expect(customer.industry).to.eq('Technology');
      });
    });
  });

  context('Handles errors', () => {
    it('handles request with negative page', () => {
      cy.request({
        method: 'GET',
        url: `${API_URL}/customers?page=-1`,
        failOnStatusCode: false,
      }).then(({ status, body }) => {
        expect(status).to.eq(400);
        expect(body.error).to.eq('Invalid page or limit. Both must be positive numbers.');
      });
    });

    it('handles request with negative limit', () => {
      cy.request({
        method: 'GET',
        url: `${API_URL}/customers?limit=-1`,
        failOnStatusCode: false,
      }).then(({ status, body }) => {
        expect(status).to.eq(400);
        expect(body.error).to.eq('Invalid page or limit. Both must be positive numbers.');
      });
    });

    it('handles request with page as a string', () => {
      cy.request({
        method: 'GET',
        url: `${API_URL}/customers?page=Abc123`,
        failOnStatusCode: false,
      }).then(({ status, body }) => {
        expect(status).to.eq(400);
        expect(body.error).to.eq('Invalid page or limit. Both must be positive numbers.');
      });
    });

    it('handles request with limit as a boolean', () => {
      cy.request({
        method: 'GET',
        url: `${API_URL}/customers?limit=true`,
        failOnStatusCode: false,
      }).then(({ status, body }) => {
        expect(status).to.eq(400);
        expect(body.error).to.eq('Invalid page or limit. Both must be positive numbers.');
      });
    });

    it('handles request with unsupported size', () => {
      cy.request({
        method: 'GET',
        url: `${API_URL}/customers?size=Big`,
        failOnStatusCode: false,
      }).then(({ status, body }) => {
        expect(status).to.eq(400);
        expect(body.error).to.eq(
          'Unsupported size value. Supported values are All, Small, Medium, Enterprise, Large Enterprise, and Very Large Enterprise.'
        );
      });
    });

    it('handles request with unsupported industry', () => {
      cy.request({
        method: 'GET',
        url: `${API_URL}/customers?industry=Tech`,
        failOnStatusCode: false,
      }).then(({ status, body }) => {
        expect(status).to.eq(400);
        expect(body.error).to.eq(
          'Unsupported industry value. Supported values are All, Logistics, Retail, Technology, HR, and Finance.'
        );
      });
    });
  });
});
